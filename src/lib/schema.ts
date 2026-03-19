import { siteConfig } from './config';
import type { SEvent, BlogPost, SEOMeta } from './types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    sameAs: siteConfig.social.map((s) => s.url),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#local-business`,
    name: siteConfig.location.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location.address,
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.location.lat,
      longitude: siteConfig.location.lng,
    },
    sameAs: siteConfig.social.map((s) => s.url),
  };
}

export function eventSchema(event: SEvent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.summary,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: event.status === 'cancelled'
      ? 'https://schema.org/EventCancelled'
      : 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      event.modality === 'online'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : event.modality === 'hybrid'
          ? 'https://schema.org/MixedEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
    location:
      event.modality === 'online'
        ? {
            '@type': 'VirtualLocation',
            url: event.videoCallUrl || event.registrationUrl,
          }
        : {
            '@type': 'Place',
            name: siteConfig.location.name,
            address: siteConfig.location.address,
          },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: event.image ? `${siteConfig.url}${event.image}` : undefined,
    offers: {
      '@type': 'Offer',
      price: event.pricing === 'free' ? '0' : event.price?.toString() || '0',
      priceCurrency: event.currency || 'THB',
      availability: 'https://schema.org/InStock',
    },
  };
}

export function blogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: post.image ? `${siteConfig.url}${post.image}` : undefined,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generatePageMeta(meta?: SEOMeta) {
  const title = meta?.title
    ? `${meta.title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const description = meta?.description || siteConfig.description;
  const ogImage = meta?.ogImage || '/og-default.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: meta?.canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: meta?.canonical,
    },
    robots: meta?.noIndex ? { index: false, follow: false } : undefined,
  };
}
