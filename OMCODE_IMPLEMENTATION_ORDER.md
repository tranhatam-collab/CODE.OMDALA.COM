# OMCODE IMPLEMENTATION ORDER

## code.omdala.com

## Bản khóa thứ tự triển khai thật cho DEV từ ngày đầu đến khi có Mac alpha dùng được, web public chạy được, API gateway hoạt động, và repo đủ sạch để public open-source

## 0. PROJECT LOCK

**Brand:** OMCODE

**Full name:** OMDALA CODE AI

**Primary repo:** `git@github.com:tranhatam-collab/CODE.OMDALA.COM.git`

**Primary public domain:** `code.omdala.com`

**Primary API domain:** `api.omdala.com`

**Primary desktop target:** macOS

**Core shipping priority:** Mac alpha usable first, public web and GitHub in parallel, authenticated web app after core runtime foundation

---

## 1. TRIẾT LÝ TRIỂN KHAI

1. Không build lung tung nhiều hướng một lúc
2. Phải có core chạy được trước khi polish
3. Desktop Mac alpha là cột mốc ưu tiên số 1
4. API Gateway là xương sống
5. Public web phải lên sớm để giữ brand và SEO
6. Repo phải sạch ngay từ đầu để không bị nợ cấu trúc
7. Mỗi phase phải có tiêu chí nghiệm thu rõ
8. Không viết nửa file nửa vời, ưu tiên full file hoàn chỉnh

---

## 2. TRIỂN KHAI THEO 7 PHASE

### Phase 0 — Repo Foundation

Khóa monorepo, toolchain, env, scripts, package boundaries

### Phase 1 — Shared Core Packages

Khóa config, schemas, i18n, UI foundation, prompts, command policies

### Phase 2 — API Gateway Foundation

Khóa `apps/api`, routing, provider abstraction, guardrails, logging, usage

### Phase 3 — Mac Desktop Alpha Core

Làm desktop shell, open local project, session UI, diff flow, provider setup, command center cơ bản

### Phase 4 — Public Website Launch

Dựng `code.omdala.com` với homepage, download, open-source, security, docs entry

### Phase 5 — Authenticated App Core

Dựng dashboard, projects, sessions, providers, settings

### Phase 6 — Docs + Open Source Readiness

Hoàn thiện docs, README, contributing, release flow, GitHub readiness

---

## 3. PHASE 0 — REPO FOUNDATION

## 3.1 Mục tiêu

Tạo nền repo chuẩn để các phase sau build không lệch

## 3.2 Việc phải làm

1. Tạo monorepo structure chuẩn
2. Tạo root files:

   * `README.md`
   * `CLAUDE.md`
   * `AGENTS.md`
   * `MCP_SERVERS.md`
   * `ARCHITECTURE.md`
   * `IMPLEMENTATION_ORDER.md`
   * `TEST_STRATEGY.md`
   * `SECURITY_MODEL.md`
3. Tạo `pnpm-workspace.yaml`
4. Tạo root `package.json`
5. Tạo `turbo.json`
6. Tạo `tsconfig.base.json`
7. Tạo `.env.example`
8. Tạo scripts bootstrap Mac
9. Tạo GitHub workflows cơ bản
10. Tạo Biome hoặc linting baseline

## 3.3 Nghiệm thu phase 0

* clone repo được
* `pnpm install` chạy được
* scripts gốc có mặt
* folder structure đúng chuẩn
* dev mới đọc repo không bị lạc

---

## 4. PHASE 1 — SHARED CORE PACKAGES

## 4.1 Mục tiêu

Khóa mọi thứ dùng chung trước khi build app cụ thể

## 4.2 Thứ tự build packages

1. `packages/config`
2. `packages/schemas`
3. `packages/i18n`
4. `packages/ui`
5. `packages/prompts`
6. `packages/command-policies`
7. `packages/git-tools`
8. `packages/mcp-clients`
9. `packages/ai-gateway-sdk`
10. `packages/shared`

## 4.3 Việc phải làm

* route constants
* env parser
* feature flags
* schema contracts
* bilingual dictionaries
* UI tokens
* base components
* prompt templates
* command tiers
* git status helpers
* MCP wrappers skeleton
* gateway SDK types

## 4.4 Nghiệm thu phase 1

* packages import chéo được
* typecheck qua
* shared UI render được
* schemas dùng được ở API và app
* i18n có vi và en
* prompt registry skeleton chạy được

---

## 5. PHASE 2 — API GATEWAY FOUNDATION

