# ARCHITECTURE.md — OMCODE System Architecture

## Overview

OMCODE is an AI-native coding workspace with multiple surfaces sharing a common infrastructure layer.

## System Components

```
┌─────────────────────────────────────────────────────────────┐
│                      User Surfaces                           │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Public Web  │  Desktop App │  Auth App    │  Docs Portal   │
│ code.omdala  │  Mac native  │ app.omdala   │ docs.omdala    │
└──────┬───────┴──────┬───────┴──────┬───────┴───────┬────────┘
       │              │              │               │
       └──────────────┴──────────────┴───────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   API Gateway     │
                    │  api.omdala.com   │
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
     ┌────────▼────┐  ┌──────▼──────┐  ┌─────▼─────┐
     │ AI Providers │  │  MCP Layer  │  │  D1 / R2  │
     │ OpenAI,      │  │ GitHub MCP  │  │  Storage  │
     │ Anthropic,   │  │ Docs MCP    │  │  Database │
     │ Workers AI   │  │ RepoMap MCP │  │           │
     └─────────────┘  └─────────────┘  └───────────┘
```

## Key Design Decisions

1. **Mac-first** — Desktop app is primary shipping surface
2. **Local-first** — Project access before cloud dependency
3. **MCP core** — All tool access through MCP gateway
4. **Multi-provider** — OpenAI, Anthropic, Cloudflare Workers AI
5. **Bilingual** — Vietnamese and English across all surfaces
6. **Open-source** — Public GitHub repo from day one
7. **Cloudflare** — Pages, Workers, D1, R2, Queues for deployment

## Data Flow

1. User initiates action on surface (desktop, web, docs)
2. Request routed to API Gateway
3. Gateway validates auth, applies guardrails, redacts sensitive data
4. Gateway routes to appropriate MCP server or AI provider
5. Response normalized, audited, returned to surface

## Security Model

- JWT for user auth, internal service tokens for MCP
- Read-only default, write tools require approval
- Redaction layer strips secrets before provider calls
- All requests audited with unique request IDs
- No secrets in logs or responses

For detailed specs:
- API Gateway: [OMCODE_API_GATEWAY_SPEC.md](./OMCODE_API_GATEWAY_SPEC.md)
- MCP Strategy: [OMCODE_MCP_STRATEGY.md](./OMCODE_MCP_STRATEGY.md)
- Security: [SECURITY_MODEL.md](./SECURITY_MODEL.md)
