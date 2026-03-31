import { Contract, JsonRpcProvider, formatEther, getAddress, isAddress } from "ethers";
import { ASSET_REGISTRATION_SEED } from "../../assets/asset-registration-seed.js";
import { normalizeLanguage } from "../../assets/registry-data.js";
import { getTrustStore } from "./trust-store.js";

const SITE_URL = "https://nft.iai.one";
const VC_BASE_URL = "https://vc.vetuonglai.com";
const ERC721_ABI = ["function ownerOf(uint256 tokenId) view returns (address)"];
const ERC1155_ABI = ["function balanceOf(address account, uint256 id) view returns (uint256)"];

function nowIso() {
  return new Date().toISOString();
}

function localizedValue(value, language) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[language] ?? value.vi ?? value.en ?? "";
  }
  return value ?? "";
}

function localizedList(value, language) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const candidate = value[language] ?? value.vi ?? value.en ?? [];
    return Array.isArray(candidate) ? candidate : [];
  }
  return [];
}

function normalizeTokenStandard(value, hasTokenFields = false) {
  const normalized = String(value ?? "").trim().toUpperCase();
  if (normalized === "ERC-721" || normalized === "ERC721") return "ERC-721";
  if (normalized === "ERC-1155" || normalized === "ERC1155") return "ERC-1155";
  if (normalized === "WALLET" || normalized === "WALLET_ONLY" || normalized === "ACCOUNT") return "WALLET";
  return hasTokenFields ? "ERC-721" : "WALLET";
}

function normalizeNetwork(value) {
  const normalized = String(value ?? "").trim();
  return normalized || "Base";
}

function isLikelyHash(value) {
  const stringValue = String(value ?? "").trim();
  return /^sha(256|384|512):[0-9a-f]{16,}$/i.test(stringValue) || /^0x[0-9a-f]{32,}$/i.test(stringValue);
}

function isLikelyUrl(value) {
  return /^(https?:\/\/|ipfs:\/\/|ar:\/\/)/i.test(String(value ?? "").trim());
}

function normalizedAddress(value) {
  if (!isAddress(String(value ?? "").trim())) return null;
  return getAddress(String(value).trim());
}

function shortId(value) {
  return String(value ?? "").replace(/[^A-Z0-9]/gi, "").slice(-4).toUpperCase() || crypto.randomUUID().slice(0, 4).toUpperCase();
}

