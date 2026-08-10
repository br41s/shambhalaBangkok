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
          href="https://maps.apple.com/place?place-id=I2A2CB810E935E45C&address=3rd+Floor+118%2F79+Soi+Sukhumvit+23%2C+Khlong+Toei+Nuea%2C+Vadhana+District%2C+Bangkok+10110%2C+Thailand&coordinate=13.740347%2C100.565507&name=Shambhala+Meditation+Center&_provider=9902"
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
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d968.9101677776874!2d100.5655548!3d13.7401916!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ec4cce9a9b3%3A0x34321bd455f6d9a8!2sBangkok%20Shambhala%20Meditation%20Center!5e0!3m2!1sen!2sth!4v1786253207163!5m2!1sen!2sth" width="100%" height="100%" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      )}
    </div>
  );
}