## 5.1 Mục tiêu

Có backend AI thống nhất để desktop và app cùng gọi

## 5.2 Thứ tự build

1. `apps/api` skeleton
2. route grouping
3. schema validation
4. provider adapters
5. prompt loading
6. routing policy
7. redaction layer
8. normalization
9. accounting
10. logging
11. guardrail routes
12. context routes

## 5.3 Routes ưu tiên

* `POST /v1/ai/plan`
* `POST /v1/ai/review`
* `POST /v1/ai/chat`
* `POST /v1/ai/patch-explain`
* `POST /internal/guardrails/policy-check`
* `GET /internal/context/repo-map`
* `GET /internal/context/prompt-registry`

## 5.4 Nghiệm thu phase 2

* API local chạy được
* ít nhất 1 provider route hoạt động
* request/response normalized
* logs cơ bản có
* redaction path có
* policy-check route có
* desktop có thể gọi thử plan route

---

## 6. PHASE 3 — MAC DESKTOP ALPHA CORE

## 6.1 Mục tiêu

Founder dùng được thật trên Mac

## 6.2 Thứ tự build

1. desktop shell bootstrap
2. welcome screen
3. desktop home
4. open local project flow
5. repo detection
6. file tree
7. provider setup
8. session panel
9. plan request
10. diff review panel
11. patch apply flow
12. command center cơ bản
13. diagnostics cơ bản
14. settings cơ bản

## 6.3 MVP bắt buộc cho Mac alpha

* mở folder local
* detect repo
* xem file tree
* thêm provider
* chạy plan
* xem diff đề xuất
* apply patch sau approval
* chạy safe command
* lưu session history cơ bản

## 6.4 Nghiệm thu phase 3

* app mở được trên Mac
* user mới thêm provider được
* project local mở được
* session chạy được
* diff xem được
* patch apply được
* 1 lệnh an toàn chạy được
* không crash ở flow chính

---

## 7. PHASE 4 — PUBLIC WEBSITE LAUNCH

## 7.1 Mục tiêu

Đưa `code.omdala.com` lên live với cấu trúc chuẩn SEO và định vị thương hiệu rõ

## 7.2 Thứ tự build

1. homepage
2. download page
3. open-source page
4. security page
5. docs entry page
6. features page
7. providers page
8. changelog page
9. SEO metadata
10. sitemap and robots
11. OG assets

## 7.3 Nghiệm thu phase 4

* public site live
* mobile ổn
* language switch có
* CTAs đúng
* download page rõ
* GitHub link đúng
* docs link đúng
* canonical và OG đúng

---

## 8. PHASE 5 — AUTHENTICATED APP CORE

## 8.1 Mục tiêu

Có web app quản lý trạng thái làm việc ngoài desktop

## 8.2 Thứ tự build

1. dashboard
2. projects list
3. project detail
4. sessions list
5. session detail
6. providers
7. settings
8. runs list
9. basic agents view
10. prompt list

## 8.3 Nghiệm thu phase 5

* login flow tối thiểu chạy
* dashboard có data thật hoặc seed thật
* projects và sessions xem được
* providers manage được
* settings lưu được cơ bản

---

## 9. PHASE 6 — DOCS + OPEN SOURCE READINESS

## 9.1 Mục tiêu

Repo đủ sạch để public đàng hoàng và contributor chạy được

## 9.2 Việc phải làm

1. README hoàn chỉnh
2. quickstart docs
3. install for Mac
4. provider setup docs
5. architecture docs
6. contribution guide
7. issue templates
8. PR template
9. security disclosure note
10. release notes format

## 9.3 Nghiệm thu phase 6

* dev mới clone và chạy được
* docs không lệch code
* GitHub nhìn chuyên nghiệp
* contributor flow rõ
* open-source trust đủ tốt

---

## 10. PHASE 7 — MCP + PROFESSIONAL WORKFLOW EXPANSION

## 10.1 Mục tiêu

Tăng tốc sản phẩm lên mức professional coding rõ hơn

## 10.2 Việc phải làm

1. GitHub MCP
2. Docs MCP
3. Repo Map MCP
4. API Contract MCP
5. D1 Schema MCP
6. Design Token MCP
7. Roadmap MCP
8. UI integrate MCP context
9. reviewer workflow
10. release-check workflow

## 10.3 Nghiệm thu phase 7

* planner dùng được repo map
* reviewer dùng được contract/schema context
* docs helper dùng docs MCP
* workflow có chiều sâu hơn chat thông thường

