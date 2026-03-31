import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async ({ params }) => htmlResponse(renderPageShell({
  title: {
    vi: "Chi tiết Collection",
    en: "Collection Detail",
  },
  description: {
    vi: "Boundary, 5 mint gates, related documents, disclosure links và token explorer cho collection đã chọn.",
    en: "The boundary, 5 mint gates, related documents, disclosure links, and token explorer for the selected collection.",
  },
  activeNav: "collections",
  pageKey: "collection-detail",
  canonicalPath: `/collections/${params.slug}`,
  data: {
    slug: params.slug,
  },
}));
