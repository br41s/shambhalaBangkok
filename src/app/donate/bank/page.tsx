import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Bangkok Bank Details',
  description: 'Local Bangkok Bank donation details for Bangkok Shambhala Association.',
};

export default function BankDetailsPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs
        items={[
          { label: 'Donate', href: '/donate' },
          { label: 'Bangkok Bank', href: '/donate/bank' },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Bangkok Bank Donation Details</h1>
      <p className="text-lg text-text-secondary mb-8">
        Support the Bangkok Shambhala Association with a local bank transfer. The details below are
        for the official association account at Bangkok Bank.
      </p>

      <div className="bg-white border border-black/[0.06] rounded-3xl p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-sm text-text-secondary uppercase tracking-[0.2em] mb-2">
            Account holder
          </p>
          <p className="text-xl font-semibold">Shambhala Mandala Association</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <div className="rounded-2xl bg-surface-soft p-5">
            <p className="text-sm text-text-secondary uppercase tracking-[0.2em] mb-2">Bank</p>
            <p className="text-lg font-semibold">Bangkok Bank</p>
          </div>
          <div className="rounded-2xl bg-surface-soft p-5">
            <p className="text-sm text-text-secondary uppercase tracking-[0.2em] mb-2">
              SWIFT / BIC
            </p>
            <p className="text-lg font-semibold">BKKBTHBKXXX</p>
          </div>
        </div>

        <div className="rounded-2xl bg-surface-soft p-5 mb-6">
          <p className="text-sm text-text-secondary uppercase tracking-[0.2em] mb-2">
            Account Number
          </p>
          <p className="text-2xl font-semibold tracking-tight">1183273182</p>
        </div>

        <div className="rounded-2xl bg-surface-soft p-5 mb-6">
          <p className="text-sm text-text-secondary uppercase tracking-[0.2em] mb-2">Notes</p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-text-secondary">
            <li>Use this account for local transfers in Thailand.</li>
            <li>If sending from overseas, please include the SWIFT/BIC code.</li>
            <li>Enter a clear transfer description so we can credit your donation correctly.</li>
          </ul>
        </div>

        <div className="text-center">
          <Link
            href="/donate"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark transition-colors"
          >
            Back to donation options
          </Link>
        </div>
      </div>
    </div>
  );
}
