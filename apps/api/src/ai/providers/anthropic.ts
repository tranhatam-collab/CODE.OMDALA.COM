import type { ProviderAdapter } from './interface';
import { estimateCost } from '@omcode/schemas';

export class AnthropicAdapter implements ProviderAdapter {
  name = 'anthropic';
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chatCompletion(messages: Array<{ role: string; content: string }>, options?: Record<string, unknown>) {
    const systemMsg = messages.find(m => m.role === 'system');
    const userMsgs = messages.filter(m => m.role !== 'system');
    const anthropicMessages = userMsgs.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }));
    const res = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': this.apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: options?.model || 'claude-sonnet-4-20250514', messages: anthropicMessages, system: systemMsg?.content, max_tokens: options?.maxTokens || 4096 }),
    });
    if (!res.ok) throw new Error(`Anthropic error: ${res.status} ${res.statusText}`);
    const data = await res.json() as { content: Array<{ text: string }>; usage: { input_tokens: number; output_tokens: number } };
    return { content: data.content[0]?.text || '', usage: { inputTokens: data.usage?.input_tokens || 0, outputTokens: data.usage?.output_tokens || 0 } };
  }

  async getModels() { return ['claude-opus-4-20250514', 'claude-sonnet-4-20250514', 'claude-haiku']; }
  async getHealth() { return { status: 'healthy' as const }; }
  getCost(inputTokens: number, outputTokens: number, model: string) { return estimateCost(this.name, model, inputTokens, outputTokens); }
}
