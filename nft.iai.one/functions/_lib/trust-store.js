const MEMORY_KEY = Symbol.for("iai.nft.trust.store");

function getMemoryState() {
  if (!globalThis[MEMORY_KEY]) {
    globalThis[MEMORY_KEY] = {
      approvals: new Map(),
      tokens: new Map(),
      audit: new Map(),
      assetRegistrations: new Map(),
    };
  }
  return globalThis[MEMORY_KEY];
}

function tokenKey(collectionSlug, tokenId) {
  return `${collectionSlug}:${tokenId}`;
}

function sortByUpdatedAt(items) {
  return [...items].sort((a, b) => String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")));
}

async function listKvJson(kv, prefix) {
  const output = [];
  let cursor = undefined;

  do {
    const page = await kv.list({ prefix, cursor, limit: 1000 });
    const values = await Promise.all(
      (page.keys || []).map((item) => kv.get(item.name, "json")),
    );

    for (const value of values) {
      if (value) output.push(value);
    }

    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return output;
}

function createMemoryStore() {
  const memory = getMemoryState();

  return {
    async listApprovals() {
      return sortByUpdatedAt(memory.approvals.values());
    },
    async getApproval(id) {
      return memory.approvals.get(id) ?? null;
    },
    async putApproval(record) {
      memory.approvals.set(record.id, record);
      return record;
    },
    async listTokens() {
      return sortByUpdatedAt(memory.tokens.values());
    },
    async getToken(collectionSlug, tokenId) {
      return memory.tokens.get(tokenKey(collectionSlug, tokenId)) ?? null;
    },
    async putToken(record) {
      memory.tokens.set(tokenKey(record.collectionSlug, record.tokenId), record);
      return record;
    },
    async listAudit({ entityType = null, entityId = null } = {}) {
      const items = sortByUpdatedAt(memory.audit.values());
      return items.filter((item) =>
        (entityType ? item.entityType === entityType : true)
        && (entityId ? item.entityId === entityId : true)
      );
    },
    async appendAudit(record) {
      memory.audit.set(record.id, record);
      return record;
    },
    async listAssetRegistrations() {
      return sortByUpdatedAt(memory.assetRegistrations.values());
    },
    async getAssetRegistration(id) {
      return memory.assetRegistrations.get(id) ?? null;
    },
    async putAssetRegistration(record) {
      memory.assetRegistrations.set(record.id, record);
      return record;
    },
  };
}

function createKvStore(kv) {
  return {
    async listApprovals() {
      return sortByUpdatedAt(await listKvJson(kv, "approval:"));
    },
    async getApproval(id) {
      return await kv.get(`approval:${id}`, "json");
    },
    async putApproval(record) {
      await kv.put(`approval:${record.id}`, JSON.stringify(record));
      return record;
    },
    async listTokens() {
      return sortByUpdatedAt(await listKvJson(kv, "token:"));
    },
    async getToken(collectionSlug, tokenId) {
      return await kv.get(`token:${tokenKey(collectionSlug, tokenId)}`, "json");
    },
    async putToken(record) {
      await kv.put(`token:${tokenKey(record.collectionSlug, record.tokenId)}`, JSON.stringify(record));
      return record;
    },
    async listAudit({ entityType = null, entityId = null } = {}) {
      const items = sortByUpdatedAt(await listKvJson(kv, "audit:"));
      return items.filter((item) =>
        (entityType ? item.entityType === entityType : true)
        && (entityId ? item.entityId === entityId : true)
      );
    },
    async appendAudit(record) {
      await kv.put(`audit:${record.id}`, JSON.stringify(record));
      return record;
    },
    async listAssetRegistrations() {
      return sortByUpdatedAt(await listKvJson(kv, "asset-registration:"));
    },
    async getAssetRegistration(id) {
      return await kv.get(`asset-registration:${id}`, "json");
    },
    async putAssetRegistration(record) {
      await kv.put(`asset-registration:${record.id}`, JSON.stringify(record));
      return record;
    },
  };
}

export function buildApprovalId() {
  return `APR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

export function buildAuditId() {
  return `AUD-${crypto.randomUUID()}`;
}

export function summarizeTrustStore(env = {}) {
  return {
    mode: env.NFT_TRUST_KV ? "kv" : "memory",
    durable: Boolean(env.NFT_TRUST_KV),
  };
}

export async function getTrustStore(env = {}) {
  if (env.NFT_TRUST_KV) {
    return createKvStore(env.NFT_TRUST_KV);
  }

  return createMemoryStore();
}
