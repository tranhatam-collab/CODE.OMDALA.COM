import { normalizeLanguage, readLocalizedList, readLocalizedValue } from "./registry-data.js";

const GATE_COPY = {
  vi: {
    ownership: {
      title: "Gate 1 • Quyền sở hữu",
      description: "Xác định owner entity, issuer entity và boundary trách nhiệm.",
    },
    evidence: {
      title: "Gate 2 • Bằng chứng",
      description: "Xác minh hash nội dung, proof URL và bằng chứng nguồn.",
    },
    rights: {
      title: "Gate 3 • Quyền phát hành",
      description: "Bảo đảm quyền mint phù hợp với policy và taxonomy của collection.",
    },
    disclosure: {
      title: "Gate 4 • Công bố",
      description: "Kiểm tra disclosure state, public readiness và tài liệu đi kèm.",
    },
    metadata: {
      title: "Gate 5 • Metadata",
      description: "Bảo đảm metadata đủ trường, đúng shape và sẵn sàng index.",
    },
    checks: {
      ownerEntity: "Có owner entity",
      issuerEntity: "Có issuer entity",
      rolePolicy: "Có issuance policy rõ ràng",
      proofModel: "Có proof model",
      evidencePolicy: "Có danh sách yêu cầu bằng chứng",
      contentHash: "Có hash nội dung",
      proofUrl: "Có proof URL",
      walletAddress: "Có ví nhận",
      recipientName: "Có chủ thể nhận NFT",
      rightsPolicy: "Có policy quyền phát hành",
      rightsRequirements: "Có danh sách điều kiện quyền",
      disclosureState: "Disclosure state hợp lệ",
      publicReady: "Collection đang ở trạng thái public-ready hoặc pilot-ready",
      docPath: "Có tài liệu tham chiếu",
      tokenStandard: "Có token standard",
      metadataRequirements: "Có metadata requirements",
      metadataPayload: "Payload có đủ trường metadata cốt lõi",
      title: "Có tiêu đề hồ sơ hoặc giao dịch",
      externalReference: "Có external ID hoặc external URL khi phù hợp",
    },
    pass: "Đạt",
    fail: "Thiếu",
  },
  en: {
    ownership: {
      title: "Gate 1 • Ownership",
      description: "Confirm the owner entity, issuer entity, and responsibility boundary.",
    },
    evidence: {
      title: "Gate 2 • Evidence",
      description: "Verify the content hash, proof URL, and source evidence.",
    },
    rights: {
      title: "Gate 3 • Issuance Rights",
      description: "Ensure mint authority matches the collection policy and taxonomy.",
    },
    disclosure: {
      title: "Gate 4 • Disclosure",
      description: "Check disclosure state, public readiness, and linked documentation.",
    },
    metadata: {
      title: "Gate 5 • Metadata",
      description: "Ensure metadata is complete, shaped correctly, and indexable.",
    },
    checks: {
      ownerEntity: "Owner entity is present",
      issuerEntity: "Issuer entity is present",
      rolePolicy: "Issuance policy is explicit",
      proofModel: "Proof model is present",
      evidencePolicy: "Evidence requirements exist",
      contentHash: "Content hash is present",
      proofUrl: "Proof URL is present",
      walletAddress: "Recipient wallet is present",
      recipientName: "Recipient or subject is present",
      rightsPolicy: "Issuance rights policy is defined",
      rightsRequirements: "Rights requirements exist",
      disclosureState: "Disclosure state is valid",
      publicReady: "Collection is public-ready or pilot-ready",
      docPath: "Reference documentation is linked",
      tokenStandard: "Token standard is present",
      metadataRequirements: "Metadata requirements exist",
      metadataPayload: "Payload contains core metadata fields",
      title: "Record or transaction title is present",
      externalReference: "External ID or external URL is present when needed",
    },
    pass: "Pass",
    fail: "Missing",
  },
};

const PASSING_DISCLOSURE_STATES = new Set(["published", "pilot"]);

function copy(language, gateKey, field = null) {
  const safeLanguage = normalizeLanguage(language);
  if (field) return GATE_COPY[safeLanguage].checks[field];
  return GATE_COPY[safeLanguage][gateKey];
}

function localizedList(value, language) {
  return readLocalizedList(value, normalizeLanguage(language));
}

function localizedValue(value, language) {
  return readLocalizedValue(value, normalizeLanguage(language));
}

function isLikelyUrl(value) {
  return /^(https?:\/\/|ipfs:\/\/|ar:\/\/)/i.test(String(value ?? "").trim());
}

function isLikelyHash(value) {
  const stringValue = String(value ?? "").trim();
  return /^sha(256|384|512):[0-9a-f]{16,}$/i.test(stringValue) || /^0x[0-9a-f]{32,}$/i.test(stringValue);
}

function isLikelyWallet(value) {
  return /^0x[a-fA-F0-9]{40}$/.test(String(value ?? "").trim());
}

function buildCheck(key, passed, language) {
  return {
    key,
    label: copy(language, null, key),
    passed,
  };
}

