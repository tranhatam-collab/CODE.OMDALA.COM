# OMCODE_INFORMATION_ARCHITECTURE.md

code.omdala.com

Bản khóa cấu trúc tổng thể web, app, docs, desktop, API, GitHub và luồng người dùng

0. PROJECT LOCK

Brand: OMCODE

Full product name: OMDALA CODE AI

Primary public domain: code.omdala.com

Authenticated app surface: app.omdala.com/code

Docs surface: docs.omdala.com/code

Repository: git@github.com:tranhatam-collab/CODE.OMDALA.COM.git

Cloudflare account scope: OMDALA account under the provided dashboard path for omdala.com

Primary launch priority: Mac app usable first, public web and GitHub in parallel.

Language policy: All public and core product surfaces must support Vietnamese and English.

1. PRODUCT DEFINITION

Tiếng Việt
OMCODE là một hệ viết code bằng AI cho developer, founder, nhóm kỹ thuật nhỏ và cộng đồng mã nguồn mở. Hệ này không chỉ là một ô chat để hỏi code. Đây là một workspace thật để mở project, đọc repo, viết file, sửa file, chạy lệnh an toàn, tạo diff, lập kế hoạch tính năng, review thay đổi và tổ chức làm việc với nhiều AI model cùng nhiều công cụ.

English
OMCODE is an AI-native coding workspace for developers, founders, small technical teams, and open-source contributors. It is not a simple code chat box. It is a real working environment for opening projects, reading repositories, editing files, executing controlled commands, reviewing diffs, planning features, and coordinating multiple models and tools.

2. INFORMATION ARCHITECTURE PRINCIPLES

2.1 Core principles
Mac-first experience before broad platform expansion.
Local-first workflow before deep cloud dependency.
Public brand clarity before feature sprawl.
Open-source-ready structure from day one.
One product, multiple surfaces, one coherent language system.
SEO architecture must be designed before content publishing.
Product navigation must clearly separate public information, authenticated work, documentation, and open-source resources.
2.2 Structural principles
Public marketing content must never be mixed with authenticated workspace screens.
Desktop UX and web app UX must share the same conceptual model.
Documentation must reflect real architecture, not aspirational copy only.
GitHub open-source navigation must connect cleanly to public web and docs.
Every major screen must have a clear user purpose, not a generic placeholder.

3. TOP-LEVEL SURFACE MAP

3.1 Surface A — OMDALA Parent Brand

Domain: omdala.com

Purpose
Act as the parent brand and ecosystem layer.
Link users into OMCODE without confusing it with other OMDALA products.
What this surface should do
Present OMCODE as one of OMDALA’s active product branches.
Link to code.omdala.com, app.omdala.com/code, docs.omdala.com/code, and GitHub.
Avoid duplicating detailed product pages that belong on code.omdala.com.
3.2 Surface B — Public Product Website

Domain: code.omdala.com

Purpose
Serve as the official public website for OMCODE.
Explain the product.
Drive SEO.
Route users to docs, GitHub, and app download.
Build contributor and early-user trust.
Primary audiences
Founders who want a Mac-first AI coding tool.
Developers comparing coding tools.
Open-source contributors.
Technical users evaluating self-host or API flexibility.
Potential internal or future enterprise adopters.
Global navigation
Home
Features
Integrations
Providers
Download
Docs
Open Source
Security
Blog
Changelog
Utility navigation
Language switch
GitHub
Open App
Download Mac App
3.3 Surface C — Authenticated App

Domain: app.omdala.com/code

Purpose
Provide the actual logged-in working environment.
Host workspaces, projects, sessions, prompts, providers, runs, reviews, and future team features.
Primary audiences
Founder daily use.
Developers using OMCODE as a working tool.
Internal dev team.
Beta users.
Global app navigation
Dashboard
Workspaces
Projects
Sessions
Agents
Runs
Prompts
Providers
Settings
Utility navigation
Current workspace
Current project
Current branch
Model selector
Command policy status
User profile
3.4 Surface D — Documentation

Domain: docs.omdala.com/code

