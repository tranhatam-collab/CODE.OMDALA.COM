import { getPromptsByTask } from '@omcode/prompts';
import type { AiRequest } from '@omcode/schemas';
import { Hono, type Context } from 'hono';
import { cors } from 'hono/cors';
import { errorResponse } from './ai/errors/formatter';
import { redactRequest } from './ai/guardrails/redact';
import { validateRequest } from './ai/guardrails/validate';
import { authMiddleware } from './ai/middleware/auth';
import { rateLimitMiddleware } from './ai/middleware/rate-limit';
import { timingMiddleware } from './ai/middleware/timing';
import { initializeProviders } from './ai/providers/registry';
import { selectProvider } from './ai/routing/router';
import { RepoMapMcpServer } from './mcp/servers/repo-map';

const app = new Hono<{
  Bindings: {
    OPENAI_API_KEY: string;
    ANTHROPIC_API_KEY: string;
    CLOUDFLARE_API_TOKEN: string;
    CLOUDFLARE_ACCOUNT_ID: string;
  };
}>();

app.use('*', cors());
app.use('*', timingMiddleware);
app.use('/v1/*', rateLimitMiddleware(60, 60000));
app.use('/v1/*', authMiddleware());

// Initialize providers dynamically from environment
const init = (c: Context) =>
  initializeProviders({
    OPENAI_API_KEY: c.env.OPENAI_API_KEY,
    ANTHROPIC_API_KEY: c.env.ANTHROPIC_API_KEY,
    CLOUDFLARE_API_TOKEN: c.env.CLOUDFLARE_API_TOKEN,
    CLOUDFLARE_ACCOUNT_ID: c.env.CLOUDFLARE_ACCOUNT_ID,
  });

app.get('/', (c) => c.json({ status: 'ok', service: 'omcode-api', version: '0.1.0' }));
app.get('/health', (c) => c.json({ status: 'healthy' }));

const ai = app.basePath('/v1/ai');

ai.post('/plan', async (c) => {
  init(c);
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const selected = selectProvider('plan', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion(
      [
        { role: 'system', content: 'You are a coding planner.' },
        {
          role: 'user',
          content: JSON.stringify(redactRequest(req.context as Record<string, unknown>)),
        },
      ],
      { model: selected.model },
    );
    return c.json({
      id: crypto.randomUUID(),
      task: 'plan',
      model: selected.model,
      provider: selected.provider.name,
      status: 'success',
      data: { content: result.content },
      usage: {
        ...result.usage,
        cost: selected.provider.getCost(
          result.usage.inputTokens,
          result.usage.outputTokens,
          selected.model,
        ),
        currency: 'USD',
      },
      meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true },
    });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

ai.post('/chat', async (c) => {
  init(c);
  const validated = validateRequest(c);
  if ('status' in validated) return validated;
  const req = validated as AiRequest;
  const selected = selectProvider('chat', req.model);
  if (!selected) return errorResponse(c, 'PROVIDER_ERROR', 'No providers configured', 503);
  try {
    const result = await selected.provider.chatCompletion(
      [
        { role: 'system', content: 'You are a coding assistant.' },
        { role: 'user', content: req.context.userMessage },
      ],
      { model: selected.model },
    );
    return c.json({
      id: crypto.randomUUID(),
      task: 'chat',
      model: selected.model,
      provider: selected.provider.name,
      status: 'success',
      data: { content: result.content },
      usage: {
        ...result.usage,
        cost: selected.provider.getCost(
          result.usage.inputTokens,
          result.usage.outputTokens,
          selected.model,
        ),
        currency: 'USD',
      },
      meta: { duration: 0, retries: 0, fallback: false, guardrailsPassed: true },
    });
  } catch (e) {
    return errorResponse(c, 'PROVIDER_ERROR', e instanceof Error ? e.message : 'Unknown error');
  }
});

// Internal routes
const guardrails = app.basePath('/internal/guardrails');
guardrails.post('/policy-check', async (c) => {
  await c.req.json();
  // Simplified policy check
  return c.json({ passed: true, violations: [], score: 1 });
});

const context = app.basePath('/internal/context');
context.get('/repo-map', async (c) => {
  const repoPath = c.req.query('path') || '/';
  const server = new RepoMapMcpServer(repoPath);
  return c.json(await server.buildRepoMap());
});
context.get('/prompt-registry', (c) => {
  return c.json({ prompts: getPromptsByTask(c.req.query('task') || 'chat') });
});

export default app;
