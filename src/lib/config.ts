import type { SiteConfig, NavItem } from './types';

export const siteConfig: SiteConfig = {
  name: 'Bangkok Shambhala',
  tagline: 'Meditation & Mindfulness in the Heart of Bangkok',
  description:
    'Bangkok Shambhala is an open meditation community in Sukhumvit, Bangkok. Weekly meditation classes, workshops, and retreats for beginners and experienced practitioners.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://shambhala-bangkok.org',
  locale: 'en',
  email: 'bangkok@shambhala.info',
  location: {
    name: 'Shambhala Meditation Centre Bangkok',
    address: 'Young Place Building, Sukhumvit Soi 23, Khlong Toei Nuea, Watthana, Bangkok 10110',
    addressLocal: 'อาคาร Young Place ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110',
    city: 'Bangkok',
    country: 'Thailand',
    lat: 13.738,
    lng: 100.5658,
    mapsUrl: 'https://maps.app.goo.gl/61vn5zwuLWJUp1367',
    directions:
      'Take BTS to Asoke station or MRT to Sukhumvit station. Walk south along Sukhumvit Soi 23 for about 5 minutes. Young Place Building is on the right side.',
    transitInfo: 'BTS Asoke / MRT Sukhumvit — 5 min walk',
  },
  social: [
    {
      id: 'whatsapp',
      name: 'WhatsApp Group',
      platform: 'whatsapp',
      url: 'https://chat.whatsapp.com/HNxYaYRiXgHL6oxh6FmIR3',
      primary: true,
    },
    {
      id: 'line',
      name: 'LINE Group',
      platform: 'line',
      url: '#',
      primary: true,
      disabled: true,
      disabledLabel: 'Coming soon',
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      platform: 'facebook',
      url: 'https://www.facebook.com/ShambhalaBangkok',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      platform: 'instagram',
      url: 'https://www.instagram.com/bangkokshambhala',
    },
    {
      id: 'meetup',
      name: 'Meetup',
      platform: 'meetup',
      url: 'https://meetup.com/bangkok-shambhala-meditation-group',
    },
  ],
  donationMethods: [
    {
      id: 'thai-qr',
      label: 'PromptPay / Thai QR',
      type: 'qr',
      country: 'TH',
      qrImage: '/images/donation-qr-thai.png',
      instructions: 'Scan with any Thai banking app to donate instantly.',
    },
    {
      id: 'wise',
      label: 'Wise (International)',
      type: 'link',
      url: 'https://wise.com/pay/shambhala-bangkok',
      instructions: 'Send an international transfer with low fees via Wise.',
    },
  ],
  newsletter: {
    provider: 'brevo',
    formAction: '/api/newsletter',
  },
  analytics: {
    plausibleDomain: 'shambhala-bangkok.org',
  },
};

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Learn', href: '/learn' },
  { label: 'Community', href: '/community' },
  { label: 'Donate', href: '/donate' },
  { label: 'Location', href: '/location' },
  { label: 'Blog', href: '/blog' },
];

export const footerNav: NavItem[] = [
  { label: 'About Shambhala', href: '/about/shambhala' },
  { label: 'Vision', href: '/about/vision' },
  { label: 'Lineage', href: '/about/lineage' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
  { label: 'Code of Conduct', href: '/code-of-conduct' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];
