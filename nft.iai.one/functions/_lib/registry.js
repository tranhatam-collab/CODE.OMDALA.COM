import {
  ASSETS,
  COLLECTIONS,
  DOCUMENTS,
  NFT_MARK_URL,
  REGISTRY_VERSION,
  normalizeLanguage,
  readLocalizedList,
  readLocalizedValue,
} from "../../assets/registry-data.js";
import {
  getDisclosureSeed,
  getDocumentSections,
  getDocumentSeed,
  mapCollectionReleaseState,
  mapDisclosureReleaseState,
  readReleaseStateLabel,
  readReleaseStateTone,
} from "../../assets/trust-seed.js";
import { validateCollectionGates, validateIssuanceGates } from "../../assets/validation-engine.js";

const SITE_URL = "https://nft.iai.one";

function localizedEntry(entry, language, fields) {
  const clone = { ...entry };
  for (const field of fields) {
    clone[field] = Array.isArray(entry[field]) || typeof entry[field] !== "object"
      ? readLocalizedValue(entry[field], language)
      : Array.isArray(readLocalizedValue(entry[field], language))
        ? readLocalizedList(entry[field], language)
        : readLocalizedValue(entry[field], language);
  }
  return clone;
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, must-revalidate",
      ...extraHeaders,
    },
  });
}

export function optionsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export function listCollections(languageInput) {
  const language = normalizeLanguage(languageInput);
  return COLLECTIONS.map((item) => ({
    ...localizedEntry(item, language, [
      "categoryLabel",
      "name",
      "statusLabel",
      "disclosureLabel",
      "transferability",
      "phaseLabel",
      "anchor",
      "ownerEntity",
      "issuerEntity",
      "audience",
      "issuanceWindow",
      "supplyPolicy",
      "issuanceMode",
      "proofModel",
      "description",
    ]),
    tags: readLocalizedList(item.tags, language),
    evidenceRequirements: readLocalizedList(item.evidenceRequirements, language),
    rightsRequirements: readLocalizedList(item.rightsRequirements, language),
    metadataRequirements: readLocalizedList(item.metadataRequirements, language),
    releaseState: mapCollectionReleaseState(item.disclosureState),
    releaseStateLabel: readReleaseStateLabel(mapCollectionReleaseState(item.disclosureState), language),
    detailPath: item.detailPath,
    gateSummary: validateCollectionGates(item, language).summary,
  }));
}

export function listAssets(languageInput) {
  const language = normalizeLanguage(languageInput);
  return ASSETS.map((item) => {
    const releaseState = mapDisclosureReleaseState(item.disclosureState);
    const seed = getDisclosureSeed(item.id);
    return {
      ...localizedEntry(item, language, [
        "name",
        "assetType",
        "disclosureLabel",
        "holdingMode",
        "verificationState",
        "addressState",
        "notes",
      ]),
      releaseState,
      releaseStateLabel: readReleaseStateLabel(releaseState, language),
      detailPath: `/disclosures/${item.id}`,
      proofUrl: seed?.proofUrl ?? `${SITE_URL}/docs/disclosure/`,
      contentHash: seed?.contentHash ?? null,
      boundary: readLocalizedValue(seed?.boundary, language),
      disclosureWindow: readLocalizedValue(seed?.disclosureWindow, language),
      updatedAt: seed?.updatedAt ?? null,
      staleAfterDays: seed?.staleAfterDays ?? null,
      stale: seed?.updatedAt && seed?.staleAfterDays
        ? Date.now() - Date.parse(seed.updatedAt) > seed.staleAfterDays * 24 * 60 * 60 * 1000
        : false,
      collectionSlug: seed?.collectionSlug ?? null,
    };
  });
}

