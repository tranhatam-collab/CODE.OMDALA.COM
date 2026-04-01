import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OMCODE vs Cursor — AI Coding Tool Comparison',
  description:
    'Compare OMCODE and Cursor. Understand the differences in architecture, workflow, and provider flexibility.',
  openGraph: {
    title: 'OMCODE vs Cursor',
    description: 'AI coding tool comparison.',
    type: 'article',
    url: 'https://code.omdala.com/compare/cursor',
  },
  alternates: { canonical: 'https://code.omdala.com/compare/cursor' },
};

export default function CompareCursor() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>OMCODE vs Cursor</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>
        Both are AI-powered coding tools. Here is how they differ in architecture, workflow, and
        philosophy.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '48px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #2d2d44' }}>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px' }}>Dimension</th>
              <th
                style={{ textAlign: 'left', padding: '12px', fontSize: '14px', color: '#3b82f6' }}
              >
                OMCODE
              </th>
              <th style={{ textAlign: 'left', padding: '12px', fontSize: '14px' }}>Cursor</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Architecture', 'Multi-provider, MCP-based', 'Proprietary, OpenAI-focused'],
              ['Provider Flexibility', 'OpenAI, Anthropic, Cloudflare, local', 'Primarily OpenAI'],
              ['Open Source', 'Full source on GitHub', 'Closed source'],
              ['Local-first', 'Code stays local until explicitly shared', 'Cloud-dependent'],
              ['Command Control', 'Tiered approval system', 'Limited command execution'],
              ['Platform', 'Mac-first, expanding', 'Mac, Windows, Linux'],
              ['Pricing', 'Pay for your own API keys', 'Subscription model'],
              ['MCP Support', 'Native MCP layer', 'Limited MCP support'],
            ].map(([dim, omcode, cursor]) => (
              <tr key={dim} style={{ borderBottom: '1px solid #2d2d44' }}>
                <td style={{ padding: '12px', fontSize: '14px', fontWeight: 600 }}>{dim}</td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#e2e8f0' }}>{omcode}</td>
                <td style={{ padding: '12px', fontSize: '14px', color: '#8b8ba7' }}>{cursor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          When to Choose OMCODE
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
          <li>You want multi-provider flexibility and cost control</li>
          <li>You prefer local-first workflow with explicit sharing</li>
          <li>You value open-source transparency</li>
          <li>You need controlled command execution with approval flows</li>
          <li>You want MCP-based extensibility</li>
        </ul>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
          When to Choose Cursor
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
          <li>You want a polished, production-ready tool today</li>
          <li>You need cross-platform support (Windows, Linux)</li>
          <li>You prefer a subscription model over managing API keys</li>
          <li>You are already invested in the Cursor ecosystem</li>
        </ul>
      </section>

      <div
        style={{
          padding: '32px',
          borderRadius: '12px',
          border: '1px solid #2d2d44',
          background: '#1e1e3a',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
          Try OMCODE Yourself
        </h3>
        <a
          href="/download"
          style={{
            display: 'inline-block',
            padding: '14px 28px',
            borderRadius: '10px',
            border: 'none',
            background: '#3b82f6',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Download for Mac
        </a>
      </div>

      <footer style={{ marginTop: '64px', borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
