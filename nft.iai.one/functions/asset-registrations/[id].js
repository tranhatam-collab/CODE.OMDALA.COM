import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async ({ params }) => htmlResponse(renderPageShell({
  title: {
    vi: "Asset Registration Detail",
    en: "Asset Registration Detail",
  },
  description: {
    vi: "Chi tiết asset registration, ownership auto-check và VC mirror state.",
    en: "Asset-registration detail, ownership auto-check results, and VC mirror state.",
  },
  activeNav: "asset-registrations",
  pageKey: "asset-registration-detail",
  canonicalPath: `/asset-registrations/${params.id}`,
  data: {
    id: params.id,
  },
}));
