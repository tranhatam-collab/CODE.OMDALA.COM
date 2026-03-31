import {
  buildApiUrl,
  currentLanguage,
  emptyState,
  escapeHtml,
  fetchJson,
  formatDate,
  renderGateCards,
  text,
  toneClass,
} from "./trust-ui.js";

const state = {
  registry: {
    collections: [],
    assets: [],
    documents: [],
  },
  stats: null,
  health: null,
  approvals: [],
  tokens: [],
  assetRegistrations: [],
  query: "",
  collectionCategory: "all",
  assetDisclosureState: "all",
  studio: {
    loading: false,
    error: "",
    preview: null,
    approval: null,
    issue: null,
  },
  assetRegistration: {
    loading: false,
    error: "",
    result: null,
  },
};

function apiPost(path, payload) {
  return fetch(buildApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      lang: currentLanguage(),
    }),
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || data.message || `Request failed: ${response.status}`);
    }
    return data;
  });
}

function selectedCollection() {
  const select = document.getElementById("issuance-collection");
  return state.registry.collections.find((item) => item.slug === select?.value) || state.registry.collections[0] || null;
}

function setMetric(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = String(value ?? 0);
}

function flattenSearchValue(value) {
  if (Array.isArray(value)) return value.join(" ");
  if (value && typeof value === "object") return Object.values(value).map(flattenSearchValue).join(" ");
  return String(value ?? "");
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(item, keys) {
  const q = normalize(state.query);
  if (!q) return true;
  return normalize(keys.map((key) => flattenSearchValue(item[key])).join(" ")).includes(q);
}

function renderFilterButtons(container, options, activeValue, onSelect) {
  if (!container) return;

  container.innerHTML = options.map((option) => `
    <button type="button" class="filter-chip ${option.value === activeValue ? "is-active" : ""}" data-value="${option.value}">
      ${escapeHtml(option.label)}
    </button>
  `).join("");

  container.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => onSelect(button.dataset.value));
  });
}

function renderMetrics() {
  const stats = state.stats;
  setMetric("metric-collections", stats?.totals?.collections ?? state.registry.collections.length);
  setMetric("metric-documents", stats?.totals?.documents ?? state.registry.documents.length);
  setMetric("metric-disclosures", stats?.totals?.disclosures ?? state.registry.assets.length);
  setMetric("metric-ready", stats?.totals?.publicReadyItems ?? 0);
}

function renderLiveStatus() {
  const container = document.getElementById("live-status-grid");
  if (!container || !state.health || !state.stats) return;

  const liveMint = state.health.issuance?.liveMint || {};
  const approvalStats = state.stats.approvals || {};
  const tokenStats = state.stats.tokens || {};
  const assetStats = state.stats.assetRegistrations || {};

  container.innerHTML = `
    <article class="api-card">
      <div class="card-kicker">${escapeHtml(text("Mint writer", "Mint writer"))}</div>
      <h3>${escapeHtml(liveMint.configured ? text("Signer đã cấu hình", "Signer configured") : text("Signer chưa cấu hình", "Signer not configured"))}</h3>
      <p>${escapeHtml(liveMint.configured
        ? text("Worker có thể ký giao dịch live khi approval hợp lệ.", "The worker can sign live transactions when approval is valid.")
        : text("Issue live sẽ tiếp tục bị chặn cho đến khi signer + contract config hoàn tất.", "Live issuance stays blocked until signer + contract config is complete."))}</p>
    </article>
    <article class="api-card">
      <div class="card-kicker">${escapeHtml(text("Approvals", "Approvals"))}</div>
      <h3>${escapeHtml(String(approvalStats.total || 0))}</h3>
      <p>${escapeHtml(text(
        `${approvalStats.pending || 0} pending • ${approvalStats.approved || 0} approved • ${approvalStats.issued || 0} issued`,
        `${approvalStats.pending || 0} pending • ${approvalStats.approved || 0} approved • ${approvalStats.issued || 0} issued`,
      ))}</p>
    </article>
    <article class="api-card">
      <div class="card-kicker">${escapeHtml(text("Tokens", "Tokens"))}</div>
      <h3>${escapeHtml(String(tokenStats.total || 0))}</h3>
      <p>${escapeHtml(text(
        `${tokenStats.issued || 0} active • ${tokenStats.revoked || 0} revoked • ${tokenStats.superseded || 0} superseded`,
        `${tokenStats.issued || 0} active • ${tokenStats.revoked || 0} revoked • ${tokenStats.superseded || 0} superseded`,
      ))}</p>
    </article>
    <article class="api-card">
      <div class="card-kicker">${escapeHtml(text("5 gates", "5 gates"))}</div>
      <h3>${escapeHtml(`${state.stats.gates?.averageScore || 0}%`)}</h3>
      <p>${escapeHtml(text(
        `${state.stats.gates?.fullyValidatedCollections || 0} collection đạt đủ 5 gates.`,
        `${state.stats.gates?.fullyValidatedCollections || 0} collections satisfy all 5 gates.`,
      ))}</p>
    </article>
    <article class="api-card">
      <div class="card-kicker">${escapeHtml(text("Asset registrations", "Asset registrations"))}</div>
      <h3>${escapeHtml(String(assetStats.total || 0))}</h3>
      <p>${escapeHtml(text(
        `${assetStats.verified || 0} verified • ${assetStats.reviewing || 0} reviewing`,
        `${assetStats.verified || 0} verified • ${assetStats.reviewing || 0} reviewing`,
      ))}</p>
    </article>
  `;
}

