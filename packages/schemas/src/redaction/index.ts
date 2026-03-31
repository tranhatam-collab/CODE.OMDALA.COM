import { z } from 'zod';

export const RedactionPatternSchema = z.object({
  name: z.string(),
  pattern: z.string(),
  replacement: z.string().default('[REDACTED]'),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
});
export type RedactionPattern = z.infer<typeof RedactionPatternSchema>;

export const DEFAULT_PATTERNS: RedactionPattern[] = [
  { name: 'openai_key', pattern: 'sk-[a-zA-Z0-9]{20,}', replacement: '[OPENAI_KEY]', severity: 'critical' },
  { name: 'anthropic_key', pattern: 'sk-ant-[a-zA-Z0-9]{20,}', replacement: '[ANTHROPIC_KEY]', severity: 'critical' },
  { name: 'github_token', pattern: 'ghp_[a-zA-Z0-9]{36}', replacement: '[GITHUB_TOKEN]', severity: 'critical' },
  { name: 'generic_secret', pattern: '(?i)(secret|password|token|key)\\s*[:=]\\s*\\S+', replacement: '[SECRET]', severity: 'high' },
  { name: 'env_var', pattern: '\\$\\{?[A-Z_]+\\}?', replacement: '[ENV_VAR]', severity: 'medium' },
];

export function redact(input: string, patterns: RedactionPattern[] = DEFAULT_PATTERNS): string {
  let result = input;
  for (const p of patterns) {
    result = result.replace(new RegExp(p.pattern, 'g'), p.replacement);
  }
  return result;
}
