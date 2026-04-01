import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Providers — OMCODE | OpenAI, Anthropic, Cloudflare Workers AI',
  description:
    'OMCODE supports multiple AI providers. Route intelligently based on task type, cost, and capability.',
  openGraph: {
    title: 'Providers — OMCODE',
    description: 'Multi-provider AI routing.',
    type: 'website',
    url: 'https://code.omdala.com/providers',
  },
  alternates: { canonical: 'https://code.omdala.com/providers' },
};

const providers = [
  {
    name: 'OpenAI',
    models: ['gpt-5.4', 'gpt-4o', 'o1', 'o3-mini'],
    desc: 'Frontier models for coding, planning, and complex reasoning. Best for build and plan tasks.',
    url: 'https://platform.openai.com',
  },
  {
    name: 'Anthropic',
    models: ['Claude Opus 4', 'Claude Sonnet 4', 'Claude Haiku'],
    desc: 'Strong code understanding and safety. Best for review and docs tasks.',
    url: 'https://console.anthropic.com',
  },
  {
    name: 'Cloudflare Workers AI',
    models: ['Llama 3 8B', 'Qwen 7B'],
    desc: 'Serverless inference at the edge. Free tier available. Best for summarize and simple chat.',
    url: 'https://developers.cloudflare.com/workers-ai',
  },
  {
    name: 'Local Models',
    models: ['Custom'],
    desc: 'Run models locally for maximum privacy. Community adapters coming soon.',
    url: '#',
  },
];

export default function ProvidersPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>AI Providers</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>
        OMCODE is multi-provider by design. Add any combination of providers and let the router
        choose the best model for each task.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {providers.map((p) => (
          <div
            key={p.name}
            style={{
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #2d2d44',
              background: '#1e1e3a',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{p.name}</h3>
            <p style={{ fontSize: '14px', color: '#8b8ba7', marginBottom: '12px' }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {p.models.map((m) => (
                <span
                  key={m}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    background: '#3b82f620',
                    color: '#3b82f6',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-block',
                marginTop: '16px',
                color: '#3b82f6',
                fontSize: '14px',
              }}
            >
              Get API key →
            </a>
          </div>
        ))}
      </div>
      <section
        style={{
          marginTop: '48px',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid #2d2d44',
          background: '#1e1e3a',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>
          How Routing Works
        </h3>
        <p style={{ fontSize: '14px', color: '#8b8ba7', lineHeight: 1.7 }}>
          OMCODE automatically routes tasks to the best provider. Plan and build tasks prefer GPT
          models. Review tasks prefer Claude. Simple tasks like summarization use cheaper models.
          You can override the default routing per session or set workspace-level policies.
        </p>
      </section>
      <footer style={{ marginTop: '64px', borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>
          ← Back to home
        </a>
      </footer>
    </main>
  );
}