function renderCollections() {
  const container = document.getElementById("collection-registry");
  if (!container) return;

  const filtered = state.registry.collections.filter((item) => {
    if (state.collectionCategory !== "all" && item.category !== state.collectionCategory) return false;
    return matchesQuery(item, ["name", "description", "anchor", "ownerEntity", "issuerEntity", "tags", "network"]);
  });

  if (filtered.length === 0) {
    container.innerHTML = emptyState(text("Không có collection phù hợp.", "No matching collections."));
    return;
  }

  container.innerHTML = filtered.map((item) => `
    <article class="registry-card">
      <div class="registry-head">
        <div>
          <div class="card-kicker">${escapeHtml(item.categoryLabel)}</div>
          <h3>${escapeHtml(item.name)}</h3>
        </div>
        <span class="status-chip ${toneClass(item.tone)}">${escapeHtml(item.releaseStateLabel || item.statusLabel)}</span>
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
        <a class="btn btn-secondary" href="${item.detailPath}">${escapeHtml(text("Mở chi tiết", "Open detail"))}</a>
        <a class="btn" href="${item.docPath}">${escapeHtml(text("Mở tài liệu", "Open doc"))}</a>
      </div>
    </article>
  `).join("");
}

function renderAssets() {
  const container = document.getElementById("asset-registry");
  if (!container) return;

  const filtered = state.registry.assets.filter((item) => {
    if (state.assetDisclosureState !== "all" && item.disclosureState !== state.assetDisclosureState) return false;
    return matchesQuery(item, ["name", "assetType", "network", "boundary", "notes", "contentHash"]);
  });

  if (filtered.length === 0) {
    container.innerHTML = emptyState(text("Không có disclosure phù hợp.", "No matching disclosures."));
    return;
  }

  container.innerHTML = filtered.map((item) => `
    <article class="registry-card">
      <div class="registry-head">
        <div>
          <div class="card-kicker">${escapeHtml(item.assetType)}</div>
          <h3>${escapeHtml(item.name)}</h3>
        </div>
        <span class="status-chip ${toneClass(item.tone)}">${escapeHtml(item.releaseStateLabel || item.disclosureLabel)}</span>
      </div>
      <p class="card-subtle">${escapeHtml(item.boundary || item.notes)}</p>
      <div class="registry-meta">
        <div>
          <span>${escapeHtml(text("Network", "Network"))}</span>
          <strong>${escapeHtml(item.network)}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Stale", "Stale"))}</span>
          <strong>${escapeHtml(item.stale ? text("Có", "Yes") : text("Không", "No"))}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Updated", "Updated"))}</span>
          <strong>${escapeHtml(formatDate(item.updatedAt))}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Collection", "Collection"))}</span>
          <strong>${escapeHtml(item.collectionSlug || "-")}</strong>
        </div>
      </div>
      <div class="registry-actions">
        <a class="btn btn-secondary" href="${item.detailPath}">${escapeHtml(text("Mở disclosure", "Open disclosure"))}</a>
        <a class="btn" href="${item.proofUrl}" target="_blank" rel="noreferrer">${escapeHtml(text("Mở proof", "Open proof"))}</a>
      </div>
    </article>
  `).join("");
}

