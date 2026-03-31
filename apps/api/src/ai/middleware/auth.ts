import type { Context } from 'hono';
import { jwt } from 'hono/jwt';
import { getEnv } from '../config/env';

export function authMiddleware() {
  return async (c: Context, next: () => Promise<void>) => {
    const env = getEnv(c);
    if (env.NODE_ENV === 'development') {
      c.set('user', { id: 'dev-user', workspaceId: 'dev-ws', role: 'admin' });
      return next();
    }
    const jwtMiddleware = jwt({ secret: env.JWT_SECRET || 'dev-secret' });
    return jwtMiddleware(c, next);
  };
}
