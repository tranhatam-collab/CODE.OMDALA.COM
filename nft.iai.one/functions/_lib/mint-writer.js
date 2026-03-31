import {
  JsonRpcProvider,
  Wallet,
  Interface,
  getAddress,
  hexlify,
  id as keccakId,
  isAddress,
  isHexString,
  toUtf8Bytes,
  zeroPadValue,
} from "ethers";

class MintWriterError extends Error {
  constructor(code, message, status = 500, details) {
    super(message);
    this.name = "MintWriterError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

function decodeBase64(value) {
  if (typeof atob === "function") return atob(value);
  return Buffer.from(value, "base64").toString("utf8");
}

function parseJsonText(raw, envName) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new MintWriterError(
      "MINT_CONFIG_INVALID_JSON",
      `Environment variable ${envName} does not contain valid JSON.`,
      500,
      { envName, reason: error instanceof Error ? error.message : String(error) },
    );
  }
}

function parseAbi(env) {
  const fromJson = env?.MINT_CONTRACT_ABI_JSON || env?.MINT_CONTRACT_ABI;
  if (fromJson) return parseJsonText(fromJson, env?.MINT_CONTRACT_ABI_JSON ? "MINT_CONTRACT_ABI_JSON" : "MINT_CONTRACT_ABI");

  const fromBase64 = env?.MINT_CONTRACT_ABI_BASE64;
  if (fromBase64) return parseJsonText(decodeBase64(fromBase64), "MINT_CONTRACT_ABI_BASE64");

  return null;
}

function parseOverrides(env) {
  const raw = env?.MINT_ARG_OVERRIDES_JSON;
  if (!raw) return {};
  const parsed = parseJsonText(raw, "MINT_ARG_OVERRIDES_JSON");
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new MintWriterError(
      "MINT_CONFIG_INVALID_OVERRIDES",
      "MINT_ARG_OVERRIDES_JSON must be a JSON object keyed by parameter name or index.",
      500,
    );
  }
  return parsed;
}

function toBytes32(value) {
  const stringValue = String(value ?? "").trim();
  if (!stringValue) {
    throw new MintWriterError("MINT_ARG_UNRESOLVED", "Unable to derive a bytes32 value from an empty input.", 400);
  }

  if (isHexString(stringValue, 32)) return stringValue.toLowerCase();

  const normalized = stringValue.startsWith("sha256:") ? stringValue.slice(7) : stringValue;
  if (/^[0-9a-fA-F]{64}$/.test(normalized)) return `0x${normalized.toLowerCase()}`;

  return zeroPadValue(hexlify(toUtf8Bytes(stringValue)).slice(0, 66), 32);
}

function toUint(value) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number") return BigInt(value);
  if (typeof value === "string" && value.trim() !== "") {
    const trimmed = value.trim();
    if (/^0x[0-9a-fA-F]+$/.test(trimmed)) return BigInt(trimmed);
    if (/^[0-9]+$/.test(trimmed)) return BigInt(trimmed);
  }

  throw new MintWriterError(
    "MINT_ARG_INVALID_UINT",
    `Expected an unsigned integer value, received "${String(value)}".`,
    400,
  );
}

function coerceValue(value, type) {
  if (type.endsWith("[]")) {
    const arrayValue = Array.isArray(value)
      ? value
      : typeof value === "string"
        ? parseJsonText(value, "MINT_ARG_OVERRIDES_JSON")
        : [value];

    return arrayValue.map((item) => coerceValue(item, type.slice(0, -2)));
  }

  if (type === "address") {
    const candidate = String(value ?? "").trim();
    if (!isAddress(candidate)) {
      throw new MintWriterError("MINT_ARG_INVALID_ADDRESS", `Invalid address value "${candidate}".`, 400);
    }
    return getAddress(candidate);
  }

  if (type.startsWith("uint") || type.startsWith("int")) return toUint(value);
  if (type === "bool") return value === true || value === "true";
  if (type === "bytes32") return toBytes32(value);
  if (type.startsWith("bytes")) return isHexString(String(value ?? "")) ? value : hexlify(toUtf8Bytes(String(value ?? "")));
  if (type === "string") return String(value ?? "");

  return value;
}

