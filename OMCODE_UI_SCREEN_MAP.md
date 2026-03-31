# OMCODE UI SCREEN MAP

## code.omdala.com

## Bản khóa toàn bộ màn hình cho web public, app authenticated và Mac desktop để FE, BE, desktop dev build sát nhau ngay từ đầu

## 0. PROJECT LOCK

**Brand:** OMCODE

**Full name:** OMDALA CODE AI

**Primary public domain:** `code.omdala.com`

**Authenticated app surface:** `app.omdala.com/code`

**Docs surface:** `docs.omdala.com/code`

**Primary desktop target:** macOS

**Primary repo:** `git@github.com:tranhatam-collab/CODE.OMDALA.COM.git`

**Language requirement:** Song ngữ Việt Anh cho tất cả bề mặt quan trọng

**Core UI rule:** OMCODE phải nhìn và vận hành như một công cụ viết code chuyên nghiệp, không phải landing đẹp nhưng app yếu

---

## 1. MỤC TIÊU CỦA FILE NÀY

File này khóa các điểm sau:

1. Danh sách toàn bộ màn hình chính
2. Route map cho web, app và desktop
3. Mục tiêu từng màn hình
4. Các vùng giao diện trong từng màn hình
5. Hành động chính trong từng màn hình
6. Empty states
7. Permission states
8. Error states
9. Các label song ngữ định hướng cho FE
10. Quan hệ giữa web public, app authenticated và desktop

---

## 2. TRIẾT LÝ UI CHUNG

### 2.1 Nguyên tắc

1. Mọi màn hình phải có mục tiêu rõ ràng
2. Mỗi màn hình phải giúp user tiến thêm một bước trong workflow code thật
3. Không tạo màn hình chỉ để trình diễn ý tưởng mơ hồ
4. Public site để giải thích và dẫn hướng
5. App để làm việc thật
6. Desktop để làm việc nhanh và sâu với local project
7. UI phải tối giản nhưng chuyên nghiệp
8. UX phải ưu tiên tốc độ nhận thức và hành động
9. Song ngữ phải sạch, không rối
10. Mọi vùng UI phải gắn với data thật hoặc empty state tử tế

### 2.2 Mô hình lớp giao diện

* Lớp 1: Public marketing and SEO
* Lớp 2: Authenticated workspace
* Lớp 3: Desktop coding workspace
* Lớp 4: Docs and onboarding support

---

## 3. SCREEN GROUPS TO BUILD

### Group A — Public website screens

Dành cho `code.omdala.com`

### Group B — Authenticated app screens

Dành cho `app.omdala.com/code`

### Group C — Desktop screens

Dành cho app Mac

### Group D — Shared support screens

Các màn hình dùng chung như auth, errors, onboarding, settings helper

---

## 4. GROUP A — PUBLIC WEBSITE SCREEN MAP

## A1. Home

**Route:** `/`

### Purpose

Giải thích OMCODE là gì, vì sao khác biệt, dẫn người dùng đến docs, GitHub, download Mac app hoặc open app

### Main regions

1. Hero
2. Product summary
3. Why Mac-first
4. Multi-provider support
5. Local-first workflow
6. Open-source core
7. Feature grid
8. Architecture overview
9. GitHub and Docs
10. Security summary
11. Download section
12. CTA footer

### Primary actions

* Download for Mac
* Open App
* View GitHub
* Read Docs

### Empty state

Không áp dụng theo kiểu app, nhưng nếu chưa có bản tải thì phải hiện "Mac alpha coming" rõ ràng

### Key bilingual labels

* Viết code với AI, nhưng kiểm soát thật
* AI coding with real control
* Tải app cho Mac
* Download for Mac
* Xem mã nguồn mở
* View Open Source

---

## A2. Features

**Route:** `/features`

### Purpose

Giải thích tính năng cốt lõi ở mức đủ sâu để dev hiểu giá trị sản phẩm

### Main regions

1. Feature intro
2. Repo-aware sessions
3. File editing and patch flow
4. Controlled command execution
5. Multi-provider routing
6. Prompt registry
7. Session history
8. Git-aware workflow
9. Future team capabilities

### Primary actions

* Compare features
* Read docs
* Try app
* Download Mac app

### Required notes

Mỗi feature block phải có:

* mô tả ngắn
* mô tả sâu
* trạng thái hiện tại
* liên kết sang docs hoặc workflow liên quan

---

## A3. Integrations

**Route:** `/integrations`

### Purpose

Cho thấy OMCODE không bị khóa cứng trong một mô hình hay một tool đơn lẻ

### Main regions

