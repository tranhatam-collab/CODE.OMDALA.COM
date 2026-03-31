# OMCODE — Contributing Guide

## Getting Started

1. Fork and clone the repo
2. Run `pnpm install`
3. Run `pnpm dev` to start all apps
4. Read `OMCODE_INFORMATION_ARCHITECTURE.md` for system overview
5. Read `OMCODE_IMPLEMENTATION_ORDER.md` for build priorities

## Code Standards

- TypeScript strict mode
- No `any` without justification
- All user-facing strings via `@omcode/i18n`
- All API contracts in `@omcode/schemas`
- All prompts in `@omcode/prompts`
- All tool access through MCP layer

## Branching

- `main` — stable, deployable
- `feature/*` — new features
- `fix/*` — bug fixes
- `docs/*` — documentation changes

## Pull Requests

- One logical change per PR
- Include test coverage for new code
- Update docs if behavior changes
- Follow commit message convention: `type(scope): description`

## Commit Types

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `chore:` maintenance
- `refactor:` code restructuring
- `test:` test additions or changes
- `ci:` CI/CD changes

## Need Help?

- Check `CLAUDE.md` for AI agent instructions
- Check `AGENTS.md` for agent operating rules
- Open an issue for questions
