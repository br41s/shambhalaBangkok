import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Bangkok Shambhala website.',
};

export default function PrivacyPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p><em>Last updated: March 2026</em></p>
        <br />
        <h2>Who We Are</h2>
        <p>
          Bangkok Shambhala is a non-profit meditation community located in Bangkok, Thailand.
          This policy describes how we collect, use, and protect your information when you
          visit our website.
        </p>
        <br />
        <h2>What We Collect</h2>
        <p>We collect minimal personal data:</p>
        <ul>
          <li><strong>Newsletter subscriptions:</strong> Your email address, if you choose to subscribe.</li>
          <li><strong>Contact forms:</strong> Name and email when you send us a message.</li>
          <li><strong>Analytics:</strong> Anonymous usage data (page views, referrer) via privacy-friendly analytics. No cookies are used for tracking.</li>
        </ul>
        <br />
        <h2>How We Use Your Data</h2>
        <ul>
          <li>To send you newsletter updates (only if you subscribe).</li>
          <li>To respond to your contact messages.</li>
          <li>To understand how our website is used and improve it.</li>
        </ul>
        <br />
        <h2>Data Sharing</h2>
        <p>
          We do not sell or share your personal data with third parties, except as necessary
          to operate our services (e.g., email delivery via Brevo).
        </p>
        <br />
        <h2>Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data at any
          time by contacting us at bangkok@shambhala.info.
        </p>
        <br />
        <h2>Data Protection</h2>
        <p>
          We take reasonable measures to protect your information. Our website uses HTTPS
          encryption and we follow security best practices.
        </p>
        <br />
        <h2>PDPA Compliance</h2>
        <p>
          This policy is designed to comply with Thailand&apos;s Personal Data Protection Act (PDPA)
          and international best practices for data privacy.
        </p>
        <br />
        <h2>Contact</h2>
        <p>
          For privacy-related inquiries, email us at{' '}
          <a href="mailto:bangkok@shambhala.info">bangkok@shambhala.info</a>.
        </p>
      </div>
    </div>
  );
}
