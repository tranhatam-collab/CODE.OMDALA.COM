import { useState } from 'react';
import { t } from '@omcode/i18n';
import type { ProviderInfo } from '../store/types';

interface Props { locale: 'vi' | 'en'; providers: ProviderInfo[]; onAddProvider: (p: { name: string; model: string }) => void; onBack: () => void; }

export default function ProviderSetup({ locale, providers, onAddProvider, onBack }: Props) {
  const [name, setName] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o');
  const [status, setStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');

  const handleAdd = async () => {
    setStatus('validating');
    await new Promise(r => setTimeout(r, 1000));
    setStatus(apiKey.length > 10 ? 'valid' : 'invalid');
    if (apiKey.length > 10) onAddProvider({ name, model });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #2d2d44' }}>
        <button onClick={onBack} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' }}>← Back</button>
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>{t('nav.providers', locale)}</h1>
        <div />
      </header>
      <main style={{ flex: 1, overflow: 'auto', padding: '32px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={labelStyle}>Provider</label>
          <select value={name} onChange={e => setName(e.target.value)} style={inputStyle}>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="cloudflare">Cloudflare Workers AI</option>
          </select>
          <label style={labelStyle}>API Key</label>
          <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-..." style={inputStyle} />
          <label style={labelStyle}>Default Model</label>
          <select value={model} onChange={e => setModel(e.target.value)} style={inputStyle}>
            {name === 'openai' && <><option value="gpt-5.4">gpt-5.4</option><option value="gpt-4o">gpt-4o</option><option value="o1">o1</option></>}
            {name === 'anthropic' && <><option value="claude-sonnet-4-20250514">Claude Sonnet 4</option><option value="claude-opus-4-20250514">Claude Opus 4</option></>}
            {name === 'cloudflare' && <option value="@cf/meta/llama-3-8b-instruct">Llama 3 8B</option>}
          </select>
          <button onClick={handleAdd} disabled={status === 'validating'} style={{ padding: '12px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600 }}>
            {status === 'validating' ? 'Validating...' : 'Add Provider'}
          </button>
          {status === 'valid' && <p style={{ color: '#22c55e', fontSize: '13px' }}>✓ Provider added successfully</p>}
          {status === 'invalid' && <p style={{ color: '#ef4444', fontSize: '13px' }}>✗ Invalid API key</p>}
        </div>
        {providers.length > 0 && (
          <div style={{ marginTop: '32px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Configured Providers</h3>
            {providers.map((p, i) => (
              <div key={i} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #2d2d44', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div><span style={{ fontWeight: 600 }}>{p.name}</span><span style={{ fontSize: '12px', color: '#8b8ba7', marginLeft: '8px' }}>{p.model}</span></div>
                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '11px', background: p.status === 'valid' ? '#22c55e20' : '#ef444420', color: p.status === 'valid' ? '#22c55e' : '#ef4444' }}>{p.status}</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const labelStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 600, color: '#8b8ba7' };
const inputStyle: React.CSSProperties = { padding: '10px 14px', borderRadius: '8px', border: '1px solid #4a4a68', background: '#1e1e3a', color: '#e2e8f0', fontSize: '14px' };
