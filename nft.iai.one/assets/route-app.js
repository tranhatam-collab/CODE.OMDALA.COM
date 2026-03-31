import {
  buildApiUrl,
  currentLanguage,
  emptyState,
  escapeHtml,
  fetchJson,
  formatDate,
  renderAuditList,
  renderGateCards,
  renderKeyValue,
  text,
  toneClass,
} from "./trust-ui.js";

const root = document.getElementById("route-page-root");
const titleNode = document.getElementById("route-page-title");
const descriptionNode = document.getElementById("route-page-description");

function pageType() {
  return document.body.dataset.trustPage;
}

function setPageCopy(titleVi, titleEn, descVi, descEn) {
  if (titleNode) {
    titleNode.innerHTML = `<span data-lang="vi">${escapeHtml(titleVi)}</span><span data-lang="en">${escapeHtml(titleEn)}</span>`;
  }

  if (descriptionNode) {
    descriptionNode.innerHTML = `<span data-lang="vi">${escapeHtml(descVi)}</span><span data-lang="en">${escapeHtml(descEn)}</span>`;
  }
}

function statusChip(label, tone) {
  return `<span class="status-chip ${toneClass(tone)}">${escapeHtml(label)}</span>`;
}

function actionLink(href, label, secondary = false) {
  return `<a class="btn ${secondary ? "btn-secondary" : ""}" href="${href}">${escapeHtml(label)}</a>`;
}

function renderError(error) {
  if (!root) return;
  root.innerHTML = `<div class="output-error">${escapeHtml(error instanceof Error ? error.message : String(error))}</div>`;
}

