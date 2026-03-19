import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import type { DonationMethod } from '@/lib/types';

interface DonateWidgetProps {
  compact?: boolean;
  className?: string;
}

export function DonateWidget({ compact, className }: DonateWidgetProps) {
  const methods = siteConfig.donationMethods;

  if (compact) {
    return (
      <div className={cn('bg-brand-yellow/5 rounded-xl p-6 text-center', className)}>
        <h3 className="font-semibold text-lg mb-2">Support Our Community</h3>
        <p className="text-sm text-text-secondary mb-4">
          Your donation helps us maintain our meditation space and offer free instruction.
        </p>
        <Link
          href="/donate"
          className="inline-flex items-center px-6 py-2.5 bg-brand-yellow text-white font-medium rounded-lg hover:bg-brand-yellow-dark transition-colors"
        >
          Donate Now
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Support Bangkok Shambhala</h2>
        <p className="text-text-secondary leading-relaxed">
          All donations go directly toward maintaining our meditation space, offering free instruction,
          and keeping the community accessible to everyone. Every contribution matters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {methods.map((method) => (
          <DonationMethodCard key={method.id} method={method} />
        ))}
      </div>
    </div>
  );
}

function DonationMethodCard({ method }: { method: DonationMethod }) {
  return (
    <div className="border border-black/[0.06] rounded-xl p-6 text-center bg-white">
      <h3 className="font-semibold mb-2">{method.label}</h3>
      {method.qrImage && (
        <div className="mb-3 flex justify-center">
          <Image
            src={method.qrImage}
            alt={`${method.label} QR code`}
            width={180}
            height={180}
            className="rounded-lg"
          />
        </div>
      )}
      {method.instructions && (
        <p className="text-sm text-text-secondary mb-3">{method.instructions}</p>
      )}
      {method.url && (
        <a
          href={method.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue-dark transition-colors text-sm"
        >
          Donate via {method.label}
        </a>
      )}
    </div>
  );
}