1. Integrations hero
2. AI providers
3. GitHub integration
4. MCP-based context tools
5. Docs and repo intelligence
6. Local project access
7. Future ecosystem connectors

### Primary actions

* Read provider docs
* View MCP strategy
* View GitHub repo

---

## A4. Providers

**Route:** `/providers`

### Purpose

Giải thích các nhà cung cấp model và vai trò của từng loại

### Main regions

1. Provider overview
2. OpenAI block
3. Anthropic block
4. Workers AI block
5. Local model note
6. Routing policy explanation
7. Security and key handling note

### Primary actions

* Learn how routing works
* Setup provider in app
* Read docs

---

## A5. Download

**Route:** `/download`

### Purpose

Là trang hành động chính cho người muốn dùng ngay trên Mac

### Main regions

1. Download hero
2. macOS requirements
3. Release channels
4. Install steps
5. First launch steps
6. Troubleshooting quick links
7. Docs link
8. Release notes link

### Primary actions

* Download Mac alpha
* Read install guide
* Read release notes

### Required state

Nếu chưa có signed build chính thức, phải ghi rất rõ trạng thái alpha

---

## A6. Open Source

**Route:** `/open-source`

### Purpose

Xây trust và kéo contributor

### Main regions

1. Open-source philosophy
2. What is public now
3. Repo links
4. Contribution flow
5. Roadmap note
6. Governance note
7. License note

### Primary actions

* Open GitHub
* Read contribution guide
* View roadmap

---

## A7. Security

**Route:** `/security`

### Purpose

Giải thích local-first, key handling, approval model và trust boundaries

### Main regions

1. Security overview
2. Local-first privacy model
3. Provider key handling
4. Command approval model
5. Write safety
6. Responsible disclosure
7. Security docs link

### Primary actions

* Read docs
* Report issue
* View architecture

---

## A8. Blog

**Route:** `/blog`

### Purpose

SEO dài hạn và engineering credibility

### Main regions

1. Blog list
2. Featured post
3. Category filters
4. Related docs/resources
5. Newsletter or updates later if needed

---

## A9. Changelog

**Route:** `/changelog`

### Purpose

Cho thấy sản phẩm đang phát triển thật

### Main regions

1. Release stream
2. Version cards
3. Change categories
4. Links to docs or GitHub releases
5. Known issues if needed

---

## A10. Compare pages

**Routes:**

* `/compare/cursor`
* `/compare/claude-code`
* `/compare/copilot`
* `/compare/local-ai-stacks`

### Purpose

SEO theo ý định so sánh cao

### Main regions

1. Comparison hero
2. Who each product fits
3. Feature comparison narrative
4. OMCODE angle
5. When to choose which
6. CTA

---

## 5. GROUP B — AUTHENTICATED APP SCREEN MAP

## B1. Dashboard

**Route:** `/code`

### Purpose

Điểm vào trung tâm sau khi đăng nhập

### Main regions

1. Top bar
2. Workspace switcher
3. Recent projects
4. Recent sessions
5. Recent runs
6. Provider status
7. Quick actions
8. Prompt packs
9. Open tasks later

### Primary actions

* Open project
* Start session
* Add provider
* Resume recent work

### Empty state

Nếu user mới:

* chưa có project
* chưa có provider
* chưa có session
  thì phải có guided onboarding blocks

---

## B2. Workspaces

**Route:** `/code/workspaces`

### Purpose

Quản lý không gian làm việc

### Main regions

1. Workspace list
2. Workspace detail preview
3. Create workspace action
4. Default settings summary
5. Future members area

### Primary actions

* Create workspace
* Rename workspace
* Switch workspace

---

## B3. Projects

**Route:** `/code/projects`

### Purpose

Danh sách dự án người dùng đang dùng với OMCODE

### Main regions

1. Projects list
2. Search and filters
3. Project cards or table
4. Project status indicators
5. Add project action

### Primary actions

* Add project
* Open project
* Inspect project status

### Empty state

"Chưa có dự án nào"

* Add first project
* Open local project on Mac
* Read setup guide

---

## B4. Project Detail

**Route:** `/code/projects/:projectId`

### Purpose

Trang tổng quan một project

### Main regions

1. Project header
2. Repo summary
3. File index summary
4. Sessions tab
5. Runs tab
6. Prompts tab
7. Policies tab
8. Settings tab

### Primary actions

* Start session
* View recent diffs
* View policies
* Open in desktop later if supported

---

## B5. Sessions

**Route:** `/code/sessions`

### Purpose

Danh sách mọi session AI theo project

### Main regions

