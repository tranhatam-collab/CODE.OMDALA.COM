export type ThemeMode = 'light' | 'dark' | 'system';

export interface DesignTokens {
  colors: {
    bg: { primary: string; secondary: string; tertiary: string; };
    fg: { primary: string; secondary: string; muted: string; };
    border: { default: string; focus: string; error: string; };
    accent: { primary: string; hover: string; active: string; };
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: { xs: string; sm: string; md: string; lg: string; xl: string; xxl: string; };
  typography: {
    fontFamily: string;
    fontFamilyMono: string;
    sizes: { xs: string; sm: string; md: string; lg: string; xl: string; xxl: string; };
    weights: { normal: number; medium: number; semibold: number; bold: number; };
  };
  radius: { sm: string; md: string; lg: string; full: string; };
  shadows: { sm: string; md: string; lg: string; };
  transitions: { fast: string; normal: string; slow: string; };
}

export const tokens: DesignTokens = {
  colors: {
    bg: { primary: '#ffffff', secondary: '#f8f9fa', tertiary: '#f1f3f5' },
    fg: { primary: '#1a1a2e', secondary: '#4a4a68', muted: '#8b8ba7' },
    border: { default: '#e2e8f0', focus: '#3b82f6', error: '#ef4444' },
    accent: { primary: '#3b82f6', hover: '#2563eb', active: '#1d4ed8' },
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyMono: '"SF Mono", "Fira Code", "JetBrains Mono", monospace',
    sizes: { xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '24px', xxl: '32px' },
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  },
  radius: { sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  transitions: { fast: '150ms ease', normal: '250ms ease', slow: '350ms ease' },
};

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type BadgeVariant = StatusType;
