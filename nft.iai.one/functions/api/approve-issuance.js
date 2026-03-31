import { normalizeLanguage } from "../../assets/registry-data.js";
import { json, optionsResponse } from "../_lib/registry.js";
import { decideIssuanceApproval, requestIssuanceApproval } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json().catch(() => ({}));
  const language = normalizeLanguage(payload.lang || payload.language);
  const decision = payload.decision || payload.action || "submit";

  const result = decision === "approve" || decision === "reject"
    ? await decideIssuanceApproval({
        env,
        approvalId: payload.approvalId,
        decision,
        actor: payload.actor || payload.reviewer || "IAI Operations",
        note: payload.note || "",
        languageInput: language,
      })
    : await requestIssuanceApproval({
        env,
        payload,
        languageInput: language,
      });

  return json(result, result.status ?? 200);
};
