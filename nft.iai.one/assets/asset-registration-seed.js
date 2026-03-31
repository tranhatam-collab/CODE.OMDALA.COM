export const ASSET_REGISTRATION_SEED = [
  {
    id: "ASSET-20260324-DEMO01",
    createdAt: "2026-03-24T08:15:00.000Z",
    updatedAt: "2026-03-24T08:15:00.000Z",
    registrantName: "IAI Learning Registry",
    ownerEntity: "IAI Learning Registry",
    assetName: "Knowledge Certificate Pilot Batch",
    assetType: "Certificate NFT",
    network: "Base",
    chainId: "8453",
    walletAddress: "0x1111111111111111111111111111111111111111",
    contractAddress: "0x2222222222222222222222222222222222222222",
    tokenId: "20260001",
    tokenStandard: "ERC-721",
    proofUrl: "https://nft.iai.one/docs/verification/",
    contentHash: "sha256:5e12ed4bdcaed0f4dbb6a58bbacb9da5685d5ce52c4b35f2a0c9e56df75de8d8",
    externalUrl: "https://app.iai.one/certificates/pilot",
    externalId: "CERT-PILOT-2026-0001",
    summary: {
      vi: "Lô pilot cho certificate NFT của hệ học tập IAI, đã neo hash bài học và endpoint metadata vào trust layer công khai.",
      en: "A pilot knowledge-certificate NFT batch with lesson hashes and metadata endpoints anchored into the public trust layer.",
    },
    scope: {
      vi: "Bản ghi tài sản số độc lập để phía VC có thể mirror và tra cứu ngoài app vận hành.",
      en: "An independent digital-asset record that VC can mirror and verify outside the operational app.",
    },
    evidence: {
      vi: [
        "Proof URL mô tả chuẩn 5 mint gates và lesson-hash flow",
        "Content hash đã được công bố trên trust layer",
        "Ví nhận và contract pilot đã được đối chiếu trong chế độ seed"
      ],
      en: [
        "A proof URL describing the 5 mint gates and lesson-hash flow",
        "A published content hash on the trust layer",
        "Recipient wallet and pilot contract checked in seed mode"
      ],
    },
    verification: {
      status: "verified",
      mode: "seeded_attestation",
      ownershipChecked: true,
      matchedOwner: true,
      rpcConfigured: true,
      checkedAt: "2026-03-24T08:15:00.000Z",
      resolvedOwner: "0x1111111111111111111111111111111111111111",
      note: {
        vi: "Bản ghi seed được dùng để mở V1.0 và minh họa dòng mirror sang VC.",
        en: "This seeded record opens V1.0 and demonstrates the VC mirror flow.",
      },
    },
    vcBridge: {
      code: "VC-NFT-2026-0001",
      mirrorState: "ready",
      independentUrl: "https://vc.vetuonglai.com/v/VC-NFT-2026-0001",
    },
  },
  {
    id: "ASSET-20260324-DEMO02",
    createdAt: "2026-03-24T09:05:00.000Z",
    updatedAt: "2026-03-24T09:05:00.000Z",
    registrantName: "IAI Creator Rights Office",
    ownerEntity: "IAI Creator Rights Office",
    assetName: "Creator Rights Vault Batch 03",
    assetType: "Rights Anchor",
    network: "Base",
    chainId: "8453",
    walletAddress: "0x3333333333333333333333333333333333333333",
    contractAddress: "0x4444444444444444444444444444444444444444",
    tokenId: "303",
    tokenStandard: "ERC-1155",
    proofUrl: "https://nft.iai.one/docs/disclosure/",
    contentHash: "sha256:7a5f4efbb0798f95ed38a11fae43fd5fdb35c4010e8c7adcb8dd814ed6bf58d1",
    externalUrl: "https://docs.iai.one/ecosystem/",
    externalId: "RIGHTS-2026-03",
    summary: {
      vi: "Neo provenance cho bundle quyền tác giả và chứng cứ cấp phép, sẵn sàng để verify độc lập ngoài workflow nội bộ.",
      en: "A provenance anchor for creator-rights and licensing evidence, ready for independent verification beyond internal workflows.",
    },
    scope: {
      vi: "Dùng để chứng minh quyền sở hữu và bundle bằng chứng trước khi public distribution hoặc licensing flow mở rộng.",
      en: "Used to prove ownership and evidence bundles before broader public distribution or licensing workflows.",
    },
    evidence: {
      vi: [
        "Disclosure policy công khai cho creator rights",
        "Content hash của bundle bằng chứng",
        "Bản ghi ERC-1155 pilot đã được chụp balance trong seed mode"
      ],
      en: [
        "A public disclosure policy for creator rights",
        "A content hash for the evidence bundle",
        "An ERC-1155 pilot balance snapshot recorded in seed mode"
      ],
    },
    verification: {
      status: "verified",
      mode: "seeded_attestation",
      ownershipChecked: true,
      matchedOwner: true,
      rpcConfigured: true,
      checkedAt: "2026-03-24T09:05:00.000Z",
      resolvedOwner: "0x3333333333333333333333333333333333333333",
      balance: "1",
      note: {
        vi: "Seed record cho lớp provenance quyền tác giả trong bản cập nhật V1.0.",
        en: "A seeded provenance record for the creator-rights layer in the V1.0 update.",
      },
    },
    vcBridge: {
      code: "VC-NFT-2026-0002",
      mirrorState: "ready",
      independentUrl: "https://vc.vetuonglai.com/v/VC-NFT-2026-0002",
    },
  },
];
