import { htmlResponse, renderPageShell } from "../../_lib/page-shell.js";

export const onRequestGet = async ({ params }) => htmlResponse(renderPageShell({
  title: {
    vi: "Token Explorer",
    en: "Token Explorer",
  },
  description: {
    vi: "Metadata URL ổn định, proof, verify status và provenance log công khai cho token đã issue.",
    en: "The stable metadata URL, proof, verify state, and public provenance log for an issued token.",
  },
  activeNav: "verify",
  pageKey: "token-detail",
  canonicalPath: `/token/${params.collection}/${params.tokenId}`,
  data: {
    collection: params.collection,
    tokenId: params.tokenId,
  },
}));
