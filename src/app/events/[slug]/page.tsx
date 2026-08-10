import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getActiveEventBySlug, getAllEvents } from '@/lib/events';
import { eventSchema, breadcrumbSchema, generatePageMeta } from '@/lib/schema';
import { formatDate, formatTime } from '@/lib/utils';
import { JsonLd } from '@/components/ui/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AddToCalendarButton } from '@/components/ui/AddToCalendarButton';
import { DonateWidget } from '@/components/ui/DonateWidget';
import { Calendar, Clock, MapPin, Users, ExternalLink, Tag } from 'lucide-react';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const event = await getActiveEventBySlug(slug);
  if (!event) return {};
  return generatePageMeta({
    title: event.title,
    description: event.summary,
    ogImage: event.image,
  });
}

export default async function EventDetailPage({ params }: Params) {
  const { slug } = await params;
  const event = await getActiveEventBySlug(slug);
  if (!event) notFound();

  const isPast = new Date(event.startDate) < new Date();

  return (
    <>
      <JsonLd data={eventSchema(event)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Events', href: '/events' },
          { name: event.title, href: `/events/${event.slug}` },
        ])}
      />

      <article className="container-content py-8 max-w-3xl">
        <Breadcrumbs
          items={[
            { label: 'Events', href: '/events' },
            { label: event.title, href: `/events/${event.slug}` },
          ]}
        />

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${
                event.modality === 'in-person'
                  ? 'bg-green-50 text-green-700'
                  : event.modality === 'online'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-purple-50 text-purple-700'
              }`}
            >
              {event.modality}
            </span>
            {event.status === 'cancelled' && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-50 text-red-700">
                Cancelled
              </span>
            )}
            {isPast && (
              <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                Past event
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>

          {event.summary && <p className="text-lg text-text-secondary">{event.summary}</p>}
        </header>

        {/* Event image */}
        {event.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={600}
              className="w-full aspect-[2/1] object-cover"
              priority
            />
          </div>
        )}

        {/* Event details sidebar-like panel */}
        <div className="bg-surface-soft rounded-xl p-6 mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-brand-blue shrink-0" />
            <div>
              <p className="font-medium">{formatDate(event.startDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-blue shrink-0" />
            <p>
              {formatTime(event.startDate)} – {formatTime(event.endDate)}
              <span className="text-xs text-text-tertiary ml-1">(GMT+7)</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-brand-blue shrink-0" />
            <p>{event.location}</p>
          </div>
          {event.facilitator && (
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-brand-blue shrink-0" />
              <p>Facilitated by {event.facilitator}</p>
            </div>
          )}
          {event.capacity && (
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-text-tertiary shrink-0" />
              <p>{event.capacity} spots available</p>
            </div>
          )}
          {/* <div className="flex items-center gap-3">
            <Tag className="w-5 h-5 text-brand-yellow shrink-0" />
            <p>
              {event.pricing === 'free'
                ? 'Free'
                : event.pricing === 'donation'
                  ? `By donation${event.suggestedDonation ? ` (suggested: ${event.suggestedDonation} ${event.currency || 'THB'})` : ''}`
                  : `${event.price} ${event.currency || 'THB'}`}
            </p>
          </div> */}

          {/* Actions */}
          {!isPast && event.status !== 'cancelled' && (
            <div className="pt-4 border-t border-black/[0.06] flex flex-wrap gap-3">
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue-dark transition-colors text-sm"
                >
                  Register <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <AddToCalendarButton event={event} />
            </div>
          )}
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: event.description }} />
        </div>

        {/* Tags */}
        {event.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-surface-muted rounded-full text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Donation suggestion */}
        {event.pricing === 'donation' && (
          <div className="mb-12">
            <DonateWidget compact />
          </div>
        )}
      </article>
    </>
  );
}
