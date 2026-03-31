import { json, optionsResponse } from "../_lib/registry.js";
import { listAuditTrail } from "../_lib/trust.js";

export const onRequestOptions = () => optionsResponse();

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url);
  const entityType = url.searchParams.get("entityType");
  const entityId = url.searchParams.get("entityId");

  return json({
    ok: true,
    audit: await listAuditTrail(env, {
      entityType,
      entityId,
    }),
  });
};
