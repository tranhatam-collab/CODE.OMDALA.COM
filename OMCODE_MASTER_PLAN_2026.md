# OMCODE MASTER PLAN 2026

code.omdala.com

Bản kế hoạch tổng thể khóa định vị, desktop stack, roadmap, business logic, launch logic và risk model cho OMCODE

0. PROJECT LOCK

Brand: OMCODE
Full name: OMDALA CODE AI
Primary domain: code.omdala.com
Primary repo: git@github.com:tranhatam-collab/CODE.OMDALA.COM.git
Primary API domain: api.omdala.com
Primary desktop target: macOS
Architecture direction: Open-source core, Mac-first, local-first, multi-provider, AI-native coding workspace
North Star 2026: Mac Desktop Alpha usable for real daily coding work
Language policy: Vietnamese and English across all key public and product surfaces

⸻

1. EXECUTIVE DECISION SUMMARY

OMCODE không được phát triển như một “AI code chat app” chung chung. Nó phải được khóa là:

Một AI-native coding workspace Mac-first dành cho founder và developer, có open-source core, local-first workflow, multi-provider AI routing, repo-aware sessions, patch review, command safety, và khả năng mở rộng bằng MCP.

Quyết định khóa ngay
	1.	Desktop stack chốt: Tauri 2
	2.	North Star chốt: Mac Desktop Alpha
	3.	Public website chỉ phục vụ 3 việc: brand, SEO, trust
	4.	API Gateway là xương sống duy nhất cho AI
	5.	Open-source core phải public sạch ngay từ đầu
	6.	Mọi phase sau phải phục vụ Mac alpha trước

⸻

2. VISION 2026–2027

2.1 Vision tiếng Việt

Trong 2 năm tới, OMCODE phải trở thành một không gian làm việc viết code bằng AI có thể dùng thật mỗi ngày, đặc biệt mạnh cho founder và dev muốn làm việc trực tiếp trên repo thật, local project thật, nhiều provider thật, với mức kiểm soát cao hơn các công cụ “chat code” thông thường.

2.2 Vision English

Over the next two years, OMCODE should become a real daily-use AI coding workspace, especially strong for founders and developers who want to work directly on real repositories, real local projects, and multiple AI providers with stronger control than typical code chat tools.

2.3 Vision by stage

2026
	•	Mac alpha usable
	•	public website live
	•	API gateway stable
	•	repo public and contributor-ready
	•	basic MCP layer running
	•	founder and internal team dogfooding daily

2027
	•	stronger desktop product
	•	richer professional workflow
	•	team workspaces beta
	•	deeper MCP ecosystem
	•	better release and review automation
	•	open-source community traction
	•	possible paid hosted layer or premium desktop features

⸻

3. NORTH STAR

North Star statement

Build the first version of OMCODE that lets the founder open a real local project on Mac, chat with AI using repo-aware context, review a patch, apply it safely, and run at least one approved dev command.

Anything that does not help this within the next 4–6 weeks is secondary.

⸻

4. PRODUCT POSITIONING

4.1 Core positioning

OMCODE is a Mac-first AI-native coding workspace with an open-source core, local-first project access, multi-provider AI routing, and controlled developer workflows.

4.2 Who it is for first
	1.	Founder-developers
	2.	Technical solo builders
	3.	Small product teams
	4.	Internal engineering teams that want more control
	5.	Open-source contributors

4.3 Not for first
	1.	Large enterprise procurement flows
	2.	Non-technical casual users
	3.	Browser-only coding hobby tools
	4.	Fully autonomous deployment-first agent systems

⸻

5. COMPETITIVE LANDSCAPE

5.1 Cursor

Strength

Strong editor-native workflow, cloud agents, automations, MCP ecosystem, parallel agents.

OMCODE angle

OMCODE không cố thắng Cursor ở “editor replacement” ngay. OMCODE thắng nếu nó:
	•	local-first rõ hơn
	•	workflow có kiểm soát hơn
	•	Mac app dùng thật nhanh hơn cho founder
	•	open-source core rõ hơn
	•	AI Gateway + MCP governance chặt hơn

