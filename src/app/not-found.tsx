import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-content py-20 text-center">
      <h1 className="text-6xl font-bold text-text-tertiary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-text-secondary mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 bg-brand-blue text-white font-medium rounded-lg hover:bg-brand-blue-dark transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/events"
          className="px-6 py-2.5 border border-black/[0.12] text-text-primary font-medium rounded-lg hover:bg-surface-muted transition-colors"
        >
          View Events
        </Link>
      </div>
    </div>
  );
}
