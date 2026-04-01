export interface ElectronAPI {
  openFolder: () => Promise<string | null>;
  isGitRepo: (path: string) => Promise<boolean>;
  listDir: (path: string) => Promise<Array<{ name: string; isDirectory: boolean; path: string }>>;
  readFile: (path: string) => Promise<string | { error: string }>;
  runCommand: (command: string) => Promise<string>;
  getVersion: () => Promise<string>;
  getPlatform: () => Promise<{
    platform: string;
    arch: string;
    nodeVersion: string;
    electronVersion: string;
  }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
