# OMCODE_MCP_STRATEGY.md

MCP Layer — Multi-Provider Code Protocol

Bản khóa chiến lược MCP cho OMCODE — GitHub MCP, Docs MCP, Repo Map MCP, API Contract MCP, D1 Schema MCP, Design Token MCP, internal MCP gateway, read-only vs write tools, approval flows, security hardening, agent role mapping

0. MCP LOCK

MCP is the core infrastructure layer of OMCODE
All tool access flows through MCP
Default: read-only
Write tools require approval
Trust levels for MCP results
Internal MCP gateway pattern
Capability registry for all tools
Normalization across providers
Observability built-in
Hardening requirements defined
Test requirements mandatory

1. MCP SERVER REGISTRY

1.1 GitHub MCP
- Purpose: Repository operations, PR management, issue tracking, branch operations
- Tools:
  - read_repo: Clone or fetch repository metadata
  - list_branches: List branches with metadata
  - read_file: Read file content at path
  - list_files: List files in directory tree
  - create_branch: Create new branch from base
  - create_pr: Open pull request with title, body, base
  - update_pr: Update PR title, body, or add commits
  - review_pr: Submit review comments
  - merge_pr: Merge PR (approval required)
  - list_issues: List issues with filters
  - create_issue: Create new issue
  - update_issue: Update issue status, labels, assignees
  - list_commits: List commits with diff metadata
  - read_commit: Get commit details and diff
- Trust level: High (official GitHub API)
- Rate limits: GitHub API rate limits apply
- Auth: GitHub PAT or OAuth token

1.2 Docs MCP
- Purpose: Documentation generation, updates, and validation
- Tools:
  - read_docs: Read documentation files
  - generate_docs: Generate docs from code or specs
  - update_docs: Update existing documentation
  - validate_docs: Check docs for broken links, outdated content
  - search_docs: Search documentation by keyword or topic
  - generate_api_reference: Generate API reference from code
  - generate_changelog: Generate changelog from commits
  - translate_docs: Translate docs between vi/en
- Trust level: Medium (generated content needs review)
- Rate limits: Configurable per workspace
- Auth: Internal service token

1.3 Repo Map MCP
- Purpose: Repository structure analysis and navigation
- Tools:
  - build_repo_map: Generate file tree with metadata
  - get_file_info: Get file metadata (size, language, last modified)
  - find_symbol: Find function, class, or variable definitions
  - find_references: Find usages of a symbol
  - get_dependencies: List file dependencies
  - get_imports: List imports in a file
  - analyze_structure: Analyze project structure and patterns
  - suggest_entry_points: Identify main entry points
- Trust level: High (static analysis, no mutations)
- Rate limits: Configurable, higher for read operations
- Auth: Internal service token

1.4 API Contract MCP
- Purpose: API contract management and validation
- Tools:
  - read_contracts: Read existing API contracts
  - generate_contract: Generate API contract from code
  - validate_contract: Validate implementation against contract
  - diff_contracts: Compare contract versions
  - generate_client: Generate client SDK from contract
  - generate_mock: Generate mock server from contract
  - check_breaking_changes: Detect breaking changes between versions
- Trust level: Medium (generated contracts need review)
- Rate limits: Configurable
- Auth: Internal service token

1.5 D1 Schema MCP
- Purpose: Database schema management for Cloudflare D1
- Tools:
  - read_schema: Read current database schema
  - generate_migration: Generate migration from schema changes
  - validate_migration: Validate migration safety
  - apply_migration: Apply migration (approval required)
  - rollback_migration: Rollback last migration (approval required)
  - seed_database: Seed database with test data
  - query_schema: Query schema metadata
- Trust level: Critical (database mutations)
- Rate limits: Strict limits on write operations
- Auth: Internal service token with admin role

1.6 Design Token MCP
- Purpose: Design token management for UI consistency
- Tools:
  - read_tokens: Read current design tokens
  - update_tokens: Update design token values
  - generate_tokens: Generate tokens from design specs
  - validate_tokens: Validate token consistency
  - export_tokens: Export tokens in various formats (CSS, JS, JSON)
  - sync_tokens: Sync tokens across packages
- Trust level: Medium (UI changes need review)
- Rate limits: Configurable
- Auth: Internal service token

1.7 Roadmap MCP
- Purpose: Project roadmap and feature tracking
- Tools:
  - read_roadmap: Read current roadmap
  - update_roadmap: Update roadmap items
  - generate_roadmap: Generate roadmap from issues and PRs
  - track_progress: Track progress against roadmap
  - generate_report: Generate progress report
  - suggest_priorities: Suggest priority adjustments
- Trust level: Medium (planning data)
- Rate limits: Configurable
- Auth: Internal service token

2. INTERNAL MCP GATEWAY PATTERN

2.1 Gateway role
- Single entry point for all MCP tool calls
- Routes requests to appropriate MCP server
- Enforces read-only vs write policies
- Manages approval flows for write tools
- Normalizes responses across servers
- Tracks usage and costs