Purpose
Serve as the technical source of truth for users, contributors, and internal developers.
Primary audiences
New users.
Self-host users.
Contributors.
Internal developers.
API integrators.
Core docs navigation
Introduction
Getting Started
Install for Mac
Open Local Projects
Providers
Local Mode
Architecture
MCP
API Reference
Security Model
Self-host
Contributing
Roadmap
Changelog
3.5 Surface E — GitHub Open Source Layer

Destination: public GitHub repo under tranhatam-collab

Purpose
Host the open-source codebase.
Enable contributors to clone, run, fork, and contribute.
Act as a public technical trust layer.
GitHub entry points that must be linked everywhere relevant
Repository root
Releases
Issues
Discussions if enabled
Contribution guide
Security policy
Roadmap or project board
3.6 Surface F — Mac Desktop App

Primary launch platform: macOS

Purpose
Deliver the fastest usable experience for founder and technical users.
Provide local project access, local runtime, provider key management, repo-aware chat, controlled tools, and patch workflow.
Why it is a separate surface
It must feel like a daily development tool, not just a web wrapper.
It must support local-first workflows better than a browser-only experience.
3.7 Surface G — API Layer

Suggested domain: api.omdala.com

Purpose
Provide a unified backend for app, docs metadata, product services, AI routing, and internal guardrails.
Key route groups
/v1/public/*
/v1/auth/*
/v1/workspaces/*
/v1/projects/*
/v1/sessions/*
/v1/runs/*
/v1/providers/*
/v1/prompts/*
/v1/settings/*
/internal/ai/*
/internal/context/*
/internal/guardrails/*
4. PRIMARY USER JOURNEYS

4.1 Journey 1 — Founder starts using OMCODE on Mac

Steps
Visit code.omdala.com.
Read product summary and key capabilities.
Click Download Mac App.
Install app.
Sign in or continue with local mode.
Open a local project folder.
Add one or more API keys.
Start a repo-aware AI session.
Review suggested changes.
Apply patch and run allowed commands.
Success state
The founder can use the app for real work on day one.

4.2 Journey 2 — Developer discovers OMCODE from SEO

Steps
Land on a feature page or compare page.
Understand what OMCODE does.
Navigate to docs or GitHub.
Review setup and architecture.
Clone repo or test web app.
Open issue or contribute.
Success state
A technical user can evaluate the product without confusion.

4.3 Journey 3 — Contributor wants to run OMCODE locally

Steps
Open GitHub repo.
Read README.
Go to docs quickstart.
Install requirements.
Run local web app.
Run desktop shell.
Configure providers.
Open example project.
Verify core flows.
Success state
A contributor can run the project locally in a predictable way.

4.4 Journey 4 — Authenticated user manages multiple projects

Steps
Sign into app.omdala.com/code.
Select workspace.
Create or connect project.
View sessions, prompts, and runs.
Use agent tools on a chosen project.
Review history and outputs.
Success state
The authenticated app supports real project organization, not just one-off chat sessions.
5. PUBLIC WEBSITE INFORMATION ARCHITECTURE

5.1 Homepage /

Purpose
Explain what is public. 
Finally, provide bilingual support.

5.2 Features /features

Purpose
Present core product capabilities in structured detail.

5.3 Integrations /integrations

Purpose
Show which tools and systems OMCODE can connect to.

5.4 Providers /providers

Purpose
Explain supported AI providers and usage patterns.

5.5 Download /download

Purpose
Make Mac app installation obvious and simple.

5.6 Open Source /open-source

Purpose
Explain what is public, how to contribute, and how the project is structured.

5.7 Security /security

Purpose
Establish technical trust.

5.8 Blog /blog

Purpose
Publish engineering notes, release explanations, and deep technical content.

5.9 Changelog /changelog

Purpose
Show product progress transparently.

5.10 Compare section /compare/*

Purpose
Support comparison-driven SEO and evaluation.

6. AUTHENTICATED APP INFORMATION ARCHITECTURE

6.1 Dashboard /code

Purpose
Show current workspace status, recent projects, recent sessions, and next actions.
Core widgets
- Recent projects
- Recent sessions
- Recent runs
- Current provider status
- Prompt packs
- Open tasks
- Quick actions
6.2 Workspaces /code/workspaces

Purpose
- Organize projects and settings by workspace.
Main actions
- Create workspace
- Rename workspace
- Set defaults
- View members later
- Manage provider policies later
6.3 Projects /code/projects

Purpose
- List and manage code projects.
Main actions
- Add local project
- Connect repo metadata
- View project details
- Open project session
- Manage allowed tools
6.4 Project detail /code/projects/:projectId

Purpose
- Show project summary and entry points.
Main tabs
- Overview
- Files index
- Sessions
- Runs
- Prompts
- Policies
- Settings
6.5 Sessions /code/sessions

Purpose
- Display repo-aware AI working sessions.
Main actions
- Start session
- Resume session
- Filter by project
- Filter by model
- Filter by status
6.6 Session detail /code/sessions/:sessionId

Purpose
- Operate the core AI coding experience.
Core regions
- Chat thread
- Context panel
- File suggestions
- Diff panel
- Tool usage log
- Approval prompts
- Command results
6.7 Agents /code/agents

Purpose
- Expose available agent profiles and capabilities.
Agent profiles
- Planner
- Builder
- Reviewer
- Docs helper
- Release helper
6.8 Runs /code/runs

Purpose
- Track agent execution history.
Main actions
- View run logs
- Filter by project
- Filter by agent type
- Inspect results
- Retry safe tasks
6.9 Prompts /code/prompts

Purpose
- Manage reusable prompt templates and packs.
Main actions
- Browse prompts
- Duplicate prompt
- Edit internal prompt packs
- Assign prompt to workflow
6.10 Providers /code/providers

Purpose
- Manage API providers and routing rules.
Main actions
- Add provider
- Validate API key
- Set default model
- Configure routing policy
- View provider health
6.11 Settings /code/settings

Purpose
- Manage personal and workspace-level settings.
Setting groups
- Language
- Theme
- Provider defaults
- Tool policy
- Privacy mode
- Desktop sync
- Git integration
7. DESKTOP APP INFORMATION ARCHITECTURE

7.1 Desktop shell home

Purpose
- Provide the fastest route into real work.
Core sections
- Open folder
- Recent projects
- Connected providers
- Start session
- Quick tips
7.2 Desktop project view

Purpose
- Give a code workspace feel immediately.
Core layout
- Sidebar with projects and files
- Main editor area or session area
- Right panel for context, diffs, or logs
- Bottom panel for command results if enabled
7.3 Desktop provider setup

Purpose
- Make API onboarding simple and safe.
Required flows
- Add API key
- Validate key
- Store safely
- Assign provider role
- Toggle local-only mode if available
7.4 Desktop command center

Purpose
- Keep tool execution visible and controlled.
Required views
- Pending approvals
- Recent commands
- Safety status
- Allowlist reference
8. DOCUMENTATION INFORMATION ARCHITECTURE

8.1 Docs homepage

Purpose
- Route by user type.
Entry paths
- I want to install OMCODE.
- I want to use OMCODE on Mac.
- I want to connect AI providers.
- I want to contribute.
- I want to self-host.
- I want to understand the architecture.
8.2 Getting started cluster

Introduction
- Install Mac app
- Run web locally
- Add providers
- Open a project
- Start first session
8.3 Product concepts cluster

Workspaces
- Projects
- Sessions
- Runs
- Agents
- Providers
- Prompts
- Policies
8.4 Technical docs cluster

Architecture overview
- Repo structure
- API contracts
- MCP strategy
- Security model
- Prompt system
- Eval system
- Desktop architecture
- Web architecture
8.5 Open-source cluster

Contributing
- Code standards
- Branching model
- Issue triage
- Good first issues
- Release flow
8.6 Self-host cluster

Local-only mode
- Self-host assumptions
- Environment variables
- Storage and provider notes
- Security cautions
9. LANGUAGE ARCHITECTURE

9.1 Supported languages

Vietnamese
English
9.2 Rules

Vietnamese is the primary operating language for internal-first usage.
English is mandatory for all public surfaces and technical contributor access.
Both languages must be available in key product pages, onboarding, docs, and settings.
SEO pages may be split by route structure or served through a bilingual content system, but the language choice must be explicit.
9.3 Language-sensitive surfaces

Homepage
Features
Providers
Download
Security
Docs quickstart
Desktop onboarding
Auth screens
Settings
10. CONTENT OWNERSHIP MAP

10.1 Marketing content

Owned by product and founder direction.
10.2 Technical docs

Owned by dev team and product architecture.
10.3 In-app help

Owned by product UX and docs system.
10.4 Changelog and releases

Owned by engineering and release management.
11. SEO ARCHITECTURE REQUIREMENTS

11.1 Technical SEO requirements

canonical tags
- structured titles and descriptions
- Open Graph
- Twitter cards
- XML sitemap
- robots rules
- internal linking map
- no index on authenticated routes
- clean route naming
11.2 Content SEO requirements

- feature pages targeting real developer queries
- compare pages for high-intent traffic
- install pages for action intent
- docs pages for technical search intent
- blog pages for educational and long-tail traffic
11.3 Indexing rules

Public website pages indexable.
Docs selectively indexable based on page class.
Authenticated app not indexable.
Internal tools not indexable.
12. OPEN-SOURCE INFORMATION ARCHITECTURE

12.1 Public repo expectations

README that explains product clearly
architecture map
install steps
contribution guide
security policy
release notes
12.2 Public repo navigation blocks

What is OMCODE
Why Mac-first
How to run locally
What is open-source today
What is planned next
Where to contribute
13. CLOUDLFARE AND DEPLOYMENT SURFACE LOGIC

13.1 Domain layer

code.omdala.com for public product site
app.omdala.com/code for authenticated app experience
docs.omdala.com/code for documentation
api.omdala.com for API services
13.2 Deployment logic

Public site deployed via Cloudflare Pages.
App shell deployed via Cloudflare Pages or equivalent OMDALA app deployment pattern.
API deployed via Cloudflare Workers.
Assets stored via R2 where needed.
Queue-backed background jobs via Cloudflare Queues.
D1 for transactional metadata.
13.3 Governance note

The provided Cloudflare dashboard scope for omdala.com should be treated as the parent control plane for DNS, deployments, and route setup for code.omdala.com.
14. PRIMARY NAVIGATION SYSTEMS TO DESIGN NEXT

14.1 Public site navigation system

Needs final bilingual labels, mobile nav behavior, utility links, footer structure, and page hierarchy.

14.2 Authenticated app navigation system

Needs sidebar structure, route naming, workspace switcher behavior, session flow, and utility control bar.

14.3 Desktop navigation system

Needs startup state, project open flow, provider setup flow, and active session layout.
15. WHAT MUST BE WRITTEN NEXT AFTER THIS FILE

OMCODE_REPO_STRUCTURE.md
OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md
OMCODE_MAC_APP_ARCHITECTURE.md
OMCODE_API_GATEWAY_SPEC.md
OMCODE_MCP_STRATEGY.md
OMCODE_UI_SCREEN_MAP.md
OMCODE_IMPLEMENTATION_ORDER.md
16. FINAL LOCK

Tiếng Việt
OMCODE phải có cấu trúc thông tin cực rõ ngay từ đầu: public site để giải thích và kéo SEO, app để làm việc thật, docs để hướng dẫn và tạo niềm tin kỹ thuật, desktop để founder và dev dùng mỗi ngày, GitHub để mở cộng đồng, và API để giữ toàn bộ logic chạy phía sau. Không được trộn lẫn các lớp này.

English
OMCODE must start with a clear information architecture: a public site for explanation and SEO, an authenticated app for real work, docs for technical trust, a desktop experience for daily use, GitHub for community and open source, and an API layer for unified backend logic. These surfaces must stay distinct but connected.
