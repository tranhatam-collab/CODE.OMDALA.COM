export type ScreenName = 'welcome' | 'home' | 'workspace' | 'providers' | 'settings' | 'diagnostics' | 'commandCenter' | 'openProject';
export type ThemeMode = 'light' | 'dark';
export interface ProjectInfo { id: string; name: string; path: string; branch?: string; isGitRepo: boolean; }
export interface ProviderInfo { name: string; model: string; status: 'valid' | 'invalid' | 'unknown'; }
export interface SessionInfo { id: string; projectId: string; model: string; status: 'active' | 'completed'; messageCount: number; }
export interface CommandEntry { id: string; command: string; status: 'pending' | 'approved' | 'rejected' | 'running' | 'completed'; tier: 'safe' | 'review' | 'dangerous'; output?: string; }
export interface AppSettings { theme: ThemeMode; privacyMode: boolean; }
export interface AppState {
  screen: ScreenName;
  locale: 'vi' | 'en';
  projects: ProjectInfo[];
  currentProject: ProjectInfo | null;
  providers: ProviderInfo[];
  sessions: SessionInfo[];
  commands: CommandEntry[];
  settings: AppSettings;
}
