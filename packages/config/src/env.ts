export interface EnvConfig {
  nodeEnv: 'development' | 'production' | 'test';
  apiUrl: string;
  appUrl: string;
  logLevel: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  cloudflareApiToken?: string;
  cloudflareAccountId?: string;
  jwtSecret?: string;
  jwtExpiresIn: string;
}

export function parseEnv(env: Record<string, string | undefined>): EnvConfig {
  return {
    nodeEnv: (env.NODE_ENV as EnvConfig['nodeEnv']) || 'development',
    apiUrl: env.NEXT_PUBLIC_API_URL || 'http://localhost:8787',
    appUrl: env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    logLevel: env.LOG_LEVEL || 'info',
    openaiApiKey: env.OPENAI_API_KEY,
    anthropicApiKey: env.ANTHROPIC_API_KEY,
    cloudflareApiToken: env.CLOUDFLARE_API_TOKEN,
    cloudflareAccountId: env.CLOUDFLARE_ACCOUNT_ID,
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN || '7d',
  };
}

export function requireEnv(key: string, env: Record<string, string | undefined>): string {
  const value = env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
