# NFT.IAI.ONE

`nft.iai.one` là public trust layer cho hệ sinh thái `iai.one`.

Mục tiêu của project này:

- công bố registry NFT cho identity, certificate, badge, creator-rights và treasury disclosures
- định nghĩa quy trình verification trước khi mint hoặc công bố asset on-chain
- tạo docs riêng cho metadata, disclosure policy và issuance gates
- giữ `nft.iai.one` đồng bộ ngôn ngữ và boundary với `home.iai.one`, `app.iai.one`, `flow.iai.one` và `docs.iai.one`

## Public routes

- `/` = homepage + public registry cho collections, documents và crypto asset disclosures
- `/collections/` = live collection registry
- `/collections/[slug]` = chi tiết collection + 5 mint gates + related surfaces
- `/documents/` = document registry
- `/documents/[slug]` = chi tiết document + boundary + proof hash
- `/disclosures/` = disclosure ledger
- `/disclosures/[id]` = chi tiết disclosure + stale detection + boundary
- `/verify/` = verify center cho token, approval, proof URL, content hash, document hoặc disclosure
- `/asset-registrations/` = directory công khai cho các bản ghi đăng ký tài sản mã hóa và VC mirror state
- `/asset-registrations/[id]` = chi tiết auto-check ownership, wallet snapshot hoặc VC mirror của từng bản ghi
- `/token/[collection]/[tokenId]` = token explorer + metadata URL + provenance log
- `/docs/` = docs hub
- `/docs/verification/` = chuẩn phát hành, verification gates và evidence flow
- `/docs/metadata/` = metadata model cho NFT collections, tokens và asset proofs
- `/docs/disclosure/` = công bố tài sản mã hóa, sign-off và cadence cập nhật
- `/api/health` = trạng thái service và mức độ sẵn sàng của live mint writer
- `/api/stats` = live stats cho registry, approvals và issued tokens
- `/api/documents` = document registry API
- `/api/disclosures` = disclosure ledger API
- `/api/approvals` = approval registry API
- `/api/tokens` = token registry API
- `/api/audit` = audit trail API
- `/api/verify` = verify search API
- `/api/asset-registrations` = list/create asset registration records với ownership auto-check và payload mirror cho VC
- `/api/issuance-preview` = sinh metadata thật và checklist phát hành
- `/api/approve-issuance` = tạo request approval hoặc chuyển approval sang approve/reject
- `/api/issue` = gửi giao dịch mint on-chain nếu approval đã `approved` và môi trường `MINT_*` đã đủ
- `/api/revoke-issuance` = revoke public verify state của token đã issue
- `/api/supersede-issuance` = đánh dấu token cũ bị supersede bởi token mới

## Dữ liệu mẫu

Project hiện có 3 file dữ liệu JSON:

- `data/collections.json`
- `data/assets.json`
- `data/documents.json`

Trang home dùng các file này để render registry công khai.

Lưu ý:

- Workspace này chỉ scaffold public disclosure system.
- Các contract address, wallet address và số dư production chưa được cung cấp trong repo hiện tại.
- Vì vậy, các mục cần dữ liệu thật được đánh dấu rõ là `pending`, `planned` hoặc `pilot`.

## Chạy local

```bash
npm install
npm run dev
```

Nếu muốn test live mint locally, tạo `.dev.vars` từ `.dev.vars.example` và điền đủ cấu hình contract thật.

Approval registry, token registry và audit trail hỗ trợ cả `memory` mode lẫn persistent storage. Trong trạng thái hiện tại, `NFT_TRUST_KV` đã được bind cho local/preview và production, nên các state này đang chạy ở `kv` mode và được bảo toàn bền vững qua runtime HTTP. Phần duy nhất còn phụ thuộc secret production là live mint on-chain qua `MINT_*`.

Asset registration V1.0 dùng cùng `NFT_TRUST_KV`, nên mọi bản ghi đăng ký tài sản mới đều có thể:

