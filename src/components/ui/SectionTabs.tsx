'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { BlogSection } from '@/lib/types';

interface SectionTab {
  key: BlogSection | 'blog';
  label: string;
}

const SECTIONS: SectionTab[] = [
  { key: 'blog', label: 'Blog' },
  { key: 'shambhala-vision', label: 'Shambhala Vision' },
  { key: 'what-we-offer', label: 'What We Offer' },
  { key: 'bibliography', label: 'Bibliography' },
  { key: 'resources', label: 'Resources' },
  { key: 'membership', label: 'Membership' },
];

export function SectionTabs() {
  const searchParams = useSearchParams();
  const active = searchParams.get('section') ?? 'blog';

  return (
    <div className="flex flex-wrap gap-2">
      {SECTIONS.map((tab) => {
        const isActive = active === tab.key;
        const href = tab.key === 'blog' ? '/blog' : `/blog?section=${tab.key}`;

        return (
          <Link
            key={tab.key}
            href={href}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
              isActive
                ? 'bg-brand-blue text-white'
                : 'bg-surface-muted text-text-secondary hover:bg-black/[0.08] hover:text-text-primary'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
