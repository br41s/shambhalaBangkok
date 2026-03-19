import { NextRequest, NextResponse } from 'next/server';
import { getEventBySlug } from '@/lib/events';
import { generateEventICS } from '@/lib/calendar';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const icsContent = generateEventICS(event);

  return new NextResponse(icsContent, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.ics"`,
    },
  });
}
