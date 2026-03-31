import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OMCODE — AI coding with real control | Mac-first, Multi-provider, Open Source',
  description: 'OMCODE is an AI-native coding workspace for Mac developers. Multi-provider support, local-first workflow, controlled commands, and repo-aware AI sessions.',
  openGraph: {
    title: 'OMCODE — AI coding with real control',
    description: 'AI-native coding workspace for Mac developers. Multi-provider, local-first, open source.',
    type: 'website',
    url: 'https://code.omdala.com',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://code.omdala.com/en',
    languages: { vi: 'https://code.omdala.com/vi', en: 'https://code.omdala.com/en' },
  },
};

export default function HomeEn() {
  return (
    <main>
      <section style={hero}>
        <h1 style={heroTitle}>OMCODE</h1>
        <p style={heroSub}>AI-native coding workspace for Mac developers</p>
        <div style={ctaGroup}>
          <a href="/download" style={primaryBtn}>Download for Mac</a>
          <a href="https://github.com/tranhatam-collab/CODE.OMDALA.COM" style={secondaryBtn}>View Open Source</a>
          <a href="https://docs.omdala.com/code" style={secondaryBtn}>Read Docs</a>
        </div>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Why Mac-first?</h2>
        <p style={sectionText}>The fastest coding experience starts local. Direct filesystem access, native performance, and seamless integration with your existing development workflow.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Multi-provider Support</h2>
        <p style={sectionText}>OpenAI, Anthropic, Cloudflare Workers AI — route intelligently based on task type, cost, and capability. Never locked into a single model.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Local-first Workflow</h2>
        <p style={sectionText}>Your code stays on your machine until you explicitly send it to AI. Full control over what gets shared, when, and with which provider.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Controlled AI Workflow</h2>
        <p style={sectionText}>Not a chat box. A real workspace: open projects, read repos, edit files, execute controlled commands, review diffs, and apply patches with approval.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Open Source Core</h2>
        <p style={sectionText}>Built in public. Clone, run, fork, and contribute. Transparent architecture, clear contribution paths, and community-driven development.</p>
      </section>
      <section style={section}>
        <h2 style={sectionTitle}>Security & Privacy</h2>
        <p style={sectionText}>API keys stored safely. Commands require approval. Sensitive data redacted before sending to providers. Full audit trail for every action.</p>
      </section>
      <footer style={footer}>
        <div style={footerLinks}>
          <a href="/features">Features</a>
          <a href="/providers">Providers</a>
          <a href="/download">Download</a>
          <a href="/open-source">Open Source</a>
          <a href="/security">Security</a>
          <a href="/changelog">Changelog</a>
          <a href="https://docs.omdala.com/code">Docs</a>
          <a href="https://github.com/tranhatam-collab/CODE.OMDALA.COM">GitHub</a>
        </div>
        <p style={footerCopy}>© 2026 OMDALA — OMCODE</p>
      </footer>
    </main>
  );
}

const hero: React.CSSProperties = { minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px' };
const heroTitle: React.CSSProperties = { fontSize: '64px', fontWeight: 800, marginBottom: '16px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const heroSub: React.CSSProperties = { fontSize: '20px', color: '#8b8ba7', marginBottom: '32px' };
const ctaGroup: React.CSSProperties = { display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' };
const primaryBtn: React.CSSProperties = { padding: '14px 28px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' };
const secondaryBtn: React.CSSProperties = { padding: '14px 28px', borderRadius: '10px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '16px', textDecoration: 'none' };
const section: React.CSSProperties = { padding: '64px 24px', maxWidth: '800px', margin: '0 auto' };
const sectionTitle: React.CSSProperties = { fontSize: '28px', fontWeight: 700, marginBottom: '16px' };
const sectionText: React.CSSProperties = { fontSize: '16px', color: '#8b8ba7', lineHeight: 1.7 };
const footer: React.CSSProperties = { padding: '48px 24px', borderTop: '1px solid #2d2d44', textAlign: 'center' };
const footerLinks: React.CSSProperties = { display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' };
const footerCopy: React.CSSProperties = { fontSize: '13px', color: '#4a4a68' };