function renderCollectionsIndex(data) {
  setPageCopy(
    "Collection Registry",
    "Collection Registry",
    "5 collection hiện có với gate score, disclosure state, related docs và liên kết vào explorer/verify.",
    "The current 5 collections with gate scores, disclosure states, related docs, and explorer/verify links.",
  );

  const items = data.collections || [];
  if (items.length === 0) {
    root.innerHTML = emptyState(text("Chưa có collection nào.", "No collections found."));
    return;
  }

  root.innerHTML = `
    <div class="collection-grid">
      ${items.map((item) => `
        <article class="registry-card">
          <div class="registry-head">
            <div>
              <div class="card-kicker">${escapeHtml(item.categoryLabel)}</div>
              <h3>${escapeHtml(item.name)}</h3>
            </div>
            ${statusChip(item.releaseStateLabel || item.statusLabel, item.tone)}
          </div>
          <p class="card-subtle">${escapeHtml(item.description)}</p>
          <div class="registry-meta">
            <div>
              <span>${escapeHtml(text("Gate score", "Gate score"))}</span>
              <strong>${escapeHtml(`${item.gateSummary?.score || 0}%`)}</strong>
            </div>
            <div>
              <span>${escapeHtml(text("Mạng", "Network"))}</span>
              <strong>${escapeHtml(item.network)}</strong>
            </div>
            <div>
              <span>${escapeHtml(text("Owner", "Owner"))}</span>
              <strong>${escapeHtml(item.ownerEntity)}</strong>
            </div>
            <div>
              <span>${escapeHtml(text("Issuer", "Issuer"))}</span>
              <strong>${escapeHtml(item.issuerEntity)}</strong>
            </div>
          </div>
          <div class="registry-tags">
            ${(item.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          <div class="registry-actions">
            ${actionLink(item.detailPath, text("Mở chi tiết", "Open detail"))}
            ${actionLink(`${item.detailPath}#studio`, text("Đi tới issue flow", "Go to issue flow"), true)}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

async function loadCollectionsIndex() {
  const data = await fetchJson("/api/collections");
  renderCollectionsIndex(data);
}

async function loadCollectionDetail() {
  const slug = document.body.dataset.slug;
  const [detail, tokens] = await Promise.all([
    fetchJson("/api/collections", { slug }),
    fetchJson("/api/tokens", { collection: slug }),
  ]);

  const item = detail.collection;
  setPageCopy(
    item.name,
    item.name,
    item.description,
    item.description,
  );

  root.innerHTML = `
    <div class="page-stack">
      <section class="card page-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(item.categoryLabel)}</div>
            <h2>${escapeHtml(item.name)}</h2>
          </div>
          ${statusChip(item.releaseStateLabel || item.statusLabel, item.tone)}
        </div>
        <p class="lead">${escapeHtml(item.description)}</p>
        ${renderKeyValue([
          { label: text("Network", "Network"), value: item.network },
          { label: text("Token standard", "Token standard"), value: item.tokenStandard },
          { label: text("Owner entity", "Owner entity"), value: item.ownerEntity },
          { label: text("Issuer entity", "Issuer entity"), value: item.issuerEntity },
          { label: text("Audience", "Audience"), value: item.audience },
          { label: text("Issuance window", "Issuance window"), value: item.issuanceWindow },
        ])}
        <div class="registry-actions">
          ${actionLink(`/?collection=${item.slug}#studio`, text("Mở Mint Studio V2", "Open Mint Studio V2"))}
          ${actionLink(item.docPath, text("Mở tài liệu gốc", "Open source document"), true)}
        </div>
      </section>

      <section class="card page-panel">
        <div class="section-head compact">
          <div>
            <h2>${escapeHtml(text("5 Mint Gates", "5 Mint Gates"))}</h2>
            <p>${escapeHtml(text("Collection phải giữ đúng 5 gates trước khi approval hoặc issue có thể đi tiếp.", "The collection must satisfy all 5 gates before approval or issuance can proceed."))}</p>
          </div>
        </div>
        ${renderGateCards(item.gates || [])}
      </section>

      <section class="card page-panel">
        <div class="section-head compact">
          <div>
            <h2>${escapeHtml(text("Related surfaces", "Related surfaces"))}</h2>
            <p>${escapeHtml(text("Tài liệu, disclosures và token records liên quan tới collection này.", "Documents, disclosures, and token records related to this collection."))}</p>
          </div>
        </div>
        <div class="info-split">
          <div>
            <h3>${escapeHtml(text("Documents", "Documents"))}</h3>
            <div class="mini-list">
              ${(item.relatedDocuments || []).map((doc) => `
                <a class="mini-card" href="/documents/${doc.slug}">
                  <strong>${escapeHtml(doc.title)}</strong>
                  <span>${escapeHtml(doc.releaseStateLabel || doc.statusLabel)}</span>
                </a>
              `).join("") || emptyState(text("Chưa có tài liệu liên quan.", "No related documents."))}
            </div>
          </div>
          <div>
            <h3>${escapeHtml(text("Issued tokens", "Issued tokens"))}</h3>
            <div class="mini-list">
              ${(tokens.tokens || []).map((token) => `
                <a class="mini-card" href="/token/${token.collectionSlug}/${token.tokenId}">
                  <strong>${escapeHtml(token.tokenId)}</strong>
                  <span>${escapeHtml(token.verifyStatus)}</span>
                </a>
              `).join("") || emptyState(text("Chưa có token nào được issue.", "No tokens have been issued yet."))}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

async function loadDocumentsIndex() {
  const data = await fetchJson("/api/documents");
  const items = data.documents || [];
  root.innerHTML = items.length === 0
    ? emptyState(text("Chưa có tài liệu.", "No documents found."))
    : `
      <div class="document-grid">
        ${items.map((item) => `
          <article class="registry-card">
            <div class="registry-head">
              <div>
                <div class="card-kicker">${escapeHtml(item.audience)}</div>
                <h3>${escapeHtml(item.title)}</h3>
              </div>
              ${statusChip(item.releaseStateLabel || item.statusLabel, item.tone)}
            </div>
            <p class="card-subtle">${escapeHtml(item.summary)}</p>
            <div class="registry-meta">
              <div>
                <span>${escapeHtml(text("Owner", "Owner"))}</span>
                <strong>${escapeHtml(item.ownerEntity)}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Updated", "Updated"))}</span>
                <strong>${escapeHtml(formatDate(item.updatedAt))}</strong>
              </div>
            </div>
            <div class="registry-actions">
              ${actionLink(`/documents/${item.slug}`, text("Mở chi tiết", "Open detail"))}
              ${actionLink(item.path, text("Mở tài liệu gốc", "Open source"), true)}
            </div>
          </article>
        `).join("")}
      </div>
    `;
}

async function loadDocumentDetail() {
  const slug = document.body.dataset.slug;
  const data = await fetchJson("/api/documents", { slug });
  const item = data.document;

  setPageCopy(item.title, item.title, item.summary, item.summary);

  root.innerHTML = `
    <div class="page-stack">
      <section class="card page-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(item.releaseStateLabel || item.statusLabel)}</div>
            <h2>${escapeHtml(item.title)}</h2>
          </div>
          ${statusChip(item.releaseStateLabel || item.statusLabel, item.tone)}
        </div>
        <p class="lead">${escapeHtml(item.boundary || item.summary)}</p>
        ${renderKeyValue([
          { label: text("Owner entity", "Owner entity"), value: item.ownerEntity },
          { label: text("Proof URL", "Proof URL"), valueHtml: `<a href="${item.proofUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.proofUrl)}</a>` },
          { label: text("Content hash", "Content hash"), value: item.contentHash },
          { label: text("Updated", "Updated"), value: formatDate(item.updatedAt) },
        ])}
      </section>

      <section class="card page-panel">
        <h2>${escapeHtml(text("Covered sections", "Covered sections"))}</h2>
        <div class="registry-tags">
          ${(item.sections || []).map((section) => `<span class="tag">${escapeHtml(section)}</span>`).join("")}
        </div>
      </section>

      <section class="card page-panel">
        <div class="info-split">
          <div>
            <h3>${escapeHtml(text("Related collections", "Related collections"))}</h3>
            <div class="mini-list">
              ${(item.relatedCollections || []).map((collection) => `
                <a class="mini-card" href="${collection.detailPath}">
                  <strong>${escapeHtml(collection.name)}</strong>
                  <span>${escapeHtml(collection.releaseStateLabel || collection.statusLabel)}</span>
                </a>
              `).join("") || emptyState(text("Chưa có collection liên quan.", "No related collections."))}
            </div>
          </div>
          <div>
            <h3>${escapeHtml(text("Related disclosures", "Related disclosures"))}</h3>
            <div class="mini-list">
              ${(item.relatedDisclosures || []).map((disclosure) => `
                <a class="mini-card" href="${disclosure.detailPath}">
                  <strong>${escapeHtml(disclosure.name)}</strong>
                  <span>${escapeHtml(disclosure.releaseStateLabel || disclosure.disclosureLabel)}</span>
                </a>
              `).join("") || emptyState(text("Chưa có disclosure liên quan.", "No related disclosures."))}
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

async function loadDisclosuresIndex() {
  const data = await fetchJson("/api/disclosures");
  const items = data.disclosures || [];
  root.innerHTML = items.length === 0
    ? emptyState(text("Chưa có disclosures.", "No disclosures found."))
    : `
      <div class="asset-grid">
        ${items.map((item) => `
          <article class="registry-card">
            <div class="registry-head">
              <div>
                <div class="card-kicker">${escapeHtml(item.assetType)}</div>
                <h3>${escapeHtml(item.name)}</h3>
              </div>
              ${statusChip(item.releaseStateLabel || item.disclosureLabel, item.tone)}
            </div>
            <p class="card-subtle">${escapeHtml(item.boundary || item.notes)}</p>
            <div class="registry-meta">
              <div>
                <span>${escapeHtml(text("Network", "Network"))}</span>
                <strong>${escapeHtml(item.network)}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Updated", "Updated"))}</span>
                <strong>${escapeHtml(formatDate(item.updatedAt))}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Stale", "Stale"))}</span>
                <strong>${escapeHtml(item.stale ? text("Có", "Yes") : text("Không", "No"))}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Collection", "Collection"))}</span>
                <strong>${escapeHtml(item.collectionSlug || "-")}</strong>
              </div>
            </div>
            <div class="registry-actions">
              ${actionLink(item.detailPath, text("Mở chi tiết", "Open detail"))}
              ${actionLink(item.proofUrl, text("Mở proof", "Open proof"), true)}
            </div>
          </article>
        `).join("")}
      </div>
  `;
}

async function loadAssetRegistrationsIndex() {
  const data = await fetchJson("/api/asset-registrations");
  const items = data.registrations || [];

  setPageCopy(
    "Independent Asset Registry",
    "Independent Asset Registry",
    "Các bản ghi tài sản mã hóa đã được đăng ký, auto-check ownership và chuẩn bị mirror sang VC.",
    "Crypto-asset registrations that have been checked automatically and prepared for VC mirroring.",
  );

  root.innerHTML = items.length === 0
    ? emptyState(text("Chưa có asset registrations.", "No asset registrations found."))
    : `
      <div class="asset-grid">
        ${items.map((item) => `
          <article class="registry-card">
            <div class="registry-head">
              <div>
                <div class="card-kicker">${escapeHtml(item.assetType)}</div>
                <h3>${escapeHtml(item.assetName)}</h3>
              </div>
              ${statusChip(item.status, item.status === "verified" ? "live" : "warning")}
            </div>
            <p class="card-subtle">${escapeHtml(item.summary || item.scope || "")}</p>
            <div class="registry-meta">
              <div>
                <span>${escapeHtml(text("Network", "Network"))}</span>
                <strong>${escapeHtml(item.network)}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Owner", "Owner"))}</span>
                <strong>${escapeHtml(item.ownerEntity || item.registrantName)}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("VC code", "VC code"))}</span>
                <strong>${escapeHtml(item.vcBridge?.code || "-")}</strong>
              </div>
              <div>
                <span>${escapeHtml(text("Checked", "Checked"))}</span>
                <strong>${escapeHtml(formatDate(item.verification?.checkedAt))}</strong>
              </div>
            </div>
            <div class="registry-actions">
              ${actionLink(item.detailPath, text("Mở chi tiết", "Open detail"))}
              ${actionLink(item.vcBridge?.independentUrl, text("Mở VC mirror", "Open VC mirror"), true)}
            </div>
          </article>
        `).join("")}
      </div>
    `;
}

