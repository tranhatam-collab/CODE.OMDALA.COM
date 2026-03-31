import { normalizeLanguage, readLocalizedList, readLocalizedValue } from "./registry-data.js";

export const RELEASE_STATES = {
  draft: {
    vi: "Bản nháp",
    en: "Draft",
    tone: "planned",
  },
  pilot: {
    vi: "Pilot",
    en: "Pilot",
    tone: "pilot",
  },
  published: {
    vi: "Đã xuất bản",
    en: "Published",
    tone: "live",
  },
  archived: {
    vi: "Đã lưu trữ",
    en: "Archived",
    tone: "warning",
  },
};

const DOCUMENT_DETAILS = {
  "/": {
    slug: "registry-home",
    category: {
      vi: "Portal",
      en: "Portal",
    },
    releaseState: "published",
    updatedAt: "2026-03-23T08:00:00.000Z",
    ownerEntity: {
      vi: "NFT.IAI.ONE Registry",
      en: "NFT.IAI.ONE Registry",
    },
    boundary: {
      vi: "Trang công khai tổng hợp collection, token, verify center và disclosure ledger cho toàn hệ sinh thái IAI.",
      en: "The public surface aggregating collections, tokens, the verify center, and the disclosure ledger for the full IAI ecosystem.",
    },
    proofUrl: "https://nft.iai.one/",
    contentHash: "sha256:7cbf50d51a4077059b6bb3be1cdd192d44a7c0357aef2616d4ce878102fabdd1",
    sections: {
      vi: ["Live stats", "Mint Studio V2", "Registry surfaces", "API-first metadata"],
      en: ["Live stats", "Mint Studio V2", "Registry surfaces", "API-first metadata"],
    },
  },
  "/docs/": {
    slug: "docs-hub",
    category: {
      vi: "Hub tài liệu",
      en: "Documentation hub",
    },
    releaseState: "published",
    updatedAt: "2026-03-23T07:40:00.000Z",
    ownerEntity: {
      vi: "IAI Documentation Surface",
      en: "IAI Documentation Surface",
    },
    boundary: {
      vi: "Điểm điều hướng chính thức cho chuẩn verification, metadata, boundary công bố và logic worker.",
      en: "The official navigation hub for verification, metadata, disclosure boundaries, and worker logic.",
    },
    proofUrl: "https://nft.iai.one/docs/",
    contentHash: "sha256:4f9b05af12cfa66de278a31503b13eea923d4ee6c30db57e644938da62af9b3f",
    sections: {
      vi: ["Hub điều hướng", "Boundary chuẩn", "API references"],
      en: ["Navigation hub", "Boundary rules", "API references"],
    },
  },
  "/docs/verification/": {
    slug: "verification-standard",
    category: {
      vi: "Verification",
      en: "Verification",
    },
    releaseState: "published",
    updatedAt: "2026-03-23T07:35:00.000Z",
    ownerEntity: {
      vi: "IAI Verification Ops",
      en: "IAI Verification Ops",
    },
    boundary: {
      vi: "Định nghĩa 5 mint gates và điều kiện xác minh trước khi approval hoặc issue on-chain được phép tiếp tục.",
      en: "Defines the 5 mint gates and the verification conditions required before approval or on-chain issuance may continue.",
    },
    proofUrl: "https://nft.iai.one/docs/verification/",
    contentHash: "sha256:1dea8d91c2f2166359e394f2deab4cf49f98178163b90e3f2a4f1fd4ba9ea0ef",
    sections: {
      vi: ["5 mint gates", "Approval boundary", "Issue boundary", "Verify surface"],
      en: ["5 mint gates", "Approval boundary", "Issue boundary", "Verify surface"],
    },
  },
  "/docs/metadata/": {
    slug: "metadata-schema",
    category: {
      vi: "Metadata",
      en: "Metadata",
    },
    releaseState: "published",
    updatedAt: "2026-03-23T07:20:00.000Z",
    ownerEntity: {
      vi: "IAI Metadata Registry",
      en: "IAI Metadata Registry",
    },
    boundary: {
      vi: "Chuẩn metadata API-first cho collection, token, proof bundle và provenance log.",
      en: "The API-first metadata standard for collections, tokens, proof bundles, and provenance logs.",
    },
    proofUrl: "https://nft.iai.one/docs/metadata/",
    contentHash: "sha256:2559c98f3f58d531263440c811d06c2f1b9280d6c89f75fb6f17f0c1a4c9443f",
    sections: {
      vi: ["Collection schema", "Token metadata", "Proof bundle", "Stable metadata URL"],
      en: ["Collection schema", "Token metadata", "Proof bundle", "Stable metadata URL"],
    },
  },
  "/docs/disclosure/": {
    slug: "asset-disclosure-policy",
    category: {
      vi: "Disclosure",
      en: "Disclosure",
    },
    releaseState: "published",
    updatedAt: "2026-03-23T07:10:00.000Z",
    ownerEntity: {
      vi: "IAI Treasury & Compliance",
      en: "IAI Treasury & Compliance",
    },
    boundary: {
      vi: "Quy chuẩn công bố tài sản mã hóa, reserve buckets, stale detection và disclosure boundary công khai.",
      en: "Defines public disclosure for crypto assets, reserve buckets, stale detection, and the disclosure boundary.",
    },
    proofUrl: "https://nft.iai.one/docs/disclosure/",
    contentHash: "sha256:804ef60f8af66bb903d3df9fd13cd12defdb03d825e6e6f4de368644dc4b8ec2",
    sections: {
      vi: ["Disclosure ledger", "Reserve proof", "Stale detection", "Compliance boundary"],
      en: ["Disclosure ledger", "Reserve proof", "Stale detection", "Compliance boundary"],
    },
  },
};

