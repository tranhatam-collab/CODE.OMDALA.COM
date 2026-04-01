import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations — OMCODE | GitHub, MCP, Cloudflare, Local Filesystem',
  description:
    'OMCODE integrates with GitHub, MCP tools, Cloudflare services, local filesystem, and terminal bridge.',
  openGraph: {
    title: 'Integrations — OMCODE',
    description: 'Connects with your existing dev tools.',
    type: 'website',
    url: 'https://code.omdala.com/integrations',
  },
  alternates: { canonical: 'https://code.omdala.com/integrations' },
};

const integrations = [
  {
    name: 'GitHub',
    desc: 'Full repository access: read files, create branches, open PRs, manage issues. OAuth or PAT authentication.',
    status: 'Alpha',
  },
  {
    name: 'MCP Tools',
    desc: 'Model Context Protocol for structured tool access. GitHub MCP, Docs MCP, Repo Map MCP, API Contract MCP, and more.',
    status: 'Alpha',
  },
  {
    name: 'Cloudflare Workers AI',
    desc: 'Serverless AI inference at the edge. Free tier, low latency, no API key management needed beyond Cloudflare account.',
    status: 'Alpha',
  },
  {
    name: 'Local Filesystem',
    desc: 'Direct access to your projects. No cloud sync required. Full control over what gets shared with AI.',
    status: 'Alpha',
  },
  {
    name: 'Terminal Bridge',
    desc: 'Controlled command execution with approval flows. Safe commands auto-execute, others require explicit approval.',
    status: 'Alpha',
  },
  {
    name: 'API Providers',
    desc: 'OpenAI, Anthropic, and community adapters. Add any combination and let the router choose the best model per task.',
    status: 'Alpha',
  },
];

export default function IntegrationsPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Integrations</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>
        OMCODE connects with your existing development tools — not the other way around.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {integrations.map((i) => (
          <div
            key={i.name}
            style={{
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
                marginBottom: '8px',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{i.name}</h3>
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  background: '#3b82f620',
                  color: '#3b82f6',
                }}
              >
                {i.status}
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#8b8ba7', lineHeight: 1.6 }}>{i.desc}</p>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '64px', borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
