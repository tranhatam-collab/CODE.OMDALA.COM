# IAI_DEV_WEEK_1_EXECUTION_CHECKLIST.md
## IAI VitaNet - Dev Week 1 Checklist (Locked Execution)
## Based on: IAI_VITANET_EXECUTION_PLAN_V2_LOCKED.md
## Scope: Week 1 only (Critical Path)

---

# 0) WEEK 1 MISSION

Build in locked order for Week 1:

1. FIX `api.flow.iai.one`
2. RUN flow engine end-to-end
3. ENSURE check-in works for real users

If user cannot complete check-in and receive actionable result:
-> STOP all advanced build.

---

# 1) NON-NEGOTIABLE RULES

- Do not build Layer 5 features (physical, machine economy, on-chain identity).
- Do not add blockchain-first architecture.
- Do not ship "AI-first" UX that hides core Life flow.
- Every task must map to: Life -> Flow -> Agent (assist only) -> Proof (later).
- If architecture decision conflicts with Manifest/Constitution: reject change.

---

# 2) TEAM SPLIT (MINIMUM)

- Track A: API + Runtime (`api.flow.iai.one`, Workers, queues, execution state)
- Track B: Product Flow (check-in UX, dashboard handoff, onboarding hook)
- Track C: QA + Observability (error budget, test cases, incident log)

One owner per track. One final approver per day.

---

# 3) DAY-BY-DAY EXECUTION (7 DAYS)

## Day 1 - Incident Triage + Hard Baseline

### Tasks
- Confirm all failing endpoints on `api.flow.iai.one`.
- Map current request path: `app/home/noos` -> `api.flow.iai.one` -> runtime.
- Freeze API contract for Week 1 (no breaking changes after Day 2).
- Create outage matrix: endpoint, status code, error signature, impact.

### Deliverables
- `W1_D1_API_INCIDENT_REPORT.md`
- `W1_D1_FLOW_API_CONTRACT_LOCK.json`
- `W1_D1_RUNTIME_PATH_MAP.md`

### Exit Criteria
- Top 3 breakpoints identified with reproducible steps.
- Team alignment on one contract version for Week 1.

---

## Day 2 - Restore `api.flow.iai.one`

### Tasks
- Fix routing and handler mismatches for core flow endpoints.
- Enforce minimal validation for flow run payload.
- Add structured error responses (`code`, `message`, `requestId`, `hint`).
- Add health endpoint and readiness check.

### Deliverables
- Stable endpoints:
  - `POST /v1/flow/run`
  - `GET /v1/flow/runs/:id`
  - `GET /health`
- `W1_D2_API_FIX_CHANGELOG.md`

### Exit Criteria
- Core endpoints return expected schema in local + deployed environment.
- No unhandled runtime exceptions in standard smoke test.

---

## Day 3 - End-to-End Flow Runtime

### Tasks
- Run one complete flow from trigger to final state.
- Verify state transitions (`queued -> running -> success/fail`).
- Add idempotency key handling to prevent duplicate runs.
- Persist run artifacts/logs needed for debugging.

### Deliverables
- `W1_D3_E2E_FLOW_TEST_REPORT.md`
- `W1_D3_STATE_TRANSITION_LOG.md`
- `W1_D3_IDEMPOTENCY_TESTS.md`

### Exit Criteria
- At least 5 consecutive successful runs with consistent output.
- Duplicate trigger does not create duplicate side effects.

---

## Day 4 - Check-in Core (Life Layer Primary)

### Tasks
- Implement/fix weekly check-in submit flow from UI to API.
- Save check-in data with timestamp and user identity binding.
- Return immediate actionable output (next action, not just "saved").
- Add graceful fallback if agent suggestion is unavailable.

### Deliverables
- `W1_D4_CHECKIN_FLOW_SPEC_LOCK.md`
- `W1_D4_CHECKIN_PAYLOAD_SCHEMA.json`
- `W1_D4_UI_TO_API_TRACE.md`

