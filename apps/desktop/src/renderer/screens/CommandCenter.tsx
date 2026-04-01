import { useState } from 'react';
import type { CommandEntry } from '../store/types';

interface Props {
  locale: 'vi' | 'en';
  onBack: () => void;
}

export default function CommandCenter({ locale, onBack }: Props) {
  const [commands, setCommands] = useState<CommandEntry[]>([]);
  const [cmd, setCmd] = useState('');

  const runCmd = async (command: string) => {
    if (!window.electronAPI) return;
    const output = await window.electronAPI.runCommand(command);
    setCommands((prev) => [
      ...prev,
      { id: crypto.randomUUID(), command, status: 'completed', tier: 'safe', output },
    ]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#1e1e3a',
        color: '#e2e8f0',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid #2d2d44',
        }}
      >
        <button
          onClick={onBack}
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #4a4a68',
            background: 'transparent',
            color: '#e2e8f0',
            fontSize: '13px',
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>Command Center</h1>
        <div />
      </header>
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runCmd(cmd)}
            placeholder="Run command..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #4a4a68',
              background: '#2d2d44',
              color: '#e2e8f0',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {commands.map((c) => (
            <div
              key={c.id}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #2d2d44' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <code style={{ fontSize: '13px', color: '#e2e8f0' }}>{c.command}</code>
                <span style={{ fontSize: '12px', color: '#8b8ba7' }}>{c.status}</span>
              </div>
              <pre
                style={{
                  marginTop: '8px',
                  color: '#22c55e',
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {c.output}
              </pre>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
