import type { SEvent } from './types';
import { getSetting } from './settings';

// --- Lightweight ICS parser (no external deps) ---

interface ICSEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  dtstart: string;
  dtend: string;
  organizer: string;
  categories: string[];
}

/** Unfold ICS lines (RFC 5545 §3.1: continuation lines start with space/tab). */
function unfoldLines(raw: string): string {
  return raw.replace(/\r?\n[ \t]/g, '');
}

/** Parse an ICS date string (YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS or YYYYMMDD). */
function parseICSDate(value: string): Date | null {
  // Strip TZID parameter prefix if present (e.g. "TZID=Asia/Bangkok:")
  const clean = value.replace(/^.*:/, '').trim();

  // YYYYMMDDTHHMMSSZ
  const m = clean.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2}))?Z?$/);
  if (!m) {
    // Fall back to ISO parsing
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  const [, y, mo, d, h, mi, s] = m;
  const iso = `${y}-${mo}-${d}T${h || '00'}:${mi || '00'}:${s || '00'}${clean.endsWith('Z') ? 'Z' : ''}`;
  const date = new Date(iso);
  return isNaN(date.getTime()) ? null : date;
}

/** Unescape ICS text values. */
function unescapeICS(text: string): string {
  return text
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

/** Extract VEVENT blocks and parse their properties. */
function parseICSText(text: string): ICSEvent[] {
  const unfolded = unfoldLines(text);
  const lines = unfolded.split(/\r?\n/);
  const events: ICSEvent[] = [];
  let current: Partial<ICSEvent> | null = null;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      current = {
        uid: '',
        summary: '',
        description: '',
        location: '',
        dtstart: '',
        dtend: '',
        organizer: '',
        categories: [],
      };
      continue;
    }
    if (line === 'END:VEVENT' && current) {
      events.push(current as ICSEvent);
      current = null;
      continue;
    }
    if (!current) continue;

    // Parse "PROPERTY;params:value" or "PROPERTY:value"
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const propPart = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);
    // Get base property name (before ;PARAMS)
    const prop = propPart.split(';')[0].toUpperCase();

    switch (prop) {
      case 'UID':
        current.uid = value;
        break;
      case 'SUMMARY':
        current.summary = unescapeICS(value);
        break;
      case 'DESCRIPTION':
        current.description = unescapeICS(value);
        break;
      case 'LOCATION':
        current.location = unescapeICS(value);
        break;
      case 'DTSTART':
        current.dtstart = value;
        break;
      case 'DTEND':
        current.dtend = value;
        break;
      case 'ORGANIZER': {
        // ORGANIZER;CN=Name:mailto:email
        const cnMatch = propPart.match(/CN=([^;:]+)/i);
        current.organizer = cnMatch ? cnMatch[1] : value.replace(/^mailto:/i, '');
        break;
      }
      case 'CATEGORIES':
        current.categories = value
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean);
        break;
    }
  }

  return events;
}

// --- End ICS parser ---

interface CachedFeed {
  events: (SEvent & { slug: string })[];
  fetchedAt: number;
}

const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours
let feedCache: CachedFeed | null = null;

export async function isExternalFeedActive(): Promise<boolean> {
  const enabled = await getSetting('external_ics_enabled');
  if (enabled !== 'true') return false;
  const url = await getSetting('external_ics_url');
  return !!url;
}

export type FeedMode = 'replace' | 'merge';

export async function getExternalFeedMode(): Promise<FeedMode> {
  const mode = await getSetting('external_ics_mode');
  return mode === 'merge' ? 'merge' : 'replace';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function generateSlug(uid: string, summary: string, start: Date): string {
  const base = summary ? slugify(summary) : slugify(uid);
  const dateStr = start.toISOString().slice(0, 10);
  return `${base}-${dateStr}`;
}

// Serializa una fecha en formato ISO con offset +07:00 (Bangkok)
function toBangkokISOString(date: Date): string {
  // Obtiene los componentes en hora Bangkok
  const tzOffset = 7 * 60; // minutos
  const local = new Date(date.getTime() + (date.getTimezoneOffset() + tzOffset) * 60000);
  const y = local.getUTCFullYear();
  const m = String(local.getUTCMonth() + 1).padStart(2, '0');
  const d = String(local.getUTCDate()).padStart(2, '0');
  const h = String(local.getUTCHours()).padStart(2, '0');
  const min = String(local.getUTCMinutes()).padStart(2, '0');
  const s = String(local.getUTCSeconds()).padStart(2, '0');
  return `${y}-${m}-${d}T${h}:${min}:${s}+07:00`;
}

function icsEventToSEvent(vevent: ICSEvent): (SEvent & { slug: string }) | null {
  const start = parseICSDate(vevent.dtstart);
  if (!start) return null;

  const end = parseICSDate(vevent.dtend) ?? new Date(start.getTime() + 60 * 60 * 1000);

  const slug = generateSlug(
    vevent.uid || String(start.getTime()),
    vevent.summary || 'event',
    start
  );

  return {
    slug,
    title: vevent.summary || 'Untitled Event',
    summary: vevent.description.slice(0, 200),
    description: vevent.description,
    startDate: toBangkokISOString(start),
    endDate: toBangkokISOString(end),
    timezone: 'Asia/Bangkok',
    location: vevent.location,
    modality: 'in-person',
    organizer: vevent.organizer || 'External',
    pricing: 'free',
    tags: vevent.categories,
    status: 'published',
  };
}

async function fetchAndParse(url: string): Promise<(SEvent & { slug: string })[]> {
  const response = await fetch(url, {
    headers: { Accept: 'text/calendar' },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ICS feed: ${response.status}`);
  }

  const text = await response.text();
  const parsed = parseICSText(text);

  // Deduplicate by slug (ICS feeds can have duplicate VEVENT entries for recurring events)
  const seen = new Set<string>();
  const events: (SEvent & { slug: string })[] = [];
  for (const vevent of parsed) {
    const event = icsEventToSEvent(vevent);
    if (event && !seen.has(event.slug)) {
      seen.add(event.slug);
      events.push(event);
    }
  }

  return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export async function getExternalEvents(): Promise<(SEvent & { slug: string })[]> {
  const url = await getSetting('external_ics_url');
  if (!url) return [];

  if (feedCache && Date.now() - feedCache.fetchedAt < CACHE_TTL) {
    return feedCache.events;
  }

  try {
    const events = await fetchAndParse(url);
    feedCache = { events, fetchedAt: Date.now() };
    return events;
  } catch (error) {
    console.error('External ICS feed error:', error);
    // Return stale cache if available
    if (feedCache) return feedCache.events;
    return [];
  }
}

export async function getExternalEventBySlug(
  slug: string
): Promise<(SEvent & { slug: string }) | null> {
  const events = await getExternalEvents();
  return events.find((e) => e.slug === slug) || null;
}

/** Test an ICS URL without saving. Returns count and sample events. */
export async function testExternalFeed(
  url: string
): Promise<{ count: number; events: { title: string; date: string }[] }> {
  const events = await fetchAndParse(url);
  return {
    count: events.length,
    events: events.slice(0, 5).map((e) => ({
      title: e.title,
      date: e.startDate,
    })),
  };
}

/** Clear the feed cache (call when settings change). */
export function clearFeedCache(): void {
  feedCache = null;
}
