import { z } from 'zod';

export const TaskTypeSchema = z.enum([
  'plan', 'build', 'review', 'chat', 'summarize',
  'docs', 'release', 'guardrail', 'test-gen',
  'patch-explain', 'commit-draft',
]);
export type TaskType = z.infer<typeof TaskTypeSchema>;

export const AiRequestSchema = z.object({
  task: TaskTypeSchema,
  model: z.string().optional(),
  context: z.object({
    projectId: z.string(),
    sessionId: z.string().optional(),
    files: z.array(z.string()).optional(),
    diff: z.string().optional(),
    userMessage: z.string(),
    systemPrompt: z.string().optional(),
    promptId: z.string().optional(),
  }),
  options: z.object({
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().min(1).max(32768).default(4096),
    stream: z.boolean().default(false),
    timeout: z.number().min(1000).max(120000).default(30000),
  }).optional(),
});
export type AiRequest = z.infer<typeof AiRequestSchema>;

export const UsageSchema = z.object({
  inputTokens: z.number(),
  outputTokens: z.number(),
  cost: z.number(),
  currency: z.string().default('USD'),
});
export type Usage = z.infer<typeof UsageSchema>;

export const MetaSchema = z.object({
  duration: z.number(),
  retries: z.number(),
  fallback: z.boolean(),
  guardrailsPassed: z.boolean(),
});
export type Meta = z.infer<typeof MetaSchema>;

export const AiResponseSchema = z.object({
  id: z.string().uuid(),
  task: TaskTypeSchema,
  model: z.string(),
  provider: z.string(),
  status: z.enum(['success', 'error', 'partial']),
  data: z.object({
    content: z.string().or(z.record(z.unknown())),
    patches: z.array(z.unknown()).optional(),
    suggestions: z.array(z.unknown()).optional(),
  }),
  usage: UsageSchema,
  meta: MetaSchema,
});
export type AiResponse = z.infer<typeof AiResponseSchema>;

export const StreamChunkSchema = z.object({
  type: z.enum(['chunk', 'done', 'error']),
  id: z.string().uuid(),
  data: z.object({
    delta: z.string(),
    index: z.number(),
  }).optional(),
  usage: UsageSchema.nullable(),
  meta: z.object({ elapsed: z.number() }),
});
export type StreamChunk = z.infer<typeof StreamChunkSchema>;

export const ProviderSchema = z.object({
  name: z.string(),
  status: z.enum(['healthy', 'degraded', 'down']),
  models: z.array(z.string()),
  rateLimit: z.object({
    requestsPerMinute: z.number(),
    tokensPerMinute: z.number(),
  }).optional(),
});
export type Provider = z.infer<typeof ProviderSchema>;

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  branch: z.string().optional(),
  providerId: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Project = z.infer<typeof ProjectSchema>;

export const SessionSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  model: z.string(),
  status: z.enum(['active', 'completed', 'archived']),
  messageCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Session = z.infer<typeof SessionSchema>;

export const WorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  defaultProvider: z.string().optional(),
  defaultModel: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Workspace = z.infer<typeof WorkspaceSchema>;

export const PromptSchema = z.object({
  id: z.string(),
  name: z.string(),
  task: TaskTypeSchema,
  template: z.string(),
  version: z.string(),
  locale: z.enum(['vi', 'en']),
  variables: z.array(z.string()).optional(),
});
export type Prompt = z.infer<typeof PromptSchema>;

export const RunSchema = z.object({
  id: z.string().uuid(),
  sessionId: z.string().uuid(),
  projectId: z.string().uuid(),
  task: TaskTypeSchema,
  model: z.string(),
  provider: z.string(),
  status: z.enum(['success', 'error', 'partial']),
  usage: UsageSchema,
  duration: z.number(),
  createdAt: z.string().datetime(),
});
export type Run = z.infer<typeof RunSchema>;
