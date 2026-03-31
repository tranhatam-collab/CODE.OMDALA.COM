import { normalizeLanguage } from "../../assets/registry-data.js";
import { getCollectionDetail, json, listCollections, optionsResponse } from "../_lib/registry.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const slug = url.searchParams.get("slug");

  if (slug) {
    const collection = getCollectionDetail(slug, language);
    if (!collection) {
      return json({
        ok: false,
        language,
        error: language === "vi" ? "Không tìm thấy collection yêu cầu." : "Requested collection was not found.",
      }, 404);
    }

    return json({
      ok: true,
      language,
      collection,
    });
  }

  return json({
    ok: true,
    language,
    collections: listCollections(language),
  });
};
