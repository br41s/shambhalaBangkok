import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Shambhala',
  description: 'Learn about Shambhala — a global community dedicated to meditation and creating an enlightened society.',
};

export default function AboutShambhalaPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: 'About', href: '/about' },
          { label: 'About Shambhala', href: '/about/shambhala' },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Shambhala</h1>

      <div className="prose max-w-none">
        <p>
          Shambhala is an international community of people inspired by the principle that
          every human being has a fundamental nature of goodness, warmth, and intelligence.
          This nature can be cultivated through the practice of meditation and brought into
          the activities of everyday life.
        </p>
        <p>
          Founded by Chögyam Trungpa Rinpoche and continued by Sakyong Mipham Rinpoche,
          Shambhala draws on the Buddhist tradition of meditation while being accessible to
          people of any belief system or background.
        </p>
        <h2>A Global Network</h2>
        <p>
          With over 200 centres and groups worldwide, Shambhala offers a path of meditation
          and contemplative practice that is relevant to modern life. Each centre adapts to
          its local community while sharing a common commitment to meditation, leadership,
          and the creation of a more compassionate society.
        </p>
        <h2>In Bangkok</h2>
        <p>
          The Bangkok centre is part of this global family, offering a warm and accessible
          space for practice in one of Asia&apos;s most vibrant cities. We welcome locals,
          expats, travelers, and anyone curious about meditation.
        </p>
      </div>
    </div>
  );
}
