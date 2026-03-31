import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async () => htmlResponse(renderPageShell({
  title: {
    vi: "Collection Registry",
    en: "Collection Registry",
  },
  description: {
    vi: "Catalog 5 collection hiện có, live gate score, trạng thái public-ready và đường dẫn đi tới Mint Studio, token explorer và verify center.",
    en: "The current 5-collection catalog with live gate scores, public-ready state, and links into Mint Studio, the token explorer, and the verify center.",
  },
  activeNav: "collections",
  pageKey: "collections-index",
  canonicalPath: "/collections/",
}));
