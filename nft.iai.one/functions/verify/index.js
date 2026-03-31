import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async () => htmlResponse(renderPageShell({
  title: {
    vi: "Verify Center",
    en: "Verify Center",
  },
  description: {
    vi: "Tra cứu token, approval, proof URL, content hash, document hoặc disclosure trong một bề mặt verify công khai.",
    en: "Search tokens, approvals, proof URLs, content hashes, documents, or disclosures from a single public verify surface.",
  },
  activeNav: "verify",
  pageKey: "verify-index",
  canonicalPath: "/verify/",
}));
