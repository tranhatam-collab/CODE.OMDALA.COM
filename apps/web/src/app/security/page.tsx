import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security — OMCODE | Local-first Privacy, Controlled Commands',
  description: 'OMCODE security model: local-first privacy, provider key handling, command approval model, write safety, and responsible disclosure.',
  openGraph: { title: 'Security — OMCODE', description: 'Local-first privacy and controlled AI workflow.', type: 'website', url: 'https://code.omdala.com/security' },
  alternates: { canonical: 'https://code.omdala.com/security' },
};

export default function SecurityPage() {
  const sections = [
    { title: 'Local-first Privacy Model', desc: 'Your code stays on your machine. Nothing is sent to AI providers until you explicitly start a session. You control what gets shared, when, and with which provider.' },
    { title: 'Provider Key Handling', desc: 'API keys are stored in the macOS keychain. Keys are never logged, never sent to OMCODE servers, and never included in prompts. Redaction layer strips secrets before any provider call.' },
    { title: 'Command Approval Model', desc: 'Every command is classified: safe (auto-execute), review (approval required), or dangerous (blocked). You see every command before it runs. Full audit trail for every action.' },
    { title: 'Write Safety', desc: 'All AI-generated changes come as patches. You review diffs before applying. No direct file writes without your approval. Every change is reversible.' },
    { title: 'Production Safety Boundary', desc: 'OMCODE is designed for development use. It does not connect to production systems, databases, or live infrastructure by default.' },
    { title: 'Responsible Disclosure', desc: 'Found a security issue? Report it to security@omdala.com. We take all reports seriously and respond within 48 hours.' },
  ];

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Security & Privacy</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>OMCODE is designed with security as a first-class concern. Every layer, from local filesystem to AI providers, has guardrails.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sections.map(s => (
          <div key={s.title} style={{ padding: '24px', borderRadius: '12px', border: '1px solid #2d2d44', background: '#1e1e3a' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
            <p style={{ fontSize: '14px', color: '#8b8ba7', lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '64px', borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to home</a>
      </footer>
    </main>
  );
}
