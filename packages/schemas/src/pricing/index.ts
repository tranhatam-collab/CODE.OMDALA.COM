export interface ModelPricing {
  provider: string;
  model: string;
  inputPerMillion: number;
  outputPerMillion: number;
  currency: string;
}

export const PRICING: ModelPricing[] = [
  {
    provider: 'openai',
    model: 'gpt-5.4',
    inputPerMillion: 10,
    outputPerMillion: 30,
    currency: 'USD',
  },
  {
    provider: 'openai',
    model: 'gpt-4o',
    inputPerMillion: 5,
    outputPerMillion: 15,
    currency: 'USD',
  },
  {
    provider: 'anthropic',
    model: 'claude-sonnet-4',
    inputPerMillion: 3,
    outputPerMillion: 15,
    currency: 'USD',
  },
  {
    provider: 'anthropic',
    model: 'claude-opus-4',
    inputPerMillion: 15,
    outputPerMillion: 75,
    currency: 'USD',
  },
  {
    provider: 'anthropic',
    model: 'claude-haiku',
    inputPerMillion: 0.25,
    outputPerMillion: 1.25,
    currency: 'USD',
  },
  {
    provider: 'cloudflare',
    model: '@cf/meta/llama-3',
    inputPerMillion: 0,
    outputPerMillion: 0,
    currency: 'USD',
  },
];

export function estimateCost(
  provider: string,
  model: string,
  inputTokens: number,
  outputTokens: number,
): number {
  const entry = PRICING.find((p) => p.provider === provider && p.model === model);
  if (!entry) return 0;
  return (
    (inputTokens / 1_000_000) * entry.inputPerMillion +
    (outputTokens / 1_000_000) * entry.outputPerMillion
  );
}
