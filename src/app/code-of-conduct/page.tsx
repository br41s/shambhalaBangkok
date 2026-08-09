import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code of Conduct',
  description: 'Community code of conduct for Bangkok Shambhala.',
};

export default function CodeOfConductPage() {
  return (
    <div className="container-content py-8 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Code of Conduct</h1>
      <div className="prose max-w-none">
        <p>
          Bangkok Shambhala is committed to providing a safe, inclusive, and respectful
          environment for all participants. This code of conduct applies to all interactions
          within our community — in person and online.
        </p>
        <br />
        <h2>Our Principles</h2>
        <ul>
          <li><strong>Respect:</strong> Treat every person with dignity and kindness.</li>
          <li><strong>Inclusivity:</strong> Welcome people of all backgrounds, identities, and beliefs.</li>
          <li><strong>Safety:</strong> Maintain an environment free from harassment, discrimination, and harm.</li>
          <li><strong>Honesty:</strong> Communicate with integrity and openness.</li>
          <li><strong>Accountability:</strong> Take responsibility for our actions and their impact.</li>
        </ul>
        <br />
        <h2>Expected Behavior</h2>
        <ul>
          <li>Be welcoming and open to newcomers.</li>
          <li>Listen with attention and speak with care.</li>
          <li>Respect personal boundaries and consent.</li>
          <li>Give constructive feedback when appropriate.</li>
          <li>Support the wellbeing of the community.</li>
        </ul>
        <br />
        <h2>Unacceptable Behavior</h2>
        <ul>
          <li>Harassment, intimidation, or discrimination of any kind.</li>
          <li>Unwanted physical contact or sexual attention.</li>
          <li>Disruptive behavior during meditation sessions or events.</li>
          <li>Sharing other members&apos; personal information without consent.</li>
        </ul>
        <br />
        <h2>Reporting Concerns</h2>
        <p>
          If you experience or witness behavior that violates this code of conduct,
          please contact us at{' '}
          <a href="mailto:bangkok@shambhala.info">bangkok@shambhala.info</a>.
          All reports will be handled with discretion and care.
        </p>
      </div>
    </div>
  );
}
