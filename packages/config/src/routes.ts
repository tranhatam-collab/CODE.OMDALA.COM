export const ROUTES = {
  public: {
    home: '/',
    features: '/features',
    integrations: '/integrations',
    providers: '/providers',
    download: '/download',
    openSource: '/open-source',
    security: '/security',
    blog: '/blog',
    changelog: '/changelog',
    compare: '/compare',
  },
  app: {
    dashboard: '/code',
    workspaces: '/code/workspaces',
    projects: '/code/projects',
    sessions: '/code/sessions',
    agents: '/code/agents',
    runs: '/code/runs',
    prompts: '/code/prompts',
    providers: '/code/providers',
    settings: '/code/settings',
  },
} as const;

export const API_ROUTES = {
  public: {
    ai: {
      plan: '/v1/ai/plan',
      build: '/v1/ai/build',
      review: '/v1/ai/review',
      chat: '/v1/ai/chat',
      summarize: '/v1/ai/summarize',
      docs: '/v1/ai/docs',
      release: '/v1/ai/release',
      testGen: '/v1/ai/test-gen',
      patchExplain: '/v1/ai/patch-explain',
      commitDraft: '/v1/ai/commit-draft',
      models: '/v1/ai/models',
      providers: '/v1/ai/providers',
    },
  },
  internal: {
    ai: {
      route: '/internal/ai/route',
      normalize: '/internal/ai/normalize',
      retry: '/internal/ai/retry',
      cost: '/internal/ai/cost',
      usage: '/internal/ai/usage',
    },
    guardrails: {
      validate: '/internal/guardrails/validate',
      redact: '/internal/guardrails/redact',
      score: '/internal/guardrails/score',
      policies: '/internal/guardrails/policies',
    },
    context: {
      build: '/internal/context/build',
      trim: '/internal/context/trim',
      stats: '/internal/context/stats',
      enrich: '/internal/context/enrich',
    },
  },
} as const;

export const EXTERNAL_URLS = {
  github: 'https://github.com/tranhatam-collab/CODE.OMDALA.COM',
  docs: 'https://docs.omdala.com/code',
  app: 'https://app.omdala.com/code',
  api: 'https://api.omdala.com',
} as const;
