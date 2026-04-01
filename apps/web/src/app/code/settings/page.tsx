import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings — OMCODE',
  description: 'Account and workspace settings.',
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
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
                color: href === '/code/settings' ? '#3b82f6' : '#e2e8f0',
                background: href === '/code/settings' ? '#3b82f620' : 'transparent',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '32px', overflow: 'auto', maxWidth: '640px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>Settings</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Language</h2>
            <select
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #4a4a68',
                background: '#1e1e3a',
                color: '#e2e8f0',
                fontSize: '14px',
                width: '200px',
              }}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </section>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Appearance</h2>
            <select
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #4a4a68',
                background: '#1e1e3a',
                color: '#e2e8f0',
                fontSize: '14px',
                width: '200px',
              }}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </section>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Provider Defaults
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #2d2d44',
                }}
              >
                <span style={{ fontSize: '14px' }}>Default Model</span>
                <select
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #4a4a68',
                    background: '#1e1e3a',
                    color: '#e2e8f0',
                    fontSize: '13px',
                  }}
                >
                  <option>gpt-4o</option>
                  <option>claude-sonnet-4</option>
                </select>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #2d2d44',
                }}
              >
                <span style={{ fontSize: '14px' }}>Cost Ceiling (per session)</span>
                <input
                  type="number"
                  defaultValue={5}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #4a4a68',
                    background: '#1e1e3a',
                    color: '#e2e8f0',
                    fontSize: '13px',
                    width: '80px',
                  }}
                />
              </div>
            </div>
          </section>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Privacy Mode
            </h2>
            <p style={{ fontSize: '14px', color: '#8b8ba7', marginBottom: '12px' }}>
              When enabled, no usage data is sent to OMCODE servers. API keys are stored only in
              your local keychain.
            </p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <input type="checkbox" /> Enable privacy mode
            </label>
          </section>
          <section>
            <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>
              Command Policies
            </h2>
            <p style={{ fontSize: '14px', color: '#8b8ba7', marginBottom: '12px' }}>
              Safe commands auto-execute, review commands require approval, dangerous commands are
              blocked.
            </p>
            <a href="/code/settings/policies" style={{ color: '#3b82f6', fontSize: '14px' }}>
              View policy details →
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}
