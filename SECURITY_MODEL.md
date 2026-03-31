# SECURITY_MODEL.md — OMCODE Security Model

## Core Principles

1. **Local-first privacy** — Code stays local until explicitly sent to AI
2. **Zero trust for AI responses** — All suggestions require review before apply
3. **Secret isolation** — API keys never logged, never exposed in responses
4. **Approval by default** — Write operations require explicit approval
5. **Audit everything** — Every action has a traceable request ID

## Authentication & Authorization

### User Auth
- JWT-based authentication
- Scoped to workspace and project permissions
- Token includes: user ID, workspace ID, role, permissions

### Service Auth
- Internal service tokens for MCP servers
- Not accessible from public internet
- Higher rate limits, tracked but not blocked

### Trust Levels
- Level 0: Public (health checks, model list)
- Level 1: Authenticated user requests
- Level 2: Internal service requests
- Level 3: Admin/guardrail override requests

## Secret Management

### What is protected
- API keys (OpenAI, Anthropic, etc.)
- JWT secrets
- Internal service tokens
- GitHub PATs
- Database credentials

### How it is protected
- Stored in encrypted keychain (desktop) or secure env vars (server)
- Never logged, even in debug mode
- Redacted from prompts before sending to providers
- Scanned in responses for accidental leakage
- Rotated on compromise detection

## Command Execution

### Command Tiers
- **Safe (auto-execute):** `ls`, `cat`, `grep`, `find`, `git status`, `git diff`
- **Review (approval required):** `npm install`, `git add`, `git commit`
- **Dangerous (blocked by default):** `rm -rf`, `sudo`, `curl | bash`

### Approval Flow
1. Command detected and classified
2. If safe: execute immediately, log result
3. If review: show approval prompt to user
4. If dangerous: block with explanation
5. All decisions logged with user ID and timestamp

## Data Flow Security

### Inbound (User → AI)
1. User input received
2. Guardrail validation (size, format, content)
3. Redaction layer strips sensitive data
4. Context builder assembles prompt
5. Prompt sent to provider

### Outbound (AI → User)
1. Provider response received
2. Response validation (format, size, content)
3. Secret scan for leaked credentials
4. Safety scoring
5. Formatted response returned to user

## Network Security

### Public Endpoints
- HTTPS only (TLS 1.3)
- Rate limiting per IP and user
- WAF rules for common attack patterns
- CORS strict allowlist

### Internal Endpoints
- mTLS between services where applicable
- Internal service token required
- Not routable from public internet
- Separate VPC/network isolation on Cloudflare

## MCP Security

### MCP Server Isolation
- Each MCP server runs in isolated context
- No cross-server data leakage
- Resource limits per server
- Crash recovery without data loss

### MCP Tool Validation
- All inputs validated against JSON Schema
- Max input/output size limits
- Path traversal prevention
- No raw command injection

## Audit & Logging

### What is logged
- Request metadata (task, model, provider, duration)
- Token usage and cost
- Guardrail decisions
- Retry/fallback events
- Error events with structured codes

### What is NOT logged
- Raw prompt content (unless debug mode)
- Raw provider responses (unless debug mode)
- API keys or secrets
- File contents

### Retention
- Default: 90 days
- Configurable per workspace
- Exportable for compliance

## Incident Response

### Detection
- Automated anomaly detection on API patterns
- Unusual cost spikes trigger alerts
- Failed auth attempts monitored
- Secret leakage detection in responses

### Response
1. Isolate affected component
2. Rotate compromised credentials
3. Audit affected requests
4. Notify affected users
5. Document and update guardrails

## Compliance

- GDPR-compliant data handling
- Right to deletion for user data
- Data residency via Cloudflare regions
- Open-source transparency for security practices

## Responsible Disclosure

Report security issues to: security@omdala.com

For full details, see [OMCODE_API_GATEWAY_SPEC.md](./OMCODE_API_GATEWAY_SPEC.md) and [OMCODE_MCP_STRATEGY.md](./OMCODE_MCP_STRATEGY.md).
