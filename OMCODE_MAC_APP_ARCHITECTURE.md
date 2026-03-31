# OMCODE_MAC_APP_ARCHITECTURE.md

Kiến trúc Mac app cho OMCODE (Mac desktop client)

Mục tiêu
- Xây dựng một Mac app hiệu quả, ổn định, và dễ bảo trì, tích hợp mạch với API gateway và MCP theo đúng chu kỳ release.
- Đảm bảo quy trình build, signing, notarization và packaging hoạt động trơn tru trên macOS.

Scope & Quyết định công nghệ (tạm thời)
- Phương án đề xuất: macOS native (Swift/SwiftUI) hoặc Electron cho cross-platform.
- Hiện tại tài liệu này để tham khảo cho quyết định công nghệ cuối cùng; các quyết định sẽ được nêu rõ ở phiên bản cập nhật sau khi có lựa chọn công nghệ.

Kiến trúc tổng thể
- Modules:
  - UI layer (SwiftUI hoặc WebView-based UI)
  - Networking layer (API gateway client, auth, retries, instrumentation)
  - Data layer (local cache, persistence strategies)
  - IPC / bridging (nếu có tích hợp với core services)
  - Sync / background tasks (phiên bản cho offline support và data sync)
- Giao tiếp với MCP và AI gateway SDK qua các client libraries được cung cấp trong shared packages.

Xây dựng & Packaging (Mac)
- Build system: Xcode (Swift/SwiftUI) hoặc Electron build pipeline nếu chọn Electron.
- Signing & Notarization: ký code, notarize cho macOS, để người dùng có trải nghiệm install an toàn.
- Packaging: tạo DMG hoặc PKG cho phát hành, scripts để tự động hoá quá trình đóng gói.
- Versioning: semantic versioning cho mỗi release mac app.

CI/CD & Release workflow
- GitHub Actions hoặc tương đồng để build Mac app, ký code, notarize và publish artefact lên Repo hoặc artefacts storage.
- Trigger: từ branch release hoặc tag, kết hợp với workflow có kiểm tra unit/UI tests nếu có.

Dev workflow (local)
- Setup macOS dev environment: Xcode, Node? (nếu có webview), Swift package manager, dependencies.
- Run local build, run app, verify basic flows: login, API calls, UI navigation.

Security & Compliance
- Secrets management và minimal exposure trên mac app.
- Tuân thủ guidelines notarization và code signing của Apple.

Ghi chú
- Đây là bản khởi tạo skeleton cho OMCODE Mac app architecture. Nội dung chi tiết sẽ được điền sau khi chọn công nghệ (SwiftUI native hay Electron) và các module cụ thể.
