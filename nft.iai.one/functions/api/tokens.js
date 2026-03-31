import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { getTokenRecord, listAuditTrail, listTokenRecords } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const collectionSlug = url.searchParams.get("collection");
  const tokenId = url.searchParams.get("token");

  if (collectionSlug && tokenId) {
    const token = await getTokenRecord(env, collectionSlug, tokenId, language);
    if (!token) {
      return json({
        ok: false,
        language,
        error: language === "vi" ? "Không tìm thấy token yêu cầu." : "Requested token was not found.",
      }, 404);
    }

    return json({
      ok: true,
      language,
      token,
      audit: await listAuditTrail(env, {
        entityType: "token",
        entityId: `${collectionSlug}:${tokenId}`,
      }),
    });
  }

  return json({
    ok: true,
    language,
    tokens: await listTokenRecords(env, language, {
      collectionSlug,
    }),
  });
};
