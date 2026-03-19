import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Global Shambhala resources, reading materials, and external links.',
};

export default function ResourcesPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Resources', href: '/resources' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Resources</h1>
      <p className="text-lg text-text-secondary mb-12">
        External resources, reading recommendations, and links to the global Shambhala community.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Shambhala Global</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://shambhala.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                Shambhala International →
              </a>
              <p className="text-sm text-text-secondary mt-0.5">The global Shambhala community website.</p>
            </li>
            <li>
              <a
                href="https://shambhala.org/centres"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                Find a Centre Near You →
              </a>
              <p className="text-sm text-text-secondary mt-0.5">Shambhala centres and groups worldwide.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Recommended Reading</h2>
          <ul className="space-y-3">
            <li>
              <p className="font-medium">Shambhala: The Sacred Path of the Warrior</p>
              <p className="text-sm text-text-secondary">by Chögyam Trungpa Rinpoche — A foundational text.</p>
            </li>
            <li>
              <p className="font-medium">Turning the Mind Into an Ally</p>
              <p className="text-sm text-text-secondary">by Sakyong Mipham Rinpoche — A practical meditation guide.</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
