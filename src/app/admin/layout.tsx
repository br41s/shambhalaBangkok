import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { isAuthenticated } from '@/lib/auth';
import { LayoutDashboard, Calendar, FileText, Settings } from 'lucide-react';
import { LogoutButton } from '@/components/admin/LogoutButton';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen bg-gray-50">
      {authed && (
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="flex items-center gap-2 font-semibold text-gray-900">
                <Image src="/images/logo-sun.png" alt="" width={24} height={24} />
                Admin
              </Link>
              <div className="flex items-center gap-1">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  href="/admin/events"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Events
                </Link>
                <Link
                  href="/admin/posts"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FileText className="w-4 h-4" /> Posts
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">
                View Site
              </Link>
              <LogoutButton />
            </div>
          </div>
        </nav>
      )}
      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