export function buildAssetRegistrationId() {
  return `ASSET-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

function buildVcCode(record) {
  if (record?.vcBridge?.code) return String(record.vcBridge.code).toUpperCase();
  const date = String(record?.createdAt || nowIso()).slice(0, 10).replace(/-/g, "");
  return `VC-NFT-${date}-${shortId(record?.id)}`;
}

function proofChecklist(record, language) {
  const list = localizedList(record.evidence, language);
  if (list.length > 0) return list;

  const items = [
    `${language === "vi" ? "Wallet" : "Wallet"}: ${record.walletAddress || "-"}`,
    `${language === "vi" ? "Proof URL" : "Proof URL"}: ${record.proofUrl || "-"}`,
    `${language === "vi" ? "Content hash" : "Content hash"}: ${record.contentHash || "-"}`,
  ];

  if (record.contractAddress) items.push(`${language === "vi" ? "Contract" : "Contract"}: ${record.contractAddress}`);
  if (record.tokenId) items.push(`${language === "vi" ? "Token ID" : "Token ID"}: ${record.tokenId}`);

  return items;
}

function buildVcRecord(record, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const code = buildVcCode(record);
  const registryUrl = `${SITE_URL}/asset-registrations/${encodeURIComponent(record.id)}`;
  const summary = localizedValue(record.summary, language)
    || (language === "vi"
      ? "Bản ghi tài sản số đã được đưa vào trust layer độc lập."
      : "A digital-asset record published into the independent trust layer.");
  const scope = localizedValue(record.scope, language)
    || (language === "vi"
      ? "Xác thực tài sản mã hóa độc lập và có thể mirror sang VC."
      : "Independent crypto-asset verification that can be mirrored into VC.");

  return {
    code,
    holder: record.registrantName || record.ownerEntity || "IAI Asset Registry",
    program: record.assetName || record.assetType || "Digital Asset Registration",
    issuer: "NFT.IAI.ONE Asset Registry",
    domain: "nft.iai.one",
    recordType: "asset",
    assetType: record.assetType || null,
    network: record.network || null,
    contractAddress: record.contractAddress || null,
    tokenId: record.tokenId || null,
    walletAddress: record.walletAddress || null,
    status: record.status,
    issuedAt: String(record.createdAt || nowIso()).slice(0, 10),
    summary,
    scope,
    evidence: proofChecklist(record, language),
    anchors: {
      contentHash: record.contentHash || null,
      ipfs: null,
      proofUrl: record.proofUrl || null,
      registry: registryUrl,
      vc: `${VC_BASE_URL}/v/${encodeURIComponent(code)}`,
    },
  };
}

function registrationView(record, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const code = buildVcCode(record);
  const status = record.status || record.verification?.status || "reviewing";

  return {
    ...record,
    assetType: record.assetType || "Digital Asset",
    network: normalizeNetwork(record.network),
    tokenStandard: normalizeTokenStandard(record.tokenStandard, Boolean(record.contractAddress || record.tokenId)),
    summary: localizedValue(record.summary, language),
    scope: localizedValue(record.scope, language),
    evidence: proofChecklist(record, language),
    status,
    verification: {
      ...record.verification,
      status,
      note: localizedValue(record.verification?.note, language),
    },
    vcBridge: {
      ...record.vcBridge,
      code,
      independentUrl: record.vcBridge?.independentUrl || `${VC_BASE_URL}/v/${encodeURIComponent(code)}`,
    },
    detailPath: `/asset-registrations/${encodeURIComponent(record.id)}`,
    registryUrl: `${SITE_URL}/asset-registrations/${encodeURIComponent(record.id)}`,
    vcRecord: buildVcRecord({ ...record, status }, language),
  };
}

async function verifyWalletSnapshot({ provider, walletAddress }) {
  const balance = await provider.getBalance(walletAddress);
  return {
    mode: "wallet_snapshot",
    ownershipChecked: true,
    matchedOwner: true,
    balanceWei: balance.toString(),
    balanceNative: formatEther(balance),
  };
}

async function verifyEvmOwnership({ provider, walletAddress, contractAddress, tokenId, tokenStandard }) {
  if (tokenStandard === "ERC-1155") {
    const contract = new Contract(contractAddress, ERC1155_ABI, provider);
    const balance = await contract.balanceOf(walletAddress, tokenId);
    return {
      mode: "erc1155_balance",
      ownershipChecked: true,
      matchedOwner: balance > 0n,
      balance: balance.toString(),
      resolvedOwner: walletAddress,
    };
  }

  const contract = new Contract(contractAddress, ERC721_ABI, provider);
  const resolvedOwner = getAddress(await contract.ownerOf(tokenId));
  return {
    mode: "erc721_ownerOf",
    ownershipChecked: true,
    matchedOwner: resolvedOwner === walletAddress,
    resolvedOwner,
  };
}

async function autoVerifyRegistration({ env = {}, payload = {}, walletAddress, contractAddress, tokenId, tokenStandard, language }) {
  const rpcUrl = env.ASSET_RPC_URL || env.MINT_RPC_URL || "";
  const chainIdExpected = payload.chainId || env.ASSET_CHAIN_ID || env.MINT_CHAIN_ID || null;

  if (!rpcUrl) {
    return {
      status: "reviewing",
      mode: "rpc_missing",
      ownershipChecked: false,
      matchedOwner: false,
      rpcConfigured: false,
      checkedAt: nowIso(),
      note: language === "vi"
        ? "Đã lưu hồ sơ nhưng chưa có RPC để auto-check ownership on-chain."
        : "The record was saved, but no RPC endpoint is configured for automatic on-chain ownership checks.",
    };
  }

  try {
    const provider = new JsonRpcProvider(rpcUrl);
    const network = await provider.getNetwork();
    const actualChainId = network.chainId.toString();

    if (chainIdExpected && actualChainId !== String(chainIdExpected)) {
      return {
        status: "reviewing",
        mode: "chain_mismatch",
        ownershipChecked: false,
        matchedOwner: false,
        rpcConfigured: true,
        checkedAt: nowIso(),
        actualChainId,
        expectedChainId: String(chainIdExpected),
        note: language === "vi"
          ? "RPC hiện tại không khớp chain yêu cầu nên chỉ lưu hồ sơ ở trạng thái reviewing."
          : "The configured RPC does not match the requested chain, so the record remains in reviewing state.",
      };
    }

    const details = contractAddress && tokenId
      ? await verifyEvmOwnership({ provider, walletAddress, contractAddress, tokenId, tokenStandard })
      : await verifyWalletSnapshot({ provider, walletAddress });

    return {
      ...details,
      status: details.matchedOwner ? "verified" : "reviewing",
      rpcConfigured: true,
      actualChainId,
      checkedAt: nowIso(),
      note: details.matchedOwner
        ? (language === "vi"
          ? "Ownership/balance đã được đối chiếu tự động khi đăng ký."
          : "Ownership/balance was checked automatically during registration.")
        : (language === "vi"
          ? "Đã kiểm tra on-chain nhưng chưa khớp owner/balance mong đợi."
          : "An on-chain check ran, but the owner/balance did not match the expected wallet."),
    };
  } catch (error) {
    return {
      status: "reviewing",
      mode: "rpc_error",
      ownershipChecked: false,
      matchedOwner: false,
      rpcConfigured: true,
      checkedAt: nowIso(),
      note: language === "vi"
        ? "RPC phản hồi lỗi nên hồ sơ được lưu ở trạng thái reviewing."
        : "The RPC call failed, so the record has been stored in reviewing state.",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

function validatePayload(payload, language) {
  const walletAddress = normalizedAddress(payload.walletAddress);
  if (!walletAddress) {
    return {
      ok: false,
      status: 422,
      code: "INVALID_WALLET",
      message: language === "vi" ? "Ví nhận không hợp lệ." : "The wallet address is invalid.",
    };
  }

  if (!isLikelyHash(payload.contentHash)) {
    return {
      ok: false,
      status: 422,
      code: "INVALID_CONTENT_HASH",
      message: language === "vi" ? "Content hash không hợp lệ." : "The content hash is invalid.",
    };
  }

  if (!isLikelyUrl(payload.proofUrl)) {
    return {
      ok: false,
      status: 422,
      code: "INVALID_PROOF_URL",
      message: language === "vi" ? "Proof URL không hợp lệ." : "The proof URL is invalid.",
    };
  }

  const contractAddress = payload.contractAddress ? normalizedAddress(payload.contractAddress) : null;
  if (payload.contractAddress && !contractAddress) {
    return {
      ok: false,
      status: 422,
      code: "INVALID_CONTRACT",
      message: language === "vi" ? "Contract address không hợp lệ." : "The contract address is invalid.",
    };
  }

  if ((payload.contractAddress && !payload.tokenId) || (!payload.contractAddress && payload.tokenId)) {
    return {
      ok: false,
      status: 422,
      code: "TOKEN_FIELDS_INCOMPLETE",
      message: language === "vi"
        ? "Contract address và token ID phải đi cùng nhau."
        : "Contract address and token ID must be provided together.",
    };
  }

  return {
    ok: true,
    walletAddress,
    contractAddress,
    tokenId: payload.tokenId ? String(payload.tokenId).trim() : null,
  };
}

export async function listAssetRegistrationRecords(env = {}, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const store = await getTrustStore(env);
  const stored = await store.listAssetRegistrations();
  const merged = [...ASSET_REGISTRATION_SEED, ...stored];
  const deduped = new Map();

  for (const item of merged) {
    deduped.set(item.id, registrationView(item, language));
  }

  return [...deduped.values()].sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
}

export async function getAssetRegistrationRecord(env = {}, id, languageInput = "vi") {
  const language = normalizeLanguage(languageInput);
  const seed = ASSET_REGISTRATION_SEED.find((item) => item.id === id);
  if (seed) return registrationView(seed, language);

  const store = await getTrustStore(env);
  const record = await store.getAssetRegistration(id);
  return record ? registrationView(record, language) : null;
}

export async function createAssetRegistration({ env = {}, payload = {}, languageInput = "vi" }) {
  const language = normalizeLanguage(languageInput);
  const validation = validatePayload(payload, language);

  if (!validation.ok) {
    return validation;
  }

  const now = nowIso();
  const id = buildAssetRegistrationId();
  const tokenStandard = normalizeTokenStandard(payload.tokenStandard, Boolean(validation.contractAddress || validation.tokenId));
  const verification = await autoVerifyRegistration({
    env,
    payload,
    walletAddress: validation.walletAddress,
    contractAddress: validation.contractAddress,
    tokenId: validation.tokenId,
    tokenStandard,
    language,
  });

  const record = {
    id,
    createdAt: now,
    updatedAt: now,
    registrantName: String(payload.registrantName || payload.ownerName || payload.recipientName || payload.ownerEntity || "").trim() || "IAI Operator",
    ownerEntity: String(payload.ownerEntity || payload.registrantName || "IAI Asset Registry").trim(),
    assetName: String(payload.assetName || payload.title || payload.assetType || "Digital Asset Registration").trim(),
    assetType: String(payload.assetType || "Digital Asset").trim(),
    network: normalizeNetwork(payload.network),
    chainId: payload.chainId ? String(payload.chainId).trim() : null,
    walletAddress: validation.walletAddress,
    contractAddress: validation.contractAddress,
    tokenId: validation.tokenId,
    tokenStandard,
    proofUrl: String(payload.proofUrl).trim(),
    contentHash: String(payload.contentHash).trim(),
    externalUrl: payload.externalUrl ? String(payload.externalUrl).trim() : null,
    externalId: payload.externalId ? String(payload.externalId).trim() : null,
    summary: String(payload.summary || payload.description || "").trim()
      || (language === "vi"
        ? "Hồ sơ tài sản mã hóa đã được đăng ký để đối chiếu ownership và mirror sang VC."
        : "A crypto-asset record has been registered for ownership checks and VC mirroring."),
    scope: String(payload.scope || "").trim()
      || (language === "vi"
        ? "Đăng ký độc lập qua nft.iai.one để sau đó xác thực thêm trên vc.vetuonglai.com."
        : "Independently registered via nft.iai.one before additional verification on vc.vetuonglai.com."),
    evidence: [
      `${language === "vi" ? "Wallet" : "Wallet"}: ${validation.walletAddress}`,
      `${language === "vi" ? "Proof URL" : "Proof URL"}: ${String(payload.proofUrl).trim()}`,
      `${language === "vi" ? "Content hash" : "Content hash"}: ${String(payload.contentHash).trim()}`,
      ...(validation.contractAddress ? [`Contract: ${validation.contractAddress}`] : []),
      ...(validation.tokenId ? [`Token ID: ${validation.tokenId}`] : []),
    ],
    verification,
    status: verification.status,
    vcBridge: {
      code: String(payload.vcCode || "").trim().toUpperCase() || buildVcCode({ id, createdAt: now }),
      mirrorState: verification.status === "verified" ? "ready" : "reviewing",
      independentUrl: null,
    },
  };

  record.vcBridge.independentUrl = `${VC_BASE_URL}/v/${encodeURIComponent(record.vcBridge.code)}`;

  const store = await getTrustStore(env);
  await store.putAssetRegistration(record);

  return {
    ok: true,
    status: 201,
    registration: registrationView(record, language),
  };
}