const DISCLOSURE_DETAILS = {
  "treasury-master-ledger": {
    releaseState: "draft",
    updatedAt: "2026-03-20T05:00:00.000Z",
    staleAfterDays: 7,
    collectionSlug: "ecosystem-asset-ledger",
    boundary: {
      vi: "Khung sổ cái tổng hợp cho treasury và reserve bucket. Không hiển thị địa chỉ production khi chưa có sign-off governance.",
      en: "The master treasury and reserve-bucket ledger. Production addresses stay hidden until governance sign-off is complete.",
    },
    proofUrl: "https://nft.iai.one/docs/disclosure/",
    contentHash: "sha256:0486461d3f72ecf2c1b2b38b936d076f89d4a9f1765961c65b612ca5af1e518e",
    disclosureWindow: {
      vi: "Chu kỳ báo cáo governance hàng tuần",
      en: "Weekly governance reporting cadence",
    },
  },
  "genesis-pass-contract": {
    releaseState: "draft",
    updatedAt: "2026-03-19T10:20:00.000Z",
    staleAfterDays: 14,
    collectionSlug: "iai-genesis-pass",
    boundary: {
      vi: "Spec contract cho Genesis Pass, chưa deploy production và chưa công bố địa chỉ contract final.",
      en: "The Genesis Pass contract specification, not yet deployed to production and without a final public contract address.",
    },
    proofUrl: "https://nft.iai.one/collections/iai-genesis-pass",
    contentHash: "sha256:373c63d31a60b2ba6d6c100f587ce691af8db747b5ef36c56e0c438b6834f1f9",
    disclosureWindow: {
      vi: "Cập nhật khi contract stage thay đổi",
      en: "Updated whenever the contract stage changes",
    },
  },
  "proof-of-truth-badge-set": {
    releaseState: "pilot",
    updatedAt: "2026-03-23T06:50:00.000Z",
    staleAfterDays: 30,
    collectionSlug: "proof-of-truth-badges",
    boundary: {
      vi: "Metadata schema và badge mapping đã public, còn contract mint và signer giữ trong boundary vận hành.",
      en: "The metadata schema and badge mapping are public, while the mint contract and signer stay inside the operations boundary.",
    },
    proofUrl: "https://nft.iai.one/collections/proof-of-truth-badges",
    contentHash: "sha256:50cad5f41783d3b9987d2a264bb78225c451ef0c80ad87701f8657ec80314771",
    disclosureWindow: {
      vi: "Cập nhật theo taxonomy badge và release notes",
      en: "Updated alongside badge taxonomy and release notes",
    },
  },
  "knowledge-certificates": {
    releaseState: "pilot",
    updatedAt: "2026-03-23T06:30:00.000Z",
    staleAfterDays: 21,
    collectionSlug: "iai-knowledge-certificates",
    boundary: {
      vi: "Pilot certificate issuance với proof bundle và lesson hash, chưa công bố contract final.",
      en: "Pilot certificate issuance using proof bundles and lesson hashes, without a final public contract address yet.",
    },
    proofUrl: "https://nft.iai.one/collections/iai-knowledge-certificates",
    contentHash: "sha256:ddae55d0feec6c92403e0c65ac3b887e9edddf04f33e944e7d5f3378e12d9314",
    disclosureWindow: {
      vi: "Theo kỳ hoàn thành chương trình và cập nhật pilot",
      en: "Updated by completion windows and pilot revisions",
    },
  },
  "creator-rights-vault": {
    releaseState: "published",
    updatedAt: "2026-03-23T06:00:00.000Z",
    staleAfterDays: 45,
    collectionSlug: "creator-rights-pass",
    boundary: {
      vi: "Kho provenance cho quyền tác giả và rights statements; không đại diện cho thanh khoản hoặc treasury balance.",
      en: "A provenance vault for creator rights and rights statements; it does not represent liquidity or treasury balances.",
    },
    proofUrl: "https://nft.iai.one/collections/creator-rights-pass",
    contentHash: "sha256:0d4eb7d734d4b4504d55abdb766717cb4dbb50da85064a7741a11be00a1ad2fd",
    disclosureWindow: {
      vi: "Theo bundle media và đợt rights attestation",
      en: "Updated per media bundle and rights attestation cycle",
    },
  },
  "btc-reserve-bucket": {
    releaseState: "draft",
    updatedAt: "2026-03-14T02:10:00.000Z",
    staleAfterDays: 7,
    collectionSlug: "ecosystem-asset-ledger",
    boundary: {
      vi: "Reserve bucket cấp hệ sinh thái, chỉ công bố bucket scope trước khi công bố địa chỉ ví hoặc reserve proof chi tiết.",
      en: "An ecosystem reserve bucket exposing the bucket scope before wallet addresses or detailed reserve proofs are disclosed.",
    },
    proofUrl: "https://nft.iai.one/disclosures/btc-reserve-bucket",
    contentHash: "sha256:c5cc973e4b26e54615737e3fbb303d3a5abd5f3a26563abb7f40ca8a5b816e5d",
    disclosureWindow: {
      vi: "Theo chu kỳ reserve review nội bộ",
      en: "Updated with the internal reserve review cadence",
    },
  },
};

