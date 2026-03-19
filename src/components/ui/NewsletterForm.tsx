'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3">
        Thank you! You&apos;ll receive our next update.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', className)}>
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
        aria-hidden="true"
      />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 min-w-0 px-3 py-2 text-sm border border-black/[0.10] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-colors"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 text-sm font-medium bg-brand-blue text-white rounded-lg hover:bg-brand-blue-dark disabled:opacity-50 transition-colors shrink-0"
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600 mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
