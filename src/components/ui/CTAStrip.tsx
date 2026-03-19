import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CTAStripProps {
  title: string;
  description?: string;
  cta: { label: string; href: string };
  variant?: 'blue' | 'yellow' | 'subtle';
  className?: string;
}

export function CTAStrip({ title, description, cta, variant = 'blue', className }: CTAStripProps) {
  return (
    <section
      className={cn(
        'rounded-xl py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4',
        variant === 'blue' && 'bg-brand-blue/5',
        variant === 'yellow' && 'bg-brand-yellow/5',
        variant === 'subtle' && 'bg-surface-muted',
        className
      )}
    >
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <Link
        href={cta.href}
        className={cn(
          'shrink-0 px-6 py-2.5 font-medium rounded-lg transition-colors text-sm text-center',
          variant === 'blue' && 'bg-brand-blue text-white hover:bg-brand-blue-dark',
          variant === 'yellow' && 'bg-brand-yellow text-white hover:bg-brand-yellow-dark',
          variant === 'subtle' && 'bg-white text-text-primary border border-black/[0.10] hover:bg-surface-soft'
        )}
      >
        {cta.label}
      </Link>
    </section>
  );
}
