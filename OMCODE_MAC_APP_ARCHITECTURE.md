# OMCODE Mac App Architecture

This document outlines the architecture and build plan for the Mac desktop application (Tauri-based) within the OMCODE monorepo.

## 1. Overview
- Tech stack: Tauri (Rust backend with a web frontend), React/TypeScript UI, and shared UI components from the monorepo.
- Target: macOS distribution with code signing and notarization.
- Interaction: Shares authentication and data contracts with the web/app surfaces via APIs or local IPC where appropriate.

## 2. Architecture Components
- Frontend: Web UI built with the existing UI library in packages/ui, mounted inside the Tauri window.
- Backend: Rust-based core logic and native integrations exposed to the frontend via a secure bridge.
- Shared assets: icons, fonts, and design tokens stored under packages/ui and apps/mac-app.

## 3. Build & CI/CD
- Local development: use `tauri dev` with live reload; share environment with web surfaces as needed.
- CI: build Mac app artifacts, sign, and notarize; package installers (DMG) and publish to distribution endpoints.
- Versioning: align with Conventional Commits and semantic versioning of the mac-app package.

## 4. Packaging & Distribution
- Packaging: DMG installer with app sandboxing, code signing, and notarization.
- Versioning and release notes integrated into the GitHub Releases workflow.
- Update mechanism: in-app update hooks or manual download from docs/site.

## 5. Security & Permissions
- Notarization required for macOS distribution; entitlements for network/file access and UI permissions.
- Secure IPC channel between frontend and Rust backend; input validation and payload sanitization.

## 6. Data & Persistence
- Local data stores reside in app sandbox; optional cloud sync with user consent.
- Sensitive data encrypted at rest; keys managed via macOS Keychain when possible.

## 7. Development Workflow
- Share logic where feasible with web surfaces; isolate platform-specific code.
- Testing: unit tests for Rust core, UI tests for frontend, and end-to-end flows.
- Debugging: macOS Console, Tauri devtools, and remote debugging where supported.

## 8. Security & Compliance
- Code signing identity and notarization pipeline must be deterministic and reproducible.
- Audit logging for critical actions and data access.

## 9. Roadmap & Milestones
- Milestone 1: Scaffold Tauri project and integrate shared UI components.
- Milestone 2: Implement core bridge for authentication state sharing and API access.
- Milestone 3: Build, sign, notarize, and generate DMG; publish to distribution channel.

## 10. Appendix: Tauri Config Skeleton
```json
// apps/mac-app/src-tauri/tauri.conf.json
{
  "build": { "distDir": "../dist", "devPath": "../" },
  "package": { "productName": "OMCODE", "version": "0.1.0" },
  "tauri": {
    "allowlist": { "all": false, "shell": { "all": false } },
    "bundle": { "active": true, "targets": ["dmg"], "identifier": "com.omdala.omcode" }
  }
}
```
## 11. Appendix: CI Signing Script (Sample)
```bash
# .github/workflows/mac-build.yml
- name: Sign App
  run: |
    security import ./certs/apple.p12 -k ~/Library/Keychains/login.keychain-db -P $CERT_PASSWORD
    codesign -s "Developer ID Application: OMDALA (TEAMID)" --deep --force ./target/release/bundle/macos/OMCODE.app
    xcrun notarytool submit ./target/release/bundle/macos/OMCODE.app --keychain-profile "AC_PROFILE" --wait
```
---

Owner: [Your Name / Team]