1. Sessions filters
2. Session list
3. Project filter
4. Model filter
5. Status filter
6. Quick resume panel

### Primary actions

* Start new session
* Resume session
* Archive session later

---

## B6. Session Detail

**Route:** `/code/sessions/:sessionId`

### Purpose

Màn hình làm việc AI cốt lõi trên web app

### Main regions

1. Session header
2. Conversation thread
3. Context sidebar
4. File suggestion panel
5. Diff panel
6. Tool usage log
7. Approval prompts
8. Action footer

### Primary actions

* Ask question
* Request plan
* Request review
* Request patch explanation
* Approve or reject action

### Empty state

Nếu chưa có message:

* show starter prompts
* show suggested tasks
* show selected project context

### Important note

Nếu web app chưa hỗ trợ full local depth như desktop, phải ghi rõ capability boundaries

---

## B7. Agents

**Route:** `/code/agents`

### Purpose

Hiển thị agent profiles và vai trò

### Main regions

1. Agent list
2. Planner card
3. Builder card
4. Reviewer card
5. Docs helper card
6. Release helper card
7. Future custom profiles

### Primary actions

* View profile
* Set defaults later
* Learn how routing works

---

## B8. Runs

**Route:** `/code/runs`

### Purpose

Lịch sử execution của agent và workflow

### Main regions

1. Run filters
2. Runs list
3. Result summary
4. Error state area
5. Retry safe flows later

### Primary actions

* Inspect run
* Filter by task type
* Filter by provider
* Open linked session or project

---

## B9. Run Detail

**Route:** `/code/runs/:runId`

### Purpose

Xem chi tiết một run

### Main regions

1. Run header
2. Route and task metadata
3. Input summary
4. Output summary
5. Usage and timing
6. Policy decisions
7. MCP activity later if relevant
8. Errors if any

---

## B10. Prompts

**Route:** `/code/prompts`

### Purpose

Quản lý prompt templates

### Main regions

1. Prompt categories
2. Prompt list
3. Prompt detail preview
4. Version info
5. Usage context
6. Duplicate/edit later if allowed

### Primary actions

* Browse prompts
* Inspect prompt role
* Assign to workflow later

---

## B11. Providers

**Route:** `/code/providers`

### Purpose

Quản lý API providers và model routing settings

### Main regions

1. Provider list
2. Provider health status
3. Add provider flow
4. Routing defaults
5. Security notes

### Primary actions

* Add provider
* Validate key
* Set default
* View health

### Empty state

"Chưa có provider nào được cấu hình"

* Add first provider
* Read provider guide

---

## B12. Settings

**Route:** `/code/settings`

### Purpose

Tập trung mọi cấu hình cá nhân và workspace

### Main regions

1. Language settings
2. Appearance later
3. Provider defaults
4. Privacy mode
5. Command policies
6. Desktop sync notes
7. Diagnostics links
8. Account basics

---

## 6. GROUP C — DESKTOP SCREEN MAP

## C1. Welcome Screen

**Desktop route/state:** startup if first launch

### Purpose

Dẫn người dùng mới qua bước cài đặt đầu tiên

### Main regions

1. Welcome hero
2. Language selection
3. Local-only mode option
4. Sign-in option
5. Add provider shortcut
6. Open project shortcut
7. Quickstart links

### Primary actions

* Continue in Vietnamese
* Continue in English
* Use local mode
* Sign in
* Add provider
* Open project

---

## C2. Desktop Home

**Desktop route/state:** default home after setup

### Purpose

Trang vào nhanh để bắt đầu làm việc trên Mac

### Main regions

1. Recent projects
2. Recent sessions
3. Connected providers
4. Quick actions
5. Diagnostics mini-panel
6. Example project shortcut

### Primary actions

* Open project
* Resume session
* Add provider
* Open example project

---

## C3. Open Project Flow

**Desktop state:** modal or system picker flow

### Purpose

Chọn folder local và cấp quyền truy cập

### Main regions

1. System folder picker
2. Access confirmation
3. Repo detection summary
4. Success transition

### Required states

* selected non-repo folder
* selected repo folder
* permission revoked
* indexing in progress

---

## C4. Project Workspace

**Desktop route/state:** active project shell

### Purpose

Môi trường làm việc chính trên Mac

### Main regions

1. Top workspace bar
2. Left project sidebar
3. Main session/editor area
4. Right context or diff panel
5. Bottom command output panel

### Primary actions

* Browse file tree
* Open session
* Review diff
* Run approved command
* Open settings
* Switch provider

---

## C5. File Tree Panel

**Desktop subregion**

### Purpose

