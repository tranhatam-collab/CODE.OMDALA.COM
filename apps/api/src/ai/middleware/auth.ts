import type { Context } from 'hono';
import { jwt } from 'hono/jwt';
import { parseEnv } from '@omcode/config';

export function authMiddleware() {
  return async (c: Context, next: () => Promise<void>) => {
    // Note: getEnv implementation needs to be compatible with Cloudflare Bindings
    // Using simple approach for now
    const env = parseEnv(c.env as any); 
    if (env.nodeEnv === 'development') {
      c.set('user', { id: 'dev-user', workspaceId: 'dev-ws', role: 'admin' });
      return next();
    }
    const jwtMiddleware = jwt({ secret: env.jwtSecret || 'dev-secret' });
    return jwtMiddleware(c, next);
  };
}
