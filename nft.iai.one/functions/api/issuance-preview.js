import { normalizeLanguage } from "../../assets/registry-data.js";
import { buildIssuancePreview, json, optionsResponse } from "../_lib/registry.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestPost = async ({ request }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const preview = await buildIssuancePreview(payload, language);
  return json(preview, preview.status ?? 200);
};
