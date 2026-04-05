import { Hero } from '@/components/ui/Hero';
import { EventCard } from '@/components/ui/EventCard';
import { SocialJoinButtons } from '@/components/ui/SocialJoinButtons';
import { DonateWidget } from '@/components/ui/DonateWidget';
import { LocationBlock } from '@/components/ui/LocationBlock';
import { BlogCard } from '@/components/ui/BlogCard';
import { CTAStrip } from '@/components/ui/CTAStrip';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { getActiveUpcomingEvents } from '@/lib/events';
import { getRecentPosts } from '@/lib/blog';
import Link from 'next/link';

const firstVisitFAQ = [
  {
    question: 'What happens at a meditation session?',
    answer:
      'Each session begins with a brief introduction for newcomers, followed by sitting meditation with guided instruction. No prior experience is needed — just come as you are.',
  },
  {
    question: 'Is meditation instruction free?',
    answer:
      'Yes. Basic meditation instruction is always offered free of charge. Some special programs may suggest a donation to cover costs.',
  },
  {
    question: 'What language are sessions in?',
    answer: 'Sessions are held in English. Some facilitators may also speak Thai.',
  },
  {
    question: 'What should I bring?',
    answer:
      'Just yourself. We provide cushions and chairs. Wear comfortable clothing. Arrive a few minutes early if it is your first time.',
  },
  {
    question: 'Do I need to register?',
    answer:
      'No registration is required for regular weekly sessions. Some special workshops may ask for a simple RSVP.',
  },
  {
    question: "I've never meditated before — is that okay?",
    answer:
      'Absolutely. Our community welcomes complete beginners. We offer personal instruction at the start of every class.',
  },
];

export default async function HomePage() {
  const upcomingEvents = await getActiveUpcomingEvents(6);
  const recentPosts = getRecentPosts(3);

  return (
    <>
      {/* ─── Hero ─── */}
      <Hero
        subtitle="Shambhala Meditation Centre"
        title="Find stillness in the heart of Bangkok"
        description="An open meditation community in Sukhumvit. Weekly classes, workshops, and a warm space to practice mindfulness — all are welcome."
        ctaPrimary={{ label: 'See Upcoming Events', href: '/events' }}
        ctaSecondary={{ label: 'Join Our Community', href: '/community' }}
        ctaTertiary={{ label: 'Donate', href: '/donate' }}
      />

      {/* ─── Upcoming Events ─── */}
      <section className="section-padding bg-surface-soft" id="events">
        <div className="container-content">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Upcoming Events</h2>
              <p className="text-text-secondary mt-1">
                Join us for meditation, talks, and community gatherings.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden sm:inline-flex text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              View all events →
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-secondary">
              <p>No upcoming events right now. Join our community to stay updated!</p>
            </div>
          )}

          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/events"
              className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              View all events →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Start Here / First Visit ─── */}
      <section className="section-padding" id="start-here">
        <div className="container-content max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">First Time Here?</h2>
            <p className="text-text-secondary mt-2">
              Everything you need to know before your first visit.
            </p>
          </div>
          <FAQAccordion items={firstVisitFAQ} />
          <div className="mt-8 text-center">
            <Link
              href="/learn"
              className="inline-flex px-6 py-2.5 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
            >
              Learn More About Meditation
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Join the Community ─── */}
      <section className="section-padding bg-surface-soft" id="community">
        <div className="container-content max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Join the Community</h2>
          <p className="text-text-secondary mb-8">
            Connect with our meditation community. Get event updates, ask questions, and meet fellow
            practitioners.
          </p>
          <SocialJoinButtons />
        </div>
      </section>

      {/* ─── Donate ─── */}
      <section className="section-padding" id="donate">
        <div className="container-content">
          <DonateWidget />
        </div>
      </section>

      {/* ─── About the Centre ─── */}
      <section className="section-padding bg-surface-soft" id="about">
        <div className="container-content max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            About Bangkok Shambhala
          </h2>
          <div className="prose max-w-none text-center">
            <p>
              Bangkok Shambhala is part of a global network of meditation centres founded on the
              principle that every human being has a natural capacity for wisdom and compassion.
              Located in the Young Place building on Sukhumvit Soi 23, our centre offers a peaceful
              space for practice in the heart of the city.
            </p>
            <p>
              We offer weekly meditation sessions, introductory classes, special workshops, and a
              welcoming community for practitioners at all levels. Whether you are curious about
              meditation for the first time or looking to deepen your practice, you are welcome
              here.
            </p>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/about/shambhala"
              className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              Learn more about Shambhala →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Location ─── */}
      <section className="section-padding" id="location">
        <div className="container-content max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Find Us</h2>
          <LocationBlock />
        </div>
      </section>

      {/* ─── Blog / Latest News ─── */}
      {recentPosts.length > 0 && (
        <section className="section-padding bg-surface-soft" id="blog">
          <div className="container-content">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Latest News</h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                All posts →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Final CTA ─── */}
      <div className="container-content py-12">
        <CTAStrip
          title="Ready to start?"
          description="Join us for a meditation session this week."
          cta={{ label: 'View Events', href: '/events' }}
          variant="blue"
        />
      </div>
    </>
  );
}
