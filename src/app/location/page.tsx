import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LocationBlock } from '@/components/ui/LocationBlock';
import { CTAStrip } from '@/components/ui/CTAStrip';

export const metadata: Metadata = {
  title: 'Location',
  description:
    'Find Bangkok Shambhala at Young Place Building, Sukhumvit Soi 23. Near BTS Asoke / MRT Sukhumvit.',
};

export default function LocationPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Location', href: '/location' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">How to Find Us</h1>
      <p className="text-lg text-text-secondary mb-12">
        We are located in the Young Place building on Sukhumvit Soi 23,
        just a short walk from BTS Asoke and MRT Sukhumvit stations.
      </p>

      <LocationBlock showMap />

      <div className="mt-12">
        <CTAStrip
          title="Plan your first visit"
          description="Everything you need to know before coming."
          cta={{ label: 'First Visit Guide', href: '/learn' }}
          variant="subtle"
        />
      </div>
    </div>
  );
}
