import { createEvents, type EventAttributes } from 'ics';
import type { SEvent } from './types';

/**
 * Generate ICS content for a single event.
 */
export function generateEventICS(event: SEvent): string {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  const icsEvent: EventAttributes = {
    start: [
      start.getFullYear(),
      start.getMonth() + 1,
      start.getDate(),
      start.getHours(),
      start.getMinutes(),
    ],
    end: [
      end.getFullYear(),
      end.getMonth() + 1,
      end.getDate(),
      end.getHours(),
      end.getMinutes(),
    ],
    title: event.title,
    description: event.summary,
    location: event.location,
    url: event.registrationUrl,
    status: event.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED',
    organizer: { name: event.organizer, email: 'bangkok@shambhala.info' },
    categories: event.tags,
  };

  const { value, error } = createEvents([icsEvent]);
  if (error) {
    console.error('ICS generation error:', error);
    return '';
  }
  return value ?? '';
}

/**
 * Generate ICS feed for multiple events.
 */
export function generateCalendarFeed(events: SEvent[]): string {
  const icsEvents: EventAttributes[] = events.map((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return {
      start: [
        start.getFullYear(),
        start.getMonth() + 1,
        start.getDate(),
        start.getHours(),
        start.getMinutes(),
      ],
      end: [
        end.getFullYear(),
        end.getMonth() + 1,
        end.getDate(),
        end.getHours(),
        end.getMinutes(),
      ],
      title: event.title,
      description: event.summary,
      location: event.location,
      status: event.status === 'cancelled' ? 'CANCELLED' : 'CONFIRMED',
      organizer: { name: event.organizer, email: 'bangkok@shambhala.info' },
      categories: event.tags,
    };
  });

  const { value, error } = createEvents(icsEvents);
  if (error) {
    console.error('Calendar feed generation error:', error);
    return '';
  }
  return value ?? '';
}
