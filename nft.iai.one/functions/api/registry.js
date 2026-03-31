import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse, registrySummary } from "../_lib/registry.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  return json(registrySummary(language));
};
