import { normalizeLanguage } from "../../assets/registry-data.js";
import { mapCollectionReleaseState } from "../../assets/trust-seed.js";
import { listAssetRegistrationRecords } from "./asset-registrations.js";
import {
  buildIssuancePreview,
  getCollectionBySlug,
  getCollectionDetail,
  getDisclosureDetail,
  getDocumentDetail,
  listCollections,
  listDisclosureItems,
  listDocumentItems,
} from "./registry.js";
import { buildApprovalId, buildAuditId, getTrustStore } from "./trust-store.js";

const SITE_URL = "https://nft.iai.one";

function nowIso() {
  return new Date().toISOString();
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function stableMetadataUrl(collectionSlug, tokenId, language) {
  const lang = normalizeLanguage(language);
  return `${SITE_URL}/api/metadata/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(tokenId)}?lang=${lang}`;
}

function stableTokenUrl(collectionSlug, tokenId) {
  return `${SITE_URL}/token/${encodeURIComponent(collectionSlug)}/${encodeURIComponent(tokenId)}`;
}

function auditSummary(action, language) {
  const isVi = normalizeLanguage(language) === "vi";
  const mapping = {
    approval_requested: isVi ? "Đã tạo yêu cầu phê duyệt phát hành." : "Issuance approval request created.",
    approval_approved: isVi ? "Yêu cầu phát hành đã được phê duyệt." : "Issuance request approved.",
    approval_rejected: isVi ? "Yêu cầu phát hành đã bị từ chối." : "Issuance request rejected.",
    token_issued: isVi ? "Token đã được issue và có trạng thái verify công khai." : "Token issued with a public verify state.",
    token_revoked: isVi ? "Token đã bị revoke." : "Token revoked.",
    token_superseded: isVi ? "Token đã bị supersede bởi một token mới." : "Token superseded by a newer token.",
  };

  return mapping[action] ?? (isVi ? "Đã cập nhật audit trail." : "Audit trail updated.");
}

async function appendAudit(store, {
  entityType,
  entityId,
  action,
  actor = "nft.iai.one",
  note = "",
  details = null,
  language = "vi",
}) {
  const event = {
    id: buildAuditId(),
    entityType,
    entityId,
    action,
    actor,
    note,
    details,
    summary: auditSummary(action, language),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };

  await store.appendAudit(event);
  return event;
}

function publicVerifyStateFromToken(token) {
  if (token.status === "revoked") return "revoked";
  if (token.status === "superseded") return "superseded";
  return "verified";
}

function toApprovalView(record, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const collection = getCollectionDetail(record.collectionSlug, language);

  return {
    ...record,
    collection,
    metadataUrl: stableMetadataUrl(record.collectionSlug, record.tokenId, language),
    tokenUrl: stableTokenUrl(record.collectionSlug, record.tokenId),
    releaseStateLabel: collection?.releaseStateLabel ?? null,
  };
}

function toTokenView(record, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const collection = getCollectionDetail(record.collectionSlug, language);

  return {
    ...record,
    collection,
    metadataUrl: stableMetadataUrl(record.collectionSlug, record.tokenId, language),
    tokenUrl: stableTokenUrl(record.collectionSlug, record.tokenId),
    verifyUrl: `${SITE_URL}/verify?q=${encodeURIComponent(stableTokenUrl(record.collectionSlug, record.tokenId))}&lang=${language}`,
  };
}

export async function listApprovalRecords(env = {}, languageInput = "vi") {
  const store = await getTrustStore(env);
  const approvals = await store.listApprovals();
  return approvals.map((item) => toApprovalView(item, languageInput));
}

export async function getApprovalRecord(env = {}, approvalId, languageInput = "vi") {
  const store = await getTrustStore(env);
  const approval = await store.getApproval(approvalId);
  return approval ? toApprovalView(approval, languageInput) : null;
}

export async function listTokenRecords(env = {}, languageInput = "vi", options = {}) {
  const store = await getTrustStore(env);
  const tokens = await store.listTokens();
  const filtered = options.collectionSlug
    ? tokens.filter((item) => item.collectionSlug === options.collectionSlug)
    : tokens;
  return filtered.map((item) => toTokenView(item, languageInput));
}

export async function getTokenRecord(env = {}, collectionSlug, tokenId, languageInput = "vi") {
  const store = await getTrustStore(env);
  const token = await store.getToken(collectionSlug, tokenId);
  return token ? toTokenView(token, languageInput) : null;
}

export async function listAuditTrail(env = {}, { entityType = null, entityId = null } = {}) {
  const store = await getTrustStore(env);
  return await store.listAudit({ entityType, entityId });
}

export async function requestIssuanceApproval({ env = {}, payload = {}, languageInput = "vi" }) {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const preview = await buildIssuancePreview(payload, language);

  if (!preview.ok) {
    return preview;
  }

  if (!preview.gateSummary?.ready) {
    return {
      ok: false,
      status: 422,
      code: "GATES_NOT_READY",
      message: language === "vi"
        ? "Yêu cầu approval bị chặn vì 5 mint gates chưa đạt."
        : "Approval is blocked because the 5 mint gates are not fully satisfied.",
      preview,
    };
  }

  const createdAt = nowIso();
  const approval = {
    id: buildApprovalId(),
    status: "pending_approval",
    collectionSlug: preview.collection.slug,
    tokenId: preview.tokenId,
    releaseState: mapCollectionReleaseState(preview.collection.disclosureState),
    preview,
    payload,
    gateSummary: preview.gateSummary,
    mintReady: preview.mintReady,
    createdAt,
    updatedAt: createdAt,
    approvedAt: null,
    rejectedAt: null,
    issuedAt: null,
    reviewer: null,
    reviewNote: "",
  };

  await store.putApproval(approval);
  await appendAudit(store, {
    entityType: "approval",
    entityId: approval.id,
    action: "approval_requested",
    note: language === "vi"
      ? "Đã tạo approval request từ Mint Studio V2."
      : "Approval request created from Mint Studio V2.",
    details: {
      collectionSlug: approval.collectionSlug,
      tokenId: approval.tokenId,
    },
    language,
  });

  return {
    ok: true,
    status: 202,
    approval: toApprovalView(approval, language),
    preview,
  };
}

export async function decideIssuanceApproval({
  env = {},
  approvalId,
  decision = "approve",
  actor = "IAI Operations",
  note = "",
  languageInput = "vi",
}) {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const approval = await store.getApproval(approvalId);

  if (!approval) {
    return {
      ok: false,
      status: 404,
      code: "APPROVAL_NOT_FOUND",
      message: language === "vi" ? "Không tìm thấy approval request." : "Approval request not found.",
    };
  }

  if (approval.status === "issued") {
    return {
      ok: false,
      status: 409,
      code: "APPROVAL_ALREADY_ISSUED",
      message: language === "vi" ? "Approval này đã được issue." : "This approval has already been issued.",
      approval: toApprovalView(approval, language),
    };
  }

  if (!approval.preview?.gateSummary?.ready) {
    return {
      ok: false,
      status: 409,
      code: "APPROVAL_GATES_BLOCKED",
      message: language === "vi"
        ? "Approval không thể chuyển trạng thái vì preview không đạt đủ 5 gates."
        : "Approval cannot transition because the preview does not satisfy all 5 gates.",
      approval: toApprovalView(approval, language),
    };
  }

  const nextStatus = decision === "reject" ? "rejected" : "approved";
  const updated = {
    ...approval,
    status: nextStatus,
    reviewer: actor,
    reviewNote: note,
    updatedAt: nowIso(),
    approvedAt: nextStatus === "approved" ? nowIso() : approval.approvedAt,
    rejectedAt: nextStatus === "rejected" ? nowIso() : approval.rejectedAt,
  };

  await store.putApproval(updated);
  await appendAudit(store, {
    entityType: "approval",
    entityId: updated.id,
    action: nextStatus === "approved" ? "approval_approved" : "approval_rejected",
    actor,
    note,
    details: {
      collectionSlug: updated.collectionSlug,
      tokenId: updated.tokenId,
    },
    language,
  });

  return {
    ok: true,
    status: 200,
    approval: toApprovalView(updated, language),
  };
}

export async function finalizeIssuedToken({
  env = {},
  approvalId,
  liveMint = {},
  actor = "IAI Mint Worker",
  note = "",
  languageInput = "vi",
}) {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const approval = await store.getApproval(approvalId);

  if (!approval) {
    return {
      ok: false,
      status: 404,
      code: "APPROVAL_NOT_FOUND",
      message: language === "vi" ? "Không tìm thấy approval để issue." : "Approval not found for issuance.",
    };
  }

  if (approval.status !== "approved") {
    return {
      ok: false,
      status: 409,
      code: "APPROVAL_REQUIRED",
      message: language === "vi"
        ? "Yêu cầu issue bị chặn vì approval chưa hoàn tất."
        : "Issuance is blocked because approval is not complete.",
      approval: toApprovalView(approval, language),
    };
  }

  const collection = getCollectionBySlug(approval.collectionSlug);
  if (!collection?.publicReady) {
    return {
      ok: false,
      status: 409,
      code: "COLLECTION_NOT_PUBLIC_READY",
      message: language === "vi"
        ? "Collection chưa public-ready nên không được mint live."
        : "The collection is not public-ready, so live minting is blocked.",
      approval: toApprovalView(approval, language),
    };
  }

  const existing = await store.getToken(approval.collectionSlug, approval.tokenId);
  if (existing) {
    return {
      ok: false,
      status: 409,
      code: "TOKEN_ALREADY_ISSUED",
      message: language === "vi" ? "Token này đã được issue trước đó." : "This token has already been issued.",
      token: toTokenView(existing, language),
    };
  }

  const createdAt = nowIso();
  const token = {
    collectionSlug: approval.collectionSlug,
    tokenId: approval.tokenId,
    approvalId: approval.id,
    releaseState: approval.releaseState,
    status: "issued",
    verifyStatus: "verified",
    recipientName: approval.payload.recipientName,
    walletAddress: approval.payload.walletAddress,
    contentHash: approval.payload.contentHash,
    proofUrl: approval.payload.proofUrl,
    externalUrl: approval.payload.externalUrl || null,
    externalId: approval.payload.externalId || null,
    title: approval.payload.title || null,
    network: approval.preview?.mintPlan?.network || null,
    txHash: liveMint?.transactionHash || liveMint?.txHash || null,
    contractAddress: liveMint?.contractAddress || null,
    metadataUrl: stableMetadataUrl(approval.collectionSlug, approval.tokenId, language),
    tokenUrl: stableTokenUrl(approval.collectionSlug, approval.tokenId),
    liveMint,
    issuedAt: createdAt,
    updatedAt: createdAt,
    revokedAt: null,
    supersededAt: null,
    supersededBy: null,
    supersedes: null,
  };

  const updatedApproval = {
    ...approval,
    status: "issued",
    issuedAt: createdAt,
    updatedAt: createdAt,
  };

  await store.putToken(token);
  await store.putApproval(updatedApproval);

  await appendAudit(store, {
    entityType: "token",
    entityId: `${token.collectionSlug}:${token.tokenId}`,
    action: "token_issued",
    actor,
    note,
    details: {
      approvalId: approval.id,
      txHash: token.txHash,
      contractAddress: token.contractAddress,
    },
    language,
  });

  await appendAudit(store, {
    entityType: "approval",
    entityId: approval.id,
    action: "token_issued",
    actor,
    note,
    details: {
      collectionSlug: token.collectionSlug,
      tokenId: token.tokenId,
    },
    language,
  });

  return {
    ok: true,
    status: 200,
    token: toTokenView(token, language),
    approval: toApprovalView(updatedApproval, language),
  };
}

export async function revokeIssuedToken({
  env = {},
  collectionSlug,
  tokenId,
  actor = "IAI Operations",
  note = "",
  languageInput = "vi",
}) {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const token = await store.getToken(collectionSlug, tokenId);

  if (!token) {
    return {
      ok: false,
      status: 404,
      code: "TOKEN_NOT_FOUND",
      message: language === "vi" ? "Không tìm thấy token." : "Token not found.",
    };
  }

  const updated = {
    ...token,
    status: "revoked",
    verifyStatus: "revoked",
    revokedAt: nowIso(),
    updatedAt: nowIso(),
  };

  await store.putToken(updated);
  await appendAudit(store, {
    entityType: "token",
    entityId: `${collectionSlug}:${tokenId}`,
    action: "token_revoked",
    actor,
    note,
    details: {
      approvalId: token.approvalId,
    },
    language,
  });

  return {
    ok: true,
    status: 200,
    token: toTokenView(updated, language),
  };
}

export async function supersedeIssuedToken({
  env = {},
  previousCollectionSlug,
  previousTokenId,
  nextCollectionSlug,
  nextTokenId,
  actor = "IAI Operations",
  note = "",
  languageInput = "vi",
}) {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const previous = await store.getToken(previousCollectionSlug, previousTokenId);
  const next = await store.getToken(nextCollectionSlug, nextTokenId);

  if (!previous || !next) {
    return {
      ok: false,
      status: 404,
      code: "SUPERSEDE_TARGET_NOT_FOUND",
      message: language === "vi"
        ? "Không tìm thấy token cũ hoặc token thay thế."
        : "The original token or replacement token was not found.",
    };
  }

  const link = `${nextCollectionSlug}:${nextTokenId}`;
  const previousUpdated = {
    ...previous,
    status: "superseded",
    verifyStatus: "superseded",
    supersededAt: nowIso(),
    supersededBy: link,
    updatedAt: nowIso(),
  };
  const nextUpdated = {
    ...next,
    supersedes: `${previousCollectionSlug}:${previousTokenId}`,
    updatedAt: nowIso(),
  };

  await store.putToken(previousUpdated);
  await store.putToken(nextUpdated);

  await appendAudit(store, {
    entityType: "token",
    entityId: `${previousCollectionSlug}:${previousTokenId}`,
    action: "token_superseded",
    actor,
    note,
    details: {
      supersededBy: link,
    },
    language,
  });

  return {
    ok: true,
    status: 200,
    previous: toTokenView(previousUpdated, language),
    replacement: toTokenView(nextUpdated, language),
  };
}

export async function verifyTrustQuery({
  env = {},
  query = "",
  languageInput = "vi",
}) {
  const language = normalizeLanguage(languageInput);
  const normalized = normalizeText(query);

  if (!normalized) {
    return {
      ok: true,
      status: 200,
      query,
      language,
      results: [],
    };
  }

  const [tokens, approvals] = await Promise.all([
    listTokenRecords(env, language),
    listApprovalRecords(env, language),
  ]);
  const registrations = await listAssetRegistrationRecords(env, language);

  const collections = listCollections(language);
  const documents = listDocumentItems(language);
  const disclosures = listDisclosureItems(language);

  const results = [];

  for (const token of tokens) {
    const haystack = normalizeText([
      token.collectionSlug,
      token.tokenId,
      token.recipientName,
      token.walletAddress,
      token.contentHash,
      token.proofUrl,
      token.metadataUrl,
      token.tokenUrl,
      token.approvalId,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "token",
      id: `${token.collectionSlug}:${token.tokenId}`,
      title: token.collection?.name ?? token.tokenId,
      summary: token.title || token.collection?.description || "",
      href: token.tokenUrl,
      status: publicVerifyStateFromToken(token),
      payload: token,
    });
  }

  for (const approval of approvals) {
    const haystack = normalizeText([
      approval.id,
      approval.collectionSlug,
      approval.tokenId,
      approval.payload?.recipientName,
      approval.payload?.walletAddress,
      approval.payload?.contentHash,
      approval.payload?.proofUrl,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "approval",
      id: approval.id,
      title: approval.collection?.name ?? approval.id,
      summary: approval.reviewNote || approval.preview?.mintPlan?.nextStep || "",
      href: `${SITE_URL}/verify?q=${encodeURIComponent(approval.id)}&lang=${language}`,
      status: approval.status,
      payload: approval,
    });
  }

  for (const collection of collections) {
    const haystack = normalizeText([
      collection.slug,
      collection.name,
      collection.description,
      collection.anchor,
      collection.ownerEntity,
      collection.issuerEntity,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "collection",
      id: collection.slug,
      title: collection.name,
      summary: collection.description,
      href: `${SITE_URL}${collection.detailPath}`,
      status: collection.disclosureState,
      payload: collection,
    });
  }

  for (const document of documents) {
    const haystack = normalizeText([
      document.slug,
      document.title,
      document.summary,
      document.boundary,
      document.ownerEntity,
      document.path,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "document",
      id: document.slug,
      title: document.title,
      summary: document.summary,
      href: `${SITE_URL}/documents/${document.slug}`,
      status: document.releaseState,
      payload: document,
    });
  }

  for (const disclosure of disclosures) {
    const haystack = normalizeText([
      disclosure.id,
      disclosure.name,
      disclosure.assetType,
      disclosure.boundary,
      disclosure.network,
      disclosure.contentHash,
      disclosure.proofUrl,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "disclosure",
      id: disclosure.id,
      title: disclosure.name,
      summary: disclosure.boundary,
      href: `${SITE_URL}/disclosures/${disclosure.id}`,
      status: disclosure.releaseState,
      payload: disclosure,
    });
  }

  for (const registration of registrations) {
    const haystack = normalizeText([
      registration.id,
      registration.assetName,
      registration.assetType,
      registration.walletAddress,
      registration.contractAddress,
      registration.tokenId,
      registration.contentHash,
      registration.proofUrl,
      registration.vcBridge?.code,
      registration.registrantName,
      registration.ownerEntity,
    ].join(" "));

    if (!haystack.includes(normalized)) continue;

    results.push({
      type: "asset-registration",
      id: registration.id,
      title: registration.assetName,
      summary: registration.summary || registration.scope || "",
      href: `${SITE_URL}${registration.detailPath}`,
      status: registration.status,
      payload: registration,
    });
  }

  return {
    ok: true,
    status: 200,
    query,
    language,
    total: results.length,
    results,
  };
}
