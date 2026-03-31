import { redact, DEFAULT_PATTERNS } from '@omcode/schemas';

export function redactInput(input: string): { sanitized: string; redactedCount: number } {
  let count = 0;
  const sanitized = redact(input, DEFAULT_PATTERNS.map(p => ({
    ...p,
    replace: (match: string) => { count++; return p.replacement; }
  })));
  return { sanitized, redactedCount: count };
}

export function redactRequest(body: Record<string, unknown>): Record<string, unknown> {
  const redacted = JSON.stringify(body);
  const { sanitized } = redactInput(redacted);
  return JSON.parse(sanitized);
}
