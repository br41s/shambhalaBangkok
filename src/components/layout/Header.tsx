'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { mainNav } from '@/lib/config';
import { cn } from '@/lib/utils';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/[0.06]">
      <div className="container-content flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <Image src="/images/logo.svg" alt="Bangkok Shambhala logo" width={36} height={36} priority />
          <span>Bangkok Shambhala</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md hover:bg-surface-muted"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="ml-2 px-4 py-2 text-sm font-medium bg-brand-yellow text-white rounded-lg hover:bg-brand-yellow-dark transition-colors"
          >
            Donate
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md hover:bg-surface-muted transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav
          className="md:hidden border-t border-black/[0.06] bg-white pb-4"
          aria-label="Mobile navigation"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="px-6 pt-3">
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className={cn(
                'block w-full text-center px-4 py-3 text-base font-medium',
                'bg-brand-yellow text-white rounded-lg hover:bg-brand-yellow-dark transition-colors'
              )}
            >
              Donate
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
