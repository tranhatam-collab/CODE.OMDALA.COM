import { useEffect, useState } from 'react';

interface Props {
  locale: 'vi' | 'en';
  onBack: () => void;
}

export default function DiagnosticsScreen({ locale, onBack }: Props) {
  const [info, setInfo] = useState<Record<string, unknown>>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      Promise.all([window.electronAPI.getVersion(), window.electronAPI.getPlatform()]).then(
        ([version, platform]) => setInfo({ version, platform }),
      );
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>Diagnostics</h1>
        <div />
      </header>
      <main
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '32px',
          maxWidth: '480px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <pre
          style={{
            fontSize: '13px',
            color: '#e2e8f0',
            background: '#1e1e3a',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          {JSON.stringify(info, null, 2)}
        </pre>
      </main>
    </div>
  );
}
