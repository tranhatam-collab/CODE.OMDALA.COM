export const REGISTRY_VERSION = "2.0.0";
export const SUPPORTED_LANGUAGES = ["vi", "en"];
export const NFT_MARK_URL = "https://nft.iai.one/assets/nft-mark.svg";

export function normalizeLanguage(input) {
  return input === "en" ? "en" : "vi";
}

export function readLocalizedValue(value, language = "vi") {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return value[language] ?? value.vi ?? value.en ?? "";
  }
  return value ?? "";
}

export function readLocalizedList(value, language = "vi") {
  const resolved = readLocalizedValue(value, language);
  if (Array.isArray(resolved)) return resolved;
  if (resolved === "" || resolved === null || resolved === undefined) return [];
  return [resolved];
}

export const COLLECTIONS = [
  {
    slug: "iai-genesis-pass",
    category: "identity",
    categoryLabel: {
      vi: "NFT định danh",
      en: "Identity NFT",
    },
    name: {
      vi: "IAI Genesis Pass",
      en: "IAI Genesis Pass",
    },
    statusLabel: {
      vi: "Sẵn sàng phát hành",
      en: "Issuance-ready",
    },
    tone: "ready",
    network: "Base / EVM",
    tokenStandard: "ERC-721",
    transferability: {
      vi: "Chuyển nhượng có kiểm soát",
      en: "Controlled transfer",
    },
    phaseLabel: {
      vi: "Giai đoạn 1",
      en: "Phase 1",
    },
    anchor: {
      vi: "Tường thuật sáng lập tại home.iai.one",
      en: "Founding narrative on home.iai.one",
    },
    supplyPolicy: {
      vi: "Đợt Genesis mint giới hạn, cần hội đồng phê duyệt",
      en: "Capped genesis mint with council approval",
    },
    issuanceMode: {
      vi: "Mint sau khi xác minh vai trò, quyền truy cập và nguồn gốc",
      en: "Mint after role, access, and provenance verification",
    },
    proofModel: {
      vi: "Bằng chứng vai trò, quyền truy cập và nguồn gốc",
      en: "Role, access, and provenance proof",
    },
    description: {
      vi: "NFT định danh dành cho nhà sáng lập, người xây dựng và người đóng góp sớm của hệ sinh thái IAI. Bộ sưu tập này ưu tiên xác thực vai trò và tính chính danh thay vì đầu cơ.",
      en: "Identity NFT for founders, builders, and early contributors in the IAI ecosystem. This collection prioritizes role verification and legitimacy over speculation.",
    },
    ownerEntity: {
      vi: "IAI Founding Council",
      en: "IAI Founding Council",
    },
    issuerEntity: {
      vi: "IAI Identity Registry",
      en: "IAI Identity Registry",
    },
    disclosureState: "published",
    disclosureLabel: {
      vi: "Đã công bố",
      en: "Published",
    },
    audience: {
      vi: "Nhà sáng lập, builder, contributor sớm",
      en: "Founders, builders, early contributors",
    },
    issuanceWindow: {
      vi: "Đợt genesis theo hội đồng và whitelist",
      en: "Council-reviewed genesis and whitelist issuance",
    },
    gateDescriptions: {
      vi: {
        ownership: "Vai trò, owner entity và quyền truy cập đã được gắn với narrative sáng lập.",
        evidence: "Yêu cầu hash nội dung, tài liệu xác minh và provenance rõ ràng.",
        rights: "Chỉ người được hội đồng xác minh vai trò mới được phát hành hoặc nhận pass.",
        disclosure: "Collection đang ở trạng thái đã công bố công khai trên trust layer.",
        metadata: "Metadata có thể index và gắn trực tiếp với proof model định danh.",
      },
      en: {
        ownership: "Role ownership, entity boundaries, and access rights are tied to the founding narrative.",
        evidence: "Requires a content hash, verification documents, and explicit provenance.",
        rights: "Only council-verified roles may issue or receive this pass.",
        disclosure: "The collection is already published on the public trust layer.",
        metadata: "Metadata is indexable and attached directly to the identity proof model.",
      },
    },
    evidenceRequirements: {
      vi: ["Hash hồ sơ định danh", "Tài liệu xác minh vai trò", "Liên kết narrative tại home.iai.one"],
      en: ["Identity record hash", "Role verification document", "Narrative link on home.iai.one"],
    },
    rightsRequirements: {
      vi: ["Issuer thuộc registry định danh", "Chủ thể đã được duyệt quyền truy cập", "Vai trò nằm trong danh mục genesis"],
      en: ["Issuer belongs to the identity registry", "Subject has approved access rights", "Role falls within the genesis allowlist"],
    },
    metadataRequirements: {
      vi: ["Tên chủ thể", "Ví nhận", "Hash nội dung", "Proof URL"],
      en: ["Subject name", "Recipient wallet", "Content hash", "Proof URL"],
    },
    tags: {
      vi: ["sáng lập", "định danh", "quyền truy cập", "nguồn gốc xác thực"],
      en: ["founding", "identity", "access", "provenance"],
    },
    docPath: "/docs/verification/",
    detailPath: "/collections/iai-genesis-pass",
    publicReady: true,
    image: NFT_MARK_URL,
  },
  {
    slug: "proof-of-truth-badges",
    category: "reputation",
    categoryLabel: {
      vi: "NFT uy tín",
      en: "Reputation NFT",
    },
    name: {
      vi: "Proof of Truth Badges",
      en: "Proof of Truth Badges",
    },
    statusLabel: {
      vi: "Sẵn sàng metadata",
      en: "Metadata-ready",
    },
    tone: "ready",
    network: "Base / Soulbound",
    tokenStandard: "SBT",
    transferability: {
      vi: "Không chuyển nhượng",
      en: "Non-transferable",
    },
    phaseLabel: {
      vi: "Giai đoạn 1",
      en: "Phase 1",
    },
    anchor: {
      vi: "Lớp huy hiệu và xác minh tại app.iai.one",
      en: "Badge and verification layer on app.iai.one",
    },
    supplyPolicy: {
      vi: "Phát hành theo thành tích đã xác minh",
      en: "Issued per verified achievement",
    },
    issuanceMode: {
      vi: "Soulbound mint theo huy hiệu, trạng thái verifier và cộng tác viên tin cậy",
      en: "Soulbound issuance for badges, verifier status, and trusted contributor roles",
    },
    proofModel: {
      vi: "Bằng chứng danh tiếng và đóng góp",
      en: "Reputation and contribution proof",
    },
    description: {
      vi: "Lớp NFT không chuyển nhượng gắn với huy hiệu, trạng thái verifier và cộng tác viên tin cậy trong app.iai.one.",
      en: "A non-transferable NFT layer tied to badges, verifier status, and trusted contributor credentials on app.iai.one.",
    },
    ownerEntity: {
      vi: "IAI Verification Ops",
      en: "IAI Verification Ops",
    },
    issuerEntity: {
      vi: "IAI Reputation Engine",
      en: "IAI Reputation Engine",
    },
    disclosureState: "published",
    disclosureLabel: {
      vi: "Đã công bố",
      en: "Published",
    },
    audience: {
      vi: "Verifier, trusted contributor, operator",
      en: "Verifiers, trusted contributors, operators",
    },
    issuanceWindow: {
      vi: "Phát hành theo sự kiện xác minh và đóng góp",
      en: "Issued on verified reputation and contribution events",
    },
    gateDescriptions: {
      vi: {
        ownership: "Registry uy tín và verification ops là bên chịu trách nhiệm phát hành.",
        evidence: "Mỗi badge gắn với lịch sử đóng góp hoặc hành động xác minh đã ghi nhận.",
        rights: "Chỉ sự kiện uy tín đủ chuẩn mới được tạo soulbound proof.",
        disclosure: "Rule set đã public và không mô tả như tài sản đầu cơ.",
        metadata: "Metadata-ready và đủ trường để indexer truy xuất hồ sơ uy tín.",
      },
      en: {
        ownership: "The reputation registry and verification ops own issuance responsibility.",
        evidence: "Each badge is tied to a contribution or verification event record.",
        rights: "Only qualified reputation events may mint a soulbound proof.",
        disclosure: "The rule set is public and not framed as a speculative asset.",
        metadata: "Metadata-ready with enough fields for indexers to recover the reputation record.",
      },
    },
    evidenceRequirements: {
      vi: ["Event log uy tín", "Badge mapping", "Nguồn sự kiện tại app.iai.one"],
      en: ["Reputation event log", "Badge mapping", "Event source on app.iai.one"],
    },
    rightsRequirements: {
      vi: ["Verifier rule owner phê duyệt", "Badge thuộc taxonomy được hỗ trợ", "Không cho phép chuyển nhượng"],
      en: ["Approved by the verifier rule owner", "Badge belongs to a supported taxonomy", "Transfer is disabled"],
    },
    metadataRequirements: {
      vi: ["Tên chủ thể", "Ví nhận", "Proof URL", "Trạng thái uy tín"],
      en: ["Subject name", "Recipient wallet", "Proof URL", "Reputation state"],
    },
    tags: {
      vi: ["huy hiệu", "sự thật", "soulbound", "uy tín"],
      en: ["badge", "truth", "soulbound", "reputation"],
    },
    docPath: "/docs/metadata/",
    detailPath: "/collections/proof-of-truth-badges",
    publicReady: true,
    image: NFT_MARK_URL,
  },
  {
    slug: "iai-knowledge-certificates",
    category: "certificate",
    categoryLabel: {
      vi: "NFT chứng chỉ",
      en: "Certificate NFT",
    },
    name: {
      vi: "IAI Knowledge Certificates",
      en: "IAI Knowledge Certificates",
    },
    statusLabel: {
      vi: "Pilot phát hành",
      en: "Issuance pilot",
    },
    tone: "pilot",
    network: "Base + IPFS",
    tokenStandard: "ERC-721",
    transferability: {
      vi: "Có thể khóa theo chương trình",
      en: "Programmatically lockable",
    },
    phaseLabel: {
      vi: "Giai đoạn 1",
      en: "Phase 1",
    },
    anchor: {
      vi: "Sổ đăng ký bài học và chứng nhận của IAI",
      en: "IAI lesson and certification registry",
    },
    supplyPolicy: {
      vi: "Mỗi lượt hoàn thành đã xác minh tạo một chứng chỉ",
      en: "One certificate per verified completion",
    },
    issuanceMode: {
      vi: "Mint theo hash bài học, chữ ký issuer và bằng chứng hoàn thành",
      en: "Mint from lesson hash, issuer signature, and completion proof",
    },
    proofModel: {
      vi: "Bằng chứng hoàn thành và hash nội dung",
      en: "Completion proof and content hash",
    },
    description: {
      vi: "NFT chứng chỉ cho bài học, chương trình và kết quả đã được xác minh. Mỗi chứng chỉ phải có hash nội dung, gói bằng chứng và tham chiếu công bố.",
      en: "Certificate NFT for verified lessons, programs, and outcomes. Every certificate must include a content hash, evidence bundle, and disclosure reference.",
    },
    ownerEntity: {
      vi: "IAI Learning Registry",
      en: "IAI Learning Registry",
    },
    issuerEntity: {
      vi: "IAI Course Completion Issuer",
      en: "IAI Course Completion Issuer",
    },
    disclosureState: "pilot",
    disclosureLabel: {
      vi: "Pilot",
      en: "Pilot",
    },
    audience: {
      vi: "Người học, học viên hoàn thành chương trình",
      en: "Learners and program completers",
    },
    issuanceWindow: {
      vi: "Phát hành theo mỗi completion record đã xác minh",
      en: "Issued per verified completion record",
    },
    gateDescriptions: {
      vi: {
        ownership: "Learning registry chịu trách nhiệm về policy và issuer của chứng chỉ.",
        evidence: "Mỗi certificate cần lesson hash, proof URL và completion record cụ thể.",
        rights: "Chỉ completion đã được issuer và ops xác minh mới được mint.",
        disclosure: "Collection đang ở giai đoạn pilot, có thể mint nhưng chưa xem là final contract.",
        metadata: "Metadata và evidence bundle đã sẵn sàng cho preview và issuance flow.",
      },
      en: {
        ownership: "The learning registry is accountable for certificate policy and issuers.",
        evidence: "Each certificate needs a lesson hash, proof URL, and a concrete completion record.",
        rights: "Only completions verified by the issuer and ops may mint.",
        disclosure: "The collection is in pilot, so minting is possible but not yet the final contract release.",
        metadata: "Metadata and evidence bundles are ready for preview and issuance flows.",
      },
    },
    evidenceRequirements: {
      vi: ["Lesson hash", "Completion record", "Proof URL hoặc docs reference"],
      en: ["Lesson hash", "Completion record", "Proof URL or documentation reference"],
    },
    rightsRequirements: {
      vi: ["Issuer signature", "Ops xác minh completion", "Học viên là chủ thể hợp lệ"],
      en: ["Issuer signature", "Ops-verified completion", "Learner is a valid subject"],
    },
    metadataRequirements: {
      vi: ["Tên người nhận", "Ví nhận", "Hash nội dung", "External ID"],
      en: ["Recipient name", "Wallet address", "Content hash", "External ID"],
    },
    tags: {
      vi: ["chứng chỉ", "học tập", "hash", "hoàn thành"],
      en: ["certificate", "learning", "hash", "completion"],
    },
    docPath: "/docs/verification/",
    detailPath: "/collections/iai-knowledge-certificates",
    publicReady: true,
    image: NFT_MARK_URL,
  },
  {
    slug: "creator-rights-pass",
    category: "creator",
    categoryLabel: {
      vi: "NFT bản quyền",
      en: "Creator NFT",
    },
    name: {
      vi: "Creator Rights Pass",
      en: "Creator Rights Pass",
    },
    statusLabel: {
      vi: "Sẵn sàng chính sách",
      en: "Policy-ready",
    },
    tone: "ready",
    network: "Arbitrum or Base",
    tokenStandard: "ERC-721",
    transferability: {
      vi: "Theo điều khoản bản quyền",
      en: "Subject to rights policy",
    },
    phaseLabel: {
      vi: "Giai đoạn 2",
      en: "Phase 2",
    },
    anchor: {
      vi: "Quyền sở hữu sáng tạo và cấp phép",
      en: "Creator ownership and licensing",
    },
    supplyPolicy: {
      vi: "Chỉ mint sau khi hoàn tất xác nhận bản quyền",
      en: "Mint only after rights attestation is complete",
    },
    issuanceMode: {
      vi: "Mint theo tuyên bố quyền, hash nguồn và chính sách royalty",
      en: "Mint from rights statement, source hash, and royalty policy",
    },
    proofModel: {
      vi: "Bằng chứng quyền tác giả và nguồn gốc nội dung",
      en: "Creator-rights and content provenance proof",
    },
    description: {
      vi: "Bằng chứng quyền và royalty dành cho nhà sáng tạo, chủ sở hữu media và đối tác sản xuất trong hệ sinh thái IAI.",
      en: "The rights-and-royalty proof for creators, media owners, and production partners in the IAI ecosystem.",
    },
    ownerEntity: {
      vi: "IAI Creator Rights Office",
      en: "IAI Creator Rights Office",
    },
    issuerEntity: {
      vi: "IAI Licensing Surface",
      en: "IAI Licensing Surface",
    },
    disclosureState: "published",
    disclosureLabel: {
      vi: "Đã công bố",
      en: "Published",
    },
    audience: {
      vi: "Nhà sáng tạo, chủ sở hữu media, đối tác cấp phép",
      en: "Creators, media owners, licensing partners",
    },
    issuanceWindow: {
      vi: "Phát hành theo rights attestation đã hoàn tất",
      en: "Issued after rights attestation is complete",
    },
    gateDescriptions: {
      vi: {
        ownership: "Creator rights office và licensing surface đứng vai trò owner và issuer.",
        evidence: "Cần hash nguồn, rights statement và provenance media rõ ràng.",
        rights: "Đây là collection có gate quyền nghiêm ngặt nhất trước khi phát hành.",
        disclosure: "Phạm vi collection đã công khai nhưng từng item vẫn phụ thuộc sign-off riêng.",
        metadata: "Metadata phải giữ được royalty logic, source provenance và external references.",
      },
      en: {
        ownership: "The creator rights office and licensing surface act as owner and issuer.",
        evidence: "Requires source hashes, rights statements, and clear media provenance.",
        rights: "This collection has the strictest rights gate before issuance.",
        disclosure: "The collection scope is public, but each item still depends on separate sign-off.",
        metadata: "Metadata must preserve royalty logic, source provenance, and external references.",
      },
    },
    evidenceRequirements: {
      vi: ["Source hash", "Rights statement", "Royalty policy reference"],
      en: ["Source hash", "Rights statement", "Royalty policy reference"],
    },
    rightsRequirements: {
      vi: ["Chủ sở hữu nội dung xác nhận", "Điều khoản cấp phép rõ ràng", "Không xung đột quyền phát hành"],
      en: ["Content owner confirmation", "Clear licensing terms", "No issuance-right conflict"],
    },
    metadataRequirements: {
      vi: ["Tên chủ thể", "Proof URL", "Hash nguồn", "External URL"],
      en: ["Subject name", "Proof URL", "Source hash", "External URL"],
    },
    tags: {
      vi: ["creator", "cấp phép", "royalty", "quyền tác giả"],
      en: ["creator", "licensing", "royalty", "rights"],
    },
    docPath: "/docs/disclosure/",
    detailPath: "/collections/creator-rights-pass",
    publicReady: true,
    image: NFT_MARK_URL,
  },
  {
    slug: "ecosystem-asset-ledger",
    category: "treasury",
    categoryLabel: {
      vi: "NFT công bố tài sản",
      en: "Treasury disclosure NFT",
    },
    name: {
      vi: "IAI Ecosystem Asset Ledger",
      en: "IAI Ecosystem Asset Ledger",
    },
    statusLabel: {
      vi: "Bản nháp công bố",
      en: "Disclosure draft",
    },
    tone: "warning",
    network: "Multi-chain + off-chain ledger",
    tokenStandard: "ERC-721",
    transferability: {
      vi: "Không phục vụ giao dịch công khai",
      en: "Not intended for public trading",
    },
    phaseLabel: {
      vi: "Giai đoạn 2",
      en: "Phase 2",
    },
    anchor: {
      vi: "Lớp công bố tài sản số của hệ sinh thái",
      en: "Public asset disclosure layer",
    },
    supplyPolicy: {
      vi: "Mỗi kỳ báo cáo đã duyệt tạo một NFT công bố",
      en: "One disclosure NFT per approved reporting window",
    },
    issuanceMode: {
      vi: "Mint sau khi treasury ký duyệt và việc công bố ví đạt chuẩn",
      en: "Mint after treasury sign-off and wallet disclosure validation",
    },
    proofModel: {
      vi: "Bằng chứng dự trữ, kỳ báo cáo và phê duyệt quản trị",
      en: "Reserve proof, reporting window, and governance approval",
    },
    description: {
      vi: "Bộ sưu tập dự kiến cho các bản công bố tài sản mã hóa và bằng chứng dự trữ của IAI. Chỉ phát hành sau khi treasury ký duyệt hoàn tất.",
      en: "Planned collection for IAI crypto asset disclosures and reserve proofs. Issuance starts only after treasury sign-off is complete.",
    },
    ownerEntity: {
      vi: "IAI Treasury & Governance",
      en: "IAI Treasury & Governance",
    },
    issuerEntity: {
      vi: "IAI Asset Disclosure Registry",
      en: "IAI Asset Disclosure Registry",
    },
    disclosureState: "planned",
    disclosureLabel: {
      vi: "Đã lên kế hoạch",
      en: "Planned",
    },
    audience: {
      vi: "Treasury, governance, cộng đồng theo dõi reserve",
      en: "Treasury, governance, reserve-watch community",
    },
    issuanceWindow: {
      vi: "Phát hành theo kỳ báo cáo đã duyệt",
      en: "Issued per approved reporting window",
    },
    gateDescriptions: {
      vi: {
        ownership: "Treasury và governance nắm owner boundary của collection này.",
        evidence: "Cần reserve proof và reporting window cụ thể trước khi mint.",
        rights: "Không ai được mint nếu chưa có treasury sign-off.",
        disclosure: "Collection mới ở mức planned nên chưa thể xem là production-ready.",
        metadata: "Metadata shape đã có nhưng item thật chưa được công bố đầy đủ.",
      },
      en: {
        ownership: "Treasury and governance own the boundary for this collection.",
        evidence: "Reserve proof and a concrete reporting window are required before minting.",
        rights: "No issuer may mint before treasury sign-off exists.",
        disclosure: "The collection is still planned and cannot be treated as production-ready.",
        metadata: "The metadata shape exists, but real disclosure items are not fully published yet.",
      },
    },
    evidenceRequirements: {
      vi: ["Reserve proof", "Reporting window", "Wallet disclosure references"],
      en: ["Reserve proof", "Reporting window", "Wallet disclosure references"],
    },
    rightsRequirements: {
      vi: ["Treasury sign-off", "Governance hoặc compliance phê duyệt", "Disclosure boundary rõ ràng"],
      en: ["Treasury sign-off", "Governance or compliance approval", "Clear disclosure boundary"],
    },
    metadataRequirements: {
      vi: ["Bucket name", "Proof URL", "Reporting window", "Address state"],
      en: ["Bucket name", "Proof URL", "Reporting window", "Address state"],
    },
    tags: {
      vi: ["treasury", "reserve", "công bố", "governance"],
      en: ["treasury", "reserve", "disclosure", "governance"],
    },
    docPath: "/docs/disclosure/",
    detailPath: "/collections/ecosystem-asset-ledger",
    publicReady: false,
    image: NFT_MARK_URL,
  },
];