---

## 11. THỨ TỰ TRIỂN KHAI THEO TUẦN GỢI Ý

## Tuần 1

* phase 0
* phase 1 phần đầu

## Tuần 2

* phase 1 hoàn tất
* phase 2 bắt đầu

## Tuần 3

* phase 2 hoàn tất bản đầu
* phase 3 bắt đầu

## Tuần 4

* phase 3 ưu tiên hoàn tất Mac alpha core
* phase 4 bắt đầu

## Tuần 5

* phase 4 hoàn tất
* phase 5 bắt đầu

## Tuần 6

* phase 5 hoàn tất bản đầu
* phase 6 bắt đầu

## Tuần 7+

* phase 6
* phase 7
* polish, tests, release preparation

---

## 12. ĐỘ ƯU TIÊN KỸ THUẬT

### P0 — phải có ngay

* repo structure
* shared schemas
* i18n base
* API gateway base
* desktop open project
* provider setup
* session plan flow
* diff viewer
* patch apply

### P1 — rất nên có sớm

* command center
* diagnostics
* public site
* download page
* app dashboard
* session history
* changelog

### P2 — sau khi core chạy

* compare pages
* full agents views
* prompt manager sâu hơn
* MCP expansion
* richer runs history
* advanced settings

---

## 13. BUILD LANES CHO TEAM

## Lane A — Platform Core

* monorepo
* packages
* API
* auth foundations
* logging
* env
* CI

## Lane B — Desktop First

* desktop shell
* local project access
* sessions
* diff
* command center
* diagnostics

## Lane C — Public Web

* homepage
* SEO pages
* download
* open-source
* security
* docs entry

## Lane D — Product App

* dashboard
* projects
* sessions
* providers
* settings

## Lane E — Docs and GitHub

* README
* quickstart
* contribution
* release docs
* issue templates

---

## 14. CHECKLIST NGHIỆM THU CHO FOUNDER

### Mac alpha usable checklist

* [ ] app mở được
* [ ] project local mở được
* [ ] provider thêm được
* [ ] session chạy được
* [ ] diff xem được
* [ ] patch apply được
* [ ] command an toàn chạy được
* [ ] settings cơ bản dùng được

### Public web checklist

* [ ] homepage live
* [ ] download page live
* [ ] GitHub link đúng
* [ ] docs link đúng
* [ ] security page có
* [ ] bilingual ổn

### Repo checklist

* [ ] clone được
* [ ] install được
* [ ] dev script rõ
* [ ] README rõ
* [ ] package boundaries sạch

---

## 15. RULES WHEN BUILDING

1. Không nhảy qua phase sau nếu phase trước chưa có xương sống
2. Không polish trước khi workflow chạy được
3. Không thêm tính năng "hay" nhưng không phục vụ Mac alpha usable
4. Không để FE tự đoán API shapes
5. Không để desktop build trước khi shared schemas và gateway ổn
6. Không để docs viết trước khi kiến trúc khóa

---

## 16. WHAT TO BUILD FIRST TOMORROW MORNING

Nếu bắt đầu code ngay, thứ tự cực ngắn là:

1. tạo monorepo skeleton
2. tạo root scripts và config
3. tạo `packages/config`
4. tạo `packages/schemas`
5. tạo `packages/i18n`
6. tạo `apps/api` skeleton
7. tạo `apps/desktop` skeleton
8. tạo desktop welcome + open project flow
9. tạo provider setup
10. nối plan route đầu tiên

---

## 17. WHAT THIS FILE LOCKS

File này khóa:

* thứ tự build toàn hệ
* phase logic
* milestone Mac alpha
* milestone public web
* milestone app core
* milestone docs/open-source
* lane phân công cho team
* checklist nghiệm thu founder

---

## 18. FINAL LOCK

### Tiếng Việt

OMCODE phải được triển khai theo đúng thứ tự nền tảng trước, trải nghiệm dùng thật trước, mở rộng sau. Trọng tâm đầu tiên là tạo được Mac alpha mà anh có thể dùng để mở project thật, gọi AI thật, xem diff thật và áp thay đổi có kiểm soát. Sau đó mới mở rộng sang web public, app quản lý và open-source scale.

### English

OMCODE must be implemented in the right order: foundation first, real usability first, expansion later. The first priority is a Mac alpha that you can actually use to open real projects, call real AI workflows, inspect real diffs, and apply changes with control. Public web, management app surfaces, and open-source scaling come after that foundation is working.