function numericTokenId(preview, payload) {
  const explicit = payload?.numericTokenId ?? payload?.tokenIdNumber;
  if (explicit !== undefined && explicit !== null && explicit !== "") return toUint(explicit);

  const tokenId = String(preview?.tokenId ?? "").trim();
  if (!tokenId) throw new MintWriterError("MINT_ARG_UNRESOLVED", "A numeric token ID could not be derived from the issuance preview.", 400);
  if (/^[0-9]+$/.test(tokenId)) return BigInt(tokenId);
  if (/^[0-9A-Fa-f]+$/.test(tokenId)) return BigInt(`0x${tokenId}`);

  throw new MintWriterError("MINT_ARG_UNRESOLVED", `Token ID "${tokenId}" cannot be converted into uint256 automatically.`, 400);
}

function defaultStringValue(inputName, payload, preview) {
  const name = inputName.toLowerCase();
  if (name.includes("uri")) return preview.metadataUrl;
  if (name.includes("proof")) return payload.proofUrl;
  if (name.includes("hash")) return payload.contentHash;
  if (name.includes("title") || name.includes("name")) return payload.title || payload.recipientName;
  if (name.includes("recipient")) return payload.recipientName;
  if (name.includes("external")) return payload.externalId;
  if (name.includes("collection")) return preview?.collection?.slug || preview?.collection?.name;
  if (name.includes("token")) return preview.tokenId;
  return null;
}

function defaultUintValue(inputName, payload, preview, env) {
  const name = inputName.toLowerCase();
  if (name.includes("quantity") || name.includes("amount") || name.includes("count")) return env?.MINT_QUANTITY ?? "1";
  if (name.includes("tokenid") || name === "id" || name.endsWith("_id")) return numericTokenId(preview, payload);
  return null;
}

function resolveArgumentValue(input, index, payload, preview, env, overrides) {
  const candidates = [
    input.name,
    String(index),
    `${index}`,
  ].filter(Boolean);

  for (const key of candidates) {
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      return coerceValue(overrides[key], input.type);
    }
  }

  const name = String(input.name || "").trim();

  if (input.type === "address") {
    const candidate = payload.walletAddress || payload.recipientAddress || env?.MINT_RECIPIENT_OVERRIDE;
    if (!candidate) {
      throw new MintWriterError(
        "MINT_ARG_UNRESOLVED",
        `Unable to resolve address parameter "${name || index}". Add it to the payload or MINT_ARG_OVERRIDES_JSON.`,
        400,
      );
    }
    return coerceValue(candidate, input.type);
  }

  if (input.type === "bytes32") {
    const candidate = payload.contentHash || payload.hash || preview.tokenId;
    if (!candidate) {
      throw new MintWriterError(
        "MINT_ARG_UNRESOLVED",
        `Unable to resolve bytes32 parameter "${name || index}". Add MINT_ARG_OVERRIDES_JSON for this field.`,
        400,
      );
    }
    return coerceValue(candidate, input.type);
  }

  if (input.type.startsWith("uint") || input.type.startsWith("int")) {
    const candidate = defaultUintValue(name, payload, preview, env);
    if (candidate === null) {
      throw new MintWriterError(
        "MINT_ARG_UNRESOLVED",
        `Unable to resolve numeric parameter "${name || index}". Add MINT_ARG_OVERRIDES_JSON for this field.`,
        400,
      );
    }
    return coerceValue(candidate, input.type);
  }

  if (input.type === "string") {
    const candidate = defaultStringValue(name, payload, preview);
    if (candidate === null || candidate === undefined || candidate === "") {
      throw new MintWriterError(
        "MINT_ARG_UNRESOLVED",
        `Unable to resolve string parameter "${name || index}". Add MINT_ARG_OVERRIDES_JSON for this field.`,
        400,
      );
    }
    return coerceValue(candidate, input.type);
  }

  if (input.type === "bool") return coerceValue(env?.MINT_DEFAULT_BOOL ?? false, input.type);

  throw new MintWriterError(
    "MINT_ARG_UNRESOLVED",
    `Unsupported automatic resolution for parameter "${name || index}" of type "${input.type}". Use MINT_ARG_OVERRIDES_JSON.`,
    400,
  );
}

function parseTxValue(env) {
  if (env?.MINT_TX_VALUE_WEI) return toUint(env.MINT_TX_VALUE_WEI);
  return null;
}

function parseGasLimit(env) {
  if (!env?.MINT_GAS_LIMIT) return null;
  return toUint(env.MINT_GAS_LIMIT);
}