export const ASSETS = [
  {
    id: "treasury-master-ledger",
    name: {
      vi: "IAI Treasury Master Ledger",
      en: "IAI Treasury Master Ledger",
    },
    assetType: {
      vi: "Sổ cái treasury",
      en: "Treasury ledger",
    },
    network: "Multi-chain",
    disclosureState: "pending",
    disclosureLabel: {
      vi: "Chờ công bố ví",
      en: "Pending wallet disclosure",
    },
    tone: "warning",
    holdingMode: {
      vi: "Lưu ký hội đồng + tài chính đồng phê duyệt",
      en: "Council custody with finance co-signoff",
    },
    verificationState: {
      vi: "Cấu trúc đã sẵn sàng, danh sách ví chưa đính kèm",
      en: "Structure is ready, wallet list is not attached",
    },
    addressState: {
      vi: "Địa chỉ ví chờ phê duyệt governance",
      en: "Wallet addresses are pending governance approval",
    },
    notes: {
      vi: "Khung công bố tổng hợp cho toàn bộ reserve và treasury asset. Chưa có địa chỉ ví production trong workspace hiện tại.",
      en: "Master disclosure frame for reserve and treasury assets. Production wallet addresses are not included in the current workspace.",
    },
    publicReady: false,
  },
  {
    id: "genesis-pass-contract",
    name: {
      vi: "IAI Genesis Pass Contract",
      en: "IAI Genesis Pass Contract",
    },
    assetType: {
      vi: "Hợp đồng NFT",
      en: "NFT contract",
    },
    network: "Base",
    disclosureState: "planned",
    disclosureLabel: {
      vi: "Đã lên kế hoạch",
      en: "Planned",
    },
    tone: "planned",
    holdingMode: {
      vi: "Ví triển khai hợp đồng hệ sinh thái",
      en: "Ecosystem contract deployer",
    },
    verificationState: {
      vi: "Spec đã duyệt, hợp đồng chưa deploy",
      en: "Collection spec approved, contract not deployed",
    },
    addressState: {
      vi: "Chưa gán địa chỉ hợp đồng",
      en: "Contract address not assigned",
    },
    notes: {
      vi: "Hợp đồng dành cho Genesis Pass của nhà sáng lập và đội xây dựng hệ sinh thái. Chưa được triển khai trong bản scaffold này.",
      en: "The contract for founder and ecosystem-builder Genesis Pass. Not yet deployed in this scaffold.",
    },
    publicReady: false,
  },
  {
    id: "proof-of-truth-badge-set",
    name: {
      vi: "Proof of Truth Badge Set",
      en: "Proof of Truth Badge Set",
    },
    assetType: {
      vi: "Soulbound NFT",
      en: "Soulbound NFT",
    },
    network: "Base",
    disclosureState: "ready",
    disclosureLabel: {
      vi: "Sẵn sàng metadata",
      en: "Metadata-ready",
    },
    tone: "ready",
    holdingMode: {
      vi: "Phát hành gắn với ví người dùng",
      en: "Issued directly to user-bound wallets",
    },
    verificationState: {
      vi: "Schema metadata và mapping badge đã sẵn sàng",
      en: "Metadata schema and badge mapping are ready",
    },
    addressState: {
      vi: "Hợp đồng mint chưa công bố",
      en: "Mint contract not published yet",
    },
    notes: {
      vi: "Lớp NFT không chuyển nhượng gắn với huy hiệu, trạng thái verifier và cộng tác viên tin cậy trong app.iai.one.",
      en: "Non-transferable NFT layer tied to badges, verifier status, and trusted contributor credentials on app.iai.one.",
    },
    publicReady: true,
  },
  {
    id: "knowledge-certificates",
    name: {
      vi: "IAI Knowledge Certificate Tokens",
      en: "IAI Knowledge Certificate Tokens",
    },
    assetType: {
      vi: "NFT chứng chỉ",
      en: "Certificate NFT",
    },
    network: "Base + IPFS",
    disclosureState: "pilot",
    disclosureLabel: {
      vi: "Pilot",
      en: "Pilot",
    },
    tone: "pilot",
    holdingMode: {
      vi: "Phát hành theo mỗi lượt hoàn thành đã xác minh",
      en: "Issued per verified learner completion",
    },
    verificationState: {
      vi: "Cần lesson hash, issuer signature và completion proof",
      en: "Requires lesson hash, issuer signature, and completion proof",
    },
    addressState: {
      vi: "Địa chỉ collection pilot đang chờ",
      en: "Pilot collection address pending",
    },
    notes: {
      vi: "Phù hợp với lớp certification hiện có, nhưng cần thêm contract issuance và claim flow công khai.",
      en: "Aligned with the existing certification layer, but still needs a dedicated issuance contract and public claim flow.",
    },
    publicReady: true,
  },
  {
    id: "creator-rights-vault",
    name: {
      vi: "Creator Rights Provenance Vault",
      en: "Creator Rights Provenance Vault",
    },
    assetType: {
      vi: "Kho provenance bản quyền",
      en: "Rights provenance vault",
    },
    network: "IPFS + Arweave",
    disclosureState: "published",
    disclosureLabel: {
      vi: "Đã công bố phạm vi",
      en: "Published scope",
    },
    tone: "live",
    holdingMode: {
      vi: "Bundle media và bằng chứng bất biến",
      en: "Immutable media and evidence bundle",
    },
    verificationState: {
      vi: "Cần neo source files, attestations và rights statement",
      en: "Anchors source files, attestations, and rights statements",
    },
    addressState: {
      vi: "Có thể công bố storage proof theo từng bundle",
      en: "Storage proof can be published per bundle",
    },
    notes: {
      vi: "Tăng provenance cho media, IP và creator attestations, không nhằm nắm giữ thanh khoản.",
      en: "Strengthens provenance for media, IP, and creator attestations rather than representing liquid treasury holdings.",
    },
    publicReady: true,
  },
  {
    id: "btc-reserve-bucket",
    name: {
      vi: "BTC Reserve Disclosure Bucket",
      en: "BTC Reserve Disclosure Bucket",
    },
    assetType: {
      vi: "Tài sản dự trữ",
      en: "Reserve asset",
    },
    network: "Bitcoin",
    disclosureState: "pending",
    disclosureLabel: {
      vi: "Chờ công bố ví",
      en: "Pending wallet disclosure",
    },
    tone: "warning",
    holdingMode: {
      vi: "Bucket dự trữ treasury",
      en: "Treasury reserve bucket",
    },
    verificationState: {
      vi: "Đã khai báo lớp tài sản, reserve proof chưa đính kèm",
      en: "Asset class declared, reserve proof not attached",
    },
    addressState: {
      vi: "UTXO address tạm ẩn đến khi treasury phê duyệt",
      en: "UTXO addresses withheld until treasury approval",
    },
    notes: {
      vi: "Cho phép công bố reserve bucket cấp hệ sinh thái trước khi mở đầy đủ số dư và địa chỉ chi tiết.",
      en: "Allows disclosure of an ecosystem reserve bucket before exposing full balances and detailed addresses.",
    },
    publicReady: false,
  },
];

