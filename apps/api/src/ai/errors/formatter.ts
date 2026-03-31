import type { Context } from 'hono';
import { createError, type ErrorCode } from '../errors/taxonomy';

export function errorResponse(c: Context, code: ErrorCode, details?: string, status: number = 400) {
  const error = createError(code, details);
  return c.json({ error }, status);
}
