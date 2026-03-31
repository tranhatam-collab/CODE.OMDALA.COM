import { normalizeLanguage } from "../../assets/registry-data.js";
import { getDisclosureDetail, json, listDisclosureItems, optionsResponse } from "../_lib/registry.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const id = url.searchParams.get("id");

  if (id) {
    const disclosure = getDisclosureDetail(id, language);
    if (!disclosure) {
      return json({
        ok: false,
        language,
        error: language === "vi" ? "Không tìm thấy disclosure yêu cầu." : "Requested disclosure was not found.",
      }, 404);
    }

    return json({
      ok: true,
      language,
      disclosure,
    });
  }

  return json({
    ok: true,
    language,
    disclosures: listDisclosureItems(language),
  });
};
