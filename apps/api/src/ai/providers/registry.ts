import type { ProviderAdapter } from './interface';
import { OpenAIAdapter } from './openai';
import { AnthropicAdapter } from './anthropic';
import { CloudflareAdapter } from './cloudflare';

const registry = new Map<string, ProviderAdapter>();

export function registerProvider(adapter: ProviderAdapter) {
  registry.set(adapter.name, adapter);
}

export function getProvider(name: string): ProviderAdapter | undefined {
  return registry.get(name);
}

export function getAllProviders(): ProviderAdapter[] {
  return Array.from(registry.values());
}

export function initializeProviders(env: { OPENAI_API_KEY?: string; ANTHROPIC_API_KEY?: string; CLOUDFLARE_API_TOKEN?: string; CLOUDFLARE_ACCOUNT_ID?: string }) {
  if (env.OPENAI_API_KEY) registerProvider(new OpenAIAdapter(env.OPENAI_API_KEY));
  if (env.ANTHROPIC_API_KEY) registerProvider(new AnthropicAdapter(env.ANTHROPIC_API_KEY));
  if (env.CLOUDFLARE_API_TOKEN && env.CLOUDFLARE_ACCOUNT_ID) registerProvider(new CloudflareAdapter(env.CLOUDFLARE_API_TOKEN, env.CLOUDFLARE_ACCOUNT_ID));
}
