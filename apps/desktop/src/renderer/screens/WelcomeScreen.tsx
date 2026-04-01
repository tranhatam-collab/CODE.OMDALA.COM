import { t } from '@omcode/i18n';

interface Props {
  locale: 'vi' | 'en';
  setLocale: (l: 'vi' | 'en') => void;
  onContinue: () => void;
}

export default function WelcomeScreen({ locale, setLocale, onContinue }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '48px',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
          OMCODE
        </h1>
        <p style={{ fontSize: '18px', color: '#8b8ba7' }}>{t('home.subtitle', locale)}</p>
      </div>
      <div style={{ marginBottom: '32px', display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setLocale('vi')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: locale === 'vi' ? '2px solid #3b82f6' : '1px solid #4a4a68',
            background: locale === 'vi' ? '#3b82f620' : 'transparent',
            color: '#e2e8f0',
          }}
        >
          Tiếng Việt
        </button>
        <button
          onClick={() => setLocale('en')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: locale === 'en' ? '2px solid #3b82f6' : '1px solid #4a4a68',
            background: locale === 'en' ? '#3b82f620' : 'transparent',
            color: '#e2e8f0',
          }}
        >
          English
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
        <button
          onClick={onContinue}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            background: '#3b82f6',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
          }}
        >
          {t('cta.download', locale)}
        </button>
        <button
          onClick={onContinue}
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            border: '1px solid #4a4a68',
            background: 'transparent',
            color: '#e2e8f0',
            fontSize: '16px',
          }}
        >
          {t('state.continue', locale) || 'Continue'}
        </button>
      </div>
      <p style={{ marginTop: '48px', fontSize: '12px', color: '#8b8ba7' }}>
        v0.1.0-alpha • macOS only
      </p>
    </div>
  );
}
