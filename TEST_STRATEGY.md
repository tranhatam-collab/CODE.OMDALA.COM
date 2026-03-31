# TEST_STRATEGY.md — OMCODE Testing Strategy

## Testing Pyramid

```
         ┌─────────┐
         │   E2E   │  ← Critical user journeys only
         ├─────────┤
         │  Integ  │  ← API routes, MCP calls, provider adapters
         ├─────────┤
         │  Unit   │  ← Every module, 80%+ coverage target
         └─────────┘
```

## Test Types by Layer

### Unit Tests
- Every shared package module
- Every API gateway function
- Every MCP tool handler
- Every UI component (logic portion)
- **Target:** 80%+ coverage

### Integration Tests
- API routes with mock providers
- MCP gateway with mock servers
- Provider adapters with test fixtures
- Auth flows with test tokens
- **Target:** All critical paths

### End-to-End Tests
- Mac alpha usable checklist flows
- Public web critical paths
- Authenticated app core flows
- **Target:** Founder acceptance checklists

## Test Tools

- **Unit/Integration:** Vitest
- **E2E:** Playwright (web), custom test harness (desktop)
- **API:** Supertest or equivalent for Workers
- **MCP:** Mock MCP servers with fixture data

## Test Execution

```bash
pnpm test              # Run all tests
pnpm test:unit         # Unit tests only
pnpm test:integration  # Integration tests only
pnpm test:e2e          # E2E tests only
pnpm test:coverage     # Run with coverage report
```

## CI Integration

- All tests run on every PR
- Unit tests must pass before merge
- E2E tests run on main branch
- Coverage reports uploaded to artifact storage

## Test Data

- No real API keys in tests
- Mock providers with fixture responses
- Deterministic test data for reproducibility
- Separate test fixtures per provider

## MCP Testing Requirements

- Every MCP tool must have unit tests
- Integration tests against test servers
- Approval flow tests
- Rate limiting tests
- Timeout tests
- Normalization tests
- Security tests (injection, traversal, secret leakage)

For details, see [OMCODE_MCP_STRATEGY.md](./OMCODE_MCP_STRATEGY.md) §10.
