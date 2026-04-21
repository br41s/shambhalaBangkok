import { siteConfig } from '@/lib/config';
import { MapPin, Navigation } from 'lucide-react';

interface LocationBlockProps {
  showMap?: boolean;
  compact?: boolean;
}

export function LocationBlock({ showMap = true, compact }: LocationBlockProps) {
  const loc = siteConfig.location;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold">{loc.name}</h3>
          <p className="text-sm text-text-secondary mt-1">{loc.address}</p>
          {loc.addressLocal && (
            <p className="text-sm text-text-tertiary mt-0.5">{loc.addressLocal}</p>
          )}
          {loc.transitInfo && (
            <p className="text-sm text-text-secondary mt-2 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              {loc.transitInfo}
            </p>
          )}
        </div>
      </div>

      {!compact && loc.directions && (
        <p className="text-sm text-text-secondary leading-relaxed pl-8">{loc.directions}</p>
      )}

      <div className="flex gap-2 pl-8">
        <a
          href={loc.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          Open in Maps
        </a>
        <a
          href="https://maps.apple.com/p/d3Y_EBU8FrjXGZ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Navigation className="w-3.5 h-3.5" />
          Open in Apple Maps
        </a>
      </div>

      {showMap && (
        <div className="rounded-xl overflow-hidden border border-black/[0.06] aspect-video">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6!2d${loc.lng}!3d${loc.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzE3LjIiTiAxMDDCsDMzJzU3LjAiRQ!5e0!3m2!1sen!2sth!4v1`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bangkok Shambhala location map"
          />
        </div>
      )}
    </div>
  );
}
