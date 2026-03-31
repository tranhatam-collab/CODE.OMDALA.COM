import { useState } from 'react';
import { t } from '@omcode/i18n';
import type { ProjectInfo, ProviderInfo } from '../store/types';

interface Props {
  locale: 'vi' | 'en';
  projects: ProjectInfo[];
  providers: ProviderInfo[];
  onNavigate: (screen: string) => void;
  onSelectProject: (project: ProjectInfo) => void;
  onAddProject: () => void;
}

export default async function HomeScreen({ locale, projects, providers, onNavigate, onSelectProject, onAddProject }: Props) {
  const handleOpenFolder = async () => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      const path = await window.electronAPI.openFolder();
      if (path) {
        const isRepo = await window.electronAPI.isGitRepo(path);
        const name = path.split('/').pop() || path;
        onSelectProject({ id: crypto.randomUUID(), name, path, isGitRepo });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid #2d2d44' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600 }}>OMCODE</h1>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => onNavigate('providers')} style={navBtn}>{t('nav.providers', locale)}</button>
          <button onClick={() => onNavigate('settings')} style={navBtn}>{t('nav.settings', locale) || 'Settings'}</button>
        </nav>
      </header>
      <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t('home.recent_projects', locale) || 'Recent Projects'}</h2>
          {projects.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', border: '1px dashed #4a4a68', borderRadius: '8px' }}>
              <p style={{ color: '#8b8ba7', marginBottom: '16px' }}>{t('empty.projects', locale)}</p>
              <button onClick={handleOpenFolder} style={primaryBtn}>{t('cta.open_project', locale) || 'Open Project'}</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {projects.map(p => (
                <div key={p.id} onClick={() => onSelectProject(p)} style={card}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{p.name}</h3>
                  <p style={{ fontSize: '12px', color: '#8b8ba7' }}>{p.path}</p>
                  {p.isGitRepo && <span style={badge}>Git</span>}
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>{t('home.connected_providers', locale) || 'Connected Providers'}</h2>
          {providers.length === 0 ? (
            <p style={{ color: '#8b8ba7' }}>{t('empty.providers', locale)}</p>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              {providers.map((p, i) => (
                <div key={i} style={providerCard}>
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: '12px', color: '#8b8ba7' }}>{p.model}</span>
                  <span style={{ ...badge, background: p.status === 'valid' ? '#22c55e20' : '#ef444420', color: p.status === 'valid' ? '#22c55e' : '#ef4444' }}>{p.status}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const navBtn: React.CSSProperties = { padding: '8px 12px', borderRadius: '6px', border: '1px solid #4a4a68', background: 'transparent', color: '#e2e8f0', fontSize: '13px' };
const primaryBtn: React.CSSProperties = { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '14px', fontWeight: 600 };
const card: React.CSSProperties = { padding: '16px', borderRadius: '8px', border: '1px solid #2d2d44', background: '#1e1e3a', cursor: 'pointer' };
const badge: React.CSSProperties = { display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: '#3b82f620', color: '#3b82f6', marginTop: '8px' };
const providerCard: React.CSSProperties = { padding: '12px 16px', borderRadius: '8px', border: '1px solid #2d2d44', background: '#1e1e3a', display: 'flex', flexDirection: 'column', gap: '4px' };
