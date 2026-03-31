import { getCurrentLanguage } from "./site.js";

export function currentLanguage() {
  return getCurrentLanguage();
}

export function buildApiUrl(path, params = {}) {
  const url = new URL(path, window.location.origin);
  const language = currentLanguage();
  url.searchParams.set("lang", language);

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    url.searchParams.set(key, value);
  }

  return url;
}

export async function fetchJson(path, params = {}) {
  const response = await fetch(buildApiUrl(path, params));
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.ok === false) {
    throw new Error(data.error || data.message || `Request failed: ${response.status}`);
  }

  return data;
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function toneClass(tone) {
  return `tone-${tone || "planned"}`;
}

export function formatDate(value) {
  if (!value) return "-";
  const language = currentLanguage();
  return new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function text(vi, en) {
  return currentLanguage() === "vi" ? vi : en;
}

export function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

export function renderGateCards(gates = []) {
  return `
    <div class="gate-grid">
      ${gates.map((gate) => `
        <article class="gate-card ${gate.passed ? "is-pass" : "is-fail"}">
          <div class="registry-head">
            <div>
              <div class="card-kicker">${escapeHtml(gate.key)}</div>
              <h3>${escapeHtml(gate.title)}</h3>
            </div>
            <span class="status-chip ${toneClass(gate.tone)}">${escapeHtml(gate.passed ? text("Đạt", "Pass") : text("Thiếu", "Missing"))}</span>
          </div>
          <p class="card-subtle">${escapeHtml(gate.description)}</p>
          <ul class="gate-checks">
            ${(gate.checks || []).map((check) => `
              <li class="${check.passed ? "is-pass" : "is-fail"}">
                <span>${check.passed ? "✓" : "•"}</span>
                <span>${escapeHtml(check.label)}</span>
              </li>
            `).join("")}
          </ul>
        </article>
      `).join("")}
    </div>
  `;
}

export function renderAuditList(items = []) {
  if (items.length === 0) {
    return emptyState(text("Chưa có audit events.", "No audit events yet."));
  }

  return `
    <div class="timeline-grid">
      ${items.map((item) => `
        <article class="timeline-card">
          <div class="card-kicker">${escapeHtml(item.action)}</div>
          <h3>${escapeHtml(item.summary || item.action)}</h3>
          <p class="card-subtle">${escapeHtml(item.note || "")}</p>
          <div class="meta-inline">
            <span>${escapeHtml(item.actor || "nft.iai.one")}</span>
            <span>${escapeHtml(formatDate(item.createdAt))}</span>
          </div>
        </article>
      `).join("")}
    </div>
  `;
}

export function renderKeyValue(items = []) {
  return `
    <div class="detail-grid">
      ${items.map((item) => `
        <article class="result-stat">
          <span>${escapeHtml(item.label)}</span>
          <strong>${item.valueHtml ?? escapeHtml(item.value ?? "-")}</strong>
        </article>
      `).join("")}
    </div>
  `;
}
