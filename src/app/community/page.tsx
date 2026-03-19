import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SocialJoinButtons } from '@/components/ui/SocialJoinButtons';
import { CTAStrip } from '@/components/ui/CTAStrip';

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Join the Bangkok Shambhala community. Connect via WhatsApp, LINE, Facebook, and Instagram.',
};

export default function CommunityPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Community', href: '/community' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Join the Community</h1>
      <p className="text-lg text-text-secondary mb-12">
        Bangkok Shambhala is more than a meditation centre — it is a community of people
        exploring mindfulness, compassion, and genuine connection. Here is how to stay
        connected.
      </p>

      {/* Channels */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <SocialJoinButtons />
      </section>

      {/* What the community offers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What You Will Find</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: 'Event Updates',
              desc: 'Be the first to know about meditation sessions, workshops, and special programs.',
            },
            {
              title: 'Practice Support',
              desc: 'Ask questions, share experiences, and learn from fellow practitioners.',
            },
            {
              title: 'Local Meetups',
              desc: 'Informal gatherings, potlucks, and social events beyond the meditation cushion.',
            },
            {
              title: 'Resources',
              desc: 'Access guided meditations, reading recommendations, and practice tips.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 border border-black/[0.06] rounded-xl"
            >
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTAStrip
        title="New to meditation?"
        description="Start here to learn what to expect at your first session."
        cta={{ label: 'First Visit Guide', href: '/learn' }}
        variant="subtle"
      />
    </div>
  );
}
