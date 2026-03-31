import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async ({ params }) => htmlResponse(renderPageShell({
  title: {
    vi: "Chi tiết Disclosure",
    en: "Disclosure Detail",
  },
  description: {
    vi: "Trạng thái release, stale detection, proof URL, content hash và collection boundary liên quan.",
    en: "Release state, stale detection, proof URL, content hash, and the linked collection boundary.",
  },
  activeNav: "disclosures",
  pageKey: "disclosure-detail",
  canonicalPath: `/disclosures/${params.id}`,
  data: {
    id: params.id,
  },
}));
