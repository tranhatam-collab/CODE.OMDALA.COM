export interface ProviderAdapter {
  name: string;
  chatCompletion(
    messages: Array<{ role: string; content: string }>,
    options?: Record<string, unknown>,
  ): Promise<{ content: string; usage: { inputTokens: number; outputTokens: number } }>;
  getModels(): Promise<string[]>;
  getHealth(): Promise<{ status: 'healthy' | 'degraded' | 'down' }>;
  getCost(inputTokens: number, outputTokens: number, model: string): number;
}