### Exit Criteria
- User can submit check-in in <= 2 minutes.
- System returns at least one clear action item after submit.

---

## Day 5 - Integration Stabilization (Life -> Flow)

### Tasks
- Connect check-in event to at least 1 production flow.
- Ensure user can see updated status after check-in processing.
- Add retry policy for transient failure.
- Add basic audit fields (`createdBy`, `createdAt`, `traceId`).

### Deliverables
- `W1_D5_LIFE_FLOW_INTEGRATION_REPORT.md`
- `W1_D5_RETRY_POLICY.md`
- `W1_D5_AUDIT_FIELDS_MATRIX.md`

### Exit Criteria
- Check-in triggers flow reliably in staging and prod candidate.
- Retry handles transient errors without data corruption.

---

## Day 6 - QA, Security, Observability

### Tasks
- Run QA suite for critical path:
  - new user check-in
  - returning user check-in
  - API timeout and retry
  - partial failure recovery
- Verify logs + metrics for:
  - request volume
  - error rate
  - p95 response time
- Validate no sensitive data leakage in logs.

### Deliverables
- `W1_D6_QA_REPORT.md`
- `W1_D6_OBSERVABILITY_DASHBOARD_BASELINE.md`
- `W1_D6_SECURITY_LOG_REVIEW.md`

### Exit Criteria
- Critical path pass rate >= 95%.
- No P0/P1 unresolved issue.

---

## Day 7 - Week 1 Launch Gate

### Tasks
- Conduct final go/no-go review.
- Deploy Week 1 candidate.
- Run production smoke test with real user path.
- Publish Week 2 carry-over list (strictly from issues only).

### Deliverables
- `W1_D7_GO_NO_GO.md`
- `W1_D7_DEPLOYMENT_NOTES.md`
- `W1_D7_PRODUCTION_SMOKE_RESULTS.md`

### Exit Criteria
- Real user can complete check-in -> receive action -> see updated status.
- `api.flow.iai.one` stable for core traffic.

---

# 4) REQUIRED TECHNICAL CHECKLIST (MUST PASS)

- [ ] API contract locked and versioned
- [ ] Health endpoint green
- [ ] E2E flow run stable (5/5)
- [ ] Check-in complete path works
- [ ] Idempotency verified
- [ ] Retry policy active
- [ ] Structured logs enabled
- [ ] p95 and error-rate visible
- [ ] Incident rollback notes prepared

---

# 5) DAILY STANDUP FORMAT (STRICT, 10 MIN)

Each track reports only:

1. Yesterday output file(s)
2. Today deliverable file(s)
3. Blocker (if any)
4. Risk to Week 1 mission

No roadmap discussion in standup.

---

# 6) BLOCKER PROTOCOL

If blocker > 2 hours on critical path:

1. Escalate immediately to final approver
2. Switch to fallback implementation
3. Preserve contract compatibility
4. Log trade-off in daily changelog

---

# 7) DEFINITION OF DONE (WEEK 1)

Week 1 is DONE only when all are true:

- `api.flow.iai.one` is operational on core endpoints.
- End-to-end flow runtime works reliably.
- Check-in path works for real users and returns actionable output.
- Observability baseline exists for next iteration.

If any of the above is false:
-> Week 1 is NOT done.

---

# 8) WEEK 1 OUTPUT PACKAGE (HANDOFF TO WEEK 2)

Bundle and share:

- Incident + fix reports (Day 1-2)
- E2E runtime evidence (Day 3)
- Check-in integration evidence (Day 4-5)
- QA/observability evidence (Day 6)
- Launch gate decision (Day 7)

Naming convention:
`W1_D{N}_{TOPIC}.md|json`

---

# FINAL NOTE

Week 1 is execution discipline, not feature expansion.

Priority is survival loop:
Check-in works -> user gets value -> user returns.
