import type { Context } from 'hono';
import { getAllProviders, getProvider } from '../providers/registry';

const DEFAULT_MODEL_MAP: Record<string, string> = {
  plan: 'gpt-5.4',
  build: 'gpt-5.4',
  review: 'claude-sonnet-4-20250514',
  chat: 'gpt-4o',
  summarize: 'claude-haiku',
  docs: 'claude-sonnet-4-20250514',
  release: 'claude-sonnet-4-20250514',
  guardrail: 'claude-haiku',
  'test-gen': 'gpt-4o',
  'patch-explain': 'claude-haiku',
  'commit-draft': 'claude-haiku',
};

export function selectProvider(task: string, preferredModel?: string) {
  const model = preferredModel || DEFAULT_MODEL_MAP[task] || 'gpt-4o';
  const providers = getAllProviders();
  if (providers.length === 0) return null;
  return { provider: providers[0], model };
}
