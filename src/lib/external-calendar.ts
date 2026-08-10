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

/**
 * Unfold ICS lines (RFC 5545 §3.1:
 * continuation lines start with a space or tab).
 */
function unfoldLines(raw: string): string {
  return raw.replace(/\r?\n[ \t]/g, '');
}

/**
 * Parse an ICS date property while preserving TZID.
 *
 * Supported examples:
 *
 *   DTSTART:20260810T120000Z
 *   DTSTART:20260810T120000
 *   DTSTART;TZID=America/New_York:20260810T120000
 *   DTSTART;TZID=Asia/Bangkok:20260810T120000
 *   DTSTART:20260810
 *
 * The returned Date always represents the correct absolute instant.
 */
function parseICSDate(value: string): Date | null {
  const colonIdx = value.indexOf(':');

  if (colonIdx === -1) {
    return null;
  }

  const propPart = value.slice(0, colonIdx);
  const rawValue = value.slice(colonIdx + 1).trim();

  // Extract TZID from something like:
  // DTSTART;TZID=America/New_York
  const tzidMatch = propPart.match(/(?:^|;)TZID=([^;:]+)/i);
  const tzid = tzidMatch?.[1];

  // ------------------------------------------------------------
  // UTC date/time
  // Example:
  // 20260810T120000Z
  // ------------------------------------------------------------

  const utcMatch = rawValue.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
  );

  if (utcMatch) {
    const [, year, month, day, hour, minute, second] = utcMatch;

    const date = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
    );

    return isNaN(date.getTime()) ? null : date;
  }

  // ------------------------------------------------------------
  // Local / TZID date-time
  // Example:
  // 20260810T120000
  // ------------------------------------------------------------

  const localMatch = rawValue.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/
  );

  if (localMatch) {
    const [, year, month, day, hour, minute, second] = localMatch;

    const y = Number(year);
    const mo = Number(month);
    const d = Number(day);
    const h = Number(hour);
    const min = Number(minute);
    const s = Number(second);

    // If the ICS specifies TZID, interpret the wall-clock time
    // in that IANA timezone.
    if (tzid) {
      return zonedDateTimeToUTC(
        y,
        mo,
        d,
        h,
        min,
        s,
        tzid
      );
    }

    // Floating times have no timezone.
    //
    // For this application, treat floating ICS times as Bangkok time.
    return zonedDateTimeToUTC(
      y,
      mo,
      d,
      h,
      min,
      s,
      BANGKOK_TIMEZONE
    );
  }

  // ------------------------------------------------------------
  // All-day date
  // Example:
  // 20260810
  // ------------------------------------------------------------

  const dateMatch = rawValue.match(/^(\d{4})(\d{2})(\d{2})$/);

  if (dateMatch) {
    const [, year, month, day] = dateMatch;

    return zonedDateTimeToUTC(
      Number(year),
      Number(month),
      Number(day),
      0,
      0,
      0,
      BANGKOK_TIMEZONE
    );
  }

  // Fallback for unusual but valid-ish date strings.
  const fallback = new Date(rawValue);

  return isNaN(fallback.getTime()) ? null : fallback;
}

/**
 * Convert a wall-clock date/time in an IANA timezone to a UTC Date.
 *
 * Example:
 *
 *   2026-08-10 12:00 America/New_York
 *
 * becomes the Date representing the corresponding UTC instant.
 *
 * This uses Intl.DateTimeFormat so it works with DST-aware IANA
 * timezone names without requiring an external timezone library.
 */
function zonedDateTimeToUTC(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  timeZone: string
): Date | null {
  const requestedUTC = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    minute,
    second
  );

  const guess = new Date(requestedUTC);

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    });

    const parts = formatter.formatToParts(guess);

    const values: Record<string, number> = {};

    for (const part of parts) {
      if (
        part.type === 'year' ||
        part.type === 'month' ||
        part.type === 'day' ||
        part.type === 'hour' ||
        part.type === 'minute' ||
        part.type === 'second'
      ) {
        values[part.type] = Number(part.value);
      }
    }

    if (
      values.year == null ||
      values.month == null ||
      values.day == null ||
      values.hour == null ||
      values.minute == null ||
      values.second == null
    ) {
      return null;
    }

    const representedUTC = Date.UTC(
      values.year,
      values.month - 1,
      values.day,
      values.hour,
      values.minute,
      values.second
    );

    // Difference between the requested wall-clock time and what the
    // timezone formatter says that instant represents.
    const offset = representedUTC - guess.getTime();

    return new Date(requestedUTC - offset);
  } catch (error) {
    console.error(`Invalid ICS timezone "${timeZone}"`, error);
    return null;
  }
}

/**
 * Unescape ICS text values.
 */
function unescapeICS(text: string): string {
  return text
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
}

