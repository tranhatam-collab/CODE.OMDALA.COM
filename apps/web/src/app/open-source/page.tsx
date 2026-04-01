import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Source — OMCODE | Built in Public',
  description:
    'OMCODE is built in public. Clone, run, fork, and contribute. Transparent architecture and community-driven development.',
  openGraph: {
    title: 'Open Source — OMCODE',
    description: 'Built in public. Community-driven.',
    type: 'website',
    url: 'https://code.omdala.com/open-source',
  },
  alternates: { canonical: 'https://code.omdala.com/open-source' },
};

export default function OpenSourcePage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Open Source</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>
        OMCODE is built in public. We believe transparency builds trust, and community drives better
        software.
      </p>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          What is Public Now
        </h2>
        <ul
          style={{
            listStyle: 'disc',
            paddingLeft: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <li>Full source code on GitHub</li>
          <li>Architecture documentation</li>
          <li>Issue tracking and project board</li>
          <li>Release notes and changelog</li>
          <li>Contribution guidelines</li>
        </ul>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          How to Contribute
        </h2>
        <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Fork the repository</li>
          <li>Read CONTRIBUTING.md for standards and workflows</li>
          <li>Find a "good first issue" or propose your own</li>
          <li>Submit a pull request with clear description</li>
          <li>Participate in review and iterate</li>
        </ol>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Links</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="https://github.com/tranhatam-collab/CODE.OMDALA.COM"
            style={{ color: '#3b82f6' }}
          >
            View Repository →
          </a>
          <a
            href="https://github.com/tranhatam-collab/CODE.OMDALA.COM/issues"
            style={{ color: '#3b82f6' }}
          >
            Open Issues →
          </a>
          <a href="https://docs.omdala.com/code/contributing" style={{ color: '#3b82f6' }}>
            Contribution Guide →
          </a>
          <a href="https://docs.omdala.com/code/roadmap" style={{ color: '#3b82f6' }}>
            Roadmap →
          </a>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