function renderDocuments() {
  const container = document.getElementById("document-registry");
  if (!container) return;

  const filtered = state.registry.documents.filter((item) =>
    matchesQuery(item, ["title", "summary", "boundary", "ownerEntity", "sections"])
  );

  if (filtered.length === 0) {
    container.innerHTML = emptyState(text("Không có tài liệu phù hợp.", "No matching documents."));
    return;
  }

  container.innerHTML = filtered.map((item) => `
    <article class="registry-card">
      <div class="registry-head">
        <div>
          <div class="card-kicker">${escapeHtml(item.audience)}</div>
          <h3>${escapeHtml(item.title)}</h3>
        </div>
        <span class="status-chip ${toneClass(item.tone)}">${escapeHtml(item.releaseStateLabel || item.statusLabel)}</span>
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
        <a class="btn btn-secondary" href="/documents/${item.slug}">${escapeHtml(text("Mở chi tiết", "Open detail"))}</a>
        <a class="btn" href="${item.path}">${escapeHtml(text("Mở tài liệu gốc", "Open source"))}</a>
      </div>
    </article>
  `).join("");
}

function renderRecentAssetRegistrations() {
  const container = document.getElementById("asset-registration-registry");
  if (!container) return;

  const items = state.assetRegistrations.slice(0, 6);
  if (items.length === 0) {
    container.innerHTML = emptyState(text("Chưa có asset registrations nào.", "No asset registrations yet."));
    return;
  }

  container.innerHTML = items.map((item) => `
    <article class="registry-card">
      <div class="registry-head">
        <div>
          <div class="card-kicker">${escapeHtml(item.assetType)}</div>
          <h3>${escapeHtml(item.assetName)}</h3>
        </div>
        <span class="status-chip ${toneClass(item.status === "verified" ? "live" : "warning")}">${escapeHtml(item.status)}</span>
      </div>
      <p class="card-subtle">${escapeHtml(item.summary || item.scope || "")}</p>
      <div class="registry-meta">
        <div>
          <span>${escapeHtml(text("VC code", "VC code"))}</span>
          <strong>${escapeHtml(item.vcBridge?.code || "-")}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Wallet", "Wallet"))}</span>
          <strong>${escapeHtml(item.walletAddress)}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Checked", "Checked"))}</span>
          <strong>${escapeHtml(formatDate(item.verification?.checkedAt))}</strong>
        </div>
        <div>
          <span>${escapeHtml(text("Mode", "Mode"))}</span>
          <strong>${escapeHtml(item.verification?.mode || "-")}</strong>
        </div>
      </div>
      <div class="registry-actions">
        <a class="btn btn-secondary" href="${item.detailPath}">${escapeHtml(text("Mở bản ghi", "Open record"))}</a>
        <a class="btn" href="${item.vcBridge?.independentUrl}" target="_blank" rel="noreferrer">${escapeHtml(text("Mở VC mirror", "Open VC mirror"))}</a>
      </div>
    </article>
  `).join("");
}

