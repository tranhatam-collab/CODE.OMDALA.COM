import { REGISTRY_VERSION } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { listAssetRegistrationRecords } from "../_lib/asset-registrations.js";
import { summarizeMintConfiguration } from "../_lib/mint-writer.js";
import { summarizeTrustStore } from "../_lib/trust-store.js";
import { listApprovalRecords, listTokenRecords } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ env }) => {
  const [approvals, tokens] = await Promise.all([
    listApprovalRecords(env, "vi"),
    listTokenRecords(env, "vi"),
  ]);
  const registrations = await listAssetRegistrationRecords(env, "vi");

  return json({
    ok: true,
    service: "nft-iai-one",
    version: REGISTRY_VERSION,
    now: new Date().toISOString(),
    issuance: {
      storage: summarizeTrustStore(env),
      liveMint: summarizeMintConfiguration(env),
      approvals: {
        total: approvals.length,
        pending: approvals.filter((item) => item.status === "pending_approval").length,
        approved: approvals.filter((item) => item.status === "approved").length,
        issued: approvals.filter((item) => item.status === "issued").length,
      },
      tokens: {
        total: tokens.length,
        issued: tokens.filter((item) => item.status === "issued").length,
        revoked: tokens.filter((item) => item.status === "revoked").length,
        superseded: tokens.filter((item) => item.status === "superseded").length,
      },
      assetRegistrations: {
        total: registrations.length,
        verified: registrations.filter((item) => item.status === "verified").length,
        reviewing: registrations.filter((item) => item.status === "reviewing").length,
      },
    },
    endpoints: [
      "/api/health",
      "/api/registry",
      "/api/stats",
      "/api/collections",
      "/api/documents",
      "/api/disclosures",
      "/api/approvals",
      "/api/tokens",
      "/api/audit",
      "/api/verify",
      "/api/asset-registrations",
      "/api/metadata/iai-genesis-pass/DEMO-0001",
      "/api/issuance-preview",
      "/api/approve-issuance",
      "/api/issue",
      "/api/revoke-issuance",
      "/api/supersede-issuance",
    ],
  });
};
