import { getUpcomingEvents } from '@/lib/events';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const upcomingEvents = getUpcomingEvents(5);
  const recentPosts = getAllPosts().slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-text-secondary text-sm">Overview of your site content and activity.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Events', value: upcomingEvents.length, href: '/admin/events' },
          { label: 'Published Posts', value: recentPosts.length, href: '/admin/posts' },
          { label: 'Calendar Feed', value: 'Active', href: '/api/calendar/feed.ics' },
          { label: 'Newsletter', value: 'Configured', href: '#' },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-black/[0.06] p-5 hover:shadow-sm transition-shadow"
          >
            <p className="text-sm text-text-tertiary mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-black/[0.06] p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/events"
            className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
          >
            + New Event
          </Link>
          <Link
            href="/admin/posts"
            className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
          >
            + New Post
          </Link>
          <a
            href="/api/calendar/feed.ics"
            className="px-4 py-2 text-sm font-medium border border-black/[0.10] rounded-lg hover:bg-surface-muted transition-colors"
          >
            📅 Download Calendar
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-black/[0.06] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Upcoming Events</h2>
            <Link href="/admin/events" className="text-sm text-brand-blue hover:text-brand-blue-dark">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.slug} className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-text-tertiary">{formatDate(event.startDate)}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    event.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {event.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-tertiary">No upcoming events.</p>
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-black/[0.06] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Posts</h2>
            <Link href="/admin/posts" className="text-sm text-brand-blue hover:text-brand-blue-dark">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div key={post.slug} className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0">
                  <div>
                    <p className="font-medium text-sm">{post.title}</p>
                    <p className="text-xs text-text-tertiary">{formatDate(post.date)}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                    published
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-tertiary">No posts yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Editing Note */}
      <div className="bg-brand-blue/5 rounded-xl p-6">
        <h2 className="font-semibold mb-2">How to Edit Content</h2>
        <div className="text-sm text-text-secondary space-y-2">
          <p>
            Content is managed through Markdown files in the <code className="text-xs bg-white px-1.5 py-0.5 rounded">content/</code> directory.
            Each event and blog post is a <code className="text-xs bg-white px-1.5 py-0.5 rounded">.md</code> file with frontmatter metadata.
          </p>
          <p>
            <strong>Events:</strong> <code className="text-xs bg-white px-1.5 py-0.5 rounded">content/events/</code> —
            <strong> Posts:</strong> <code className="text-xs bg-white px-1.5 py-0.5 rounded">content/blog/</code> —
            <strong> Pages:</strong> <code className="text-xs bg-white px-1.5 py-0.5 rounded">content/pages/</code>
          </p>
          <p>
            For a visual editor, configure <strong>Decap CMS</strong> or <strong>TinaCMS</strong> following
            the instructions in <code className="text-xs bg-white px-1.5 py-0.5 rounded">docs/EDITORIAL.md</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
