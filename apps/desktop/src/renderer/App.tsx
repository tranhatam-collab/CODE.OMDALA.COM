import { useEffect, useState } from 'react';
import CommandCenter from './screens/CommandCenter';
import DiagnosticsScreen from './screens/DiagnosticsScreen';
import HomeScreen from './screens/HomeScreen';
import ProjectWorkspace from './screens/ProjectWorkspace';
import ProviderSetup from './screens/ProviderSetup';
import SettingsScreen from './screens/SettingsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import type { AppState, ProjectInfo } from './store/types';

export default function App() {
  const [state, setState] = useState<AppState>({
    screen: 'welcome',
    locale: 'vi',
    projects: [],
    currentProject: null,
    providers: [],
    sessions: [],
    commands: [],
    settings: { theme: 'dark', privacyMode: false },
  });

  useEffect(() => {
    const saved = localStorage.getItem('omcode-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState((prev) => ({
          ...prev,
          ...parsed,
          screen: parsed.projects.length > 0 ? 'home' : 'welcome',
        }));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'omcode-state',
      JSON.stringify({
        locale: state.locale,
        projects: state.projects,
        providers: state.providers,
        settings: state.settings,
      }),
    );
  }, [state.locale, state.projects, state.providers, state.settings]);

  const navigate = (screen: AppState['screen']) => setState((prev) => ({ ...prev, screen }));
  const setLocale = (locale: 'vi' | 'en') => setState((prev) => ({ ...prev, locale }));
  const _addProject = (project: ProjectInfo) =>
    setState((prev) => ({ ...prev, projects: [...prev.projects, project] }));
  const setCurrentProject = (project: ProjectInfo | null) =>
    setState((prev) => ({
      ...prev,
      currentProject: project,
      screen: project ? 'workspace' : 'home',
    }));
  const addProvider = (provider: { name: string; model: string }) =>
    setState((prev) => ({
      ...prev,
      providers: [...prev.providers, { ...provider, status: 'valid' as const }],
    }));

  switch (state.screen) {
    case 'welcome':
      return (
        <WelcomeScreen
          locale={state.locale}
          setLocale={setLocale}
          onContinue={() => navigate('home')}
        />
      );
    case 'home':
      return (
        <HomeScreen
          locale={state.locale}
          projects={state.projects}
          providers={state.providers}
          onNavigate={navigate}
          onSelectProject={setCurrentProject}
          onAddProject={() => navigate('openProject')}
        />
      );
    case 'workspace':
      return state.currentProject ? (
        <ProjectWorkspace
          locale={state.locale}
          project={state.currentProject}
          onBack={() => navigate('home')}
        />
      ) : (
        <HomeScreen
          locale={state.locale}
          projects={state.projects}
          providers={state.providers}
          onNavigate={navigate}
          onSelectProject={setCurrentProject}
          onAddProject={() => navigate('openProject')}
        />
      );
    case 'providers':
      return (
        <ProviderSetup
          locale={state.locale}
          providers={state.providers}
          onAddProvider={addProvider}
          onBack={() => navigate('home')}
        />
      );
    case 'settings':
      return (
        <SettingsScreen
          locale={state.locale}
          settings={state.settings}
          onBack={() => navigate('home')}
        />
      );
    case 'diagnostics':
      return <DiagnosticsScreen locale={state.locale} onBack={() => navigate('home')} />;
    case 'commandCenter':
      return (
        <CommandCenter
          locale={state.locale}
          commands={state.commands}
          onBack={() => navigate('home')}
        />
      );
    case 'openProject':
      return (
        <HomeScreen
          locale={state.locale}
          projects={state.projects}
          providers={state.providers}
          onNavigate={navigate}
          onSelectProject={setCurrentProject}
          onAddProject={() => navigate('openProject')}
        />
      );
    default:
      return (
        <HomeScreen
          locale={state.locale}
          projects={state.projects}
          providers={state.providers}
          onNavigate={navigate}
          onSelectProject={setCurrentProject}
          onAddProject={() => navigate('openProject')}
        />
      );
  }
}
