import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async ({ params }) => htmlResponse(renderPageShell({
  title: {
    vi: "Chi tiết Tài liệu",
    en: "Document Detail",
  },
  description: {
    vi: "Thông tin boundary, hash tài liệu, proof URL và quan hệ với collections hoặc disclosures.",
    en: "Boundary metadata, document hash, proof URL, and relationships to collections or disclosures.",
  },
  activeNav: "documents",
  pageKey: "document-detail",
  canonicalPath: `/documents/${params.slug}`,
  data: {
    slug: params.slug,
  },
}));