function renderFilters() {
  renderFilterButtons(
    document.getElementById("collection-filters"),
    [
      { value: "all", label: text("Tất cả collection", "All collections") },
      ...Array.from(new Map(
        state.registry.collections.map((item) => [item.category, item.categoryLabel]),
      ), ([value, label]) => ({ value, label })),
    ],
    state.collectionCategory,
    (value) => {
      state.collectionCategory = value;
      renderCollections();
    },
  );

  renderFilterButtons(
    document.getElementById("asset-filters"),
    [
      { value: "all", label: text("Mọi disclosure states", "All disclosure states") },
      ...Array.from(new Map(
        state.registry.assets.map((item) => [item.disclosureState, item.disclosureLabel]),
      ), ([value, label]) => ({ value, label })),
    ],
    state.assetDisclosureState,
    (value) => {
      state.assetDisclosureState = value;
      renderAssets();
    },
  );
}

function bindSearch() {
  const input = document.getElementById("registry-search");
  if (!input) return;

  input.placeholder = text("Tìm collection, document, disclosure, owner, hash...", "Search collections, documents, disclosures, owners, or hashes...");
  input.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderCollections();
    renderAssets();
    renderDocuments();
  });
}

function renderStudioSelect() {
  const select = document.getElementById("issuance-collection");
  if (!select) return;
  const existing = select.value;

  select.innerHTML = state.registry.collections.map((item) => `
    <option value="${item.slug}">${escapeHtml(item.name)}</option>
  `).join("");

  const queryCollection = new URL(window.location.href).searchParams.get("collection");
  select.value = existing || queryCollection || state.registry.collections[0]?.slug || "";
}

function renderStudioCollectionContext() {
  const container = document.getElementById("studio-collection-context");
  const collection = selectedCollection();
  if (!container || !collection) return;

  container.innerHTML = `
    <div class="registry-head">
      <div>
        <div class="card-kicker">${escapeHtml(collection.categoryLabel)}</div>
        <h3>${escapeHtml(collection.name)}</h3>
      </div>
      <span class="status-chip ${toneClass(collection.tone)}">${escapeHtml(collection.releaseStateLabel || collection.statusLabel)}</span>
    </div>
    <p class="card-subtle">${escapeHtml(collection.description)}</p>
    <div class="registry-meta">
      <div>
        <span>${escapeHtml(text("5-gate score", "5-gate score"))}</span>
        <strong>${escapeHtml(`${collection.gateSummary?.score || 0}%`)}</strong>
      </div>
      <div>
        <span>${escapeHtml(text("Owner", "Owner"))}</span>
        <strong>${escapeHtml(collection.ownerEntity)}</strong>
      </div>
      <div>
        <span>${escapeHtml(text("Issuer", "Issuer"))}</span>
        <strong>${escapeHtml(collection.issuerEntity)}</strong>
      </div>
      <div>
        <span>${escapeHtml(text("Window", "Window"))}</span>
        <strong>${escapeHtml(collection.issuanceWindow)}</strong>
      </div>
    </div>
  `;
}

function currentFormPayload() {
  const form = document.getElementById("issuance-form");
  if (!form) return {};
  return Object.fromEntries(new FormData(form).entries());
}

function currentAssetRegistrationPayload() {
  const form = document.getElementById("asset-registration-form");
  if (!form) return {};
  return Object.fromEntries(new FormData(form).entries());
}

function bindStudioActions(container) {
  container.querySelectorAll("[data-studio-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const action = button.getAttribute("data-studio-action");
      state.studio.loading = true;
      state.studio.error = "";
      renderStudioOutput();

      try {
        if (action === "request-approval") {
          const result = await apiPost("/api/approve-issuance", currentFormPayload());
          state.studio.approval = result.approval;
          state.studio.issue = null;
        }

        if (action === "approve-issuance" && state.studio.approval?.id) {
          const result = await apiPost("/api/approve-issuance", {
            approvalId: state.studio.approval.id,
            decision: "approve",
            actor: "IAI Operations",
            note: text("Approval operator từ Mint Studio V2.", "Approval operator action from Mint Studio V2."),
          });
          state.studio.approval = result.approval;
        }

        if (action === "issue-token" && state.studio.approval?.id) {
          const result = await apiPost("/api/issue", {
            approvalId: state.studio.approval.id,
            actor: "IAI Mint Worker",
            note: text("Issue từ Mint Studio V2.", "Issued from Mint Studio V2."),
          });
          state.studio.issue = result;
          if (result.approval) state.studio.approval = result.approval;
        }

        await refreshLiveState();
      } catch (error) {
        state.studio.error = error instanceof Error ? error.message : String(error);
      } finally {
        state.studio.loading = false;
        renderStudioOutput();
      }
    });
  });
}

