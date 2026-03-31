import { normalizeLanguage } from "../../assets/registry-data.js";
import { getDocumentDetail, json, listDocumentItems, optionsResponse } from "../_lib/registry.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const slug = url.searchParams.get("slug");

  if (slug) {
    const document = getDocumentDetail(slug, language);
    if (!document) {
      return json({
        ok: false,
        language,
        error: language === "vi" ? "Không tìm thấy tài liệu yêu cầu." : "Requested document was not found.",
      }, 404);
    }

    return json({
      ok: true,
      language,
      document,
    });
  }

  return json({
    ok: true,
    language,
    documents: listDocumentItems(language),
  });
};
