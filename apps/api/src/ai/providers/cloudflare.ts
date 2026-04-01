import type { ProviderAdapter } from './interface';

export class CloudflareAdapter implements ProviderAdapter {
  name = 'cloudflare';
  private apiToken: string;
  private baseUrl: string;

  constructor(apiToken: string, accountId: string) {
    this.apiToken = apiToken;
    this.accountId = accountId;
    this.baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run`;
  }

  async chatCompletion(
    messages: Array<{ role: string; content: string }>,
    options?: Record<string, unknown>,
  ) {
    const model = (options?.model as string) || '@cf/meta/llama-3-8b-instruct';
    const res = await fetch(`${this.baseUrl}/${model}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiToken}` },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok) throw new Error(`Cloudflare AI error: ${res.status} ${res.statusText}`);
    const data = (await res.json()) as { result: { response: string } };
    const content = data.result?.response || '';
    const tokenEstimate = Math.ceil(content.length / 4);
    return { content, usage: { inputTokens: 0, outputTokens: tokenEstimate } };
  }

  async getModels() {
    return [
      '@cf/meta/llama-3-8b-instruct',
      '@cf/meta/llama-3.1-8b-instruct',
      '@cf/qwen/qwen1.5-7b-chat',
    ];
  }
  async getHealth() {
    return { status: 'healthy' as const };
  }
  getCost() {
    return 0;
  }
}
