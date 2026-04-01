export interface NormalizedMcpResponse {
  tool: string;
  server: string;
  status: 'success' | 'error' | 'partial';
  data: unknown;
  meta: {
    durationMs: number;
    trustLevel: string;
    cached: boolean;
  };
  error?: {
    code: string;
    message: string;
    details?: string;
  };
}

export function normalizeResponse(
  toolName: string,
  serverName: string,
  data: unknown,
  duration: number,
  trustLevel: string,
  cached: boolean = false,
): NormalizedMcpResponse {
  return {
    tool: toolName,
    server: serverName,
    status: 'success',
    data,
    meta: {
      durationMs: duration,
      trustLevel,
      cached,
    },
  };
}

export function normalizeError(
  toolName: string,
  serverName: string,
  error: Error | string,
  code: string = 'PROVIDER_ERROR',
  duration: number = 0,
): NormalizedMcpResponse {
  const msg = error instanceof Error ? error.message : error;
  return {
    tool: toolName,
    server: serverName,
    status: 'error',
    data: null,
    meta: {
      durationMs: duration,
      trustLevel: 'low',
      cached: false,
    },
    error: {
      code,
      message: msg,
      details: error instanceof Error && error.stack ? error.stack : undefined,
    },
  };
}
