import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Providers — OMCODE App',
  description: 'Manage API providers and model routing.',
  robots: { index: false, follow: false },
};

export default function ProvidersPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '240px', borderRight: '1px solid #2d2d44', padding: '16px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[['Dashboard', '/code'], ['Projects', '/code/projects'], ['Sessions', '/code/sessions'], ['Providers', '/code/providers'], ['Settings', '/code/settings']].map(([label, href]) => (
            <a key={href} href={href} style={{ padding: '8px 12px', borderRadius: '6px', color: href === '/code/providers' ? '#3b82f6' : '#e2e8f0', background: href === '/code/providers' ? '#3b82f620' : 'transparent', textDecoration: 'none', fontSize: '14px' }}>{label}</a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Providers</h1>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600 }}>+ Add Provider</button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: 'OpenAI', model: 'gpt-4o', status: 'healthy', key: 'sk-...4f2a' },
            { name: 'Anthropic', model: 'claude-sonnet-4', status: 'healthy', key: 'sk-ant-...7b3c' },
            { name: 'Cloudflare', model: '@cf/meta/llama-3', status: 'healthy', key: '••••••' },
          ].map(p => (
            <div key={p.name} style={{ padding: '20px', borderRadius: '10px', border: '1px solid #2d2d44', background: '#1e1e3a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{p.name}</h3>
                <p style={{ fontSize: '13px', color: '#8b8ba7' }}>{p.model} • Key: {p.key}</p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', background: '#22c55e20', color: '#22c55e' }}>{p.status}</span>
                <button style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' }}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