export function readReleaseStateLabel(state, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  return readLocalizedValue(RELEASE_STATES[state] ?? RELEASE_STATES.draft, language);
}

export function readReleaseStateTone(state) {
  return RELEASE_STATES[state]?.tone ?? RELEASE_STATES.draft.tone;
}

export function mapCollectionReleaseState(disclosureState) {
  if (disclosureState === "published") return "published";
  if (disclosureState === "pilot") return "pilot";
  if (disclosureState === "archived") return "archived";
  return "draft";
}

export function mapDisclosureReleaseState(disclosureState) {
  if (disclosureState === "published") return "published";
  if (disclosureState === "pilot" || disclosureState === "ready") return "pilot";
  if (disclosureState === "archived") return "archived";
  return "draft";
}

export function getDocumentSeed(path) {
  return DOCUMENT_DETAILS[path] ?? null;
}

export function getDisclosureSeed(id) {
  return DISCLOSURE_DETAILS[id] ?? null;
}

export function listReleaseStates(languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  return Object.entries(RELEASE_STATES).map(([value, item]) => ({
    value,
    label: readLocalizedValue(item, language),
    tone: item.tone,
  }));
}

export function getDocumentSections(path, languageInput = "vi") {
  const seed = getDocumentSeed(path);
  return readLocalizedList(seed?.sections, languageInput);
}
