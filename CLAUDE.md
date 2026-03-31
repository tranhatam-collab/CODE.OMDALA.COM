# CLAUDE.md — Claude Code instructions for OMCODE

## Project Overview

OMCODE is an AI-native coding workspace for Mac developers. Monorepo with pnpm + Turborepo.
Primary surfaces: Mac desktop app, public web (code.omdala.com), authenticated app (app.omdala.com/code), docs (docs.omdala.com/code), API gateway (api.omdala.com).

## Architecture

- Monorepo: `apps/` (web, desktop, docs, api), `packages/` (config, schemas, i18n, ui, prompts, command-policies, git-tools, mcp-clients, ai-gateway-sdk, shared)
- Deployment: Cloudflare (Pages, Workers, D1, R2)
- AI: Multi-provider (OpenAI, Anthropic, Cloudflare Workers AI) via MCP
- Language: TypeScript throughout
- Bilingual: Vietnamese – English

## Key Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Start all apps in dev mode
pnpm build            # Build all apps and packages
pnpm lint             # Lint all code
pnpm typecheck        # TypeScript type checking
pnpm test             # Run tests
pnpm bootstrap:mac    # Bootstrap Mac dev environment
```

## Important Rules

1. **Mac-first**: Desktop app is the primary shipping surface
2. **Local-first**: Prefer local project access before cloud dependency
3. **No mixing surfaces**: Public site ≠ authenticated app ≠ desktop
4. **Bilingual**: All public-facing content must support vi/en
5. **MCP is core**: All tool access flows through MCP gateway
6. **Read-only default**: Write tools require approval
7. **No hardcoded secrets**: Use .env.example pattern
8. **Type safety**: Strict TypeScript, no `any` without justification
9. **Schema-driven**: All API contracts defined in packages/schemas
10. **Prompt registry**: All prompts defined in packages/prompts

## File References

- Architecture: OMCODE_INFORMATION_ARCHITECTURE.md
- Repo structure: OMCODE_REPO_STRUCTURE.md
- API Gateway: OMCODE_API_GATEWAY_SPEC.md
- MCP Strategy: OMCODE_MCP_STRATEGY.md
- UI Screen Map: OMCODE_UI_SCREEN_MAP.md
- Implementation Order: OMCODE_IMPLEMENTATION_ORDER.md
- SEO Architecture: OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md
