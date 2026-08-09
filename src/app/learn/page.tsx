import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTAStrip } from '@/components/ui/CTAStrip';

export const metadata: Metadata = {
  title: 'Learn Meditation',
  description:
    'Learn meditation at Bangkok Shambhala. Free instruction for beginners, weekly classes, and guided practice in Sukhumvit.',
};

const meditationFAQ = [
  {
    question: 'What style of meditation do you practice?',
    answer:
      'We practice Shamatha (calm-abiding) meditation in the Shambhala tradition, focusing on our breathing while keeping good posture and letting go of thoughts. It is a simple, secular approach to mindfulness that anyone can practice regardless of background or beliefs.',
  },
  {
    question: 'How long is a typical session?',
    answer:
      'Our regular Sunday drop-in sessions are 1 hour of sitting and walking meditation, with an extended 3 hour session every last Sunday of the month. Our Café Shambhala sessions on Wednesday evenings are 1.5 hours including meditation, reading and group discussion.',
  },
  {
    question: 'Do I need experience?',
    answer:
      'No experience is needed. We offer personal instruction to beginners at the start of every session. Just arrive a few minutes early and let us know it is your first time.',
  },
  {
    question: 'Are there advanced programs?',
    answer:
      'Yes. Beyond our regular sessions, we offer a variety of programs including Dharma talks by visiting teachers, yoga classes and advance multi-week courses like our "In Everday Life" series.',
  },
  {
    question: 'Is there a cost?',
    answer:
      'Because our center is a non-profit organization run by volunteers our regular sessions are donation based with a suggested amount of 150 Thai Baht. Some special programs may have a higher suggested donation or fee to cover costs, but no one is ever turned away for financial reasons.',
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
            Meditation instruction at Bangkok Shambhala is available to anyone. At the start of
            each session, we offer a brief introduction for newcomers. You will receive
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
              <p className="text-lg font-bold">18:30–20:00</p>
            </div>
            <div>
              <h3 className="font-semibold">Café Shambhala</h3>
              <p className="text-sm text-text-secondary">
                Sitting meditation followed by book reading and discussion and social time afterwards. Café Shambhala is suitable for anyone curious about meditation, Buddhism and meeting fellow practitioners.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-surface-soft rounded-xl">
            <div className="text-center shrink-0 w-16">
              <p className="text-sm font-semibold text-brand-blue">SUN</p>
              <p className="text-lg font-bold">14:00–15:00</p>
            </div>
            <div>
              <h3 className="font-semibold">Sunday Meditation</h3>
              <p className="text-sm text-text-secondary">
                One full hour of sitting and walking meditation followed by social time with refreshments afterwards. The weekly Sunday afternoon drop-in meditation is for those who want to meditate in a supportive group setting. Every last Sunday of the month there is an extended 3 hour session from 2 - 5 PM.
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
