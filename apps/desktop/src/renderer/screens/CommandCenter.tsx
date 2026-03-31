import { t } from '@omcode/i18n';
import type { CommandEntry } from '../store/types';

interface Props { locale: 'vi' | 'en'; commands: CommandEntry[]; onBack: () => void; }

export default function CommandCenter({ locale, commands, onBack }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #2d2d44' }}>
        <button onClick={onBack} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' }}>← Back</button>
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>Command Center</h1>
        <div />
      </header>
      <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
        {commands.length === 0 ? (
          <p style={{ color: '#8b8ba7', textAlign: 'center', padding: '32px' }}>No commands executed yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {commands.map(cmd => (
              <div key={cmd.id} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #2d2d44', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <code style={{ fontSize: '13px', color: '#e2e8f0' }}>{cmd.command}</code>
                  <span style={{ marginLeft: '8px', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', background: cmd.tier === 'safe' ? '#22c55e20' : cmd.tier === 'review' ? '#f59e0b20' : '#ef444420', color: cmd.tier === 'safe' ? '#22c55e' : cmd.tier === 'review' ? '#f59e0b' : '#ef4444' }}>{cmd.tier}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#8b8ba7' }}>{cmd.status}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
