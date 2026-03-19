import { getAllEvents } from '@/lib/events';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminEventsPage() {
  const events = getAllEvents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm text-text-secondary">Manage events via Markdown files in content/events/</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/calendar/feed.ics"
            className="px-4 py-2 text-sm font-medium border border-black/[0.10] rounded-lg hover:bg-surface-muted transition-colors"
          >
            📅 ICS Feed
          </a>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/[0.06] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft border-b border-black/[0.06]">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-text-secondary">Title</th>
              <th className="text-left px-4 py-3 font-medium text-text-secondary">Date</th>
              <th className="text-left px-4 py-3 font-medium text-text-secondary">Modality</th>
              <th className="text-left px-4 py-3 font-medium text-text-secondary">Status</th>
              <th className="text-left px-4 py-3 font-medium text-text-secondary">Pricing</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {events.map((event) => (
              <tr key={event.slug} className="hover:bg-surface-soft/50">
                <td className="px-4 py-3">
                  <Link href={`/events/${event.slug}`} className="font-medium hover:text-brand-blue transition-colors">
                    {event.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-text-secondary">{formatDate(event.startDate)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                    event.modality === 'in-person' ? 'bg-green-50 text-green-700' :
                    event.modality === 'online' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {event.modality}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                    event.status === 'published' ? 'bg-green-50 text-green-700' :
                    event.status === 'draft' ? 'bg-yellow-50 text-yellow-700' :
                    event.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary capitalize">{event.pricing}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/events/${event.slug}`} className="text-brand-blue hover:text-brand-blue-dark transition-colors text-xs">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="px-4 py-8 text-center text-text-tertiary">
            No events found. Create a .md file in content/events/ to add one.
          </div>
        )}
      </div>
    </div>
  );
}
