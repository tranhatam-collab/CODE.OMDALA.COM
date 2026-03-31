# OMCODE — Quickstart Guide

Get OMCODE running on your Mac in 5 minutes.

## Prerequisites

- macOS 14.0 (Sonoma) or later
- Node.js 20+ (run `pnpm bootstrap:mac` to install)
- pnpm 9+
- At least one AI provider API key (OpenAI, Anthropic, or Cloudflare)

## Step 1: Clone

```bash
git clone git@github.com:tranhatam-collab/CODE.OMDALA.COM.git
cd CODE.OMDALA.COM
```

## Step 2: Install

```bash
pnpm install
```

## Step 3: Configure

```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

## Step 4: Run

```bash
# Start all apps
pnpm dev

# Or start individual apps
pnpm --filter @omcode/api dev      # API gateway on :8787
pnpm --filter @omcode/web dev      # Public website on :3000
pnpm --filter @omcode/desktop dev  # Desktop app (requires Electron)
```

## Step 5: Verify

- API: `curl http://localhost:8787/health` → `{"status":"healthy"}`
- Web: Open `http://localhost:3000`
- Desktop: Electron window should open automatically

## Next Steps

- Read the [architecture docs](https://docs.omdala.com/code/architecture)
- Set up [AI providers](https://docs.omdala.com/code/providers)
- Open a [local project](https://docs.omdala.com/code/install)
- Start your first [AI session](https://docs.omdala.com/code/getting-started)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `pnpm: command not found` | Run `corepack enable && corepack prepare pnpm@latest --activate` |
| API returns 503 | Add at least one provider API key to `.env.local` |
| Desktop won't start | Run `pnpm install` in `apps/desktop/` first |
| TypeScript errors | Run `pnpm typecheck` to see all errors |

## Need Help?

- [Documentation](https://docs.omdala.com/code)
- [GitHub Issues](https://github.com/tranhatam-collab/CODE.OMDALA.COM/issues)
- [Architecture Overview](./ARCHITECTURE.md)
