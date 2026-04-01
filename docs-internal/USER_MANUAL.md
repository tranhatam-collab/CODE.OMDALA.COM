# CIOS — OMDALA CODE AI USER MANUAL
## HƯỚNG DẪN SỬ DỤNG TOÀN DIỆN

### 1. Giới thiệu (Overview)
OMCODE (Omdala Code AI) là workspace AI-native dành cho Mac, tập trung vào workflow viết code thật: mở repo local, đọc context, đề xuất thay đổi, review diff, và áp patch an toàn.

### 2. Bắt đầu nhanh (Quick Start)
1. **Tải về**: Tải bản Alpha từ trang Download.
2. **Setup**: Chọn ngôn ngữ, thêm API Provider.
3. **Open Project**: Chọn folder project local trên máy.
4. **Bắt đầu làm việc**: Mở Session, chat với AI, review patch, apply an toàn.

### 3. Workflow làm việc chuẩn (The Standard Workflow)
Luồng làm việc cốt lõi của OMCODE là "Review & Apply":
1. **Context-Aware Chat**: AI hiểu repo và file tree của bạn.
2. **Patch Suggestion**: AI không ghi đè file ngay. AI tạo ra một "Patch".
3. **Diff Review**: Bạn xem file cũ vs file mới ngay trong trình DiffViewer.
4. **Approval**: Bấm "Approve" để hệ thống ghi đè thay đổi local.

### 4. Quản lý Providers
- OMCODE hỗ trợ đa provider: OpenAI, Anthropic, Cloudflare.
- **Provider Shape**: Mỗi provider có thông tin: `base_url`, `api_key`, `models`.
- Bạn có thể routing model theo tác vụ: Planner (mạnh), Reviewer (an toàn), Chat (nhanh).

### 5. Chính sách Command (Command Policies)
Hệ thống khóa lệnh an toàn theo 3 cấp độ:
- **Safe**: `ls`, `git status`, `pwd` (Tự động chạy).
- **Review**: `git commit`, `pnpm install`, `cp` (Cần phê duyệt).
- **Dangerous**: `rm -rf`, `sudo` (Bị chặn mặc định).

### 6. Bảo mật & Tuân thủ (Constitutional Layer)
- **Local-first**: Code nằm ở local. Dữ liệu chỉ gửi đi khi bạn chủ động bắt đầu session.
- **Redaction**: Mọi secret (API key) bị xóa trước khi gửi lên provider.
- **Audit Trail**: Mọi hành động quan trọng đều được log lại trong D1 database.

### 7. MCP (Model Context Protocol)
MCP giúp AI hiểu sâu hơn về môi trường làm việc:
- **GitHub MCP**: Quản lý PR, Issue, branch.
- **Docs MCP**: Đọc, tạo và validate tài liệu dự án.
- **Repo Map MCP**: Hiểu symbol, dependency và cấu trúc file.
- **D1 Schema MCP**: Quản lý cấu trúc dữ liệu database (dành cho Backend Dev).

### 8. Troubleshooting
- **Lỗi API**: Kiểm tra kết nối trong phần Diagnostics -> Provider Status.
- **Lỗi Local**: Kiểm tra quyền truy cập thư mục của MacOS (System Settings > Privacy & Security).
- **Lỗi build**: Chạy `pnpm typecheck` và `pnpm lint` trong thư mục dự án.

⸻

# USER MANUAL
# CIOS — OMDALA CODE AI

### 1. Overview
OMCODE is an AI-native workspace for Mac developers. It focuses on real coding workflows: opening local repositories, understanding codebase context, proposing patches, diffing changes, and executing commands safely.

### 2. Quick Start
1. **Download**: Install from the Download page.
2. **Setup**: Select language, add an AI API Provider.
3. **Open Project**: Select your local project directory.
4. **Workflow**: Open a session, chat, review patches, and apply safely.

### 3. Standard Workflow
The core "Review & Apply" loop:
1. **Context-Aware Chat**: AI understands your files and repo context.
2. **Patch Suggestion**: AI creates a proposed patch, not a direct file overwrite.
3. **Diff Review**: Compare old vs. new code in the built-in DiffViewer.
4. **Approval**: Click "Approve" to commit changes to your local filesystem.

### 4. Managing Providers
- OMCODE is multi-provider: OpenAI, Anthropic, Cloudflare.
- **Configuration**: Enter Base URL, API Key, and default models.
- **Model Routing**: Configure models per task type (Planner, Reviewer, Chat).

### 5. Command Policies
Commands are strictly classified:
- **Safe**: `ls`, `git status`, etc. (Auto-execute).
- **Review**: `git commit`, `npm install` (Approval required).
- **Dangerous**: `rm -rf`, `sudo` (Blocked by default).

### 6. Security & Compliance
- **Local-first**: Code remains local. Data is shared only during active sessions.
- **Redaction**: API keys and secrets are stripped before provider calls.
- **Audit**: Every significant action is audited in the backend D1 log.

### 7. MCP (Model Context Protocol)
MCP provides deep integration:
- **GitHub MCP**: PRs, issues, and branching.
- **Docs MCP**: Docs generation and validation.
- **Repo Map MCP**: Symbol searching and dependency tracking.
- **D1 Schema MCP**: Database schema management.

### 8. Troubleshooting
- **API Errors**: Check Provider Status in Diagnostics.
- **Permission Errors**: Ensure macOS Folder Access is granted.
- **Build Errors**: Run `pnpm typecheck` or `lint` in the project root.
