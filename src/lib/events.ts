import { getAllContent, getContentBySlug } from './content';
import type { SEvent } from './types';

export function getAllEvents(): (SEvent & { slug: string })[] {
  const items = getAllContent<SEvent>('events');
  return items
    .map((item) => ({
      ...item.data,
      slug: item.slug,
      description: item.content,
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
  return { ...result.data, slug, description: result.content };
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
