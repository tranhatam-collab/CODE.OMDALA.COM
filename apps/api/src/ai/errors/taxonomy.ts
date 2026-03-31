export type ErrorCode =
  | 'GUARDRAIL_BLOCKED'
  | 'PROVIDER_ERROR'
  | 'TIMEOUT'
  | 'COST_EXCEEDED'
  | 'CONTEXT_OVERFLOW'
  | 'INVALID_REQUEST'
  | 'RATE_LIMITED'
  | 'FALLBACK_EXHAUSTED'
  | 'INTERNAL_ERROR';

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: string;
  retryable: boolean;
  suggestion: string;
}

export const ERROR_TEMPLATES: Record<ErrorCode, Omit<AppError, 'details'>> = {
  GUARDRAIL_BLOCKED: { code: 'GUARDRAIL_BLOCKED', message: 'Request blocked by safety policy', retryable: false, suggestion: 'Review your input for sensitive content or policy violations' },
  PROVIDER_ERROR: { code: 'PROVIDER_ERROR', message: 'AI provider returned an error', retryable: true, suggestion: 'Try again or switch provider' },
  TIMEOUT: { code: 'TIMEOUT', message: 'Request exceeded time limit', retryable: true, suggestion: 'Reduce context size or try again' },
  COST_EXCEEDED: { code: 'COST_EXCEEDED', message: 'Cost ceiling reached', retryable: false, suggestion: 'Wait for budget reset or increase limit' },
  CONTEXT_OVERFLOW: { code: 'CONTEXT_OVERFLOW', message: 'Context exceeds model limits', retryable: true, suggestion: 'Reduce file context or use a model with larger context window' },
  INVALID_REQUEST: { code: 'INVALID_REQUEST', message: 'Invalid request format', retryable: false, suggestion: 'Check request body and required fields' },
  RATE_LIMITED: { code: 'RATE_LIMITED', message: 'Too many requests', retryable: true, suggestion: 'Wait before retrying' },
  FALLBACK_EXHAUSTED: { code: 'FALLBACK_EXHAUSTED', message: 'All fallback providers failed', retryable: true, suggestion: 'Check provider health and try later' },
  INTERNAL_ERROR: { code: 'INTERNAL_ERROR', message: 'Internal server error', retryable: true, suggestion: 'Try again or contact support' },
};

export function createError(code: ErrorCode, details?: string): AppError {
  return { ...ERROR_TEMPLATES[code], details };
}
