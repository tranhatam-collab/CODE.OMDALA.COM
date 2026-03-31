import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { supersedeIssuedToken } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const result = await supersedeIssuedToken({
    env,
    previousCollectionSlug: payload.previousCollection || payload.previousCollectionSlug,
    previousTokenId: payload.previousToken || payload.previousTokenId,
    nextCollectionSlug: payload.nextCollection || payload.nextCollectionSlug,
    nextTokenId: payload.nextToken || payload.nextTokenId,
    actor: payload.actor || "IAI Operations",
    note: payload.note || "",
    languageInput: language,
  });

  return json(result, result.status ?? 200);
};