5.2 Claude Code

Strength

Mạnh ở terminal agent, đọc codebase, sửa file, chạy lệnh, Agent SDK để nhúng cùng loop vào hệ nội bộ.

OMCODE angle

OMCODE không cạnh tranh bằng một terminal agent đơn lẻ. OMCODE là workspace bao trùm hơn:
	•	desktop shell
	•	provider routing
	•	patch review UI
	•	command center
	•	app/dashboard
	•	shared open-source product surface

5.3 GitHub Copilot

Strength

Rất mạnh về ubiquity và editor presence. GitHub mô tả Copilot hoạt động sát editor context và workspace context.

OMCODE angle

OMCODE không nên cố copy inline completion trước. OMCODE nên tập trung vào:
	•	repo workflow
	•	structured sessions
	•	safe patching
	•	controlled commands
	•	open architecture

5.4 Continue.dev, Aider, Windsurf, Copilot Workspace

General market pattern

Thị trường đang chia làm vài hướng:
	•	editor-native assistants
	•	terminal/codebase agents
	•	repo/task planning systems
	•	desktop wrappers
	•	self-host/local-first tools

OMCODE opportunity

OMCODE nên đứng ở giao điểm:
	•	Mac desktop usable
	•	open-source core
	•	AI Gateway control
	•	MCP-connected context
	•	founder-friendly workflow
	•	bilingual product surface

⸻

6. WHY TAURI 2 IS LOCKED

6.1 Decision

Desktop stack chính thức: Tauri 2 + TypeScript frontend + Rust host layer where needed

6.2 Why

Tauri 2 đã stable, hỗ trợ dùng lại frontend web stack, hỗ trợ macOS và mở đường cross-platform.

6.3 Strategic reasons
	1.	Reuse code với web/app tốt hơn SwiftUI thuần
	2.	Nhẹ hơn Electron về định hướng sản phẩm
	3.	Security boundary rõ hơn với Rust host + web frontend
	4.	Mac-first bây giờ, cross-platform sau vẫn thuận
	5.	Hợp với monorepo TypeScript-heavy hiện tại

6.4 What we are not choosing now
	•	Not SwiftUI-first
	•	Not Electron-first
	•	Not browser-only
	•	Not terminal-only

⸻

7. PRODUCT MODEL

7.1 Product surfaces
	1.	code.omdala.com = public site
	2.	app.omdala.com/code = authenticated app
	3.	Mac desktop app = main working surface
	4.	docs.omdala.com/code = docs
	5.	GitHub repo = open-source core
	6.	api.omdala.com = API + AI Gateway

7.2 Core workflows
	•	open local project
	•	repo-aware planning
	•	file understanding
	•	patch proposal
	•	patch review
	•	patch apply
	•	controlled command execution
	•	provider management
	•	session history
	•	docs and GitHub linked context

⸻

8. MVP DEFINITION

8.1 Mac Desktop Alpha MVP

Chỉ cần 5 thứ đầu tiên:
	1.	Open folder
	2.	File tree
	3.	Chat with 1 provider
	4.	Suggest edit
	5.	Apply patch

Nice-to-have in same alpha
	•	basic provider management
	•	one safe command
	•	session history
	•	diagnostics light

8.2 Explicitly not in MVP
	•	advanced multi-user workspaces
	•	cloud sync sophistication
	•	deployment automation
	•	plugin marketplace
	•	custom agent marketplace
	•	enterprise RBAC
	•	polished billing flows

⸻

9. BUSINESS MODEL DIRECTION

9.1 Initial model

Open-source core + optional hosted services later

9.2 Likely long-term model

Free layer
	•	open-source core
	•	local-first desktop use
	•	manual provider key usage
	•	basic docs and public examples

Paid later
	•	managed cloud sync
	•	team workspaces
	•	hosted AI routing
	•	enterprise policy packs
	•	audit dashboards
	•	premium release workflows
	•	premium support or managed hosting

9.3 What not to decide too early
	•	exact pricing tiers
	•	exact enterprise packaging
	•	one-time desktop pricing vs subscription