async function loadAssetRegistrationDetail() {
  const id = document.body.dataset.id;
  const data = await fetchJson("/api/asset-registrations", { id });
  const item = data.registration;

  setPageCopy(
    item.assetName,
    item.assetName,
    item.summary || item.scope || "",
    item.summary || item.scope || "",
  );

  root.innerHTML = `
    <div class="page-stack">
      <section class="card page-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(item.assetType)}</div>
            <h2>${escapeHtml(item.assetName)}</h2>
          </div>
          ${statusChip(item.status, item.status === "verified" ? "live" : "warning")}
        </div>
        <p class="lead">${escapeHtml(item.scope || item.summary || "")}</p>
        ${renderKeyValue([
          { label: text("Registration ID", "Registration ID"), value: item.id },
          { label: text("Owner entity", "Owner entity"), value: item.ownerEntity },
          { label: text("Registrant", "Registrant"), value: item.registrantName },
          { label: text("Network", "Network"), value: item.network },
          { label: text("Wallet", "Wallet"), value: item.walletAddress },
          { label: text("Contract", "Contract"), value: item.contractAddress || "-" },
          { label: text("Token ID", "Token ID"), value: item.tokenId || "-" },
          { label: text("Token standard", "Token standard"), value: item.tokenStandard || "-" },
          { label: text("Proof URL", "Proof URL"), valueHtml: `<a href="${item.proofUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.proofUrl)}</a>` },
          { label: text("Content hash", "Content hash"), value: item.contentHash },
          { label: text("VC mirror", "VC mirror"), valueHtml: `<a href="${item.vcBridge?.independentUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.vcBridge?.code || "-")}</a>` },
          { label: text("Checked at", "Checked at"), value: formatDate(item.verification?.checkedAt) },
        ])}
      </section>

      <section class="card page-panel">
        <div class="section-head compact">
          <div>
            <h2>${escapeHtml(text("Auto-check result", "Auto-check result"))}</h2>
            <p>${escapeHtml(item.verification?.note || text("Chưa có ghi chú kiểm tra.", "No verification note is available."))}</p>
          </div>
        </div>
        ${renderKeyValue([
          { label: text("Mode", "Mode"), value: item.verification?.mode || "-" },
          { label: text("Ownership checked", "Ownership checked"), value: item.verification?.ownershipChecked ? text("Có", "Yes") : text("Không", "No") },
          { label: text("Matched owner", "Matched owner"), value: item.verification?.matchedOwner ? text("Có", "Yes") : text("Không", "No") },
          { label: text("Resolved owner", "Resolved owner"), value: item.verification?.resolvedOwner || "-" },
          { label: text("Balance", "Balance"), value: item.verification?.balance || item.verification?.balanceNative || "-" },
          { label: text("RPC ready", "RPC ready"), value: item.verification?.rpcConfigured ? text("Có", "Yes") : text("Không", "No") },
        ])}
      </section>

      <section class="card page-panel">
        <div class="section-head compact">
          <div>
            <h2>${escapeHtml(text("Evidence bundle", "Evidence bundle"))}</h2>
            <p>${escapeHtml(text("Các trường tối thiểu được gửi vào trust layer khi đăng ký.", "The minimum bundle submitted to the trust layer during registration."))}</p>
          </div>
        </div>
        <div class="mini-list">
          ${(item.evidence || []).map((entry) => `<div class="mini-card"><strong>${escapeHtml(entry)}</strong></div>`).join("")}
        </div>
      </section>
    </div>
  `;
}

async function loadDisclosureDetail() {
  const id = document.body.dataset.id;
  const data = await fetchJson("/api/disclosures", { id });
  const item = data.disclosure;

  setPageCopy(item.name, item.name, item.boundary || item.notes, item.boundary || item.notes);

  root.innerHTML = `
    <div class="page-stack">
      <section class="card page-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(item.assetType)}</div>
            <h2>${escapeHtml(item.name)}</h2>
          </div>
          ${statusChip(item.releaseStateLabel || item.disclosureLabel, item.tone)}
        </div>
        <p class="lead">${escapeHtml(item.boundary || item.notes)}</p>
        ${renderKeyValue([
          { label: text("Network", "Network"), value: item.network },
          { label: text("Proof URL", "Proof URL"), valueHtml: `<a href="${item.proofUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.proofUrl)}</a>` },
          { label: text("Content hash", "Content hash"), value: item.contentHash },
          { label: text("Updated", "Updated"), value: formatDate(item.updatedAt) },
          { label: text("Stale after", "Stale after"), value: item.staleAfterDays ? `${item.staleAfterDays}d` : "-" },
          { label: text("Stale status", "Stale status"), value: item.stale ? text("Quá hạn", "Stale") : text("Còn mới", "Fresh") },
        ])}
      </section>

      <section class="card page-panel">
        <div class="info-split">
          <div>
            <h3>${escapeHtml(text("Disclosure boundary", "Disclosure boundary"))}</h3>
            <p class="card-subtle">${escapeHtml(item.disclosureWindow || "-")}</p>
          </div>
          <div>
            <h3>${escapeHtml(text("Related collection", "Related collection"))}</h3>
            ${item.collection
              ? `<a class="mini-card" href="${item.collection.detailPath}">
                  <strong>${escapeHtml(item.collection.name)}</strong>
                  <span>${escapeHtml(item.collection.releaseStateLabel || item.collection.statusLabel)}</span>
                </a>`
              : emptyState(text("Disclosure này chưa gắn collection cụ thể.", "This disclosure is not linked to a specific collection yet."))}
          </div>
        </div>
      </section>
    </div>
  `;
}

async function loadTokenDetail() {
  const collection = document.body.dataset.collection;
  const tokenId = document.body.dataset.tokenId;
  const data = await fetchJson("/api/tokens", {
    collection,
    token: tokenId,
  });
  const item = data.token;

  setPageCopy(
    `${item.collection?.name || item.collectionSlug} • ${item.tokenId}`,
    `${item.collection?.name || item.collectionSlug} • ${item.tokenId}`,
    item.title || item.collection?.description || "",
    item.title || item.collection?.description || "",
  );

  root.innerHTML = `
    <div class="page-stack">
      <section class="card page-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(item.collection?.categoryLabel || item.collectionSlug)}</div>
            <h2>${escapeHtml(item.tokenId)}</h2>
          </div>
          ${statusChip(item.verifyStatus, item.status === "issued" ? "live" : "warning")}
        </div>
        <p class="lead">${escapeHtml(item.title || item.collection?.description || "")}</p>
        ${renderKeyValue([
          { label: text("Collection", "Collection"), value: item.collection?.name || item.collectionSlug },
          { label: text("Wallet", "Wallet"), value: item.walletAddress },
          { label: text("Recipient", "Recipient"), value: item.recipientName },
          { label: text("Content hash", "Content hash"), value: item.contentHash },
          { label: text("Proof URL", "Proof URL"), valueHtml: `<a href="${item.proofUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.proofUrl)}</a>` },
          { label: text("Metadata URL", "Metadata URL"), valueHtml: `<a href="${item.metadataUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.metadataUrl)}</a>` },
          { label: text("Approval ID", "Approval ID"), value: item.approvalId },
          { label: text("Issued at", "Issued at"), value: formatDate(item.issuedAt) },
          { label: text("Transaction", "Transaction"), value: item.txHash || "-" },
        ])}
        <div class="registry-actions">
          ${actionLink(item.verifyUrl, text("Mở Verify", "Open verify"))}
          ${actionLink(item.metadataUrl, text("Mở Metadata", "Open metadata"), true)}
        </div>
      </section>

      <section class="card page-panel">
        <div class="section-head compact">
          <div>
            <h2>${escapeHtml(text("Public provenance log", "Public provenance log"))}</h2>
            <p>${escapeHtml(text("Audit trail công khai cho approval, issue, revoke hoặc supersede.", "The public audit trail for approval, issuance, revoke, or supersede events."))}</p>
          </div>
        </div>
        ${renderAuditList(data.audit || [])}
      </section>
    </div>
  `;
}

async function performVerifySearch(query) {
  return await fetchJson("/api/verify", { q: query });
}

function renderVerifyResults(result) {
  const items = result.results || [];
  if (items.length === 0) {
    return emptyState(text("Không tìm thấy kết quả phù hợp.", "No matching results found."));
  }

  return `
    <div class="document-grid">
      ${items.map((item) => `
        <article class="registry-card">
          <div class="registry-head">
            <div>
              <div class="card-kicker">${escapeHtml(item.type)}</div>
              <h3>${escapeHtml(item.title)}</h3>
            </div>
            ${statusChip(item.status, item.status === "verified" || item.status === "published" ? "live" : "warning")}
          </div>
          <p class="card-subtle">${escapeHtml(item.summary)}</p>
          <div class="registry-actions">
            ${actionLink(item.href, text("Mở bản ghi", "Open record"))}
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

async function loadVerifyIndex() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q") || "";

  root.innerHTML = `
    <section class="card page-panel">
      <form class="verify-form" id="verify-form">
        <label class="field field-full">
          <span class="field-label">${escapeHtml(text("Nhập token URL, metadata URL, approval ID, content hash, proof URL hoặc slug", "Enter a token URL, metadata URL, approval ID, content hash, proof URL, or slug"))}</span>
          <input class="search-input" name="q" type="search" value="${escapeHtml(query)}" />
        </label>
        <div class="form-actions">
          <button class="btn btn-primary" type="submit">${escapeHtml(text("Xác minh", "Verify"))}</button>
        </div>
      </form>
      <div id="verify-results">${query ? `<div class="output-empty">${escapeHtml(text("Đang xác minh...", "Verifying..."))}</div>` : emptyState(text("Nhập truy vấn để bắt đầu verify.", "Enter a query to start verification."))}</div>
    </section>
  `;

  const form = document.getElementById("verify-form");
  const resultsNode = document.getElementById("verify-results");

  async function run(nextQuery) {
    if (!resultsNode) return;
    resultsNode.innerHTML = `<div class="output-empty">${escapeHtml(text("Đang xác minh...", "Verifying..."))}</div>`;
    try {
      const result = await performVerifySearch(nextQuery);
      resultsNode.innerHTML = renderVerifyResults(result);
    } catch (error) {
      resultsNode.innerHTML = `<div class="output-error">${escapeHtml(error instanceof Error ? error.message : String(error))}</div>`;
    }
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nextQuery = new FormData(form).get("q")?.toString() || "";
    const nextUrl = new URL(window.location.href);
    if (nextQuery) nextUrl.searchParams.set("q", nextQuery);
    else nextUrl.searchParams.delete("q");
    window.history.replaceState({}, "", nextUrl);
    await run(nextQuery);
  });

  if (query) {
    await run(query);
  }
}

async function renderPage() {
  if (!root) return;

  try {
    switch (pageType()) {
      case "collections-index":
        await loadCollectionsIndex();
        break;
      case "collection-detail":
        await loadCollectionDetail();
        break;
      case "documents-index":
        await loadDocumentsIndex();
        break;
      case "document-detail":
        await loadDocumentDetail();
        break;
      case "disclosures-index":
        await loadDisclosuresIndex();
        break;
      case "asset-registrations-index":
        await loadAssetRegistrationsIndex();
        break;
      case "asset-registration-detail":
        await loadAssetRegistrationDetail();
        break;
      case "disclosure-detail":
        await loadDisclosureDetail();
        break;
      case "token-detail":
        await loadTokenDetail();
        break;
      case "verify-index":
        await loadVerifyIndex();
        break;
      default:
        root.innerHTML = emptyState(text("Route chưa được hỗ trợ.", "Unsupported route."));
        break;
    }
  } catch (error) {
    renderError(error);
  }
}

document.addEventListener("DOMContentLoaded", renderPage);
document.addEventListener("iai:language-change", () => {
  renderPage();
});