Điều hướng project

### Main regions

1. Project root
2. folders
3. files
4. search
5. recent files later

### Primary actions

* open file
* select file for context
* multi-select later if needed

---

## C6. Session Panel

**Desktop state inside workspace**

### Purpose

Luồng chat AI theo repo

### Main regions

1. Session header
2. Conversation
3. Starter prompts
4. Context summary
5. Actions bar
6. Response actions

### Primary actions

* Ask repo question
* Generate plan
* Request review
* Propose patch
* Explain file
* Summarize changes

---

## C7. Diff Review Panel

**Desktop subregion**

### Purpose

Cho user xem thay đổi trước khi apply

### Main regions

1. Changed files list
2. Diff viewer
3. Summary
4. Approve / reject actions
5. Explain patch

### Primary actions

* Apply patch
* Reject patch
* Ask for revision
* Copy explanation

---

## C8. Command Center

**Desktop screen or panel**

### Purpose

Quản lý command execution có kiểm soát

### Main regions

1. Pending approvals
2. Recent commands
3. Risk labels
4. Output logs
5. Policy profile
6. Safety notes

### Primary actions

* Approve command
* Reject command
* View logs
* Open policy info

---

## C9. Providers Screen

**Desktop route/state**

### Purpose

Setup và quản lý providers

### Main regions

1. Provider list
2. Add provider form
3. Validation status
4. Role assignment
5. Provider details
6. Health state

### Primary actions

* Add provider
* Validate key
* Remove provider
* Set default route

---

## C10. Session History

**Desktop route/state**

### Purpose

Xem lại các phiên làm việc

### Main regions

1. Session list
2. Filters
3. Resume actions
4. Session metadata
5. Archive later

---

## C11. Diagnostics

**Desktop route/state**

### Purpose

Hỗ trợ debug và support

### Main regions

1. App version
2. Environment summary
3. Provider connectivity
4. Command policy status
5. Logs summary
6. Export diagnostics

### Primary actions

* Export diagnostics
* Recheck environment
* View system status

---

## C12. Settings

**Desktop route/state**

### Purpose

Cấu hình app Mac

### Main regions

1. Language
2. Theme later
3. Privacy mode
4. Project permissions
5. Provider defaults
6. Command policy
7. Update channel
8. Advanced settings later

---

## 7. GROUP D — SHARED SUPPORT SCREEN MAP

## D1. Sign In

**Routes/states:** app auth and optional desktop auth

### Purpose

Đăng nhập tài khoản OMCODE hoặc OMDALA account context

### Main regions

1. Auth intro
2. Sign-in form
3. Local-only alternative on desktop
4. Support links

---

## D2. Error Screen

**Routes/states:** generic fallback

### Purpose

Hiển thị lỗi tử tế, không để trang vỡ mơ hồ

### Required blocks

1. Error title
2. Human-readable message
3. Technical code
4. Retry action
5. Docs or support link

### Bilingual principle

Lỗi cho user phải dễ hiểu bằng Việt và Anh

---

## D3. Empty State Blocks

### Purpose

Tái dùng cho toàn hệ

### Required empty states

* no projects
* no sessions
* no providers
* no runs
* no prompts
* no recent activity
* no diagnostics data yet

---

## D4. Permission Prompts

### Purpose

Chuẩn hóa các prompt xin quyền hoặc approval

### Cases

* folder access
* provider key save
* command approval
* elevated operation warning
* patch apply confirmation

---

## 8. GLOBAL NAVIGATION DESIGN

## 8.1 Public website nav

### Main items

* Home
* Features
* Integrations
* Providers
* Download
* Docs
* Open Source
* Security
* Blog
* Changelog

### Utility items

* Language switch
* GitHub
* Open App
* Download for Mac

---

## 8.2 App nav

### Sidebar or top nav items

* Dashboard
* Workspaces
* Projects
* Sessions
* Agents
* Runs
* Prompts
* Providers
* Settings

### Utility areas

* workspace switcher
* project context
* provider status
* user menu

---

## 8.3 Desktop nav

### Main shell areas

* Home
* Projects
* Sessions
* Providers
* Command Center
* Diagnostics
* Settings

### In-workspace navigation

* file tree
* session
* diff
* logs

---

## 9. GLOBAL UI COMPONENT REGIONS

Các màn hình trên nên tái sử dụng cùng một hệ component lớn:

1. Top bars
2. Sidebars
3. Section headers
4. Status badges
5. Action buttons
6. Empty state blocks
7. Tool logs
8. Diff panels
9. Provider cards
10. Project cards
11. Session list items
12. Run metadata blocks
13. Warning banners
14. Approval modals

