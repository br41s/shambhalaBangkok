import { cn } from '@/lib/utils';
import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  ctaTertiary?: { label: string; href: string };
  className?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaTertiary,
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative py-20 md:py-28 lg:py-36 bg-white',
        className
      )}
    >
      <div className="container-content text-center max-w-3xl mx-auto">
        {subtitle && (
          <p className="text-sm font-medium text-brand-blue tracking-wide uppercase mb-4">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {ctaPrimary && (
            <Link
              href={ctaPrimary.href}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue-dark transition-colors text-center"
            >
              {ctaPrimary.label}
            </Link>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="w-full sm:w-auto px-8 py-3.5 border border-black/[0.12] text-text-primary font-medium rounded-lg hover:bg-surface-muted transition-colors text-center"
            >
              {ctaSecondary.label}
            </Link>
          )}
          {ctaTertiary && (
            <Link
              href={ctaTertiary.href}
              className="w-full sm:w-auto px-8 py-3.5 text-brand-yellow-dark font-medium hover:text-brand-yellow transition-colors text-center"
            >
              {ctaTertiary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
