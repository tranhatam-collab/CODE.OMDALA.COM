# OMCODE UI Screen Map

This document maps UI surfaces to screens, components, and user journeys across web, docs, and Mac app surfaces.

## 1. Surface Overview
- Web public: Marketing pages, landing, docs hub.
- App: Authenticated dashboard and builder.
- Mac App: Desktop experience with local data and offline support.
- Docs: Documentation explorer with search and navigation.

## 2. Screen Taxonomy
- Common primitives: header, footer, navigation, content cards, modals, toasts.
- Shared components: Button, Input, Card, List, Table, Tabs, etc. (in packages/ui).

## 3. Screen Map by Surface
- Web Public: Home, Features, Blog, Docs index, Docs search.
- App: Login, Dashboard, Projects, Builder, Settings.
- Docs: Docs home, Topic list, Topic detail, Version switcher.
- Mac App: Welcome, Sync status, Local editor, Preferences.

## 4. Navigation Flows
- Primary flows for onboarding, discovery, and content access.
- Contextual navigation for docs within code.omdala.com/code and docs.omdala.com/code/vi/en variants.

## 5. Appendix: Screen-Route Table
| Surface | Screen | Route |
| :--- | :--- | :--- |
| Web | Home | `/` |
| App | Dashboard | `/app/dashboard` |
| Docs | Getting Started | `/docs/start` |
| Mac App | Local Editor | `native://editor` |

---

Owner: [Your Name / Team]