export function validateMintEnvironment(env) {
  const missing = [
    "MINT_RPC_URL",
    "MINT_CONTRACT_ADDRESS",
    "MINT_SIGNER_PRIVATE_KEY",
  ].filter((key) => !env?.[key]);

  if (missing.length > 0) return { ok: false, missing };

  const abi = parseAbi(env);
  if (!abi) {
    return {
      ok: false,
      missing: ["MINT_CONTRACT_ABI_JSON"],
      note: "Provide the contract ABI via MINT_CONTRACT_ABI_JSON or MINT_CONTRACT_ABI_BASE64.",
    };
  }

  return { ok: true };
}

export function summarizeMintConfiguration(env) {
  const status = validateMintEnvironment(env);
  return {
    configured: status.ok,
    missing: status.ok ? [] : status.missing,
    expectedChainId: env?.MINT_CHAIN_ID || null,
    functionName: env?.MINT_FUNCTION_NAME || "safeMint",
    waitForConfirmation: env?.MINT_WAIT_FOR_CONFIRMATION === "true",
    hasArgOverrides: Boolean(env?.MINT_ARG_OVERRIDES_JSON),
  };
}

export async function submitMintTransaction({ env, payload, preview }) {
  const status = validateMintEnvironment(env);
  if (!status.ok) {
    throw new MintWriterError(
      "MINT_NOT_CONFIGURED",
      `Missing mint configuration: ${status.missing.join(", ")}`,
      501,
      status,
    );
  }

  const abi = parseAbi(env);
  const functionKey = env.MINT_FUNCTION_NAME || "safeMint";
  const contractAddress = getAddress(env.MINT_CONTRACT_ADDRESS);
  const provider = new JsonRpcProvider(env.MINT_RPC_URL);
  const signer = new Wallet(env.MINT_SIGNER_PRIVATE_KEY, provider);
  const contractInterface = new Interface(abi);
  const fragment = contractInterface.getFunction(functionKey);

  if (!fragment) {
    throw new MintWriterError(
      "MINT_FUNCTION_NOT_FOUND",
      `Mint function "${functionKey}" was not found in the configured ABI.`,
      500,
    );
  }

  const overrides = parseOverrides(env);
  const args = fragment.inputs.map((input, index) =>
    resolveArgumentValue(input, index, payload, preview, env, overrides)
  );

  const txRequest = {
    to: contractAddress,
    data: contractInterface.encodeFunctionData(fragment, args),
  };

  const txValue = parseTxValue(env);
  const gasLimit = parseGasLimit(env);

  if (txValue !== null) txRequest.value = txValue;
  if (gasLimit !== null) txRequest.gasLimit = gasLimit;

  const network = await provider.getNetwork();
  if (env?.MINT_CHAIN_ID && network.chainId !== BigInt(env.MINT_CHAIN_ID)) {
    throw new MintWriterError(
      "MINT_CHAIN_MISMATCH",
      `Configured chainId ${env.MINT_CHAIN_ID} does not match RPC chainId ${network.chainId.toString()}.`,
      502,
      {
        expectedChainId: env.MINT_CHAIN_ID,
        actualChainId: network.chainId.toString(),
      },
    );
  }

  const tx = await signer.sendTransaction(txRequest);

  let receipt = null;
  if (env?.MINT_WAIT_FOR_CONFIRMATION === "true") {
    const confirmations = env?.MINT_CONFIRMATIONS ? Number(env.MINT_CONFIRMATIONS) : 1;
    receipt = await tx.wait(confirmations);
  }

  return {
    mode: receipt ? "confirmed" : "submitted",
    functionName: fragment.format(),
    chainId: network.chainId.toString(),
    contractAddress,
    from: signer.address,
    to: payload.walletAddress,
    metadataUrl: preview.metadataUrl,
    tokenId: preview.tokenId,
    args: args.map((value) => typeof value === "bigint" ? value.toString() : value),
    transaction: {
      hash: tx.hash,
      nonce: tx.nonce,
      gasLimit: tx.gasLimit?.toString?.() ?? null,
      gasPrice: tx.gasPrice?.toString?.() ?? null,
      maxFeePerGas: tx.maxFeePerGas?.toString?.() ?? null,
      maxPriorityFeePerGas: tx.maxPriorityFeePerGas?.toString?.() ?? null,
      value: tx.value?.toString?.() ?? null,
    },
    receipt: receipt
      ? {
          blockHash: receipt.blockHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed?.toString?.() ?? null,
          status: receipt.status,
          transactionHash: receipt.hash,
        }
      : null,
  };
}

export { MintWriterError };