export function listDocuments(languageInput) {
  const language = normalizeLanguage(languageInput);
  return DOCUMENTS.map((item) => {
    const seed = getDocumentSeed(item.path);
    const releaseState = seed?.releaseState ?? "published";
    const fallbackSlug = item.path.replace(/\//g, "-").replace(/^-|-$/g, "") || "home";
    return {
      ...localizedEntry(item, language, [
        "title",
        "audience",
        "statusLabel",
        "summary",
      ]),
      slug: seed?.slug ?? fallbackSlug,
      releaseState,
      releaseStateLabel: readReleaseStateLabel(releaseState, language),
      detailPath: `/documents/${seed?.slug ?? "home"}`,
      ownerEntity: readLocalizedValue(seed?.ownerEntity, language),
      boundary: readLocalizedValue(seed?.boundary, language),
      proofUrl: seed?.proofUrl ?? `${SITE_URL}${item.path}`,
      contentHash: seed?.contentHash ?? null,
      updatedAt: seed?.updatedAt ?? null,
      sections: getDocumentSections(item.path, language),
    };
  });
}

export function listDocumentItems(languageInput) {
  return listDocuments(languageInput);
}

export function listDisclosureItems(languageInput) {
  return listAssets(languageInput);
}

export function getCollectionBySlug(slug) {
  return COLLECTIONS.find((item) => item.slug === slug) ?? null;
}

function matchesByKeyword(entry, keywordGroups) {
  const haystack = JSON.stringify(entry).toLowerCase();
  return keywordGroups.some((keyword) => haystack.includes(keyword));
}

export function getCollectionDetail(slug, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const rawCollection = getCollectionBySlug(slug);
  if (!rawCollection) return null;

  const collection = listCollections(language).find((item) => item.slug === slug);
  const gateValidation = validateCollectionGates(rawCollection, language);

  const relatedDocuments = listDocuments(language).filter((item) =>
    item.path === rawCollection.docPath || item.path.startsWith("/docs/")
  ).slice(0, 4);

  const keywords = {
    treasury: ["treasury", "reserve", "disclosure"],
    creator: ["creator", "rights", "royalty", "media"],
    certificate: ["certificate", "learning", "lesson", "completion"],
    reputation: ["badge", "truth", "reputation", "verifier"],
    identity: ["genesis", "identity", "founding", "access"],
  };

  const relatedAssets = listAssets(language).filter((item) =>
    item.network.toLowerCase().includes(rawCollection.network.split(" ")[0].toLowerCase())
    || matchesByKeyword(item, keywords[rawCollection.category] || [])
  ).slice(0, 4);

  return {
    ...collection,
    gates: gateValidation.gates,
    gateSummary: gateValidation.summary,
    relatedDocuments,
    relatedAssets,
  };
}

export function getDocumentDetail(slug, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const document = listDocuments(language).find((item) => item.slug === slug);
  if (!document) return null;

  return {
    ...document,
    relatedCollections: listCollections(language).filter((item) => item.docPath === document.path),
    relatedDisclosures: listAssets(language).filter((item) => item.proofUrl === document.proofUrl || item.boundary.includes(document.title)).slice(0, 4),
  };
}

export function getDisclosureDetail(id, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const disclosure = listAssets(language).find((item) => item.id === id);
  if (!disclosure) return null;

  return {
    ...disclosure,
    collection: disclosure.collectionSlug ? getCollectionDetail(disclosure.collectionSlug, language) : null,
    relatedDocuments: listDocuments(language).filter((item) =>
      item.path === "/docs/disclosure/" || item.path === "/docs/" || item.path === "/"
    ),
  };
}

export function buildLiveStats(languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const collections = listCollections(language);
  const assets = listAssets(language);
  const documents = listDocuments(language);
  const collectionGateSummaries = COLLECTIONS.map((item) => validateCollectionGates(item, language).summary);

  return {
    ok: true,
    language,
    version: REGISTRY_VERSION,
    generatedAt: new Date().toISOString(),
    totals: {
      collections: collections.length,
      documents: documents.length,
      disclosures: assets.length,
      publicReadyItems: [...collections, ...assets].filter((item) => item.publicReady).length,
    },
    collections: {
      published: COLLECTIONS.filter((item) => item.disclosureState === "published").length,
      pilot: COLLECTIONS.filter((item) => item.disclosureState === "pilot").length,
      planned: COLLECTIONS.filter((item) => item.disclosureState === "planned").length,
      readyToIssue: COLLECTIONS.filter((item) => item.publicReady).length,
    },
    gates: {
      averageScore: collectionGateSummaries.length === 0
        ? 0
        : Math.round(collectionGateSummaries.reduce((sum, item) => sum + item.score, 0) / collectionGateSummaries.length),
      fullyValidatedCollections: collectionGateSummaries.filter((item) => item.ready).length,
    },
  };
}

function uiText(languageInput) {
  const language = normalizeLanguage(languageInput);
  return language === "vi"
    ? {
        collection: "Bộ sưu tập",
        category: "Phân loại",
        network: "Mạng",
        standard: "Tiêu chuẩn",
        transferability: "Khả năng chuyển nhượng",
        phase: "Giai đoạn",
        proofModel: "Mô hình bằng chứng",
        contentHash: "Hash nội dung",
        proofUrl: "URL bằng chứng",
        walletAddress: "Ví nhận",
        issuanceMode: "Cơ chế phát hành",
        recipient: "Người nhận",
      }
    : {
        collection: "Collection",
        category: "Category",
        network: "Network",
        standard: "Standard",
        transferability: "Transferability",
        phase: "Phase",
        proofModel: "Proof model",
        contentHash: "Content hash",
        proofUrl: "Proof URL",
        walletAddress: "Recipient wallet",
        issuanceMode: "Issuance mode",
        recipient: "Recipient",
      };
}

function valueOrFallback(value, fallback = "") {
  return value === undefined || value === null || value === "" ? fallback : value;
}

async function sha256Hex(input) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createTokenId(collectionSlug, payload) {
  const seed = [
    collectionSlug,
    payload.externalId,
    payload.walletAddress,
    payload.recipientName,
    payload.contentHash,
    payload.title,
    new Date().toISOString(),
  ].filter(Boolean).join(":");

  const digest = await sha256Hex(seed || `${collectionSlug}:${crypto.randomUUID()}`);
  return digest.slice(0, 16).toUpperCase();
}

export function buildChecklist(collection, payload, languageInput) {
  const validation = validateIssuanceGates(collection, payload, languageInput);
  return validation.gates.flatMap((gate) => gate.checks.map((item) => ({
    key: `${gate.key}:${item.key}`,
    label: `${gate.title} • ${item.label}`,
    passed: item.passed,
  })));
}

export async function buildTokenMetadata({ collection, tokenId, payload = {}, languageInput }) {
  const language = normalizeLanguage(languageInput);
  const text = uiText(language);
  const localizedCollection = listCollections(language).find((item) => item.slug === collection.slug);
  const recipientName = valueOrFallback(payload.recipientName, language === "vi" ? "Người dùng IAI" : "IAI user");
  const contentHash = valueOrFallback(payload.contentHash, "pending");
  const proofUrl = valueOrFallback(payload.proofUrl, `${SITE_URL}${collection.docPath}`);

  return {
    name: `${localizedCollection.name} • ${recipientName}`,
    description: language === "vi"
      ? `${localizedCollection.description} Metadata này được sinh bởi issuance worker của nft.iai.one cho mục đích xác minh, mint preview và provenance công khai.`
      : `${localizedCollection.description} This metadata is generated by the nft.iai.one issuance worker for verification, mint preview, and public provenance.`,
    image: valueOrFallback(payload.image, collection.image || NFT_MARK_URL),
    external_url: valueOrFallback(payload.externalUrl, `${SITE_URL}/token/${collection.slug}/${tokenId}`),
    background_color: "08111d",
    attributes: [
      { trait_type: text.collection, value: localizedCollection.name },
      { trait_type: text.category, value: localizedCollection.categoryLabel },
      { trait_type: text.network, value: collection.network },
      { trait_type: text.standard, value: collection.tokenStandard },
      { trait_type: text.transferability, value: localizedCollection.transferability },
      { trait_type: text.phase, value: localizedCollection.phaseLabel },
      { trait_type: text.proofModel, value: localizedCollection.proofModel },
      { trait_type: text.contentHash, value: contentHash },
      { trait_type: text.proofUrl, value: proofUrl },
      { trait_type: text.walletAddress, value: valueOrFallback(payload.walletAddress, "pending") },
      { trait_type: text.issuanceMode, value: localizedCollection.issuanceMode },
      { trait_type: text.recipient, value: recipientName },
    ],
    properties: {
      app_version: REGISTRY_VERSION,
      locale: language,
      collection_slug: collection.slug,
      token_id: tokenId,
      proof: {
        content_hash: contentHash,
        proof_url: proofUrl,
        anchor: localizedCollection.anchor,
      },
      issuance: {
        standard: collection.tokenStandard,
        issuance_mode: localizedCollection.issuanceMode,
        public_ready: collection.publicReady,
      },
      subject: {
        recipient_name: recipientName,
        wallet_address: valueOrFallback(payload.walletAddress, null),
        external_id: valueOrFallback(payload.externalId, null),
      },
    },
  };
}

export async function buildIssuancePreview(payload, languageInput) {
  const language = normalizeLanguage(languageInput);
  const collectionSlug = payload.collection || payload.collectionSlug;
  const collection = getCollectionBySlug(collectionSlug);

  if (!collection) {
    return {
      ok: false,
      status: 404,
      error: language === "vi" ? "Không tìm thấy bộ sưu tập yêu cầu." : "Requested collection was not found.",
    };
  }

  const tokenId = await createTokenId(collection.slug, payload);
  const gateValidation = validateIssuanceGates(collection, payload, language);
  const checklist = buildChecklist(collection, payload, language);
  const warnings = gateValidation.gates.flatMap((gate) => gate.reasons.map((reason) => `${gate.title}: ${reason}`));
  const metadata = await buildTokenMetadata({ collection, tokenId, payload, languageInput: language });

  return {
    ok: true,
    status: 200,
    version: REGISTRY_VERSION,
    language,
    issuedAt: new Date().toISOString(),
    collection: listCollections(language).find((item) => item.slug === collection.slug),
    tokenId,
    mintReady: gateValidation.summary.ready,
    gates: gateValidation.gates,
    gateSummary: gateValidation.summary,
    checklist,
    warnings,
    metadataUrl: `${SITE_URL}/api/metadata/${encodeURIComponent(collection.slug)}/${encodeURIComponent(tokenId)}?lang=${language}`,
    metadata,
    mintPlan: {
      network: collection.network,
      standard: collection.tokenStandard,
      transferability: readLocalizedValue(collection.transferability, language),
      issuanceMode: readLocalizedValue(collection.issuanceMode, language),
      nextStep: gateValidation.summary.ready
        ? (language === "vi" ? "Có thể chuyển sang bước ký giao dịch mint." : "Ready to move into mint transaction signing.")
        : (language === "vi" ? "Bổ sung các trường còn thiếu trước khi mint." : "Complete the missing fields before minting."),
    },
  };
}

export function registrySummary(languageInput) {
  const language = normalizeLanguage(languageInput);
  return {
    ok: true,
    version: REGISTRY_VERSION,
    language,
    stats: buildLiveStats(language),
    collections: listCollections(language),
    assets: listDisclosureItems(language),
    documents: listDocumentItems(language),
  };
}