Hiện tại đúng hơn là build traction + daily utility first, business model after usable product.

⸻

10. OPEN-SOURCE STRATEGY

10.1 Open-source boundary

Public now:
	•	repo structure
	•	public web
	•	docs
	•	shared packages
	•	desktop shell core
	•	API gateway core
	•	prompt registry basics
	•	MCP client basics

May remain private later:
	•	managed hosted services
	•	internal dashboards
	•	enterprise governance packs
	•	premium org analytics

10.2 License decision

Nếu mục tiêu là thu hút contributor mạnh, MIT là lối vào dễ nhất.

Recommendation now

Chốt MIT cho phase mở cộng đồng ban đầu.
Lý do: giảm ma sát contributor, tăng adoption nhanh.

10.3 Files to add immediately
	•	LICENSE
	•	CONTRIBUTING.md
	•	CODE_OF_CONDUCT.md
	•	.github/ISSUE_TEMPLATE/*
	•	.github/PULL_REQUEST_TEMPLATE.md

⸻

11. GO-TO-MARKET

11.1 Phase 1 GTM

Không launch ồn ào. Chỉ cần:
	•	founder uses it daily
	•	public web shows clarity
	•	GitHub looks serious
	•	internal and selected technical users try Mac alpha

11.2 Early narrative
	•	Mac-first AI coding workspace
	•	open-source core
	•	local-first control
	•	multi-provider architecture
	•	bilingual public identity from Vietnam outward

11.3 Initial distribution channels
	1.	GitHub repo
	2.	code.omdala.com
	3.	technical blog posts
	4.	product walkthrough videos later
	5.	founder-led demos
	6.	dev communities after alpha is real

⸻

12. MAIN RISKS AND MITIGATIONS

12.1 Risk: Scope explosion

Problem

Quá nhiều hướng song song: desktop, web, app, docs, AI Gateway, MCP, open-source.

Mitigation

North Star cố định = Mac Desktop Alpha usable.

12.2 Risk: Tech indecision on desktop

Problem

Không khóa stack sẽ chậm cả Phase 3.

Mitigation

Khóa ngay: Tauri 2

12.3 Risk: Product becomes too abstract

Problem

Chiến lược hay nhưng app không dùng được.

Mitigation

Mọi phase phải chứng minh workflow chạy thật.

12.4 Risk: Open-source looks incomplete

Problem

Public repo nhưng thiếu trust files.

Mitigation

Thêm LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, templates ngay.

12.5 Risk: MCP and Gateway stay too high-level

Problem

Tài liệu tốt nhưng dev không biết làm gì trước.

Mitigation

Khóa implementation order theo phase cụ thể.

⸻

13. IMPLEMENTATION PRIORITIES

Priority 1
	•	OMCODE_MASTER_PLAN_2026.md
	•	lock desktop stack
	•	fix README references
	•	add license and contribution files

Priority 2
	•	finish phase 0
	•	finish 7 shared packages first

Priority 3
	•	API Gateway skeleton with /plan, /chat, /review

Priority 4
	•	Mac desktop shell with open project flow

Priority 5
	•	public website minimal live

⸻

14. PHASE TIMELINE WITH DATES

Hôm nay là 31/03/2026, nên tôi khóa timeline theo mốc thực tế này.

Phase 0 — Repo Foundation

Start: 01/04/2026
Target complete: 05/04/2026

Deliverables
	•	monorepo clean
	•	root files exist
	•	root scripts stable
	•	env example done
	•	CI skeleton done

⸻

Phase 1 — Shared Core Packages

Start: 06/04/2026
Target complete: 16/04/2026

Mandatory packages
	1.	config
	2.	schemas
	3.	i18n
	4.	ui
	5.	prompts
	6.	command-policies
	7.	shared

Exit criteria
	•	packages typecheck pass
	•	shared UI foundation renders
	•	i18n vi/en works
	•	schemas shared across apps

⸻

Phase 2 — API Gateway Foundation

Start: 17/04/2026
Target complete: 24/04/2026

Mandatory routes
	•	POST /v1/ai/plan
	•	POST /v1/ai/chat
	•	POST /v1/ai/review

Exit criteria
	•	local API runs
	•	one provider works
	•	request/response normalized
	•	policy check works
	•	logs basic

⸻

Phase 3 — Mac Desktop Alpha Core

Start: 25/04/2026
Target complete: 15/05/2026

Mandatory MVP
	•	open folder
	•	file tree
	•	1 provider chat
	•	suggest edit
	•	apply patch

Exit criteria

Founder can use OMCODE on Mac for one real repo task.

Milestone

Mac Alpha Private Beta: 15/05/2026

⸻

Phase 4 — Public Website Launch

Start: 08/05/2026
Target complete: 01/06/2026

Mandatory pages
	•	Home
	•	Download
	•	Open Source
	•	Security
	•	Docs entry

Milestone

Public Web Launch: 01/06/2026

⸻

Phase 5 — Authenticated App Core

Start: 02/06/2026
Target complete: 20/06/2026**

Mandatory screens
	•	dashboard
	•	projects
	•	sessions
	•	providers
	•	settings

⸻

Phase 6 — Docs + Open-Source Readiness

Start: 10/06/2026
Target complete: 30/06/2026

Milestone

Open-Source Beta Ready: 30/06/2026

⸻

Phase 7 — MCP Professional Expansion

Start: 01/07/2026
Target complete: 20/07/2026

First MCP priority order
	1.	Repo Map
	2.	GitHub
	3.	File-system style read-only repo context wrapper

⸻

15. 4-WEEK ACTION PLAN

Week 1
	•	create OMCODE_MASTER_PLAN_2026.md
	•	lock Tauri 2
	•	add LICENSE
	•	add CONTRIBUTING
	•	add CODE_OF_CONDUCT
	•	complete shared config, schemas, shared

Week 2
	•	complete i18n, ui, prompts, command-policies
	•	API Gateway skeleton
	•	/plan, /chat, /review

Week 3
	•	Tauri shell
	•	open project flow
	•	file tree
	•	provider setup
	•	basic session panel

Week 4
	•	patch suggestion
	•	apply patch
	•	simple public website live
	•	docs entry live

⸻

16. WHAT README MUST CHANGE NOW

README hiện mention file master plan nhưng file đó đang thiếu. Phải sửa ngay một trong hai cách:

Option A

Tạo file này ngay và commit ngay

Option B

Xóa temporary reference khỏi README

Recommendation

Chọn Option A ngay.

⸻

17. WHAT IMPLEMENTATION_ORDER MUST CHANGE NOW

File OMCODE_IMPLEMENTATION_ORDER.md phải được cập nhật thêm:
	1.	estimated duration per phase
	2.	exact milestone dates
	3.	narrowed Mac MVP
	4.	mandatory first 7 shared packages
	5.	explicit desktop stack = Tauri 2

⸻

18. WHAT TO BUILD NEXT, IN ORDER
	1.	Commit OMCODE_MASTER_PLAN_2026.md
	2.	Commit LICENSE
	3.	Commit CONTRIBUTING.md
	4.	Commit CODE_OF_CONDUCT.md
	5.	Update README.md
	6.	Update OMCODE_IMPLEMENTATION_ORDER.md
	7.	Build 7 shared packages
	8.	Build API gateway skeleton
	9.	Build Tauri desktop shell
	10.	Bring code.omdala.com live minimal

⸻

19. FINAL LOCK

Tiếng Việt

OMCODE phải được triển khai theo đúng thứ tự nền tảng trước, trải nghiệm dùng thật trước, mở rộng sau. Trọng tâm đầu tiên là tạo được Mac alpha mà anh có thể dùng để mở project thật, gọi AI thật, xem diff thật và áp thay đổi có kiểm soát. Sau đó mới mở rộng sang web public, app quản lý và open-source scale.

English

OMCODE must be implemented in the right order: foundation first, real usability first, expansion later. The first priority is a Mac alpha that you can actually use to open real projects, call real AI workflows, inspect real diffs, and apply changes with control. Public web, management app surfaces, and open-source scaling come after that foundation is working.