function renderStudioOutput() {
  const container = document.getElementById("issuance-output");
  if (!container) return;

  if (state.studio.loading) {
    container.innerHTML = `<div class="output-empty">${escapeHtml(text("Đang xử lý issuance flow...", "Processing issuance flow..."))}</div>`;
    return;
  }

  if (state.studio.error) {
    container.innerHTML = `<div class="output-error">${escapeHtml(state.studio.error)}</div>`;
    return;
  }

  if (!state.studio.preview) {
    container.innerHTML = `<div class="output-empty">${escapeHtml(text("Tạo preview để xem 5 gates, metadata URL, approval path và issue readiness.", "Generate a preview to inspect the 5 gates, metadata URL, approval path, and issue readiness."))}</div>`;
    return;
  }

  const preview = state.studio.preview;
  const approval = state.studio.approval;
  const issued = state.studio.issue;
  const isMintConfigured = Boolean(state.health?.issuance?.liveMint?.configured);

  container.innerHTML = `
    <div class="output-topline">
      <div class="status-chip ${preview.mintReady ? "tone-live" : "tone-warning"}">${escapeHtml(preview.mintReady ? text("Preview sẵn sàng", "Preview ready") : text("Preview chưa đủ điều kiện", "Preview blocked"))}</div>
      <span class="output-version">${escapeHtml(`API ${state.health?.version || "2.0.0"}`)}</span>
    </div>

    <div class="result-grid">
      <article class="result-stat">
        <span>${escapeHtml(text("Token ID", "Token ID"))}</span>
        <strong>${escapeHtml(preview.tokenId)}</strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("Metadata URL", "Metadata URL"))}</span>
        <strong class="break-all"><a href="${preview.metadataUrl}" target="_blank" rel="noreferrer">${escapeHtml(preview.metadataUrl)}</a></strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("Approval", "Approval"))}</span>
        <strong>${escapeHtml(approval?.status || text("Chưa tạo", "Not created"))}</strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("Live mint", "Live mint"))}</span>
        <strong>${escapeHtml(isMintConfigured ? text("Đã cấu hình", "Configured") : text("Chưa cấu hình", "Not configured"))}</strong>
      </article>
    </div>

    <div class="warning-block">
      <h3>${escapeHtml(text("5-gate validation", "5-gate validation"))}</h3>
      ${renderGateCards(preview.gates || [])}
    </div>

    ${(preview.warnings || []).length > 0 ? `
      <div class="warning-block">
        <h3>${escapeHtml(text("Điểm đang chặn flow", "Current blockers"))}</h3>
        <ul>
          ${(preview.warnings || []).map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    ${approval ? `
      <div class="context-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(text("Approval flow", "Approval flow"))}</div>
            <h3>${escapeHtml(approval.id)}</h3>
          </div>
          <span class="status-chip ${toneClass(approval.status === "approved" || approval.status === "issued" ? "live" : "pilot")}">${escapeHtml(approval.status)}</span>
        </div>
        <p class="card-subtle">${escapeHtml(approval.reviewNote || preview.mintPlan?.nextStep || "")}</p>
      </div>
    ` : ""}

    ${issued?.token ? `
      <div class="context-panel">
        <div class="registry-head">
          <div>
            <div class="card-kicker">${escapeHtml(text("Issued token", "Issued token"))}</div>
            <h3>${escapeHtml(issued.token.tokenId)}</h3>
          </div>
          <span class="status-chip tone-live">${escapeHtml(issued.token.verifyStatus)}</span>
        </div>
        <p class="card-subtle">${escapeHtml(text("Token đã được ghi vào provenance log và verify center.", "The token has been written into the provenance log and verify center."))}</p>
        <div class="registry-actions">
          <a class="btn btn-secondary" href="/token/${issued.token.collectionSlug}/${issued.token.tokenId}">${escapeHtml(text("Mở token explorer", "Open token explorer"))}</a>
          <a class="btn" href="${issued.token.metadataUrl}" target="_blank" rel="noreferrer">${escapeHtml(text("Mở metadata", "Open metadata"))}</a>
        </div>
      </div>
    ` : ""}

    <div class="form-actions">
      <button class="btn btn-primary" type="button" data-studio-action="request-approval"${preview.mintReady ? "" : " disabled"}>${escapeHtml(text("Tạo approval request", "Create approval request"))}</button>
      <button class="btn" type="button" data-studio-action="approve-issuance"${approval?.status === "pending_approval" ? "" : " disabled"}>${escapeHtml(text("Approve", "Approve"))}</button>
      <button class="btn btn-secondary" type="button" data-studio-action="issue-token"${approval?.status === "approved" && isMintConfigured ? "" : " disabled"}>${escapeHtml(text("Issue live", "Issue live"))}</button>
    </div>
  `;

  bindStudioActions(container);
}

async function submitStudioForm(event) {
  event.preventDefault();
  state.studio.loading = true;
  state.studio.error = "";
  state.studio.preview = null;
  state.studio.approval = null;
  state.studio.issue = null;
  renderStudioOutput();

  try {
    const result = await apiPost("/api/issuance-preview", currentFormPayload());
    state.studio.preview = result;
  } catch (error) {
    state.studio.error = error instanceof Error ? error.message : String(error);
  } finally {
    state.studio.loading = false;
    renderStudioOutput();
  }
}

function bindStudio() {
  const form = document.getElementById("issuance-form");
  const select = document.getElementById("issuance-collection");
  if (!form || !select) return;

  renderStudioSelect();
  renderStudioCollectionContext();
  renderStudioOutput();

  select.addEventListener("change", () => {
    renderStudioCollectionContext();
  });

  form.addEventListener("submit", submitStudioForm);
  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      state.studio.preview = null;
      state.studio.approval = null;
      state.studio.issue = null;
      renderStudioSelect();
      renderStudioCollectionContext();
      renderStudioOutput();
    }, 0);
  });
}

function renderAssetRegistrationOutput() {
  const container = document.getElementById("asset-registration-output");
  if (!container) return;

  if (state.assetRegistration.loading) {
    container.innerHTML = `<div class="output-empty">${escapeHtml(text("Đang kiểm tra ownership và tạo VC mirror...", "Checking ownership and preparing the VC mirror..."))}</div>`;
    return;
  }

  if (state.assetRegistration.error) {
    container.innerHTML = `<div class="output-error">${escapeHtml(state.assetRegistration.error)}</div>`;
    return;
  }

  const result = state.assetRegistration.result;
  if (!result?.registration) {
    container.innerHTML = `<div class="output-empty">${escapeHtml(text("Đăng ký một tài sản để nhận kết quả auto-check, registry URL và mã mirror cho VC.", "Register an asset to receive the auto-check result, registry URL, and a VC mirror code."))}</div>`;
    return;
  }

  const item = result.registration;
  container.innerHTML = `
    <div class="output-topline">
      <div class="status-chip ${item.status === "verified" ? "tone-live" : "tone-warning"}">${escapeHtml(item.status === "verified" ? text("Đã auto-verify", "Auto-verified") : text("Đang reviewing", "Reviewing"))}</div>
      <span class="output-version">${escapeHtml(item.vcBridge?.code || "")}</span>
    </div>

    <div class="result-grid">
      <article class="result-stat">
        <span>${escapeHtml(text("Registration ID", "Registration ID"))}</span>
        <strong>${escapeHtml(item.id)}</strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("VC mirror", "VC mirror"))}</span>
        <strong class="break-all"><a href="${item.vcBridge?.independentUrl}" target="_blank" rel="noreferrer">${escapeHtml(item.vcBridge?.independentUrl || "-")}</a></strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("Registry URL", "Registry URL"))}</span>
        <strong class="break-all"><a href="${item.registryUrl}">${escapeHtml(item.registryUrl)}</a></strong>
      </article>
      <article class="result-stat">
        <span>${escapeHtml(text("Verification mode", "Verification mode"))}</span>
        <strong>${escapeHtml(item.verification?.mode || "-")}</strong>
      </article>
    </div>

    <div class="context-panel">
      <div class="registry-head">
        <div>
          <div class="card-kicker">${escapeHtml(text("Auto-check note", "Auto-check note"))}</div>
          <h3>${escapeHtml(item.assetName)}</h3>
        </div>
        <span class="status-chip ${toneClass(item.status === "verified" ? "live" : "warning")}">${escapeHtml(item.vcBridge?.mirrorState || item.status)}</span>
      </div>
      <p class="card-subtle">${escapeHtml(item.verification?.note || "")}</p>
    </div>

    <div class="registry-actions">
      <a class="btn btn-secondary" href="${item.detailPath}">${escapeHtml(text("Mở bản ghi chi tiết", "Open record detail"))}</a>
      <a class="btn" href="${item.vcBridge?.independentUrl}" target="_blank" rel="noreferrer">${escapeHtml(text("Mở VC mirror", "Open VC mirror"))}</a>
    </div>
  `;
}

async function submitAssetRegistrationForm(event) {
  event.preventDefault();
  state.assetRegistration.loading = true;
  state.assetRegistration.error = "";
  state.assetRegistration.result = null;
  renderAssetRegistrationOutput();

  try {
    const result = await apiPost("/api/asset-registrations", currentAssetRegistrationPayload());
    state.assetRegistration.result = result;
    await refreshLiveState();
    renderRecentAssetRegistrations();
  } catch (error) {
    state.assetRegistration.error = error instanceof Error ? error.message : String(error);
  } finally {
    state.assetRegistration.loading = false;
    renderAssetRegistrationOutput();
  }
}

function bindAssetRegistration() {
  const form = document.getElementById("asset-registration-form");
  if (!form) return;

  renderAssetRegistrationOutput();
  form.addEventListener("submit", submitAssetRegistrationForm);
  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      state.assetRegistration.error = "";
      state.assetRegistration.result = null;
      renderAssetRegistrationOutput();
    }, 0);
  });
}

async function refreshLiveState() {
  const [registry, stats, health, approvals, tokens, assetRegistrations] = await Promise.all([
    fetchJson("/api/registry"),
    fetchJson("/api/stats"),
    fetchJson("/api/health"),
    fetchJson("/api/approvals"),
    fetchJson("/api/tokens"),
    fetchJson("/api/asset-registrations"),
  ]);

  state.registry = {
    collections: registry.collections || [],
    assets: registry.assets || [],
    documents: registry.documents || [],
  };
  state.stats = stats;
  state.health = health;
  state.approvals = approvals.approvals || [];
  state.tokens = tokens.tokens || [];
  state.assetRegistrations = assetRegistrations.registrations || [];
}

function renderAll() {
  renderMetrics();
  renderLiveStatus();
  renderFilters();
  renderCollections();
  renderAssets();
  renderDocuments();
  renderRecentAssetRegistrations();
  renderStudioSelect();
  renderStudioCollectionContext();
  renderStudioOutput();
  renderAssetRegistrationOutput();
}

async function init() {
  bindSearch();
  bindStudio();
  bindAssetRegistration();

  try {
    await refreshLiveState();
    renderAll();
  } catch (error) {
    const liveStatus = document.getElementById("live-status-grid");
    if (liveStatus) {
      liveStatus.innerHTML = `<div class="output-error">${escapeHtml(error instanceof Error ? error.message : String(error))}</div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("iai:language-change", async () => {
  try {
    await refreshLiveState();
    renderAll();
  } catch (error) {
    console.error(error);
  }
});
