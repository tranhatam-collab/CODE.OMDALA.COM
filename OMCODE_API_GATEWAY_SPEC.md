# OMCODE_API_GATEWAY_SPEC.md

api.omdala.com

Bản khóa lớp AI Gateway cho api.omdala.com — route groups, task types, model routing, provider abstraction, guardrails, streaming, accounting, audit, error taxonomy, auth boundaries, module map

0. API GATEWAY LOCK

Domain: api.omdala.com
Primary role: Unified AI routing, provider abstraction, guardrails, and task orchestration for OMCODE
Deployment: Cloudflare Workers
Language: TypeScript
Module location: apps/api/src/ai/
Auth model: JWT for user requests, internal service tokens for MCP/guardrails
Trust boundary: Public routes (/v1/ai/*) vs internal routes (/internal/*)

1. ROUTE GROUPS

1.1 Public AI routes — /v1/ai/*
- POST /v1/ai/plan — Generate implementation plan from context
- POST /v1/ai/build — Generate code patches or file changes
- POST /v1/ai/review — Review code, suggest improvements
- POST /v1/ai/chat — General repo-aware chat
- POST /v1/ai/summarize — Summarize files, diffs, or sessions
- POST /v1/ai/docs — Generate or update documentation
- POST /v1/ai/release — Generate release notes, changelog entries
- POST /v1/ai/test-gen — Generate test cases from code or specs
- POST /v1/ai/patch-explain — Explain a diff or patch in natural language
- POST /v1/ai/commit-draft — Draft commit messages from changes
- GET /v1/ai/models — List available models and capabilities
- GET /v1/ai/providers — List configured providers and health

1.2 Internal AI routes — /internal/ai/*
- POST /internal/ai/route — Internal model routing decision
- POST /internal/ai/normalize — Normalize provider responses
- POST /internal/ai/retry — Retry logic with fallback provider
- GET /internal/ai/cost — Real-time cost tracking per request
- GET /internal/ai/usage — Usage statistics per workspace/project

1.3 Guardrail routes — /internal/guardrails/*
- POST /internal/guardrails/validate — Validate request against policies
- POST /internal/guardrails/redact — Redact sensitive data from prompts/responses
- POST /internal/guardrails/score — Score response for safety/compliance
- GET /internal/guardrails/policies — List active guardrail policies

1.4 Context routes — /internal/context/*
- POST /internal/context/build — Build context window from repo state
- POST /internal/context/trim — Trim context to fit model limits
- GET /internal/context/stats — Context window usage stats
- POST /internal/context/enrich — Enrich context with docs, prompts, or metadata

2. TASK TYPES

2.1 Standard task types
- plan: Implementation planning with file-level breakdown
- build: Code generation and patch creation
- review: Code review with suggestions and risk assessment
- chat: Conversational repo-aware interaction
- summarize: Condense large inputs into actionable summaries
- docs: Documentation generation or updates
- release: Release notes, changelog, migration guides
- guardrail: Policy validation and safety checks
- test-gen: Test case generation from code or specs
- patch-explain: Natural language explanation of diffs
- commit-draft: Commit message generation from changes

2.2 Task type contract
- Each task type has:
  - input schema (required fields, optional fields)
  - output schema (structured response format)
  - default model routing rules
  - retry/fallback policy
  - cost ceiling
  - timeout limits

3. MODEL ROUTING

3.1 Routing rules
- Primary model per task type configured in provider policies
- Fallback chain defined per task type
- Cost-aware routing: prefer cheaper models for simple tasks
- Capability-aware routing: route to models with required capabilities (e.g., large context, function calling)
- Latency-aware routing: prefer faster models for interactive tasks

3.2 Routing decision flow
1. Receive task request
2. Validate against guardrails
3. Determine task type
4. Look up routing policy for task type
5. Select primary provider + model
6. Check provider health and quota
7. If unavailable, select next fallback
8. Execute request
9. Normalize response
10. Apply post-processing guardrails
11. Return to caller

3.3 Dynamic routing overrides
- User can override model per session
- Admin can set workspace-level routing policies
- System can override based on real-time provider health

4. PROVIDER ABSTRACTION

4.1 Provider interface
- All providers implement a common interface:
  - chatCompletion(messages, options)
  - streamCompletion(messages, options)
  - getModels()
  - getHealth()
  - getCost(tokens)

4.2 Supported providers (Phase 1)
- OpenAI (gpt-5.4, gpt-4o, o-series)
- Anthropic (Claude Sonnet, Claude Opus, Claude Haiku)
- Cloudflare Workers AI (serverless models)

4.3 Provider adapters
- Located in: apps/api/src/ai/providers/
- Each adapter handles:
  - Authentication (API key, OAuth)
  - Request formatting
  - Response parsing
  - Error mapping
  - Cost calculation
  - Rate limit handling

5. REQUEST/RESPONSE ENVELOPE

5.1 Request envelope
```json
{
  "task": "plan|build|review|chat|summarize|docs|release|guardrail|test-gen|patch-explain|commit-draft",
  "model": "optional override",
  "context": {
    "projectId": "string",
    "sessionId": "string",
    "files": ["relative/path"],
    "diff": "optional unified diff",
    "userMessage": "string",
    "systemPrompt": "optional override",
    "promptId": "optional prompt registry reference"
  },
  "options": {
    "temperature": 0.7,
    "maxTokens": 4096,
    "stream": false,
    "timeout": 30000
  }
}
```

5.2 Response envelope
```json
{
  "id": "request-uuid",
  "task": "plan",
  "model": "gpt-5.4",
  "provider": "openai",
  "status": "success|error|partial",
  "data": {
    "content": "string or structured object",
    "patches": ["optional file patches"],
    "suggestions": ["optional review items"]
  },
  "usage": {
    "inputTokens": 1234,
    "outputTokens": 567,
    "cost": 0.0042,
    "currency": "USD"
  },
  "meta": {
    "duration": 2345,
    "retries": 0,
    "fallback": false,
    "guardrailsPassed": true
  }
}
```

5.3 Streaming response envelope
```json
{
  "type": "chunk|done|error",
  "id": "request-uuid",
  "data": {
    "delta": "text chunk",
    "index": 0
  },
  "usage": null,
  "meta": {
    "elapsed": 1234
  }
}
```

6. PROMPT REGISTRY INTEGRATION

6.1 Prompt reference
- Requests can reference prompts by ID from the prompt registry
- Prompt registry located in: packages/prompts/
- Prompts are versioned and language-aware (vi/en)

6.2 Prompt resolution flow
1. Request includes promptId
2. Gateway resolves prompt from registry
3. Injects context variables (project, files, user preferences)
4. Applies language-specific template
5. Sends to model

6.3 Prompt override
- User can provide inline systemPrompt to override registry
- Admin can set workspace-level prompt defaults

7. REDACTION LAYER

7.1 What gets redacted
- API keys and secrets in user input
- Environment variables in context
- File contents matching sensitive patterns
- Personal identifiable information (PII)

7.2 Redaction flow
1. Request enters gateway
2. Redaction layer scans input
3. Replaces sensitive values with placeholders
4. Logs redaction actions (without storing original values)
5. Sends sanitized request to provider
6. Provider response is also scanned for leaked secrets
7. Returns sanitized response

7.3 Redaction patterns
- Regex-based patterns for common secret formats
- Configurable per workspace
- Stored in: packages/schemas/src/redaction/

8. POLICY LAYER

8.1 Policy types
- Input validation: max context size, allowed file types
- Output validation: max response size, format requirements
- Cost policy: per-request, per-session, per-workspace ceilings
- Model policy: allowed models per workspace/user tier
- Rate policy: requests per minute/hour

8.2 Policy enforcement
- Policies evaluated before routing
- Violations return structured error
- Policies configurable via workspace settings
- Default policies defined in: packages/command-policies/

9. RETRY/FALLBACK RULES

9.1 Retry conditions
- Provider timeout
- Provider 5xx errors
- Rate limit responses (429)
- Malformed responses

9.2 Fallback chain
- Primary provider → Secondary provider → Tertiary provider
- Fallback respects cost ceiling and capability requirements
- Fallback count limited per request (default: 2)

9.3 Retry configuration
- Max retries: 2
- Backoff: exponential with jitter
- Timeout per attempt: configurable per task type
- Total timeout: hard ceiling per request

10. STREAMING SUPPORT

10.1 Streaming modes
- Server-sent events (SSE) for web clients
- WebSocket for desktop app
- HTTP chunked transfer for API consumers

10.2 Streaming guarantees
- Chunks delivered in order
- Usage metadata sent at end of stream
- Error chunks include structured error objects
- Client can abort stream at any time

10.3 Streaming limitations
- Not all providers support streaming equally
- Some task types (e.g., plan, review) benefit less from streaming
- Streaming adds overhead; disabled by default for non-interactive tasks

11. ACCOUNTING/COST CONTROL

11.1 Cost tracking
- Every request tracks input tokens, output tokens, and estimated cost
- Costs aggregated per session, project, workspace
- Real-time cost available via /internal/ai/cost

11.2 Cost ceilings
- Per-request ceiling: prevents runaway costs
- Per-session ceiling: limits total session spend
- Per-workspace ceiling: monthly budget
- Alerts when approaching ceiling (80%, 90%, 100%)

11.3 Cost estimation
- Uses provider pricing tables
- Updated monthly or when provider changes pricing
- Stored in: packages/schemas/src/pricing/

12. LOGGING/AUDIT

12.1 What is logged
- Request metadata (task type, model, provider, duration)
- Token usage and cost
- Guardrail decisions (pass/fail, reason)
- Retry/fallback events
- Error events with structured error codes

12.2 What is NOT logged
- Raw prompt content (unless debug mode enabled)
- Raw provider responses (unless debug mode enabled)
- API keys or secrets
- File contents

12.3 Audit trail
- All requests have unique request ID
- Request ID links to session and project
- Audit logs stored in D1
- Retention: 90 days default, configurable

13. NORMALIZED ERROR TAXONOMY

13.1 Error categories
- GUARDRAIL_BLOCKED: Request blocked by policy
- PROVIDER_ERROR: Provider returned error
- TIMEOUT: Request exceeded time limit
- COST_EXCEEDED: Cost ceiling reached
- CONTEXT_OVERFLOW: Context exceeds model limits
- INVALID_REQUEST: Malformed or missing required fields
- RATE_LIMITED: Too many requests
- FALLBACK_EXHAUSTED: All fallback providers failed
- INTERNAL_ERROR: Gateway internal error

13.2 Error response format
```json
{
  "error": {
    "code": "GUARDRAIL_BLOCKED",
    "message": "User-friendly error message",
    "details": "Technical details (if debug mode)",
    "retryable": false,
    "suggestion": "What the user can do next"
  }
}
```

13.3 Error mapping
- Each provider error mapped to normalized taxonomy
- Mapping defined in provider adapters
- Unknown errors mapped to INTERNAL_ERROR with original error in details

14. AUTH & TRUST BOUNDARIES

14.1 Public routes (/v1/ai/*)
- Require valid JWT from authenticated user
- Scoped to user's workspace and project permissions
- Rate limited per user

14.2 Internal routes (/internal/*)
- Require internal service token
- Not accessible from public internet
- Used by desktop app, web app, and MCP gateway
- Higher rate limits, no cost ceiling (tracked but not blocked)

14.3 Trust levels
- Level 0: Public, no auth (health checks, model list)
- Level 1: Authenticated user requests
- Level 2: Internal service requests
- Level 3: Admin/guardrail override requests

14.4 Token validation
- JWT validated on every request
- Token includes workspace ID, project permissions, user role
- Expired or invalid tokens return 401
- Insufficient permissions return 403

15. MODULE MAP — apps/api/src/ai/

```
apps/api/src/ai/
├── index.ts                    # Gateway entry point
├── routes/
│   ├── public.ts               # /v1/ai/* route handlers
│   ├── internal.ts             # /internal/ai/* route handlers
│   ├── guardrails.ts           # /internal/guardrails/* handlers
│   └── context.ts              # /internal/context/* handlers
├── routing/
│   ├── router.ts               # Model routing logic
│   ├── policy.ts               # Routing policy resolver
│   └── health.ts               # Provider health checker
├── providers/
│   ├── interface.ts            # Provider interface definition
│   ├── openai.ts               # OpenAI adapter
│   ├── anthropic.ts            # Anthropic adapter
│   ├── cloudflare.ts           # Cloudflare Workers AI adapter
│   └── registry.ts             # Provider registry and factory
├── guardrails/
│   ├── validate.ts             # Input/output validation
│   ├── redact.ts               # Sensitive data redaction
│   ├── score.ts                # Response safety scoring
│   └── policies.ts             # Policy definitions
├── context/
│   ├── builder.ts              # Context window builder
│   ├── trimmer.ts              # Context trimming logic
│   └── enricher.ts             # Context enrichment
├── streaming/
│   ├── sse.ts                  # Server-sent events handler
│   ├── websocket.ts            # WebSocket handler
│   └── formatter.ts            # Stream chunk formatter
├── accounting/
│   ├── tracker.ts              # Cost and usage tracker
│   ├── pricing.ts              # Pricing tables
│   └── limits.ts               # Cost ceiling enforcement
├── errors/
│   ├── taxonomy.ts             # Error code definitions
│   ├── mapper.ts               # Provider error mapper
│   └── formatter.ts            # Error response formatter
├── envelope/
│   ├── request.ts              # Request schema validation
│   ├── response.ts             # Response formatting
│   └── stream.ts               # Stream envelope formatting
└── middleware/
    ├── auth.ts                 # JWT validation
    ├── rate-limit.ts           # Rate limiting
    ├── logging.ts              # Request logging
    └── timing.ts               # Duration tracking
```

16. IMPLEMENTATION ORDER

16.1 Phase 1: Core routing
- Request/response envelope
- Provider interface and OpenAI adapter
- Basic model routing
- JWT auth for public routes
- Error taxonomy and mapping
- Request logging

16.2 Phase 2: Guardrails and streaming
- Redaction layer
- Policy validation
- Streaming support (SSE)
- Anthropic adapter
- Cost tracking
- Context builder

16.3 Phase 3: Internal routes and hardening
- Internal service auth
- Guardrail routes
- Context routes
- Cloudflare Workers AI adapter
- Retry/fallback logic
- Audit logging to D1

16.4 Phase 4: Advanced features
- Prompt registry integration
- Dynamic routing overrides
- WebSocket streaming
- Cost ceiling enforcement
- Admin policy management
- Observability dashboards

17. FINAL LOCK

Tiếng Việt
API Gateway cho api.omdala.com là lớp trung tâm điều phối AI của OMCODE. Nó phải đảm bảo routing thông minh giữa các provider, guardrails chặt chẽ, streaming ổn định, kiểm soát chi phí minh bạch, và audit đầy đủ. Mọi request phải đi qua validation, redaction, và policy check trước khi đến provider. Internal routes được bảo vệ riêng và không expose ra public.

English
The API Gateway for api.omdala.com is OMCODE's central AI orchestration layer. It must ensure intelligent routing between providers, strict guardrails, stable streaming, transparent cost control, and complete auditing. Every request must pass validation, redaction, and policy checks before reaching a provider. Internal routes are separately protected and never exposed publicly.
