import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTAStrip } from '@/components/ui/CTAStrip';

export const metadata: Metadata = {
  title: 'Learn Meditation',
  description:
    'Learn meditation at Shambhala Bangkok. Free instruction for beginners, weekly classes, and guided practice in Sukhumvit.',
};

const meditationFAQ = [
  {
    question: 'What style of meditation do you teach?',
    answer:
      'We teach shamatha (calm-abiding) meditation in the Shambhala tradition. It is a simple, secular approach to mindfulness that anyone can practice regardless of background or beliefs.',
  },
  {
    question: 'How long is a typical session?',
    answer:
      'A typical weekly session is about 1 to 1.5 hours. This includes instruction, sitting meditation, walking meditation, and time for questions.',
  },
  {
    question: 'Do I need experience?',
    answer:
      'No experience is needed. We offer personal instruction to beginners at the start of every weekly session. Just arrive a few minutes early and let us know it is your first time.',
  },
  {
    question: 'Are there advanced programs?',
    answer:
      'Yes. Beyond introductory classes, we offer progressive programs including weekend workshops, retreats, and study groups for committed practitioners.',
  },
  {
    question: 'Is there a cost?',
    answer:
      'Basic meditation instruction is always free. Some special programs may have a suggested donation or fee to cover costs, but no one is ever turned away for financial reasons.',
  },
];

export default function LearnPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Learn', href: '/learn' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn Meditation</h1>
      <p className="text-lg text-text-secondary mb-12">
        Whether you have never meditated before or want to deepen your practice,
        our community offers a welcoming space to learn and grow.
      </p>

      {/* What to expect */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What to Expect</h2>
        <div className="prose max-w-none">
          <p>
            Meditation instruction at Shambhala Bangkok is available to anyone. At the start of
            each weekly session, we offer a brief introduction for newcomers. You will receive
            personal guidance on posture, breathing, and the basic technique of mindfulness meditation.
          </p>
          <p>
            Our approach is practical, non-dogmatic, and grounded in a tradition that has been
            taught for centuries. We believe that every person has an inherent capacity for awareness,
            gentleness, and wisdom — meditation is simply a way to reconnect with those qualities.
          </p>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Weekly Schedule</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-surface-soft rounded-xl">
            <div className="text-center shrink-0 w-16">
              <p className="text-sm font-semibold text-brand-blue">WED</p>
              <p className="text-lg font-bold">19:00</p>
            </div>
            <div>
              <h3 className="font-semibold">Wednesday Evening Meditation</h3>
              <p className="text-sm text-text-secondary">
                Open sitting with instruction for newcomers. All levels welcome.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-surface-soft rounded-xl">
            <div className="text-center shrink-0 w-16">
              <p className="text-sm font-semibold text-brand-blue">SUN</p>
              <p className="text-lg font-bold">10:00</p>
            </div>
            <div>
              <h3 className="font-semibold">Sunday Morning Practice</h3>
              <p className="text-sm text-text-secondary">
                Extended sitting practice followed by a short talk or discussion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <FAQAccordion items={meditationFAQ} />
      </section>

      {/* CTA */}
      <CTAStrip
        title="Ready to try meditation?"
        description="Check our upcoming events and find a session that works for you."
        cta={{ label: 'View Events', href: '/events' }}
        variant="blue"
      />
    </div>
  );
}
