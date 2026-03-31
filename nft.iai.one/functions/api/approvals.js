import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { getApprovalRecord, listApprovalRecords } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const language = normalizeLanguage(url.searchParams.get("lang"));
  const approvalId = url.searchParams.get("id");

  if (approvalId) {
    const approval = await getApprovalRecord(env, approvalId, language);
    if (!approval) {
      return json({
        ok: false,
        language,
        error: language === "vi" ? "Không tìm thấy approval yêu cầu." : "Requested approval was not found.",
      }, 404);
    }

    return json({
      ok: true,
      language,
      approval,
    });
  }

  return json({
    ok: true,
    language,
    approvals: await listApprovalRecords(env, language),
  });
};
