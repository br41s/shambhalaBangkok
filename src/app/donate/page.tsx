import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DonateWidget } from '@/components/ui/DonateWidget';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support Bangkok Shambhala with a donation. Thai QR / PromptPay and international transfers available.',
};

export default function DonatePage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Donate', href: '/donate' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Our Community</h1>
      <p className="text-lg text-text-secondary mb-12">
        Bangkok Shambhala is a non-profit community that depends on the generosity
        of its members and friends. Every donation helps keep our meditation space
        open and accessible to all.
      </p>

      <DonateWidget />

      {/* Where donations go */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Where Your Donation Goes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Space & Rent',
              desc: 'Maintaining our meditation room in the heart of Bangkok.',
              icon: '🏠',
            },
            {
              title: 'Programs',
              desc: 'Supporting free meditation instruction and community events.',
              icon: '🧘',
            },
            {
              title: 'Community',
              desc: 'Keeping our doors open for everyone, regardless of ability to pay.',
              icon: '🤝',
            },
          ].map((item) => (
            <div key={item.title} className="text-center p-6 bg-surface-soft rounded-xl">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Thank you */}
      <section className="mt-16 text-center">
        <p className="text-text-secondary">
          Thank you for supporting our community. If you have questions about donations,
          please{' '}
          <a href="/contact" className="text-brand-blue hover:text-brand-blue-dark transition-colors">
            contact us
          </a>
          .
        </p>
      </section>
    </div>
  );
}
