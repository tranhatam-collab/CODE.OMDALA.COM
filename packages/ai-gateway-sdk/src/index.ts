export type TaskType = 'plan' | 'build' | 'review' | 'chat' | 'summarize' | 'docs' | 'release' | 'guardrail' | 'test-gen' | 'patch-explain' | 'commit-draft';
export type ProviderName = 'openai' | 'anthropic' | 'cloudflare';
export type ResponseStatus = 'success' | 'error' | 'partial';
export type TrustLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AiGatewayRequest {
  task: TaskType;
  model?: string;
  context: {
    projectId: string;
    sessionId?: string;
    files?: string[];
    diff?: string;
    userMessage: string;
    systemPrompt?: string;
    promptId?: string;
  };
  options?: {
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
    timeout?: number;
  };
}

export interface AiGatewayResponse {
  id: string;
  task: TaskType;
  model: string;
  provider: ProviderName;
  status: ResponseStatus;
  data: {
    content: string | Record<string, unknown>;
    patches?: unknown[];
    suggestions?: unknown[];
  };
  usage: {
    inputTokens: number;
    outputTokens: number;
    cost: number;
    currency: string;
  };
  meta: {
    duration: number;
    retries: number;
    fallback: boolean;
    guardrailsPassed: boolean;
  };
}

export interface StreamChunk {
  type: 'chunk' | 'done' | 'error';
  id: string;
  data?: { delta: string; index: number };
  usage: null | { inputTokens: number; outputTokens: number; cost: number };
  meta: { elapsed: number };
}

export interface ProviderAdapter {
  name: ProviderName;
  chatCompletion(messages: unknown[], options?: Record<string, unknown>): Promise<AiGatewayResponse>;
  streamCompletion(messages: unknown[], options?: Record<string, unknown>): AsyncIterableIterator<StreamChunk>;
  getModels(): Promise<string[]>;
  getHealth(): Promise<{ status: 'healthy' | 'degraded' | 'down' }>;
  getCost(inputTokens: number, outputTokens: number, model: string): number;
}

export interface GuardrailResult {
  passed: boolean;
  violations: string[];
  score: number;
}

export interface RedactionResult {
  sanitized: string;
  redactedCount: number;
}
