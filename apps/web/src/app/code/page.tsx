import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — OMCODE',
  description: 'Your OMCODE workspace dashboard.',
  robots: { index: false, follow: false },
};

const mockProjects = [
  { id: '1', name: 'my-web-app', path: '~/projects/my-web-app', branch: 'main', lastSession: '2 hours ago' },
  { id: '2', name: 'api-service', path: '~/projects/api-service', branch: 'develop', lastSession: '1 day ago' },
];

const mockSessions = [
  { id: '1', project: 'my-web-app', model: 'gpt-4o', status: 'completed', messages: 12, time: '2 hours ago' },
  { id: '2', project: 'api-service', model: 'claude-sonnet-4', status: 'active', messages: 5, time: '1 day ago' },
];

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '240px', borderRight: '1px solid #2d2d44', padding: '16px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            ['Dashboard', '/code'],
            ['Workspaces', '/code/workspaces'],
            ['Projects', '/code/projects'],
            ['Sessions', '/code/sessions'],
            ['Agents', '/code/agents'],
            ['Runs', '/code/runs'],
            ['Prompts', '/code/prompts'],
            ['Providers', '/code/providers'],
            ['Settings', '/code/settings'],
          ].map(([label, href]) => (
            <a key={href} href={href} style={{ padding: '8px 12px', borderRadius: '6px', color: href === '/code' ? '#3b82f6' : '#e2e8f0', background: href === '/code' ? '#3b82f620' : 'transparent', textDecoration: 'none', fontSize: '14px' }}>{label}</a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Dashboard</h1>
            <p style={{ color: '#8b8ba7', fontSize: '14px' }}>Welcome back. Here is your workspace overview.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/code/projects" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', textDecoration: 'none', fontSize: '14px' }}>+ New Project</a>
            <a href="/code/sessions" style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>+ New Session</a>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[['Projects', '2'], ['Sessions', '12'], ['Providers', '3'], ['Runs', '48']].map(([label, value]) => (
            <div key={label} style={{ padding: '20px', borderRadius: '10px', border: '1px solid #2d2d44', background: '#1e1e3a' }}>
              <p style={{ fontSize: '12px', color: '#8b8ba7', textTransform: 'uppercase' }}>{label}</p>
              <p style={{ fontSize: '32px', fontWeight: 700, marginTop: '4px' }}>{value}</p>
            </div>
          ))}
        </div>

        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Recent Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {mockProjects.map(p => (
              <a key={p.id} href={`/code/projects/${p.id}`} style={{ padding: '16px', borderRadius: '8px', border: '1px solid #2d2d44', background: '#1e1e3a', textDecoration: 'none', color: 'inherit' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: '#8b8ba7' }}>{p.path} • {p.branch}</p>
                <p style={{ fontSize: '11px', color: '#4a4a68', marginTop: '8px' }}>Last session: {p.lastSession}</p>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Recent Sessions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockSessions.map(s => (
              <a key={s.id} href={`/code/sessions/${s.id}`} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44', background: '#1e1e3a', textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '14px' }}>{s.project}</span>
                  <span style={{ fontSize: '12px', color: '#8b8ba7', marginLeft: '12px' }}>{s.model}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#8b8ba7' }}>{s.messages} messages</span>
                  <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: s.status === 'active' ? '#22c55e20' : '#4a4a68', color: s.status === 'active' ? '#22c55e' : '#8b8ba7' }}>{s.status}</span>
                  <span style={{ fontSize: '11px', color: '#4a4a68' }}>{s.time}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
