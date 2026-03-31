import type { Context, MiddlewareHandler } from 'hono';

export const timingMiddleware: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  c.header('X-Response-Time', `${duration}ms`);
  c.set('duration', duration);
};