function buildGate(key, gateChecks, language, collection, summaryOverride = null) {
  const gateCopy = copy(language, key);
  const reasons = gateChecks.filter((item) => !item.passed).map((item) => item.label);
  const passed = reasons.length === 0;

  return {
    key,
    title: gateCopy.title,
    description: localizedValue(collection?.gateDescriptions?.[language]?.[key] ?? collection?.gateDescriptions?.vi?.[key], language) || gateCopy.description,
    passed,
    tone: passed ? "live" : "warning",
    summary: summaryOverride || (passed ? gateCopy.description : reasons.join(language === "vi" ? "; " : "; ")),
    checks: gateChecks,
    reasons,
  };
}

function collectionChecks(collection, language) {
  const disclosureState = collection?.disclosureState || "planned";

  const ownership = buildGate("ownership", [
    buildCheck("ownerEntity", Boolean(collection?.ownerEntity), language),
    buildCheck("issuerEntity", Boolean(collection?.issuerEntity), language),
    buildCheck("rolePolicy", Boolean(collection?.issuanceMode), language),
  ], language, collection);

  const evidence = buildGate("evidence", [
    buildCheck("proofModel", Boolean(collection?.proofModel), language),
    buildCheck("evidencePolicy", localizedList(collection?.evidenceRequirements, language).length > 0, language),
    buildCheck("docPath", Boolean(collection?.docPath), language),
  ], language, collection);

  const rights = buildGate("rights", [
    buildCheck("rightsPolicy", Boolean(collection?.issuanceMode), language),
    buildCheck("rightsRequirements", localizedList(collection?.rightsRequirements, language).length > 0, language),
  ], language, collection);

  const disclosure = buildGate("disclosure", [
    buildCheck("disclosureState", PASSING_DISCLOSURE_STATES.has(disclosureState), language),
    buildCheck("publicReady", Boolean(collection?.publicReady || disclosureState === "pilot"), language),
    buildCheck("docPath", Boolean(collection?.docPath), language),
  ], language, collection);

  const metadata = buildGate("metadata", [
    buildCheck("tokenStandard", Boolean(collection?.tokenStandard), language),
    buildCheck("metadataRequirements", localizedList(collection?.metadataRequirements, language).length > 0, language),
    buildCheck("proofModel", Boolean(collection?.proofModel), language),
  ], language, collection);

  return [ownership, evidence, rights, disclosure, metadata];
}

function issuanceChecks(collection, payload, language) {
  const disclosureState = collection?.disclosureState || "planned";
  const category = collection?.category;
  const needsExternalReference = category === "certificate" || category === "treasury";
  const needsTitle = category === "creator" || category === "certificate";

  const ownership = buildGate("ownership", [
    buildCheck("ownerEntity", Boolean(collection?.ownerEntity), language),
    buildCheck("issuerEntity", Boolean(collection?.issuerEntity), language),
    buildCheck("recipientName", Boolean(payload?.recipientName), language),
  ], language, collection);

  const evidence = buildGate("evidence", [
    buildCheck("proofModel", Boolean(collection?.proofModel), language),
    buildCheck("contentHash", isLikelyHash(payload?.contentHash), language),
    buildCheck("proofUrl", isLikelyUrl(payload?.proofUrl), language),
  ], language, collection);

  const rights = buildGate("rights", [
    buildCheck("rightsPolicy", Boolean(collection?.issuanceMode), language),
    buildCheck("rightsRequirements", localizedList(collection?.rightsRequirements, language).length > 0, language),
    buildCheck("walletAddress", isLikelyWallet(payload?.walletAddress), language),
    ...(needsTitle ? [buildCheck("title", Boolean(payload?.title), language)] : []),
    ...(needsExternalReference ? [buildCheck("externalReference", Boolean(payload?.externalId || payload?.externalUrl), language)] : []),
  ], language, collection);

  const disclosure = buildGate("disclosure", [
    buildCheck("disclosureState", PASSING_DISCLOSURE_STATES.has(disclosureState), language),
    buildCheck("publicReady", Boolean(collection?.publicReady || disclosureState === "pilot"), language),
    buildCheck("docPath", Boolean(collection?.docPath), language),
  ], language, collection);

  const metadata = buildGate("metadata", [
    buildCheck("tokenStandard", Boolean(collection?.tokenStandard), language),
    buildCheck("metadataRequirements", localizedList(collection?.metadataRequirements, language).length > 0, language),
    buildCheck(
      "metadataPayload",
      Boolean(payload?.recipientName && payload?.walletAddress && payload?.contentHash && payload?.proofUrl),
      language,
    ),
  ], language, collection);

  return [ownership, evidence, rights, disclosure, metadata];
}

function summarizeGates(gates) {
  const passed = gates.filter((item) => item.passed).length;
  return {
    total: gates.length,
    passed,
    failed: gates.length - passed,
    score: gates.length === 0 ? 0 : Math.round((passed / gates.length) * 100),
    ready: passed === gates.length,
  };
}

export function validateCollectionGates(collection, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const gates = collectionChecks(collection, language);
  return {
    language,
    gates,
    summary: summarizeGates(gates),
  };
}

export function validateIssuanceGates(collection, payload = {}, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const gates = issuanceChecks(collection, payload, language);
  return {
    language,
    gates,
    summary: summarizeGates(gates),
  };
}
