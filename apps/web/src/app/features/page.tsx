import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — OMCODE | AI Coding Workspace Capabilities',
  description: 'Explore OMCODE features: repo-aware AI sessions, file editing, controlled commands, multi-provider routing, prompt registry, review flows, and git-aware workflows.',
  openGraph: { title: 'Features — OMCODE', description: 'Core product capabilities for AI-native coding.', type: 'website', url: 'https://code.omdala.com/features' },
  alternates: { canonical: 'https://code.omdala.com/features' },
};

const features = [
  { title: 'Repo-aware AI Sessions', desc: 'AI understands your project structure, file dependencies, and codebase context — not just isolated snippets.', status: 'Alpha' },
  { title: 'File Editing & Patch Flow', desc: 'Generate code changes as patches. Review diffs before applying. Full control over every modification.', status: 'Alpha' },
  { title: 'Controlled Command Execution', desc: 'Run terminal commands safely. Safe commands auto-execute, others require approval, dangerous ones are blocked.', status: 'Alpha' },
  { title: 'Multi-provider Model Routing', desc: 'Automatically route tasks to the best provider based on capability, cost, and latency. OpenAI, Anthropic, Cloudflare.', status: 'Alpha' },
  { title: 'Prompt Registry', desc: 'Reusable, versioned prompt templates for plan, review, chat, docs, release, and more. Bilingual support.', status: 'Alpha' },
  { title: 'Review Flows', desc: 'AI-powered code review with feedback on correctness, security, performance, readability, and best practices.', status: 'Planned' },
  { title: 'Git-aware Workflow', desc: 'Branch management, PR creation, commit drafting — all integrated with your existing git workflow.', status: 'Planned' },
  { title: 'Local-first Workspace', desc: 'Your code stays local. Nothing is sent to AI until you explicitly start a session.', status: 'Alpha' },
  { title: 'Team Collaboration', desc: 'Shared workspaces, project management, and team-level provider policies.', status: 'Planned' },
];

export default function FeaturesPage() {
  return (
    <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 800, marginBottom: '16px' }}>Features</h1>
      <p style={{ fontSize: '18px', color: '#8b8ba7', marginBottom: '48px' }}>Core capabilities that make OMCODE different from chat-only AI tools.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {features.map(f => (
          <div key={f.title} style={{ padding: '24px', borderRadius: '12px', border: '1px solid #2d2d44', background: '#1e1e3a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>{f.title}</h3>
              <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: f.status === 'Alpha' ? '#3b82f620' : '#4a4a68', color: f.status === 'Alpha' ? '#3b82f6' : '#8b8ba7' }}>{f.status}</span>
            </div>
            <p style={{ fontSize: '14px', color: '#8b8ba7', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '64px', borderTop: '1px solid #2d2d44', paddingTop: '32px' }}>
        <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← Back to home</a>
      </footer>
    </main>
  );
}
