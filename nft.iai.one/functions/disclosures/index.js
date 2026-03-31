import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async () => htmlResponse(renderPageShell({
  title: {
    vi: "Disclosure Ledger",
    en: "Disclosure Ledger",
  },
  description: {
    vi: "Ledger công khai cho asset disclosures, stale detection, reserve buckets và disclosure boundary của IAI.",
    en: "The public ledger for asset disclosures, stale detection, reserve buckets, and the IAI disclosure boundary.",
  },
  activeNav: "disclosures",
  pageKey: "disclosures-index",
  canonicalPath: "/disclosures/",
}));
