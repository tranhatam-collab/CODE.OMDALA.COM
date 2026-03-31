# OMCODE Documentation Conventions

To ensure consistent, high-quality documentation across the OMCODE monorepo, follow these conventions:

## 1. Document Structure
- **Title (H1)**: Clear and descriptive.
- **Goals (H2)**: Why are we doing this?
- **Scope (H2)**: What does this cover?
- **Architecture/Design (H2)**: The technical details (diagrams or code samples).
- **Security/Governance (H2)**: Essential for internal tooling.
- **Milestones/Roadmap (H2)**: Clear deliverables.
- **Ownership (H2)**: Who to ask for changes.

## 2. Technical Details
- **Code Samples**: Always include TypeScript types where applicable.
- **Diagrams**: Use Mermaid.js or ASCII diagrams to explain complex flows.
- **Environment**: Explicitly state requirements (env vars, secrets).

## 3. Review Process
- All docs must be stored in the root folder of the project/feature.
- Updates require a PR review with relevant stakeholders.
- PRs for docs should be linked to the implementation PR.