---

## 10. STATE TYPES TO DESIGN IN FE

## 10.1 Loading states

* page loading
* section loading
* provider validation loading
* project indexing loading
* session response streaming
* run detail loading

## 10.2 Empty states

* no data yet
* setup required
* local project not connected
* no provider configured

## 10.3 Success states

* provider connected
* patch applied
* session saved
* project indexed
* command completed

## 10.4 Warning states

* provider unhealthy
* command requires approval
* project permissions limited
* policy blocked action

## 10.5 Error states

* route failed
* provider timeout
* MCP unavailable
* auth expired
* diagnostics failed

---

## 11. PERMISSION STATES TO DESIGN

## 11.1 Folder access

* not granted
* granted
* revoked
* partially limited

## 11.2 Provider permissions

* missing key
* key invalid
* key valid
* provider degraded

## 11.3 Command permissions

* safe auto
* approval required
* blocked by policy

## 11.4 Workspace permissions later

* owner
* editor
* viewer

---

## 12. MOBILE AND RESPONSIVE NOTES

### Public site

Phải mobile-first và đẹp trên điện thoại

### Authenticated app

Responsive hợp lý, nhưng có thể tối ưu desktop/tablet trước

### Desktop app

Không có responsive mobile, nhưng phải hỗ trợ cửa sổ co giãn tốt

---

## 13. BILINGUAL LABEL STRATEGY

## 13.1 Public labels

Phải có bản Việt và Anh hoàn chỉnh

## 13.2 Auth app labels

Ít nhất các nhãn chính phải song ngữ từ đầu

## 13.3 Desktop onboarding and settings

Bắt buộc song ngữ

## 13.4 Technical detail panels

Có thể ưu tiên tiếng Anh kỹ thuật hơn ở giai đoạn đầu, nhưng label chính vẫn cần song ngữ

---

## 14. SUGGESTED SCREEN BUILD PRIORITY

### Priority 1

1. Public Home
2. Download
3. Open Source
4. Desktop Welcome
5. Desktop Home
6. Desktop Project Workspace
7. Desktop Session Panel
8. Desktop Diff Review
9. Desktop Providers
10. Desktop Command Center

### Priority 2

1. Features
2. Providers page
3. Security page
4. App Dashboard
5. App Projects
6. App Sessions
7. App Session Detail
8. App Providers
9. App Settings

### Priority 3

1. Integrations
2. Blog
3. Changelog
4. Compare pages
5. App Runs
6. App Agents
7. App Prompts
8. Diagnostics deep views

---

## 15. SCREEN-TO-DATA RELATIONSHIP

### Public pages

Dựa trên CMS-like content hoặc content files nội bộ

### App pages

Dựa trên API:

* workspaces
* projects
* sessions
* runs
* providers
* prompts
* settings

### Desktop pages

Dựa trên:

* local project state
* session state
* provider state
* command state
* diagnostics state
* optional synced account state

---

## 16. WHAT FE MUST NOT DO

1. Không tự bịa route ngoài map này
2. Không trộn public site với authenticated app
3. Không biến desktop workspace thành chatbox đơn giản
4. Không ẩn trạng thái policy và approval
5. Không hardcode text song ngữ rải rác thiếu kiểm soát
6. Không dựng màn hình rỗng mà không có empty state tốt

---

## 17. WHAT THIS FILE LOCKS

File này khóa:

* toàn bộ nhóm màn hình chính
* route map chính
* mục tiêu từng màn hình
* vùng UI của từng màn hình
* hành động chính
* state groups
* permission states
* bilingual screen direction
* build priority cho FE

---

## 18. FILE TIẾP THEO

**OMCODE_IMPLEMENTATION_ORDER.md**

File này sẽ khóa:

* thứ tự build thật cho DEV
* tuần tự repo → API → desktop → web → docs
* milestone Mac alpha
* milestone web public
* milestone GitHub open-source beta
* checklist nghiệm thu từng giai đoạn

---

## 19. FINAL LOCK

### Tiếng Việt

Giao diện của OMCODE phải được xây như một hệ có cấu trúc rõ ràng, nơi public site để giải thích, app để quản lý, desktop để làm việc thật, và mọi màn hình đều phục vụ workflow viết code chuyên nghiệp. Không được để UI phát triển theo kiểu vá từng màn hình rời rạc.

### English

The OMCODE interface must be built as a structured system where the public site explains, the app manages, the desktop environment performs real work, and every screen supports a professional coding workflow. UI development must not drift into isolated, patch-by-patch screens.
