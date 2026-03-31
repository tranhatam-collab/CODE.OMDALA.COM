# NFT Live Deployment Status

Date: 2026-03-23
Updated at: 2026-03-23 18:06:00 +07

## Current release

- Release version: `2.0.0`
- Latest deployment URL: `https://a9a97b41.nft-iai-one.pages.dev`
- Pages project default domain: `https://nft-iai-one.pages.dev`
- Custom domain: `https://nft.iai.one`
- Local dev runtime: `http://localhost:8788`
- Main upgrade scope:
  - bilingual English-Vietnamese production UI with language dropdown and international flag icons
  - rewritten docs hub, verification, metadata, and disclosure pages with proper Vietnamese diacritics
  - issuance worker/API endpoints for `health`, `registry`, `collections`, `metadata`, `issuance-preview`, and guarded `issue`
  - real metadata generation and mint-readiness preview from on-site user input
  - EVM live mint writer added with ABI-driven contract calls, configurable function mapping, arg overrides, and optional chain-id confirmation
  - durable trust storage moved from in-memory fallback to Cloudflare KV binding for approvals, issued tokens, and audit trail

## What is already live

- Cloudflare Pages project created: `nft-iai-one`
- Custom domain attached on Pages: `nft.iai.one`
- Public HTTPS response at `https://nft.iai.one/`: `HTTP 200`
- Production trust storage binding active: `NFT_TRUST_KV -> b53ab4b8d7d74cf0a4704ff9f4177849`
- Preview/local trust storage binding active: `NFT_TRUST_KV -> cf3e4978dfcb4b85a7a3ddfd6b5ddd92`

## Current domain status

Observed via Cloudflare Pages Domains API and live requests:

- domain: `nft.iai.one`
- status: `pending`
- verification status: `active`
- validation status: `pending`
- validation method: `http`
- verification error: none reported after DNS record creation

Observed public DNS:

- `dig NS iai.one +short` returns Cloudflare nameservers
- public DNS is proxied through Cloudflare, so `dig` may not always expose an origin target directly
- `curl -I https://nft.iai.one/` now returns `HTTP/2 200`
- `curl -I https://df1c85f7.nft-iai-one.pages.dev` returns `HTTP/2 200`
- latest V2 preview deployment completed successfully at `https://1c2ec5f9.nft-iai-one.pages.dev`
- latest KV-backed deployment completed successfully at `https://a9a97b41.nft-iai-one.pages.dev`

## Live mint status

Observed via `GET /api/health` on both `https://nft.iai.one` and `https://a9a97b41.nft-iai-one.pages.dev`:

- `issuance.storage.mode = kv`
- `issuance.storage.durable = true`
- `issuance.liveMint.configured = false`
- missing secrets:
  - `MINT_RPC_URL`
  - `MINT_CONTRACT_ADDRESS`
  - `MINT_SIGNER_PRIVATE_KEY`
- current default function name: `safeMint`
- `MINT_CONTRACT_ABI_JSON` has not been detected publicly either

This means the live contract writer code and durable storage are both deployed. The remaining blocker for live on-chain mint is only the missing production signer/contract secrets.

## Current state

The public site is already live on both the Pages deployment URL and the custom domain. Approvals, issued tokens, and audit trail are now durable through KV instead of the old memory fallback.

The remaining mismatch is only inside the Pages Domains API, which still reports:

- `status: pending`
- `verification_data.status: active`
- `validation_data.status: pending`

This usually means Cloudflare has started serving traffic correctly, but the validation flag has not fully converged yet.

## DNS note

The DNS record has now been added in the `iai.one` zone:

- type: `CNAME`
- name: `nft`
- target: `nft-iai-one.pages.dev`
- proxied: `true`

The Wrangler OAuth token still does not have enough DNS permission to manage that record automatically, but no further manual DNS change appears necessary at this point.

## Binding correction

The Pages project previously had `NFT_TRUST_KV` added incorrectly as a secret text variable. That wrong entry has been removed, and the project now uses a real Pages Functions KV binding declared in `wrangler.toml`.

## Re-check commands

```bash
dig nft.iai.one +short
curl -I --max-time 15 https://nft.iai.one/
curl -I --max-time 15 https://a9a97b41.nft-iai-one.pages.dev
curl -L --max-time 20 https://nft.iai.one/api/health
node scripts/cloudflare-sync.mjs
```
