import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { revokeIssuedToken } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const result = await revokeIssuedToken({
    env,
    collectionSlug: payload.collection || payload.collectionSlug,
    tokenId: payload.token || payload.tokenId,
    actor: payload.actor || "IAI Operations",
    note: payload.note || "",
    languageInput: language,
  });

  return json(result, result.status ?? 200);
};
