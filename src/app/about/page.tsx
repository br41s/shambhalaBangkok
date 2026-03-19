import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTAStrip } from '@/components/ui/CTAStrip';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Bangkok Shambhala — a meditation community in the heart of Bangkok.',
};

export default function AboutPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">About Bangkok Shambhala</h1>

      <div className="prose max-w-none mb-12">
        <p>
          Bangkok Shambhala is a meditation community located in the Young Place building
          on Sukhumvit Soi 23, in the heart of Bangkok. We are part of Shambhala, a global
          network of meditation centres and groups dedicated to the principle that every
          human being has a fundamental nature of goodness, warmth, and intelligence.
        </p>
        <p>
          Our centre offers weekly meditation sessions, introductory instruction for
          beginners, workshops, retreats, and a welcoming community for practitioners
          at every level. We believe meditation is for everyone — regardless of background,
          experience, or belief system.
        </p>
        <p>
          As a non-profit community, we are sustained by the generosity of our members and
          friends. Basic meditation instruction is always offered free of charge, and special
          programs operate on a donation or sliding-scale basis whenever possible.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <Link
          href="/about/shambhala"
          className="block p-5 border border-black/[0.06] rounded-xl hover:border-brand-blue/20 hover:bg-brand-blue/[0.02] transition-colors"
        >
          <h3 className="font-semibold mb-1">About Shambhala</h3>
          <p className="text-sm text-text-secondary">The global community and its mission.</p>
        </Link>
        <Link
          href="/about/vision"
          className="block p-5 border border-black/[0.06] rounded-xl hover:border-brand-blue/20 hover:bg-brand-blue/[0.02] transition-colors"
        >
          <h3 className="font-semibold mb-1">Vision</h3>
          <p className="text-sm text-text-secondary">Creating an enlightened society.</p>
        </Link>
        <Link
          href="/about/lineage"
          className="block p-5 border border-black/[0.06] rounded-xl hover:border-brand-blue/20 hover:bg-brand-blue/[0.02] transition-colors"
        >
          <h3 className="font-semibold mb-1">Lineage</h3>
          <p className="text-sm text-text-secondary">The teachers and tradition behind the practice.</p>
        </Link>
      </div>

      <CTAStrip
        title="Want to visit?"
        description="See what to expect at your first meditation session."
        cta={{ label: 'Learn More', href: '/learn' }}
        variant="blue"
      />
    </div>
  );
}
