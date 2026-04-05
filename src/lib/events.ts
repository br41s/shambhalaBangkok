import { getAllContent, getContentBySlug } from './content';
import { markdownToHtml } from './markdown';
import {
  isExternalFeedActive,
  getExternalEvents,
  getExternalEventBySlug,
  getExternalFeedMode,
} from './external-calendar';
import type { SEvent } from './types';

export function getAllEvents(): (SEvent & { slug: string })[] {
  const items = getAllContent<SEvent>('events');
  return items
    .map((item) => ({
      ...item.data,
      slug: item.slug,
      description: markdownToHtml(item.content),
    }))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function getUpcomingEvents(limit?: number): (SEvent & { slug: string })[] {
  const now = new Date();
  const events = getAllEvents().filter(
    (e) => e.status === 'published' && new Date(e.startDate) >= now
  );
  return limit ? events.slice(0, limit) : events;
}

export function getPastEvents(limit?: number): (SEvent & { slug: string })[] {
  const now = new Date();
  const events = getAllEvents()
    .filter((e) => e.status === 'published' && new Date(e.startDate) < now)
    .reverse();
  return limit ? events.slice(0, limit) : events;
}

export function getEventBySlug(slug: string): (SEvent & { slug: string }) | null {
  const result = getContentBySlug<SEvent>('events', slug);
  if (!result) return null;
  return { ...result.data, slug, description: markdownToHtml(result.content) };
}

export function getEventsByTag(tag: string): (SEvent & { slug: string })[] {
  return getAllEvents().filter((e) => e.tags?.includes(tag));
}

export function getEventsByMonth(year: number, month: number): (SEvent & { slug: string })[] {
  return getAllEvents().filter((e) => {
    const d = new Date(e.startDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

// --- Active-source functions (external ICS when enabled, internal otherwise) ---

/** Merge external + internal events, sorted by startDate, deduplicating by slug. */
function mergeEvents(
  internal: (SEvent & { slug: string })[],
  external: (SEvent & { slug: string })[]
): (SEvent & { slug: string })[] {
  const slugs = new Set(external.map((e) => e.slug));
  const combined = [...external, ...internal.filter((e) => !slugs.has(e.slug))];
  return combined.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export async function getActiveUpcomingEvents(
  limit?: number
): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    const mode = await getExternalFeedMode();
    const now = new Date();
    const externalEvents = (await getExternalEvents()).filter((e) => new Date(e.startDate) >= now);

    if (mode === 'merge') {
      const events = mergeEvents(getUpcomingEvents(), externalEvents);
      return limit ? events.slice(0, limit) : events;
    }
    return limit ? externalEvents.slice(0, limit) : externalEvents;
  }
  return getUpcomingEvents(limit);
}

export async function getActivePastEvents(limit?: number): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    const mode = await getExternalFeedMode();
    const now = new Date();
    const externalPast = (await getExternalEvents())
      .filter((e) => new Date(e.startDate) < now)
      .reverse();

    if (mode === 'merge') {
      const internal = getPastEvents();
      const slugs = new Set(externalPast.map((e) => e.slug));
      const combined = [...externalPast, ...internal.filter((e) => !slugs.has(e.slug))];
      const sorted = combined.sort(
        (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );
      return limit ? sorted.slice(0, limit) : sorted;
    }
    return limit ? externalPast.slice(0, limit) : externalPast;
  }
  return getPastEvents(limit);
}

export async function getActiveEventBySlug(
  slug: string
): Promise<(SEvent & { slug: string }) | null> {
  if (await isExternalFeedActive()) {
    const mode = await getExternalFeedMode();
    const external = await getExternalEventBySlug(slug);
    if (external) return external;
    if (mode === 'merge') return getEventBySlug(slug);
    return null;
  }
  return getEventBySlug(slug);
}

export async function getActiveAllEvents(): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    const mode = await getExternalFeedMode();
    const externalEvents = await getExternalEvents();
    if (mode === 'merge') {
      return mergeEvents(getAllEvents(), externalEvents);
    }
    return externalEvents;
  }
  return getAllEvents();
}
