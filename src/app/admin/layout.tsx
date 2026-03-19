import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-soft">
      <header className="bg-white border-b border-black/[0.06] px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-brand-blue font-bold text-lg">◈</span>
            <span className="font-semibold">Admin Panel</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/admin" className="text-text-secondary hover:text-text-primary transition-colors">
              Dashboard
            </a>
            <a href="/admin/events" className="text-text-secondary hover:text-text-primary transition-colors">
              Events
            </a>
            <a href="/admin/posts" className="text-text-secondary hover:text-text-primary transition-colors">
              Posts
            </a>
            <a href="/admin/pages" className="text-text-secondary hover:text-text-primary transition-colors">
              Pages
            </a>
            <a href="/" className="text-brand-blue hover:text-brand-blue-dark transition-colors">
              ← View Site
            </a>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
