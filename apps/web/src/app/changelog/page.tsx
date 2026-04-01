import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog — OMCODE',
  description: 'Product progress and release history for OMCODE.',
  openGraph: {
    title: 'Changelog — OMCODE',
    description: 'Product progress and release history.',
    type: 'website',
    url: 'https://code.omdala.com/changelog',
  },
  alternates: { canonical: 'https://code.omdala.com/changelog' },
};

const releases = [
  {
    version: 'v0.1.0-alpha',
    date: '2026-03-31',
    type: 'alpha',
    changes: [
      'Initial alpha release',
      'Mac desktop app shell',
      'Open local project flow',
      'File tree viewer',
      'Session chat connected to API gateway',
      'Provider setup (OpenAI, Anthropic, Cloudflare)',
      'Command center skeleton',
      'Public website (code.omdala.com)',
      'API gateway foundation (api.omdala.com)',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '48px' }}>Changelog</h1>
      {releases.map((r) => (
        <div
          key={r.version}
          style={{
            marginBottom: '48px',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #2d2d44',
            background: '#1e1e3a',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>{r.version}</h2>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  background: '#f59e0b20',
                  color: '#f59e0b',
                }}
              >
                {r.type}
              </span>
              <span style={{ fontSize: '13px', color: '#8b8ba7' }}>{r.date}</span>
            </div>
          </div>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {r.changes.map((c) => (
              <li key={c} style={{ fontSize: '14px', color: '#e2e8f0' }}>
                {c}
              </li>
            ))}
          </ul>
          <a
            href={`https://github.com/tranhatam-collab/CODE.OMDALA.COM/releases/tag/${r.version}`}
            style={{
              display: 'inline-block',
              marginTop: '16px',
              color: '#3b82f6',
              fontSize: '14px',
            }}
          >
            View on GitHub →
          </a>
        </div>
      ))}
      <footer style={{ borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