export const DOCUMENTS = [
  {
    title: {
      vi: "Trang chủ sổ đăng ký NFT",
      en: "NFT Registry Home",
    },
    path: "/",
    audience: {
      vi: "Công chúng / Hệ sinh thái",
      en: "Public / Ecosystem",
    },
    statusLabel: {
      vi: "Đã xuất bản",
      en: "Published",
    },
    tone: "live",
    summary: {
      vi: "Trang tổng quan cho collections, tài liệu NFT, metadata thật và công bố tài sản số của IAI.",
      en: "The primary overview for collections, NFT documentation, real metadata, and digital asset disclosures in IAI.",
    },
  },
  {
    title: {
      vi: "Docs Hub cho NFT",
      en: "NFT Docs Hub",
    },
    path: "/docs/",
    audience: {
      vi: "Vận hành / Sản phẩm",
      en: "Operations / Product",
    },
    statusLabel: {
      vi: "Đã xuất bản",
      en: "Published",
    },
    tone: "live",
    summary: {
      vi: "Hub điều hướng cho verification, metadata, asset disclosure và API/worker của nft.iai.one.",
      en: "Navigation hub for verification, metadata, asset disclosure, and the API/worker surface of nft.iai.one.",
    },
  },
  {
    title: {
      vi: "Chuẩn xác minh",
      en: "Verification Standard",
    },
    path: "/docs/verification/",
    audience: {
      vi: "Quản trị / Tuân thủ",
      en: "Governance / Compliance",
    },
    statusLabel: {
      vi: "Đã xuất bản",
      en: "Published",
    },
    tone: "live",
    summary: {
      vi: "Điều kiện bắt buộc trước khi mint NFT, công bố ví hoặc phát hành bằng chứng tài sản số.",
      en: "Mandatory gates before minting NFTs, publishing wallets, or issuing digital asset proofs.",
    },
  },
  {
    title: {
      vi: "Schema Metadata",
      en: "Metadata Schema",
    },
    path: "/docs/metadata/",
    audience: {
      vi: "Nhà phát triển / Indexer",
      en: "Developers / Indexers",
    },
    statusLabel: {
      vi: "Đã xuất bản",
      en: "Published",
    },
    tone: "live",
    summary: {
      vi: "Hình dạng JSON cho collection, token metadata, proof bundle và issuance preview trong V2.0.",
      en: "JSON shape for collection, token metadata, proof bundles, and issuance preview flows in V2.0.",
    },
  },
  {
    title: {
      vi: "Chính sách Công bố Tài sản",
      en: "Asset Disclosure Policy",
    },
    path: "/docs/disclosure/",
    audience: {
      vi: "Treasury / Công chúng",
      en: "Treasury / Public",
    },
    statusLabel: {
      vi: "Đã xuất bản",
      en: "Published",
    },
    tone: "live",
    summary: {
      vi: "Quy chuẩn công bố ví, reserve bucket, treasury attestation và nhịp cập nhật.",
      en: "Policy for publishing wallets, reserve buckets, treasury attestations, and update cadence.",
    },
  },
];
