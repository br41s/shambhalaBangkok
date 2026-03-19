import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

const platformIcons: Record<string, string> = {
  whatsapp: '💬',
  line: '💚',
  facebook: '📘',
  instagram: '📷',
  meetup: '🤝',
  eventbrite: '🎫',
  email: '✉️',
  couchsurfing: '🛋️',
};

const platformColors: Record<string, string> = {
  whatsapp: 'bg-green-500 hover:bg-green-600',
  line: 'bg-[#00C300] hover:bg-[#00A600]',
  facebook: 'bg-[#1877F2] hover:bg-[#166FE5]',
  instagram: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
  meetup: 'bg-[#ED1C40] hover:bg-[#D1193A]',
};

interface SocialJoinButtonsProps {
  compact?: boolean;
  className?: string;
}

export function SocialJoinButtons({ compact, className }: SocialJoinButtonsProps) {
  const channels = siteConfig.social;
  const primaryChannels = channels.filter((c) => c.primary);
  const otherChannels = channels.filter((c) => !c.primary);

  if (compact) {
    return (
      <div className={cn('space-y-2', className)}>
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>{platformIcons[channel.platform] || '🔗'}</span>
            <span>{channel.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Primary channels - prominent */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {primaryChannels.map((channel) => (
          <a
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-white font-medium rounded-lg transition-all text-sm',
              platformColors[channel.platform] || 'bg-brand-blue hover:bg-brand-blue-dark'
            )}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Join {channel.name}</span>
          </a>
        ))}
      </div>

      {/* Secondary channels */}
      {otherChannels.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {otherChannels.map((channel) => (
            <a
              key={channel.id}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-text-secondary border border-black/[0.08] rounded-lg hover:bg-surface-muted hover:text-text-primary transition-colors"
            >
              <span>{platformIcons[channel.platform] || '🔗'}</span>
              <span>{channel.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