2.2 Gateway architecture
```
apps/api/src/mcp/
├── gateway.ts              # Main gateway entry point
├── registry.ts             # MCP server registry
├── router.ts               # Tool call routing
├── policy.ts               # Read/write policy enforcement
├── approval.ts             # Approval flow management
├── normalizer.ts           # Response normalization
├── trust.ts                # Trust level evaluation
├── observability.ts        # Metrics, tracing, logging
└── servers/
    ├── github.ts           # GitHub MCP server config
    ├── docs.ts             # Docs MCP server config
    ├── repo-map.ts         # Repo Map MCP server config
    ├── api-contract.ts     # API Contract MCP server config
    ├── d1-schema.ts        # D1 Schema MCP server config
    ├── design-token.ts     # Design Token MCP server config
    └── roadmap.ts          # Roadmap MCP server config
```

2.3 Gateway flow
1. Receive tool call request
2. Validate tool exists in capability registry
3. Check read/write policy
4. If read: execute immediately
5. If write: check approval status
6. If approval needed: queue for approval
7. Execute tool on target MCP server
8. Normalize response
9. Evaluate trust level
10. Return to caller

3. CAPABILITY REGISTRY

3.1 Registry structure
- Every MCP tool must be registered with:
  - name: Unique tool identifier
  - server: MCP server name
  - type: read | write | admin
  - description: Human-readable description
  - input_schema: JSON Schema for input validation
  - output_schema: JSON Schema for output validation
  - trust_level: low | medium | high | critical
  - requires_approval: boolean
  - rate_limit: requests per minute
  - cost_estimate: approximate cost per call

3.2 Registry location
- packages/mcp-clients/src/registry.ts
- Auto-generated from server definitions
- Validated on build

3.3 Registry validation
- All tools must have valid input/output schemas
- No duplicate tool names
- All servers must be reachable
- Registry versioned with releases

4. READ-ONLY DEFAULT

4.1 Default policy
- All tools default to read-only
- Write tools must be explicitly enabled
- Admin tools require additional authentication

4.2 Read tools (no approval needed)
- All GitHub read operations
- All Docs read operations
- All Repo Map operations
- All API Contract read operations
- All D1 Schema read operations
- All Design Token read operations
- All Roadmap read operations

4.3 Write tools (approval needed)
- GitHub: create_pr, update_pr, merge_pr, create_issue, update_issue
- Docs: update_docs, translate_docs
- API Contract: generate_contract, generate_client, generate_mock
- D1 Schema: apply_migration, rollback_migration, seed_database
- Design Token: update_tokens, sync_tokens
- Roadmap: update_roadmap

4.4 Admin tools (strict approval)
- D1 Schema: rollback_migration
- GitHub: merge_pr (to main branch)
- Any tool with critical trust level

5. APPROVAL FLOWS

5.1 Approval types
- Auto-approve: Low-risk write tools in development mode
- User-approve: User must confirm before execution
- Admin-approve: Admin or workspace owner must approve
- Policy-approve: Approved based on workspace policy rules

5.2 Approval UI
- Desktop app shows pending approvals in command center
- Web app shows approvals in session detail
- Each approval shows:
  - Tool name and description
  - Input parameters (sanitized)
  - Expected impact
  - Risk level
  - Approve/Reject buttons
  - Reason field (optional)

5.3 Approval logging
- All approvals and rejections logged
- Includes who approved, when, and reason
- Stored in D1 for audit
- Retention: 90 days default

5.4 Approval timeouts
- Pending approvals expire after configurable timeout
- Default timeout: 5 minutes
- Expired approvals must be re-requested
- Timeout events logged

6. TRUST LEVELS FOR MCP RESULTS

6.1 Trust level definitions
- Low: Generated content, needs verification (e.g., generated docs, mock data)
- Medium: Structured data from reliable sources (e.g., API contracts, design tokens)
- High: Direct from authoritative source (e.g., GitHub API, repo map from static analysis)
- Critical: Mutations that affect production or data integrity (e.g., migrations, merges)

6.2 Trust evaluation
- Each tool declares its trust level
- Gateway can adjust trust based on:
  - Provider health
  - Response validation
  - Historical accuracy
  - User feedback

6.3 Trust-based handling
- Low trust: Always show to user for verification
- Medium trust: Show with confidence indicator
- High trust: Can be auto-applied in safe contexts
- Critical trust: Always requires explicit approval

7. NORMALIZATION

7.1 Response normalization
- All MCP responses normalized to common format:
```json
{
  "tool": "tool_name",
  "server": "server_name",
  "status": "success|error|partial",
  "data": {},
  "meta": {
    "duration": 123,
    "trustLevel": "high",
    "cached": false
  }
}
```

7.2 Error normalization
- All errors mapped to normalized error taxonomy
- Error codes consistent across servers
- User-friendly messages with technical details in debug mode

7.3 Pagination normalization
- All paginated responses use common format:
  - data: array of results
  - next_cursor: cursor for next page (null if last)
  - total: total count (if available)

8. OBSERVABILITY

8.1 Metrics
- Tool call count per server
- Tool call duration (p50, p95, p99)
- Success/failure rate per tool
- Approval rate (approved vs rejected)
- Cache hit rate
- Cost per tool call

