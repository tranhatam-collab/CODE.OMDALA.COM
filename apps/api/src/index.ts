import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.json({ status: 'ok', service: 'omcode-api' }));
app.get('/health', (c) => c.json({ status: 'healthy' }));

export default app;
