import { normalizeLanguage } from "../../assets/registry-data.js";
import { listAssetRegistrationRecords } from "../_lib/asset-registrations.js";
import { buildLiveStats, json, optionsResponse } from "../_lib/registry.js";
import { listApprovalRecords, listTokenRecords } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const [stats, approvals, tokens, registrations] = await Promise.all([
    Promise.resolve(buildLiveStats(language)),
    listApprovalRecords(env, language),
    listTokenRecords(env, language),
    listAssetRegistrationRecords(env, language),
  ]);

  return json({
    ...stats,
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
  });
};
