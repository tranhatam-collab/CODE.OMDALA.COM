import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download OMCODE for Mac — AI Coding Workspace | Quick Install',
  description: 'Download OMCODE for macOS. Supports Apple Silicon and Intel. Quick install, easy provider setup, start coding with AI immediately.',
  openGraph: { title: 'Download OMCODE for Mac', description: 'Download OMCODE for macOS. Quick install, easy provider setup.', type: 'website', url: 'https://code.omdala.com/download' },
  alternates: { canonical: 'https://code.omdala.com/download', languages: { vi: 'https://code.omdala.com/download', en: 'https://code.omdala.com/download' } },
};

export default function DownloadPage() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Download OMCODE for Mac</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>AI-native coding workspace. Install and start coding in minutes.</p>
      
      <div style={{ padding: '32px', borderRadius: '12px', border: '1px solid #2d2d44', background: '#1e1e3a', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>v0.1.0-alpha</h2>
        <p style={{ color: '#f59e0b', marginBottom: '24px', fontSize: '14px' }}>⚠ Alpha release — for testing and feedback only</p>
        <a href="#" style={{ display: 'inline-block', padding: '14px 32px', borderRadius: '10px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none' }}>Download for macOS</a>
        <p style={{ fontSize: '13px', color: '#4a4a68', marginTop: '16px' }}>Universal binary • Apple Silicon + Intel • ~45MB</p>
      </div>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>System Requirements</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44' }}>macOS 14.0 (Sonoma) or later</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44' }}>Apple Silicon (M1+) or Intel (2019+)</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44' }}>8GB RAM minimum, 16GB recommended</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44' }}>200MB disk space</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44' }}>API key from at least one provider (OpenAI, Anthropic, or Cloudflare)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Install Steps</h2>
        <ol style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '24px' }}>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Download the .dmg file above</li>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Open the .dmg and drag OMCODE to Applications</li>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Open OMCODE from Applications (first launch: right-click → Open)</li>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Select your language (Vietnamese or English)</li>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Add at least one AI provider API key</li>
          <li style={{ fontSize: '16px', lineHeight: 1.6 }}>Open a local project folder and start coding</li>
        </ol>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>What Happens After Install</h2>
        <p style={{ fontSize: '16px', color: '#8b8ba7', lineHeight: 1.7 }}>OMCODE opens to a welcome screen. You will select your language, optionally sign in, add API providers, and open a local project. Your code stays on your machine — nothing is sent to AI until you explicitly start a session.</p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Troubleshooting</h2>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><a href="https://docs.omdala.com/code/install" style={{ color: '#3b82f6' }}>Installation guide →</a></li>
          <li><a href="https://docs.omdala.com/code/providers" style={{ color: '#3b82f6' }}>Provider setup guide →</a></li>
          <li><a href="https://github.com/tranhatam-collab/CODE.OMDALA.COM/issues" style={{ color: '#3b82f6' }}>Report issues on GitHub →</a></li>
        </ul>
      </section>

      <footer style={{ borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to home</a>
      </footer>
    </main>
  );
}
