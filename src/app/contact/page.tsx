import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LocationBlock } from '@/components/ui/LocationBlock';
import { SocialJoinButtons } from '@/components/ui/SocialJoinButtons';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Shambhala Bangkok. Email, location, and social media links.',
};

export default function ContactPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />

      <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-text-secondary mb-12">
        We would love to hear from you. Reach us by email or through our community channels.
      </p>

      {/* Email */}
      <section className="mb-12">
        <div className="flex items-center gap-3 p-6 bg-surface-soft rounded-xl">
          <Mail className="w-6 h-6 text-brand-blue shrink-0" />
          <div>
            <h2 className="font-semibold">Email</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-brand-blue hover:text-brand-blue-dark transition-colors"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Community Channels</h2>
        <SocialJoinButtons />
      </section>

      {/* Location */}
      <section>
        <h2 className="text-xl font-bold mb-4">Our Location</h2>
        <LocationBlock showMap compact />
      </section>
    </div>
  );
}