- nhận `registry URL` riêng trên `nft.iai.one`
- auto-check ownership hoặc wallet snapshot ngay lúc đăng ký nếu `ASSET_RPC_URL` hoặc `MINT_RPC_URL` đã sẵn sàng
- sinh `VC mirror code` để `vc.vetuonglai.com` đọc qua runtime JSON và giữ vai trò xác minh độc lập

## Live mint configuration

`/api/issue` chỉ broadcast giao dịch thật khi:

- payload đi qua `/api/issuance-preview`
- approval được tạo qua `/api/approve-issuance`
- approval đã được chuyển sang `approved`
- collection ở trạng thái `publicReady`
- wallet nhận, `contentHash` và `proofUrl` hợp lệ
- signer + contract config đã sẵn sàng

Biến môi trường bắt buộc:

- `MINT_RPC_URL`: JSON-RPC URL của chain đích
- `MINT_CONTRACT_ADDRESS`: địa chỉ contract mint
- `MINT_SIGNER_PRIVATE_KEY`: private key của ví phát hành
- `MINT_CONTRACT_ABI_JSON` hoặc `MINT_CONTRACT_ABI_BASE64`: ABI thật của contract

Biến tùy chọn:

- `MINT_CHAIN_ID`: chain ID mong đợi để chặn gửi nhầm RPC
- `MINT_FUNCTION_NAME`: tên function hoặc full signature, ví dụ `safeMint` hoặc `safeMint(address,string)`
- `MINT_ARG_OVERRIDES_JSON`: map override theo tên tham số hoặc chỉ số, dùng khi ABI không khớp heuristic mặc định
- `MINT_TX_VALUE_WEI`: ETH/native value cần gửi kèm transaction
- `MINT_GAS_LIMIT`: gas limit cố định
- `MINT_WAIT_FOR_CONFIRMATION`: `true` nếu muốn đợi receipt ngay trong request
- `MINT_CONFIRMATIONS`: số confirmation cần đợi khi bật wait mode

Heuristic mặc định của writer:

- `address` => lấy từ `walletAddress`
- `string` chứa `uri` => lấy `preview.metadataUrl`
- `string` chứa `proof` => lấy `proofUrl`
- `string` chứa `hash` => lấy `contentHash`
- `uint256 tokenId` => tự suy ra từ `preview.tokenId`
- `quantity` hoặc `amount` => mặc định `1`

Nếu contract của bạn khác các pattern phổ biến trên, dùng `MINT_ARG_OVERRIDES_JSON`.

Ví dụ:

```json
{
  "to": "0x1234...abcd",
  "tokenId": "42",
  "tokenUri": "https://nft.iai.one/api/metadata/iai-genesis-pass/42?lang=vi"
}
```

## Deploy

```bash
npm run deploy:pages
```

## Cloudflare Pages secrets

Thiết lập secret production bằng Wrangler:

```bash
wrangler pages secret put MINT_RPC_URL --project-name nft-iai-one
wrangler pages secret put MINT_CONTRACT_ADDRESS --project-name nft-iai-one
wrangler pages secret put MINT_SIGNER_PRIVATE_KEY --project-name nft-iai-one
wrangler pages secret put MINT_CONTRACT_ABI_JSON --project-name nft-iai-one
wrangler pages secret put MINT_FUNCTION_NAME --project-name nft-iai-one
wrangler pages secret put MINT_ARG_OVERRIDES_JSON --project-name nft-iai-one
```

Hoặc sync hàng loạt từ `.mint.secrets.env`, `.dev.vars` hoặc environment hiện tại:

```bash
npm run sync:mint-secrets
```

## Pha tiếp theo

1. cấu hình đầy đủ `MINT_*` secrets để bật live mint on-chain cho collection pilot
2. cấu hình `ASSET_RPC_URL` theo chain chính để auto-check ownership không phải fallback về reviewing
3. nối `flow.iai.one` vào issuance pipeline để sinh metadata và evidence bundle
4. nối `app.iai.one` vào approval surface cho treasury + creator sign-off
5. bật export JSON/CSV, stale detection sâu hơn và mobile polish cuối