/**
 * Extract VEVENT blocks and parse their properties.
 */
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

    if (!current) {
      continue;
    }

    // Parse:
    //
    // PROPERTY;PARAM=value:value
    //
    // or:
    //
    // PROPERTY:value
    const colonIdx = line.indexOf(':');

    if (colonIdx === -1) {
      continue;
    }

    const propPart = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);

    // Base property name, excluding parameters.
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
        // IMPORTANT:
        //
        // Preserve the complete property line so parseICSDate()
        // can see TZID parameters.
        //
        // Example:
        // DTSTART;TZID=America/New_York:20260810T120000
        //
        current.dtstart = line;
        break;

      case 'DTEND':
        // Same reason as DTSTART: preserve TZID.
        current.dtend = line;
        break;

      case 'ORGANIZER': {
        // Example:
        //
        // ORGANIZER;CN=John Smith:mailto:john@example.com
        //
        const cnMatch = propPart.match(/CN=([^;:]+)/i);

        current.organizer = cnMatch
          ? unescapeICS(cnMatch[1])
          : value.replace(/^mailto:/i, '');

        break;
      }

      case 'CATEGORIES':
        current.categories = value
          .split(',')
          .map((category) => unescapeICS(category.trim()))
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

const BANGKOK_TIMEZONE = 'Asia/Bangkok';
const BANGKOK_OFFSET = '+07:00';

let feedCache: CachedFeed | null = null;

export async function isExternalFeedActive(): Promise<boolean> {
  return true;
}

export type FeedMode = 'replace' | 'merge';

export async function getExternalFeedMode(): Promise<FeedMode> {
  await getSetting('external_ics_mode');
  
  // hardcoded to replace with external events for now.
  return 'replace';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function generateSlug(
  uid: string,
  summary: string,
  start: Date
): string {
  const base = summary ? slugify(summary) : slugify(uid);
  const dateStr = start.toISOString().slice(0, 10);

  return `${base}-${dateStr}`;
}

/**
 * Serialize a Date as an ISO string in Bangkok time.
 *
 * Example:
 *
 *   2026-08-10T12:00:00Z
 *
 * becomes:
 *
 *   2026-08-10T19:00:00+07:00
 */
function toBangkokISOString(date: Date): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: BANGKOK_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);

  const values: Record<string, string> = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  }

  return (
    `${values.year}-${values.month}-${values.day}` +
    `T${values.hour}:${values.minute}:${values.second}` +
    BANGKOK_OFFSET
  );
}

function icsEventToSEvent(
  vevent: ICSEvent
): (SEvent & { slug: string }) | null {
  const start = parseICSDate(vevent.dtstart);

  if (!start) {
    console.warn(
      'Skipping ICS event with invalid DTSTART:',
      vevent.uid,
      vevent.dtstart
    );

    return null;
  }

  const end =
    parseICSDate(vevent.dtend) ??
    new Date(start.getTime() + 60 * 60 * 1000);

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
    timezone: BANGKOK_TIMEZONE,
    location: vevent.location,
    modality: 'in-person',
    organizer: vevent.organizer || 'External',
    pricing: 'free',
    tags: vevent.categories,
    status: 'published',
  };
}

async function fetchAndParse(
  url: string
): Promise<(SEvent & { slug: string })[]> {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/calendar',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ICS feed: ${response.status}`
    );
  }

  const text = await response.text();

  const parsed = parseICSText(text);

  // Deduplicate by slug.
  //
  // Some ICS feeds can contain duplicate VEVENT entries,
  // especially around recurring events.
  const seen = new Set<string>();

  const events: (SEvent & { slug: string })[] = [];

  for (const vevent of parsed) {
    const event = icsEventToSEvent(vevent);

    if (event && !seen.has(event.slug)) {
      seen.add(event.slug);
      events.push(event);
    }
  }

  return events.sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime()
  );
}

export async function getExternalEvents(): Promise<
  (SEvent & { slug: string })[]
> {
  const url = process.env.NEXT_PUBLIC_ICS_FEED;

  if (!url) {
    return [];
  }

  // Return cached feed if it is still fresh.
  if (
    feedCache &&
    Date.now() - feedCache.fetchedAt < CACHE_TTL
  ) {
    return feedCache.events;
  }

  try {
    const events = await fetchAndParse(url);

    feedCache = {
      events,
      fetchedAt: Date.now(),
    };

    return events;
  } catch (error) {
    console.error('External ICS feed error:', error);

    // Return stale cache if available.
    if (feedCache) {
      return feedCache.events;
    }

    return [];
  }
}

export async function getExternalEventBySlug(
  slug: string
): Promise<(SEvent & { slug: string }) | null> {
  const events = await getExternalEvents();

  return events.find((event) => event.slug === slug) || null;
}

/**
 * Test an ICS URL without saving.
 *
 * Returns the number of events and a sample of the first five
 * events, with dates converted to Bangkok time.
 */
export async function testExternalFeed(
  url: string
): Promise<{
  count: number;
  events: {
    title: string;
    date: string;
  }[];
}> {
  const events = await fetchAndParse(url);

  return {
    count: events.length,

    events: events.slice(0, 5).map((event) => ({
      title: event.title,
      date: event.startDate,
    })),
  };
}

/**
 * Clear the feed cache.
 *
 * Call this when external feed settings change or when a
 * fresh feed needs to be fetched immediately.
 */
export function clearFeedCache(): void {
  feedCache = null;
}
