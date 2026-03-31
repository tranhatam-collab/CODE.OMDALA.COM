import type { Context, MiddlewareHandler } from 'hono';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export const rateLimitMiddleware = (limit: number = 60, windowMs: number = 60000): MiddlewareHandler => {
  return async (c, next) => {
    const key = c.req.header('x-forwarded-for') || c.req.header('cf-connecting-ip') || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    } else {
      entry.count++;
      if (entry.count > limit) {
        return c.json({ error: { code: 'RATE_LIMITED', message: 'Too many requests', retryable: true, suggestion: 'Wait before retrying' } }, 429);
      }
    }

    c.header('X-RateLimit-Limit', String(limit));
    c.header('X-RateLimit-Remaining', String(limit - (entry?.count || 1)));
    await next();
  };
};
