# OMCODE_REPO_STRUCTURE.md

Kiến trúc repo cho OMCODE / code.omdala.com (Monorepo)

Mục tiêu: Khóa và chuẩn hóa cách tổ chức code, các apps, packages, toolchain, envs, scripts, và GitHub flows để đảm bảo phát triển nhanh, nhất quán và an toàn trên macOS trước khi triển khai lên Cloudflare và các môi trường khác.

Languages: Việt – Anh (song ngữ) với tài liệu và comment bằng cả hai ngôn ngữ ở các phần quan trọng.

## 1) Tổng quan hệ thống (High-level)
- Monorepo chứa các thành phần sau: apps, packages, tools, infra, docs-internal, .ai, và các script hỗ trợ.
- Các root policy và chuẩn coding được ghi ở các file con (ví dụ: ARCHITECTURE.md, IMPLEMENTATION_ORDER.md, SECURITY_MODEL.md, v.v.).
- Mọi thay đổi lớn sẽ đi kèm với PR có đánh giá tác động và tests khi có thể.

## 2) Cấu trúc thư mục (Directory Tree)

OMCODE_ROOT/
- apps/
  - web/
  - desktop/
  - docs/
  - api/
- packages/
  - ui/
  - schemas/
  - prompts/
  - mcp-clients/
  - ai-gateway-sdk/
  - i18n/
  - git-tools/
  - command-policies/
- tools/
- infra/
- docs-internal/
- .ai/
- scripts/
- .github/
- README.md (ở root, tóm tắt cách làm việc và các policy chung)
- OMCODE_INFORMATION_ARCHITECTURE.md (điểm ref kiến trúc tổng thể)
- OMCODE_WEB_PUBLIC_SEO_ARCHITECTURE.md (đang làm)

## 3) Root files và policy chính
- README.md
- CLAUDE.md
- AGENTS.md
- MCP_SERVERS.md
- ARCHITECTURE.md
- IMPLEMENTATION_ORDER.md
- SECURITY_MODEL.md
- ENV_STRATEGY.md
- MAC_BOOTSTRAP_SCRIPTS.md
- CI_GITHUB_STRUCTURE.md
- CLOUDFLARE_RESPONSIBILITIES.md
- BUILD_ORDER.md
- QUICKSTART_DEV.md

## 4) Apps
- apps/web: public website và SPA, multi-language content, SEO-friendly routes.
- apps/desktop: Mac app và các bindings/bridges với API.
- apps/docs: docs portal hoặc static docs công khai.
- apps/api: API gateway và các services liên quan (auth, gateway routing).

## 5) Shared Packages
- UI: components và design tokens dùng chung.
- schemas: định nghĩa schema cho dữ liệu và contracts giữa services.
- prompts: prompts templates và prompt strategies cho AI flows.
- MCP-clients: client cho MCP servers.
- AI-gateway-sdk: SDK cho giao tiếp với AI gateway.
- i18n: i18n strings và dịch ngôn ngữ.
- git-tools: scripts hỗ trợ quản lý git và workflow.
- command-policies: policy và scripts cho hành vi CLI.

## 6) Infra & Tools
- infra: Cloudflare deployments, domain management, workers và infrastructure-as-code.
- tools: các util chung cho dev (build scripts, test runners, lint configs).

## 7) Env, Scripts & CI/CD
- env files: không nên commit secrets; cung cấp example config (ví dụ .env.example).
- Mac bootstrap scripts: thiết lập môi trường macOS cho phát triển (Xcode tools, Homebrew, Node, Python, v.v.).
- CI/GitHub structure: workflows, secrets management, branch protections, PR checks.

## 8) GitHub Flows & Build Order (Mac-first)
- Quy trình dev: feature branch -> PR -> CI checks -> merge to main.
- Commit messages: ngắn gọn, có human-readable lý do thay đổi (what & why).
- Build order (tinh chỉnh cho Mac):
  1) Thiết lập môi trường phát triển (Xcode command line tools, brew, Node, Python).
  2) Cài đặt dependencies cho apps:mọi package cần đồng bộ giữa các apps.
  3) Build và test từng module (shared packages trước, sau đó apps).
  4) Kiểm thử integration giữa apps/api/mcp.
  5) Chuẩn bị release notes và docs.

## 9) Cloudflare Deployment Logic theo domain OMDALA
- Domain mapping và phân nhánh deployment theo hostnames: public site, docs, API gateway, và internal services.
- Quy tắc ở các workflow CI sẽ đảm bảo đúng environment và đúng domain được cập nhật.

## 10) Governance & Compliance
- Đảm bảo bilingual documentation (Việt – Anh) cho tất cả các sections quan trọng.
- Định nghĩa rõ các owner và code owners cho từng thư mục.
- Theo dõi changes và có changelog cho mỗi release nội bộ.

## 11) Deliverables & KPI khi đóng file
- Cấu trúc repo được thống nhất và có thể áp dụng ngay cho dev Mac.
- Các file policy root cập nhật đầy đủ.
- Hướng dẫn build đúng cách cho Mac và CI/CD đã có khuôn mẫu.

Ghi chú: Đây là bản khóa cấu trúc ban đầu. Những chi tiết cụ thể hơn (ví dụ đường dẫn submodule, cấu hình exact cho từng workflow, và nội dung chi tiết của các file root) sẽ được bổ sung ở các file riêng tương ứng với từng domain khi tiến hành.
