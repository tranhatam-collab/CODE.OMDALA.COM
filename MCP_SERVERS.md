# MCP_SERVERS.md — MCP Server Definitions for OMCODE

## Registered MCP Servers

### 1. GitHub MCP
- **Purpose:** Repository operations, PR management, issue tracking
- **Type:** External (GitHub API)
- **Auth:** PAT or OAuth
- **Trust Level:** High

### 2. Docs MCP
- **Purpose:** Documentation generation, updates, validation
- **Type:** Internal
- **Auth:** Internal service token
- **Trust Level:** Medium

### 3. Repo Map MCP
- **Purpose:** Repository structure analysis and navigation
- **Type:** Internal
- **Auth:** Internal service token
- **Trust Level:** High

### 4. API Contract MCP
- **Purpose:** API contract management and validation
- **Type:** Internal
- **Auth:** Internal service token
- **Trust Level:** Medium

### 5. D1 Schema MCP
- **Purpose:** Database schema management for Cloudflare D1
- **Type:** Internal
- **Auth:** Internal service token (admin)
- **Trust Level:** Critical

### 6. Design Token MCP
- **Purpose:** Design token management for UI consistency
- **Type:** Internal
- **Auth:** Internal service token
- **Trust Level:** Medium

### 7. Roadmap MCP
- **Purpose:** Project roadmap and feature tracking
- **Type:** Internal
- **Auth:** Internal service token
- **Trust Level:** Medium

## MCP Gateway

All MCP tool calls flow through the internal MCP gateway at `apps/api/src/mcp/gateway.ts`.

### Default Policy
- Read-only by default
- Write tools require approval
- Admin tools require strict approval

### Capability Registry
Located at `packages/mcp-clients/src/registry.ts`

For full details, see [OMCODE_MCP_STRATEGY.md](./OMCODE_MCP_STRATEGY.md).
