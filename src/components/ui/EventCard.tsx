import Link from 'next/link';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';
import { formatDate, formatTime, cn } from '@/lib/utils';
import type { SEvent } from '@/lib/types';
import { AddToCalendarButton } from './AddToCalendarButton';

interface EventCardProps {
  event: SEvent & { slug: string };
  compact?: boolean;
}

export function EventCard({ event, compact }: EventCardProps) {
  const isPast = new Date(event.startDate) < new Date();
  const isCancelled = event.status === 'cancelled';

  return (
    <article
      className={cn(
        'group relative rounded-xl border border-black/[0.06] bg-white p-6 transition-all hover:shadow-md hover:border-black/[0.10]',
        isCancelled && 'opacity-60',
        isPast && 'opacity-75'
      )}
    >
      {/* Status badges */}
      <div className="flex items-center gap-2 mb-3">
        {event.modality && (
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full',
            event.modality === 'in-person' && 'bg-green-50 text-green-700',
            event.modality === 'online' && 'bg-blue-50 text-blue-700',
            event.modality === 'hybrid' && 'bg-purple-50 text-purple-700',
          )}>
            {event.modality}
          </span>
        )}
        {event.pricing === 'free' && (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-brand-yellow/10 text-brand-yellow-dark">
            Free
          </span>
        )}
        {event.pricing === 'donation' && (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-brand-yellow/10 text-brand-yellow-dark">
            By donation
          </span>
        )}
        {isCancelled && (
          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
            Cancelled
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-blue transition-colors">
        <Link href={`/events/${event.slug}`} className="after:absolute after:inset-0">
          {event.title}
        </Link>
      </h3>

      {/* Summary */}
      {!compact && event.summary && (
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {event.summary}
        </p>
      )}

      {/* Meta */}
      <div className="space-y-1.5 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-tertiary shrink-0" />
          <span>{formatDate(event.startDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-text-tertiary shrink-0" />
          <span>{formatTime(event.startDate)} – {formatTime(event.endDate)}</span>
        </div>
        {!compact && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-text-tertiary shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        )}
        {event.capacity && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-text-tertiary shrink-0" />
            <span>{event.capacity} spots</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {!compact && !isPast && !isCancelled && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-black/[0.06]">
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
          >
            View details
          </Link>
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              Register <ExternalLink className="w-3 h-3" />
            </a>
          )}
          <AddToCalendarButton event={event} size="sm" />
        </div>
      )}
    </article>
  );
}
