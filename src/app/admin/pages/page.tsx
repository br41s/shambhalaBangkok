export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pages</h1>
        <p className="text-sm text-text-secondary">Manage static pages via content/pages/ or inline in src/app/</p>
      </div>

      <div className="bg-white rounded-xl border border-black/[0.06] p-6">
        <h2 className="font-semibold mb-4">Static Pages</h2>
        <div className="space-y-2 text-sm">
          {[
            { name: 'Home', path: '/' },
            { name: 'Learn / Meditation', path: '/learn' },
            { name: 'Community', path: '/community' },
            { name: 'Donate', path: '/donate' },
            { name: 'Location', path: '/location' },
            { name: 'About', path: '/about' },
            { name: 'About Shambhala', path: '/about/shambhala' },
            { name: 'Vision', path: '/about/vision' },
            { name: 'Lineage', path: '/about/lineage' },
            { name: 'Resources', path: '/resources' },
            { name: 'Contact', path: '/contact' },
            { name: 'Privacy', path: '/privacy' },
            { name: 'Terms', path: '/terms' },
            { name: 'Code of Conduct', path: '/code-of-conduct' },
          ].map((page) => (
            <div key={page.path} className="flex items-center justify-between py-2 border-b border-black/[0.04] last:border-0">
              <span className="font-medium">{page.name}</span>
              <a href={page.path} className="text-brand-blue hover:text-brand-blue-dark transition-colors text-xs">
                View →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-blue/5 rounded-xl p-6">
        <h2 className="font-semibold mb-2">Editing Pages</h2>
        <p className="text-sm text-text-secondary">
          Static pages are defined as React components in <code className="text-xs bg-white px-1.5 py-0.5 rounded">src/app/</code>.
          For content-driven pages, create Markdown files in <code className="text-xs bg-white px-1.5 py-0.5 rounded">content/pages/</code>
          and they will be rendered automatically. Configure a Git-based CMS like Decap CMS
          for visual editing — see <code className="text-xs bg-white px-1.5 py-0.5 rounded">docs/EDITORIAL.md</code>.
        </p>
      </div>
    </div>
  );
}
