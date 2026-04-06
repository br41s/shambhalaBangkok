import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, footerNav } from '@/lib/config';
import { SocialJoinButtons } from '@/components/ui/SocialJoinButtons';
import { NewsletterForm } from '@/components/ui/NewsletterForm';

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-surface-soft">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-sun.png"
                alt="Bangkok Shambhala logo"
                width={28}
                height={28}
              />
              <Image
                src="/images/text-logo-footer.png"
                alt="Shambhala"
                width={142}
                height={20}
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {siteConfig.description}
            </p>
            <p className="text-sm text-text-tertiary">{siteConfig.location.address}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Join Us</h3>
            <SocialJoinButtons compact />
            <div className="mt-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-brand-blue hover:text-brand-blue-dark transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Stay Updated</h3>
            <p className="text-sm text-text-secondary mb-3">
              Receive occasional updates about events and activities.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} {siteConfig.name}. Non-profit organization.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/code-of-conduct"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Code of Conduct
            </Link>
            <Link
              href="/admin/login"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
