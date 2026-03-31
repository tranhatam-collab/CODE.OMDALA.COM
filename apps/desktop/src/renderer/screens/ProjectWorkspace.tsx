import { useState, useEffect } from 'react';
import { t } from '@omcode/i18n';
import type { ProjectInfo } from '../store/types';

interface Props { locale: 'vi' | 'en'; project: ProjectInfo; onBack: () => void; }

interface FileEntry { name: string; isDirectory: boolean; path: string; }

export default function ProjectWorkspace({ locale, project, onBack }: Props) {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'files' | 'session' | 'diff'>('files');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      window.electronAPI.listDir(project.path).then(setFiles);
    }
  }, [project.path]);

  const handleFileClick = async (filePath: string) => {
    setSelectedFile(filePath);
    if (typeof window !== 'undefined' && window.electronAPI) {
      const content = await window.electronAPI.readFile(filePath);
      setFileContent(typeof content === 'string' ? content : content.error || '');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #2d2d44' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' }}>← Back</button>
          <h1 style={{ fontSize: '16px', fontWeight: 600 }}>{project.name}</h1>
          {project.isGitRepo && <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: '#22c55e20', color: '#22c55e' }}>Git</span>}
        </div>
        <nav style={{ display: 'flex', gap: '8px' }}>
          {(['files', 'session', 'diff'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: activeTab === tab ? '#3b82f6' : 'transparent', color: '#e2e8f0', fontSize: '13px', textTransform: 'capitalize' }}>{tab}</button>
          ))}
        </nav>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '260px', borderRight: '1px solid #2d2d44', overflow: 'auto', padding: '12px' }}>
          <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#8b8ba7', marginBottom: '8px', textTransform: 'uppercase' }}>Files</h3>
          {files.map(f => (
            <div key={f.path} onClick={() => f.isDirectory ? null : handleFileClick(f.path)} style={{ padding: '4px 8px', borderRadius: '4px', cursor: f.isDirectory ? 'default' : 'pointer', fontSize: '13px', background: selectedFile === f.path ? '#3b82f620' : 'transparent', color: f.isDirectory ? '#8b8ba7' : '#e2e8f0' }}>
              {f.isDirectory ? '📁' : '📄'} {f.name}
            </div>
          ))}
        </aside>
        <main style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
          {activeTab === 'files' && (
            fileContent ? <pre style={{ fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>{fileContent}</pre> : <p style={{ color: '#8b8ba7' }}>Select a file to view</p>
          )}
          {activeTab === 'session' && <SessionPanel locale={locale} project={project} />}
          {activeTab === 'diff' && <DiffPanel locale={locale} />}
        </main>
      </div>
    </div>
  );
}

function SessionPanel({ locale, project }: { locale: 'vi' | 'en'; project: ProjectInfo }) {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8787';
      const res = await fetch(`${apiUrl}/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: 'chat', context: { projectId: project.id, userMessage: input } }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.data?.content || 'No response' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: Cannot connect to API' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto', marginBottom: '12px' }}>
        {messages.length === 0 && <p style={{ color: '#8b8ba7', textAlign: 'center', padding: '32px' }}>{t('empty.sessions', locale)}</p>}
        {messages.map((m, i) => (
          <div key={i} style={{ padding: '12px', marginBottom: '8px', borderRadius: '8px', background: m.role === 'user' ? '#3b82f620' : '#2d2d44', maxWidth: '80%' }}>
            <p style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>{m.content}</p>
          </div>
        ))}
        {loading && <p style={{ color: '#8b8ba7' }}>Thinking...</p>}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your code..." style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #4a4a68', background: '#1e1e3a', color: '#e2e8f0', fontSize: '14px' }} />
        <button onClick={send} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600 }}>Send</button>
      </div>
    </div>
  );
}

function DiffPanel({ locale }: { locale: 'vi' | 'en' }) {
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <p style={{ color: '#8b8ba7' }}>{t('diff.no_changes', locale) || 'No changes to review yet'}</p>
      <p style={{ fontSize: '13px', color: '#4a4a68', marginTop: '8px' }}>Generate a plan or request changes to see diffs here</p>
    </div>
  );
}
