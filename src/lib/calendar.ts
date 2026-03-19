import { createEvents, type EventAttributes } from 'ics';
import type { SEvent } from './types';

function toICSEvent(event: SEvent): EventAttributes {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  return {
    start: [start.getFullYear(), start.getMonth() + 1, start.getDate(), start.getHours(), start.getMinutes()],
    end: [end.getFullYear(), end.getMonth() + 1, end.getDate(), end.getHours(), end.getMinutes()],
    title: event.title,
    description: event.summary,
    location: event.location,
    url: event.registrationUrl,
    status: event.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED',
    organizer: { name: event.organizer, email: 'bangkok@shambhala.info' },
    categories: event.tags,
  };
}

/** Generate ICS content for a single event. */
export function generateEventICS(event: SEvent): string {
  const { value, error } = createEvents([toICSEvent(event)]);
  if (error) console.error('ICS generation error:', error);
  return value ?? '';
}

/** Generate ICS feed for multiple events. */
export function generateCalendarFeed(events: SEvent[]): string {
  const { value, error } = createEvents(events.map(toICSEvent));
  if (error) console.error('Calendar feed generation error:', error);
  return value ?? '';
}
