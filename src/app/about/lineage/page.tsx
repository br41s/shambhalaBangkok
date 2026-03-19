import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Lineage',
  description: 'The teachers and lineage behind the Shambhala meditation tradition.',
};

export default function LineagePage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: 'About', href: '/about' },
          { label: 'Lineage', href: '/about/lineage' },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-6">Lineage & Teachers</h1>

      <div className="prose max-w-none">
        <p>
          The Shambhala tradition draws on centuries of Buddhist contemplative wisdom,
          adapted for the modern world by a lineage of remarkable teachers.
        </p>
        <h2>Chögyam Trungpa Rinpoche</h2>
        <p>
          Chögyam Trungpa Rinpoche (1939–1987) was a Tibetan Buddhist meditation master,
          scholar, and artist who founded the Shambhala community. He was among the first
          Tibetan teachers to present Buddhism in a way that was fully accessible to Western
          students, while preserving the depth and integrity of the tradition.
        </p>
        <h2>Sakyong Mipham Rinpoche</h2>
        <p>
          Sakyong Mipham Rinpoche is the current head of the Shambhala lineage. He has
          authored several books on meditation and leads the global Shambhala community
          in its mission of creating enlightened society.
        </p>
        <h2>A Living Tradition</h2>
        <p>
          The teachings offered at Shambhala Bangkok are rooted in this lineage and adapted
          to our local context. Whether ancient or contemporary, the core message remains
          the same: we all have the capacity to wake up and live with greater awareness,
          kindness, and purpose.
        </p>
      </div>
    </div>
  );
}
