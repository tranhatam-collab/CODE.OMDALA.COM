import { htmlResponse, renderPageShell } from "../_lib/page-shell.js";

export const onRequestGet = async () => htmlResponse(renderPageShell({
  title: {
    vi: "Independent Asset Registry",
    en: "Independent Asset Registry",
  },
  description: {
    vi: "Danh mục các bản ghi tài sản mã hóa đã được đăng ký qua nft.iai.one để auto-check ownership và mirror sang VC.",
    en: "The directory of crypto-asset records registered through nft.iai.one for automatic ownership checks and VC mirroring.",
  },
  activeNav: "asset-registrations",
  pageKey: "asset-registrations-index",
  canonicalPath: "/asset-registrations/",
}));
