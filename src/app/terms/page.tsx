import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Bangkok Shambhala website.',
};

export default function TermsPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Use</h1>
      <div className="prose max-w-none">
        <p><em>Last updated: March 2026</em></p>

        <h2>Acceptance</h2>
        <p>
          By using this website, you agree to these terms. If you do not agree,
          please do not use the site.
        </p>

        <h2>Use of Content</h2>
        <p>
          The content on this website is provided for informational purposes. You may share
          and link to our content with attribution. Reproduction for commercial purposes
          requires written permission.
        </p>

        <h2>Events and Programs</h2>
        <p>
          Event details, schedules, and pricing are subject to change. We make every effort
          to keep information current and accurate.
        </p>

        <h2>Donations</h2>
        <p>
          All donations are voluntary and non-refundable. Donations support the operations
          of Bangkok Shambhala as a non-profit community.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          This website is provided &quot;as is&quot; without warranties. Bangkok Shambhala is not
          liable for any damages arising from your use of the site.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be directed to{' '}
          <a href="mailto:bangkok@shambhala.info">bangkok@shambhala.info</a>.
        </p>
      </div>
    </div>
  );
}
