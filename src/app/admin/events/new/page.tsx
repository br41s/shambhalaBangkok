import { requireAuth } from '@/lib/auth';
import { EventForm } from '@/components/admin/EventForm';

export default async function NewEventPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Event</h1>
        <p className="text-sm text-gray-500">Create a new event. It will be saved to GitHub and the site will rebuild.</p>
      </div>
      <EventForm />
    </div>
  );
}
