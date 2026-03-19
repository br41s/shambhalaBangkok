import { NextResponse } from 'next/server';
import { getUpcomingEvents } from '@/lib/events';
import { generateCalendarFeed } from '@/lib/calendar';

export async function GET() {
  const events = getUpcomingEvents();
  const icsContent = generateCalendarFeed(events);

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="shambhala-bangkok.ics"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
