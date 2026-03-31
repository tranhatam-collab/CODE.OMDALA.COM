import type { Context } from 'hono';
import { AiRequestSchema } from '@omcode/schemas';
import { errorResponse } from '../errors/formatter';

export function validateRequest(c: Context) {
  const result = AiRequestSchema.safeParse(c.req.json());
  if (!result.success) {
    return errorResponse(c, 'INVALID_REQUEST', result.error.errors.map(e => e.message).join(', '));
  }
  return result.data;
}
