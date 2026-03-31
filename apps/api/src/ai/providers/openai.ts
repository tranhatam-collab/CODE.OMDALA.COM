import type { ProviderAdapter } from './interface';
import { estimateCost } from '@omcode/schemas';

export class OpenAIAdapter implements ProviderAdapter {
  name = 'openai';
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chatCompletion(messages: Array<{ role: string; content: string }>, options?: Record<string, unknown>) {
    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model: options?.model || 'gpt-4o', messages, ...options }),
    });
    if (!res.ok) throw new Error(`OpenAI error: ${res.status} ${res.statusText}`);
    const data = await res.json() as { choices: Array<{ message: { content: string } }>; usage: { prompt_tokens: number; completion_tokens: number } };
    return { content: data.choices[0]?.message?.content || '', usage: { inputTokens: data.usage?.prompt_tokens || 0, outputTokens: data.usage?.completion_tokens || 0 } };
  }

  async getModels() { return ['gpt-5.4', 'gpt-4o', 'o1', 'o3-mini']; }
  async getHealth() { return { status: 'healthy' as const }; }
  getCost(inputTokens: number, outputTokens: number, model: string) { return estimateCost(this.name, model, inputTokens, outputTokens); }
}
