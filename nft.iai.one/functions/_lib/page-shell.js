function localizedHtml(value) {
  if (value && typeof value === "object") {
    return `
      <span data-lang="vi">${value.vi ?? value.en ?? ""}</span>
      <span data-lang="en">${value.en ?? value.vi ?? ""}</span>
    `;
  }

  return String(value ?? "");
}

function attributes(data = {}) {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `data-${key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
}

function navLink(href, active, label) {
  return `
    <a href="${href}"${active ? ' class="is-active"' : ""}>
      ${localizedHtml(label)}
    </a>
  `;
}

export function renderPageShell({
  title,
  description,
  activeNav = "",
  pageKey = "",
  canonicalPath = "",
  data = {},
}) {
  return `<!doctype html>
<html lang="vi" data-language="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>${title.vi} | NFT.IAI.ONE</title>
  <meta name="description" content="${description.vi}" />
  <meta name="robots" content="index,follow,max-image-preview:large" />
  <meta name="theme-color" content="#08111d" />
  <link rel="canonical" href="https://nft.iai.one${canonicalPath || "/"}" />
  <link rel="icon" href="/assets/nft-mark.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="/assets/site.css" />
  <script type="module" src="/assets/site.js"></script>
  <script type="module" src="/assets/route-app.js"></script>
</head>
<body data-trust-page="${pageKey}" ${attributes(data)}>
  <div class="shell">
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/" aria-label="NFT.IAI.ONE home">
          <img class="brand-mark" src="/assets/nft-mark.svg" alt="NFT.IAI.ONE mark" />
          <span class="brand-copy">
            <span class="brand-name">NFT.IAI.ONE</span>
            <span class="brand-meta">
              <span data-lang="vi">NFT Trust Layer cho hệ sinh thái IAI</span>
              <span data-lang="en">NFT Trust Layer for the IAI ecosystem</span>
            </span>
          </span>
        </a>

        <div class="header-actions">
          <div class="lang-dropdown" data-language-toggle>
            <button class="lang-button" type="button" data-language-trigger aria-haspopup="menu" aria-expanded="false">
              <span class="lang-flag" data-language-flag>🇻🇳</span>
              <span data-language-label>Tiếng Việt</span>
              <span class="lang-button-code" data-language-code>VI</span>
              <span class="lang-button-caret">▾</span>
            </button>
            <div class="lang-menu" data-language-menu role="menu" hidden>
              <button class="lang-option" type="button" data-language-option="vi" role="menuitemradio" aria-checked="true">
                <span class="lang-flag">🇻🇳</span>
                <span>Tiếng Việt</span>
                <small>Vietnamese</small>
              </button>
              <button class="lang-option" type="button" data-language-option="en" role="menuitemradio" aria-checked="false">
                <span class="lang-flag">🇺🇸</span>
                <span>English</span>
                <small>International</small>
              </button>
            </div>
          </div>
        </div>

        <nav class="site-nav" aria-label="Primary">
          ${navLink("/", activeNav === "home", { vi: "Trang chủ", en: "Home" })}
          ${navLink("/collections/", activeNav === "collections", { vi: "Collections", en: "Collections" })}
          ${navLink("/documents/", activeNav === "documents", { vi: "Documents", en: "Documents" })}
          ${navLink("/disclosures/", activeNav === "disclosures", { vi: "Disclosures", en: "Disclosures" })}
          ${navLink("/asset-registrations/", activeNav === "asset-registrations", { vi: "Assets", en: "Assets" })}
          ${navLink("/verify/", activeNav === "verify", { vi: "Verify", en: "Verify" })}
          ${navLink("/docs/", activeNav === "docs", { vi: "Docs", en: "Docs" })}
          <a href="https://home.iai.one" target="_blank" rel="noreferrer" class="nav-cta">
            <span data-lang="vi">home.iai.one</span>
            <span data-lang="en">home.iai.one</span>
          </a>
        </nav>
      </div>
    </header>

    <main>
      <section class="section page-hero">
        <div class="container">
          <div class="section-head">
            <div>
              <h1 class="page-title" id="route-page-title">${localizedHtml(title)}</h1>
              <p id="route-page-description">${localizedHtml(description)}</p>
            </div>
          </div>
          <div id="route-page-root"></div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div>
          <span data-lang="vi">NFT.IAI.ONE • trust layer production • app → flow → nft → issue</span>
          <span data-lang="en">NFT.IAI.ONE • production trust layer • app → flow → nft → issue</span>
        </div>
        <div class="footer-links">
          <a href="/">nft.iai.one</a>
          <a href="https://vc.vetuonglai.com" target="_blank" rel="noreferrer">vc.vetuonglai.com</a>
          <a href="https://home.iai.one" target="_blank" rel="noreferrer">home.iai.one</a>
          <a href="https://app.iai.one" target="_blank" rel="noreferrer">app.iai.one</a>
          <a href="https://flow.iai.one" target="_blank" rel="noreferrer">flow.iai.one</a>
        </div>
      </div>
    </footer>
  </div>
</body>
</html>`;
}

export function htmlResponse(input) {
  return new Response(input, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
