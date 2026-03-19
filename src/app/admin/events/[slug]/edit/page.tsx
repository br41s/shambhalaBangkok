import { notFound } from 'next/navigation';
import { requireAuth } from '@/lib/auth';
import { getContentBySlug } from '@/lib/content';
import { EventForm } from '@/components/admin/EventForm';
import type { SEvent } from '@/lib/types';

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function EditEventPage({ params }: Params) {
  await requireAuth();
  const { slug } = await params;
  const result = getContentBySlug<SEvent>('events', slug);
  if (!result) notFound();

  const { data, content } = result;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-sm text-gray-500">Editing: {data.title}</p>
      </div>
      <EventForm
        initial={{
          title: data.title || '',
          slug,
          summary: data.summary || '',
          startDate: data.startDate?.slice(0, 16) || '',
          endDate: data.endDate?.slice(0, 16) || '',
          location: data.location || '',
          modality: data.modality || 'in-person',
          registrationUrl: data.registrationUrl || '',
          facilitator: data.facilitator || '',
          pricing: data.pricing || 'free',
          price: data.price,
          suggestedDonation: data.suggestedDonation,
          currency: data.currency || 'THB',
          capacity: data.capacity,
          tags: data.tags?.join(', ') || '',
          image: data.image || '',
          status: data.status || 'draft',
          body: content,
        }}
      />
    </div>
  );
}
