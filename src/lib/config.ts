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
    address: 'Young Place Building 3rd floor, Sukhumvit Soi 23, Khlong Toei Nuea, Watthana, Bangkok 10110',
    addressLocal: 'อาคาร Young Place ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110',
    city: 'Bangkok',
    country: 'Thailand',
    lat: 13.740387725210779,
    lng:  100.56560338252358,
    mapsUrl: 'https://www.google.com/maps/place/Bangkok+Shambhala+Meditation+Center/@13.7401916,100.5655548,19.31z/data=!4m15!1m8!3m7!1s0x30e29ec4cce9a9b3:0x34321bd455f6d9a8!2sBangkok+Shambhala+Meditation+Center!8m2!3d13.7403709!4d100.5656037!10e1!16s%2Fg%2F11bbx0p7kp!3m5!1s0x30e29ec4cce9a9b3:0x34321bd455f6d9a8!8m2!3d13.7403709!4d100.5656037!16s%2Fg%2F11bbx0p7kp?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D',
    directions:
      'Take the BTS to Asok station (exit 6) or take the MRT to Sukhumvit station (exit 2). From here proceed to the Interchange 21 building (via Skywalk if coming from BTS or on ground level if coming from MRT) and exit on the East side to Sukhumvit soi 23. Walk North along Sukhumvit Soi 23 for about 5 minutes then turn right across Whiskgars. Follow this road (there is a leftward bend) until you find the Young Place Building all the way at the end of the soi on the left-hand side.',
    transitInfo: 'BTS Asok (15 min walk) or MRT Sukhumvit (10 min walk)',
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
      id: 'bangkok-bank',
      label: 'Bangkok Bank (Local)',
      type: 'bank',
      url: '/donate/bank',
      instructions: 'Local transfer details are available on the bank details page.',
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
