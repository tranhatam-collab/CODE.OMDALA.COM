import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async () => htmlResponse(renderPageShell({
  title: {
    vi: "Document Registry",
    en: "Document Registry",
  },
  description: {
    vi: "Sổ đăng ký tài liệu chính thức cho verification, metadata, disclosure boundary và vận hành trust layer.",
    en: "The official registry for verification, metadata, disclosure boundaries, and trust-layer operations.",
  },
  activeNav: "documents",
  pageKey: "documents-index",
  canonicalPath: "/documents/",
}));
