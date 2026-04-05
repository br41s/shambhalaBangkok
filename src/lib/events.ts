import { getAllContent, getContentBySlug } from './content';
import { markdownToHtml } from './markdown';
import {
  isExternalFeedActive,
  getExternalEvents,
  getExternalEventBySlug,
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

export async function getActiveUpcomingEvents(
  limit?: number
): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    const now = new Date();
    const events = (await getExternalEvents()).filter((e) => new Date(e.startDate) >= now);
    return limit ? events.slice(0, limit) : events;
  }
  return getUpcomingEvents(limit);
}

export async function getActivePastEvents(limit?: number): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    const now = new Date();
    const events = (await getExternalEvents()).filter((e) => new Date(e.startDate) < now).reverse();
    return limit ? events.slice(0, limit) : events;
  }
  return getPastEvents(limit);
}

export async function getActiveEventBySlug(
  slug: string
): Promise<(SEvent & { slug: string }) | null> {
  if (await isExternalFeedActive()) {
    return getExternalEventBySlug(slug);
  }
  return getEventBySlug(slug);
}

export async function getActiveAllEvents(): Promise<(SEvent & { slug: string })[]> {
  if (await isExternalFeedActive()) {
    return getExternalEvents();
  }
  return getAllEvents();
}
