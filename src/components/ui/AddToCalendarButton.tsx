'use client';

import { CalendarPlus } from 'lucide-react';
import { googleCalendarUrl, cn } from '@/lib/utils';
import type { SEvent } from '@/lib/types';

interface AddToCalendarButtonProps {
  event: SEvent;
  size?: 'sm' | 'md';
}

export function AddToCalendarButton({ event, size = 'md' }: AddToCalendarButtonProps) {
  const gcalUrl = googleCalendarUrl(event);

  const handleDownloadICS = async () => {
    try {
      const res = await fetch(`/api/events/${event.slug}/ics`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${event.slug}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback to Google Calendar
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative group/cal">
      <button
        onClick={handleDownloadICS}
        className={cn(
          'inline-flex items-center gap-1 font-medium text-text-secondary hover:text-brand-blue transition-colors',
          size === 'sm' ? 'text-xs' : 'text-sm'
        )}
        aria-label={`Add "${event.title}" to calendar`}
      >
        <CalendarPlus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        <span>Add to Calendar</span>
      </button>
      {/* Dropdown with calendar options */}
      <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-black/[0.08] py-1 opacity-0 invisible group-hover/cal:opacity-100 group-hover/cal:visible transition-all z-20 min-w-[160px]">
        <a
          href={gcalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          Google Calendar
        </a>
        <button
          onClick={handleDownloadICS}
          className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface-muted hover:text-text-primary transition-colors"
        >
          Apple / Outlook (.ics)
        </button>
      </div>
    </div>
  );
}
