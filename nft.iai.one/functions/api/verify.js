import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { verifyTrustQuery } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const query = url.searchParams.get("q") || "";
  const result = await verifyTrustQuery({
    env,
    query,
    languageInput: language,
  });

  return json(result, result.status ?? 200);
};
