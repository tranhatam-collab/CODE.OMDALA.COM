import { t } from '@omcode/i18n';

interface Props { locale: 'vi' | 'en'; onBack: () => void; }

export default function SettingsScreen({ locale, onBack }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #2d2d44' }}>
        <button onClick={onBack} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' }}>← Back</button>
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>{t('nav.settings', locale) || 'Settings'}</h1>
        <div />
      </header>
      <main style={{ flex: 1, overflow: 'auto', padding: '32px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#8b8ba7' }}>Language</label>
            <p style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '4px' }}>{locale === 'vi' ? 'Tiếng Việt' : 'English'}</p>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#8b8ba7' }}>Theme</label>
            <p style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '4px' }}>Dark (default)</p>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#8b8ba7' }}>Privacy Mode</label>
            <p style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '4px' }}>Off — API keys are stored in keychain</p>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#8b8ba7' }}>Command Policy</label>
            <p style={{ fontSize: '14px', color: '#e2e8f0', marginTop: '4px' }}>Safe commands auto-execute, others require approval</p>
          </div>
        </div>
      </main>
    </div>
  );
}
