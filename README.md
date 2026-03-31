# OMCODE — AI-native coding workspace for Mac developers

**Full product name:** OMDALA CODE AI
**Primary domain:** [code.omdala.com](https://code.omdala.com)
**Authenticated app:** [app.omdala.com/code](https://app.omdala.com/code)
**Docs:** [docs.omdala.com/code](https://docs.omdala.com/code)
**API:** [api.omdala.com](https://api.omdala.com)

## What is OMCODE

OMCODE is an AI-native coding workspace for developers, founders, small technical teams, and open-source contributors. It is not a simple code chat box. It is a real working environment for opening projects, reading repositories, editing files, executing controlled commands, reviewing diffs, planning features, and coordinating multiple models and tools.

## Quick Start

```bash
# Clone
git clone git@github.com:tranhatam-collab/CODE.OMDALA.COM.git
cd CODE.OMDALA.COM

# Install
pnpm install

# Bootstrap Mac environment (optional)
pnpm bootstrap:mac

# Start all apps
pnpm dev
```

## Architecture

- **Monorepo** managed with pnpm workspaces + Turborepo
- **Mac-first** desktop experience
- **Multi-provider** AI orchestration (OpenAI, Anthropic, Cloudflare Workers AI)
- **MCP** (Model Context Protocol) as core infrastructure layer
- **Cloudflare** for deployment (Pages, Workers, D1, R2, Queues)
- **Bilingual** Vietnamese – English across all surfaces

## Project Structure

```
CODE.OMDALA.COM/
├── apps/
│   ├── web/          # Public website (code.omdala.com)
│   ├── desktop/      # Mac desktop app
│   ├── docs/         # Documentation portal
│   └── api/          # API gateway (api.omdala.com)
├── packages/
│   ├── config/       # Shared config, tsconfig, biome
│   ├── schemas/      # Zod schemas, type contracts
│   ├── i18n/         # Bilingual dictionaries (vi/en)
│   ├── ui/           # Shared UI components, design tokens
│   ├── prompts/      # Prompt templates and registry
│   ├── command-policies/  # Command tier definitions
│   ├── git-tools/    # Git status helpers
│   ├── mcp-clients/  # MCP client wrappers, capability registry
│   ├── ai-gateway-sdk/    # AI gateway SDK types
│   └── shared/       # Cross-cutting utilities
├── tools/            # Dev utilities
├── infra/            # Cloudflare infrastructure-as-code
├── docs-internal/    # Internal docs
├── .ai/              # AI-specific configs
├── scripts/          # Bootstrap, build scripts
└── .github/workflows/  # CI/CD
```

## Key Documents

| Document | Purpose |
|----------|---------|
| [OMCODE_MASTER_PLAN_2026.md](./OMCODE_MASTER_PLAN_2026.md) | Master plan, roadmap, brand positioning |
| [OMCODE_INFORMATION_ARCHITECTURE.md](./OMCODE_INFORMATION_ARCHITECTURE.md) | System architecture, surface map, user journeys |
| [OMCODE_REPO_STRUCTURE.md](./OMCODE_REPO_STRUCTURE.md) | Monorepo structure, packages, CI/CD |
| [OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md](./OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md) | SEO, sitemap, metadata, hreflang |
| [OMCODE_MAC_APP_ARCHITECTURE.md](./OMCODE_MAC_APP_ARCHITECTURE.md) | Mac desktop app architecture |
| [OMCODE_API_GATEWAY_SPEC.md](./OMCODE_API_GATEWAY_SPEC.md) | AI Gateway spec, routes, providers, guardrails |
| [OMCODE_MCP_STRATEGY.md](./OMCODE_MCP_STRATEGY.md) | MCP servers, capability registry, agent roles |
| [OMCODE_UI_SCREEN_MAP.md](./OMCODE_UI_SCREEN_MAP.md) | Complete screen map for web, app, desktop |
| [OMCODE_IMPLEMENTATION_ORDER.md](./OMCODE_IMPLEMENTATION_ORDER.md) | Build phases, timeline, checklists |

## Tech Stack

- **Runtime:** Node.js 20+, TypeScript
- **Package manager:** pnpm 9+
- **Build orchestration:** Turborepo
- **Web framework:** Next.js (web, docs)
- **Desktop:** TBA (SwiftUI native or Electron/Tauri)
- **API:** Cloudflare Workers (Hono)
- **Database:** Cloudflare D1
- **Storage:** Cloudflare R2
- **AI Providers:** OpenAI, Anthropic, Cloudflare Workers AI
- **Protocol:** MCP (Model Context Protocol)
- **Linting:** Biome
- **CI:** GitHub Actions

## Contributing

See [docs-internal/](./docs-internal/) for contribution guidelines.

## License

TBA — Open-source license to be determined.
