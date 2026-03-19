import { cn } from '@/lib/utils';

interface AnnouncementBannerProps {
  message: string;
  href?: string;
  variant?: 'info' | 'warning' | 'success';
}

export function AnnouncementBanner({ message, href, variant = 'info' }: AnnouncementBannerProps) {
  const Wrapper = href ? 'a' : 'div';
  const extraProps = href ? { href, target: '_blank' as const, rel: 'noopener noreferrer' as const } : {};

  return (
    <Wrapper
      {...extraProps}
      className={cn(
        'block text-center py-2.5 px-4 text-sm font-medium',
        variant === 'info' && 'bg-brand-blue/5 text-brand-blue',
        variant === 'warning' && 'bg-brand-yellow/10 text-brand-yellow-dark',
        variant === 'success' && 'bg-green-50 text-green-700',
        href && 'hover:opacity-80 transition-opacity cursor-pointer'
      )}
    >
      {message}
    </Wrapper>
  );
}
