import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Shambhala Vision',
  description: 'The Shambhala vision: creating an enlightened society based on the principle of basic goodness.',
};

export default function VisionPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: 'About', href: '/about' },
          { label: 'Vision', href: '/about/vision' },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Shambhala Vision</h1>

      <div className="prose max-w-none">
        <p>
          The Shambhala vision is rooted in the principle that there is a natural source of
          goodness and wisdom within every human being. When we connect with this basic
          goodness through meditation and contemplative practice, we can extend it into our
          relationships, communities, and society.
        </p>
        <br />
        <h2>Basic Goodness</h2>
        <p>
          Rather than viewing human nature as fundamentally flawed, the Shambhala tradition
          starts from the premise that our deepest nature is good, awake, and capable of
          tremendous compassion and clarity.
        </p>
        <br />
        <h2>Enlightened Society</h2>
        <p>
          The idea of an enlightened society is not about perfection, but about communities
          of people committed to waking up, being kind, and working together skillfully.
          It begins with individual practice and extends naturally into how we live and
          relate to others.
        </p>
      </div>
    </div>
  );
}
