import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sessions — OMCODE',
  description: 'Your AI coding sessions.',
  robots: { index: false, follow: false },
};

const mockSessions = [
  { id: '1', project: 'my-web-app', model: 'gpt-4o', status: 'active' as const, messages: 12, created: '2 hours ago', task: 'plan' },
  { id: '2', project: 'api-service', model: 'claude-sonnet-4', status: 'completed' as const, messages: 24, created: '1 day ago', task: 'review' },
  { id: '3', project: 'my-web-app', model: 'gpt-4o', status: 'completed' as const, messages: 8, created: '2 days ago', task: 'chat' },
];

export default function SessionsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '240px', borderRight: '1px solid #2d2d44', padding: '16px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[['Dashboard', '/code'], ['Projects', '/code/projects'], ['Sessions', '/code/sessions'], ['Providers', '/code/providers'], ['Settings', '/code/settings']].map(([label, href]) => (
            <a key={href} href={href} style={{ padding: '8px 12px', borderRadius: '6px', color: href === '/code/sessions' ? '#3b82f6' : '#e2e8f0', background: href === '/code/sessions' ? '#3b82f620' : 'transparent', textDecoration: 'none', fontSize: '14px' }}>{label}</a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Sessions</h1>
          <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600 }}>+ New Session</button>
        </header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {mockSessions.map(s => (
            <a key={s.id} href={`/code/sessions/${s.id}`} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #2d2d44', background: '#1e1e3a', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{s.project}</span>
                <span style={{ fontSize: '12px', color: '#8b8ba7', marginLeft: '12px' }}>{s.model}</span>
                <span style={{ fontSize: '12px', color: '#4a4a68', marginLeft: '12px' }}>{s.task}</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#8b8ba7' }}>{s.messages} msgs</span>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: s.status === 'active' ? '#22c55e20' : '#4a4a68', color: s.status === 'active' ? '#22c55e' : '#8b8ba7' }}>{s.status}</span>
                <span style={{ fontSize: '11px', color: '#4a4a68' }}>{s.created}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
