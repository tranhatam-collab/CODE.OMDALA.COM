# AGENTS.md — AI Agent Instructions for OMCODE

This file defines how AI agents (Claude Code, Cursor, Codex, etc.) should operate within the OMCODE codebase.

## Agent Operating Rules

1. **Read architecture docs first** — Always check OMCODE_INFORMATION_ARCHITECTURE.md and OMCODE_REPO_STRUCTURE.md before making structural changes.
2. **Follow monorepo conventions** — Use pnpm, turbo, and shared configs.
3. **Schema-driven development** — Define types in packages/schemas before using them in apps.
4. **Bilingual awareness** — All user-facing strings must support vi/en via packages/i18n.
5. **MCP-first tooling** — All external tool access must go through MCP layer.
6. **No secrets** — Never hardcode API keys, tokens, or credentials.
7. **Type safety** — Strict TypeScript, no implicit any.
8. **Test before commit** — Run typecheck and lint before suggesting changes.

## Agent Capabilities Expected

- Read and navigate codebase
- Edit files with precision
- Run terminal commands (with approval for writes)
- Understand MCP tool definitions
- Follow prompt registry patterns
- Respect command policies

## File Modification Policy

- **Safe (auto-approve):** Read files, run read-only commands, suggest changes
- **Approval required:** Write files, run commands with side effects, modify config
- **Blocked:** Modify .env files, change secrets, push to remote without explicit request

## Language

- Internal communication: Vietnamese or English based on user preference
- Code comments: English
- User-facing strings: Via i18n dictionary (vi/en)
