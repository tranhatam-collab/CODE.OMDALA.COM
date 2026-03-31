# CONTRIBUTING TO OMCODE

Welcome

Thank you for contributing to OMCODE / OMDALA CODE AI.

OMCODE is being built as a Mac-first, local-first, open-source AI-native coding workspace with a strong focus on real developer workflows, controlled AI actions, multi-provider routing, and clean product architecture.

We want contributions to be useful, production-minded, and easy to review.

⸻

1. Before You Contribute

Please read these files first:
	•	README.md
	•	ARCHITECTURE.md
	•	OMCODE_MASTER_PLAN_2026.md
	•	OMCODE_REPO_STRUCTURE.md
	•	OMCODE_IMPLEMENTATION_ORDER.md
	•	SECURITY_MODEL.md
	•	MCP_SERVERS.md
	•	TEST_STRATEGY.md

If your change touches AI workflows, also read:
	•	OMCODE_API_GATEWAY_SPEC.md
	•	OMCODE_MCP_STRATEGY.md

If your change touches desktop, also read:
	•	OMCODE_MAC_APP_ARCHITECTURE.md

⸻

2. Contribution Principles

English

We prefer contributions that are:
	•	focused
	•	testable
	•	well-scoped
	•	documented
	•	aligned with the product direction

Tiếng Việt

Chúng tôi ưu tiên các đóng góp:
	•	rõ phạm vi
	•	kiểm thử được
	•	không đi lệch kiến trúc
	•	có giải thích đầy đủ
	•	bám đúng hướng sản phẩm

⸻

3. What We Welcome

We especially welcome:
	•	bug fixes
	•	documentation improvements
	•	test improvements
	•	UI consistency fixes
	•	i18n improvements for Vietnamese and English
	•	shared package improvements
	•	desktop workflow improvements
	•	safe MCP integrations
	•	AI Gateway reliability improvements
	•	developer tooling improvements
	•	onboarding and setup improvements

⸻

4. What Needs Discussion First

Please open an issue or discussion before working on:
	•	major architecture changes
	•	new providers
	•	new MCP servers
	•	auth model changes
	•	desktop stack changes
	•	licensing changes
	•	major UI redesigns
	•	new deployment assumptions
	•	anything that expands scope beyond the current roadmap

⸻

5. North Star

The current North Star is:

Ship a usable Mac Desktop Alpha that can open a real local project, run a repo-aware AI session, suggest a patch, and apply it safely.

If your contribution does not support this directly or indirectly, it may be postponed.

⸻

6. Development Setup

Basic flow
	1.	Clone the repository
	2.	Install dependencies
	3.	Copy environment templates
	4.	Run local development commands
	5.	Verify tests and typechecks
	6.	Open a focused pull request

Expected commands

Use the repo-standard scripts once available, such as:

pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test

If there are Mac-specific bootstrap scripts, use those first.

⸻

7. Branching Guidelines

Use focused branch names.

Examples:

feat/desktop-open-project
fix/api-review-route
docs/readme-quickstart
refactor/shared-schemas-cleanup
test/command-policy-cases

Do not mix unrelated work in one branch.

⸻

8. Pull Request Rules

A good PR should:
	•	solve one clear problem
	•	explain what changed
	•	explain why it changed
	•	mention affected areas
	•	include screenshots if UI changed
	•	include test notes
	•	include follow-up notes if the work is partial

PR title examples
	•	feat(desktop): add open project flow
	•	fix(api): normalize provider timeout errors
	•	docs(readme): improve Mac setup instructions

⸻

9. Required PR Template Content

Every PR should answer:
	1.	What problem does this solve
	2.	What changed
	3.	What areas are affected
	4.	How was it tested
	5.	Are there risks or follow-ups
	6.	Does it change docs
	7.	Does it change API or schema contracts

⸻

10. Coding Standards

General
	•	TypeScript-first where applicable
	•	keep files readable
	•	prefer explicit naming
	•	avoid hidden magic
	•	do not hardcode secrets
	•	do not invent API shapes outside the agreed contracts
	•	keep bilingual user-facing content clean

Architecture
	•	do not bypass shared packages casually
	•	do not duplicate schemas
	•	do not mix public website logic with authenticated app logic
	•	do not add provider-specific logic directly into unrelated app surfaces
	•	keep MCP tools explicit and controlled

Desktop
	•	do not introduce uncontrolled shell access
	•	do not assume unrestricted filesystem access
	•	keep approval flows visible

AI workflows
	•	do not paste raw secrets into prompts
	•	do not bypass AI Gateway for serious model calls
	•	keep task types structured
	•	keep prompt usage versioned where possible

⸻

11. Documentation Requirements

If your change affects behavior, update docs.

You should update at least one of these when relevant:
	•	README.md
	•	ARCHITECTURE.md
	•	OMCODE_API_GATEWAY_SPEC.md
	•	OMCODE_MCP_STRATEGY.md
	•	OMCODE_MAC_APP_ARCHITECTURE.md
	•	route or setup docs
	•	contributor docs

⸻

12. Testing Expectations

At minimum, contributors should run the checks relevant to their change.

Examples:
	•	lint
	•	typecheck
	•	unit tests
	•	integration tests
	•	desktop smoke flow
	•	API route tests

If you did not run some tests, say so clearly in the PR.

⸻

13. Security Expectations

If you find a security issue, do not open a public issue with exploit details.

Instead:
	•	use the security reporting path described in the repository
	•	keep sensitive information private until reviewed

Do not commit:
	•	API keys
	•	secrets
	•	private credentials
	•	internal tokens
	•	production environment values

⸻

14. Issues

When opening an issue, be specific.

A good issue includes:
	•	expected behavior
	•	actual behavior
	•	steps to reproduce
	•	environment
	•	screenshots or logs if relevant
	•	affected route, package, or app

⸻

15. Feature Requests

Feature requests should include:
	•	user problem
	•	expected outcome
	•	why this matters now
	•	whether it supports the current North Star
	•	possible implementation area

⸻

16. Good First Contributions

Examples of good first contributions:
	•	improve README clarity
	•	add missing bilingual labels
	•	clean empty states
	•	improve schema docs
	•	add tests for shared helpers
	•	improve route metadata docs
	•	refine provider validation messages
	•	improve Mac onboarding copy

⸻

17. Review Expectations

Maintainers may ask for:
	•	scope reduction
	•	file structure cleanup
	•	additional tests
	•	doc updates
	•	naming improvements
	•	security clarifications

Not every contribution will be merged immediately.

⸻

18. Contributor Conduct

By contributing, you agree to follow the project Code of Conduct.

Please be respectful, practical, and constructive.

⸻

19. Final Note

We want OMCODE to become a serious, usable, open product.

The best contributions are the ones that make the product:
	•	clearer
	•	safer
	•	faster
	•	more usable
	•	more maintainable

Thank you for building with us.
