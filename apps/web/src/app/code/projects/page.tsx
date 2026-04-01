import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects — OMCODE',
  description: 'Manage your code projects.',
  robots: { index: false, follow: false },
};

const mockProjects = [
  {
    id: '1',
    name: 'my-web-app',
    path: '~/projects/my-web-app',
    branch: 'main',
    sessions: 8,
    lastActive: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'api-service',
    path: '~/projects/api-service',
    branch: 'develop',
    sessions: 4,
    lastActive: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'docs-site',
    path: '~/projects/docs-site',
    branch: 'main',
    sessions: 2,
    lastActive: '3 days ago',
    status: 'idle',
  },
];

export default function ProjectsPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '240px', borderRight: '1px solid #2d2d44', padding: '16px' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            ['Dashboard', '/code'],
            ['Projects', '/code/projects'],
            ['Sessions', '/code/sessions'],
            ['Providers', '/code/providers'],
            ['Settings', '/code/settings'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                color: href === '/code/projects' ? '#3b82f6' : '#e2e8f0',
                background: href === '/code/projects' ? '#3b82f620' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <h1 style={{ fontSize: '28px', fontWeight: 700 }}>Projects</h1>
          <button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: '#3b82f6',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            + Add Project
          </button>
        </header>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {mockProjects.map((p) => (
            <a
              key={p.id}
              href={`/code/projects/${p.id}`}
              style={{
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #2d2d44',
                background: '#1e1e3a',
                textDecoration: 'none',
                color: 'inherit',
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
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{p.name}</h3>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    background: p.status === 'active' ? '#22c55e20' : '#4a4a68',
                    color: p.status === 'active' ? '#22c55e' : '#8b8ba7',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#8b8ba7' }}>{p.path}</p>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '12px',
                  fontSize: '12px',
                  color: '#4a4a68',
                }}
              >
                <span>{p.sessions} sessions</span>
                <span>{p.branch}</span>
                <span>{p.lastActive}</span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
