import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { timingMiddleware } from './ai/middleware/timing';
import { rateLimitMiddleware } from './ai/middleware/rate-limit';
import { authMiddleware } from './ai/middleware/auth';
import { initializeProviders } from './ai/providers/registry';
import { errorResponse } from './ai/errors/formatter';
import { redactRequest } from './ai/guardrails/redact';
import { validateRequest } from './ai/guardrails/validate';
import { selectProvider } from './ai/routing/router';
import type { AiRequest } from '@omcode/schemas';

const app = new Hono();

app.use('*', cors());
app.use('*', timingMiddleware);
app.use('/v1/*', rateLimitMiddleware(60, 60000));
app.use('/v1/*', authMiddleware());

app.get('/', (c) => c.json({ status: 'ok', service: 'omcode-api', version: '0.0.1' }));
app.get('/health', (c) => c.json({ status: 'healthy' }));

// Public AI routes
const ai = app.basePath('/v1/ai');

ai.post('/plan', async (c) => {
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const redacted = redactRequest(req.context as Record<string, unknown>);
  const selected = selectProvider('plan', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion([
      { role: 'system', content: 'You are a coding planner assistant.' },
      { role: 'user', content: JSON.stringify(redacted) },
    ], { model: selected.model });
    return c.json({ id: crypto.randomUUID(), task: 'plan', model: selected.model, provider: selected.provider.name, status: 'success', data: { content: result.content }, usage: { ...result.usage, cost: selected.provider.getCost(result.usage.inputTokens, result.usage.outputTokens, selected.model), currency: 'USD' }, meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true } });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

ai.post('/review', async (c) => {
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const selected = selectProvider('review', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion([
      { role: 'system', content: 'You are a code review assistant.' },
      { role: 'user', content: JSON.stringify(redactRequest(req.context as Record<string, unknown>)) },
    ], { model: selected.model });
    return c.json({ id: crypto.randomUUID(), task: 'review', model: selected.model, provider: selected.provider.name, status: 'success', data: { content: result.content }, usage: { ...result.usage, cost: selected.provider.getCost(result.usage.inputTokens, result.usage.outputTokens, selected.model), currency: 'USD' }, meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true } });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

ai.post('/chat', async (c) => {
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const selected = selectProvider('chat', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion([
      { role: 'system', content: 'You are a coding assistant.' },
      { role: 'user', content: req.context.userMessage },
    ], { model: selected.model });
    return c.json({ id: crypto.randomUUID(), task: 'chat', model: selected.model, provider: selected.provider.name, status: 'success', data: { content: result.content }, usage: { ...result.usage, cost: selected.provider.getCost(result.usage.inputTokens, result.usage.outputTokens, selected.model), currency: 'USD' }, meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true } });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

ai.post('/patch-explain', async (c) => {
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const selected = selectProvider('patch-explain', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion([
      { role: 'system', content: 'You explain code changes clearly.' },
      { role: 'user', content: JSON.stringify(redactRequest(req.context as Record<string, unknown>)) },
    ], { model: selected.model });
    return c.json({ id: crypto.randomUUID(), task: 'patch-explain', model: selected.model, provider: selected.provider.name, status: 'success', data: { content: result.content }, usage: { ...result.usage, cost: selected.provider.getCost(result.usage.inputTokens, result.usage.outputTokens, selected.model), currency: 'USD' }, meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true } });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

ai.get('/models', async (c) => {
  const providers = getAllProviders();
  const models: Array<{ provider: string; models: string[] }> = [];
  for (const p of providers) { models.push({ provider: p.name, models: await p.getModels() }); }
  return c.json({ models });
});

ai.get('/providers', async (c) => {
  const providers = getAllProviders();
  const health = await Promise.all(providers.map(async (p) => ({ name: p.name, ...(await p.getHealth()) })));
  return c.json({ providers: health });
});

// Internal guardrails
const guardrails = app.basePath('/internal/guardrails');
guardrails.post('/policy-check', (c) => c.json({ passed: true, violations: [], score: 1 }));
guardrails.post('/redact', async (c) => {
  const body = await c.req.json();
  const { sanitized, redactedCount } = require('./guardrails/redact').redactInput(body.input || '');
  return c.json({ sanitized, redactedCount });
});

// Internal context
const context = app.basePath('/internal/context');
context.get('/repo-map', (c) => c.json({ files: [], directories: [] }));
context.get('/prompt-registry', (c) => c.json({ prompts: [] }));

// Initialize providers on startup
initializeProviders({
  OPENAI_API_KEY: '',
  ANTHROPIC_API_KEY: '',
  CLOUDFLARE_API_TOKEN: '',
  CLOUDFLARE_ACCOUNT_ID: '',
});

export default app;
