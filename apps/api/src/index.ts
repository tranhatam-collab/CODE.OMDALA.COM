import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => c.json({ status: 'ok', service: 'omcode-api', version: '0.0.1' }));
app.get('/health', (c) => c.json({ status: 'healthy' }));

// Public AI routes stub
const ai = app.basePath('/v1/ai');
ai.post('/plan', (c) => c.json({ task: 'plan', status: 'stub' }));
ai.post('/review', (c) => c.json({ task: 'review', status: 'stub' }));
ai.post('/chat', (c) => c.json({ task: 'chat', status: 'stub' }));
ai.post('/patch-explain', (c) => c.json({ task: 'patch-explain', status: 'stub' }));
ai.get('/models', (c) => c.json({ models: [] }));
ai.get('/providers', (c) => c.json({ providers: [] }));

// Internal guardrails stub
const guardrails = app.basePath('/internal/guardrails');
guardrails.post('/policy-check', (c) => c.json({ passed: true }));

// Internal context stub
const context = app.basePath('/internal/context');
context.get('/repo-map', (c) => c.json({ files: [] }));
context.get('/prompt-registry', (c) => c.json({ prompts: [] }));

export default app;