8.2 Tracing
- OpenTelemetry traces for all tool calls
- Trace includes:
  - Tool name and server
  - Input parameters (sanitized)
  - Response size
  - Duration
  - Trust level
  - Approval status

8.3 Logging
- Structured logs for all tool calls
- Includes request ID, session ID, project ID
- Sensitive data redacted
- Log levels: debug, info, warn, error

8.4 Dashboards
- Real-time MCP health dashboard
- Tool usage statistics
- Approval queue status
- Error rate alerts

9. HARDENING REQUIREMENTS

9.1 Input validation
- All inputs validated against JSON Schema
- Max input size limits
- No raw command injection
- Path traversal prevention

9.2 Output validation
- All outputs validated against output schema
- Max output size limits
- Sensitive data redaction
- No unexpected side effects

9.3 Rate limiting
- Per-tool rate limits
- Per-session rate limits
- Per-workspace rate limits
- Burst protection

9.4 Timeout handling
- Per-tool timeout limits
- Graceful timeout with partial results
- No hanging connections
- Timeout events logged

9.5 Isolation
- Each MCP server runs in isolated context
- No cross-server data leakage
- Resource limits per server
- Crash recovery without data loss

9.6 Secret management
- API keys stored securely
- No secrets in logs
- Key rotation support
- Per-workspace key isolation

10. TEST REQUIREMENTS

10.1 Unit tests
- Every tool must have unit tests
- Tests cover:
  - Input validation
  - Output validation
  - Error handling
  - Edge cases
- Minimum 80% coverage

10.2 Integration tests
- Tool calls against test servers
- Approval flow tests
- Rate limiting tests
- Timeout tests
- Normalization tests

10.3 End-to-end tests
- Full MCP gateway flow tests
- Multi-tool workflow tests
- Cross-server interaction tests
- Error recovery tests

10.4 Security tests
- Input injection tests
- Path traversal tests
- Rate limit bypass tests
- Secret leakage tests
- Authorization bypass tests

10.5 Performance tests
- Load testing for high-frequency tools
- Memory usage tests
- Connection pool tests
- Cache effectiveness tests

11. MCP TO AGENT ROLE MAPPING

11.1 Planner agent
- Primary tools: repo-map, github (read), docs (read), roadmap (read)
- Purpose: Analyze codebase, understand context, create implementation plans
- Trust level: High (read-only operations)
- Typical flow: read_repo → build_repo_map → analyze_structure → generate plan

11.2 Builder agent
- Primary tools: github (read/write), docs (generate), api-contract (generate), design-token (read)
- Purpose: Generate code, create patches, update files
- Trust level: Medium (write operations need approval)
- Typical flow: read_file → generate_patch → create_pr → request review

11.3 Reviewer agent
- Primary tools: github (read), repo-map, api-contract (validate), docs (validate)
- Purpose: Review code, validate contracts, check documentation
- Trust level: High (read-only with analysis)
- Typical flow: read_file → analyze → validate_contract → submit_review

11.4 Docs helper agent
- Primary tools: docs (read/write/generate), github (read), repo-map
- Purpose: Generate, update, and validate documentation
- Trust level: Medium (generated content needs review)
- Typical flow: read_code → generate_docs → validate_docs → update_docs (approval)

11.5 Release helper agent
- Primary tools: github (read), docs (generate), roadmap (read/update), api-contract (diff)
- Purpose: Generate release notes, changelogs, migration guides
- Trust level: Medium (content generation)
- Typical flow: list_commits → generate_changelog → check_breaking_changes → create_release

12. IMPLEMENTATION ORDER

12.1 Phase 1: Core MCP infrastructure
- MCP gateway skeleton
- Capability registry
- GitHub MCP server (read-only)
- Repo Map MCP server
- Read-only policy enforcement
- Response normalization
- Basic observability

12.2 Phase 2: Write tools and approvals
- GitHub MCP write tools
- Approval flow implementation
- Docs MCP server
- Trust level evaluation
- Approval logging
- Integration tests

12.3 Phase 3: Additional MCP servers
- API Contract MCP server
- D1 Schema MCP server
- Design Token MCP server
- Roadmap MCP server
- Admin tool approval flows
- Security hardening

12.4 Phase 4: Advanced features
- Agent role mapping
- Performance optimization
- Cache layer
- Advanced observability
- End-to-end test suite
- Production readiness review

13. FINAL LOCK

Tiếng Việt
MCP là lớp hạ tầng lõi của OMCODE. Mọi công cụ và thao tác trên repo, docs, API, database, và design tokens đều phải đi qua MCP gateway. Mặc định read-only, write tools cần approval, kết quả được đánh giá trust level, và mọi thứ được quan sát đầy đủ. Không có đường tắt nào bỏ qua MCP layer.

English
MCP is the core infrastructure layer of OMCODE. Every tool and operation on repos, docs, APIs, databases, and design tokens must flow through the MCP gateway. Read-only by default, write tools require approval, results are evaluated for trust level, and everything is fully observable. No shortcuts bypass the MCP layer.
