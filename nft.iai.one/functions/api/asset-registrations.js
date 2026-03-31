import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import {
  createAssetRegistration,
  getAssetRegistrationRecord,
  listAssetRegistrationRecords,
} from "../_lib/asset-registrations.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const id = url.searchParams.get("id") || "";

  if (id) {
    const registration = await getAssetRegistrationRecord(env, id, language);
    if (!registration) {
      return json({
        ok: false,
        code: "ASSET_REGISTRATION_NOT_FOUND",
        message: language === "vi" ? "Không tìm thấy bản ghi asset registration." : "Asset registration record not found.",
      }, 404);
    }

    return json({
      ok: true,
      registration,
    });
  }

  const registrations = await listAssetRegistrationRecords(env, language);
  return json({
    ok: true,
    total: registrations.length,
    registrations,
    vcRecords: registrations.map((item) => item.vcRecord),
  });
};

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const result = await createAssetRegistration({
    env,
    payload,
    languageInput: language,
  });

  return json(result, result.status ?? 200);
};
