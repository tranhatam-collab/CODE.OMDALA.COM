# OMCODE_API_GATEWAY_SPEC.md

Kiến trúc API Gateway cho OMCODE

Mục tiêu
- Cung cấp một gateway API an toàn, mở rộng, và dễ tích hợp với MCP và Multi-provider.
- Đảm bảo performance, bảo mật, và observability cho các downstream services (apps/api, MCP, AI gateway, và external providers).

## 1) Phạm vi chức năng
- Routing & load balancing cho các downstream services.
- Authentication & Authorization (JWT/OAuth2, mTLS nếu cần).
- Rate limiting, quotas và circuit breaking.
- Transformation và aggregation: request/response shaping, header/body transforms.
- Caching và CDN-friendly responses cho những endpoints công khai.
- Plugin architecture để tích hợp với Providers và MCP.
- Observability: metrics, tracing (OpenTelemetry), logs.
- Security: input validation, threat protection, và hardening.

## 2) Kiến trúc tổng thể
- Components:
  - Gateway core: routing engine, plug-in manager.
  - Auth service: token validation, permissions.
  - Policy engine: rate limiting, quotas, circuit breakers, WAF-like rules.
  - Provider adapters: MCP, OpenAI/Anthropic/Gemini providers via MCP SDK.
  - Telemetry: metrics, tracing, logging.
- Data plane và control plane được phân tách rõ, có thể triển khai độc lập.

## 3) API specifications &Contracts
- OpenAPI 3.x cho REST endpoints, và schema cho các RPC calls có thể bằng GraphQL hoặc gRPC nếu cần.
- Versioning: v1, v2, ... và các route nào có breaking changes sẽ được tránh dùng đường dẫn khác hoặc có header versioning.
- Contracts giữa gateway và downstream services (data contracts) và schemas cho response.

## 4) Security & Identity
- JWT/OAuth2 cho người dùng và client applications.
- API keys cho các provider truy cập các dịch vụ nội bộ.
- MTLS giữa gateway và downstream services khi cần bảo mật cao.
- Validation và normalization ở edge để ngăn input threats.

## 5) Policy & Throttling
- Rate limits theo IP, API key, và user context.
- Quotas theo thời gian (hourly/daily).
- Circuit breakers để fallback an toàn cho downstream unavailable.

## 6) Observability & Telemetry
- OpenTelemetry-based traces và metrics cho gateway và downstream services.
- Logs structured với context (request id, user id, endpoint, thời gian xử lý).

## 7) Deployment & CI/CD
- Build và test gateway: unit tests, integration tests, và end-to-end tests.
- Notarization và signing (nếu gateway chạy native) hoặc container signing cho deployment.
- CI pipeline cho build, test, và deploy vào infra (Cloudflare Workers hoặc serverless framework).

## 8) Roadmap & Milestones
- Phase 1: basic routing, auth và rate limiting ở mức tối giản.
- Phase 2: provider adapters và MCP integration.
- Phase 3: observability và security hardening.

## 9) Appendix: Ví dụ Endpoints và Routing Rules
- Endpoint example: GET /v1/status -> returns service health.
- Endpoint example: POST /v1/execute -> proxy to MCP service with policy checks.

Ghi chú: Đây là khung spec khởi tạo. Các chi tiết sẽ được điền đầy đủ sau khi chọn công nghệ triển khai gateway (ví dụ: NGINX/OpenResty, Kong, AWS API Gateway, Cloudflare Workers, hoặc một gateway tùy chỉnh).
