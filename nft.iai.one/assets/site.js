const STORAGE_KEY = "nft.iai.one.language";
const FALLBACK_LANGUAGE = "vi";

const LANGUAGE_META = {
  vi: {
    code: "VI",
    flag: "🇻🇳",
    label: "Tiếng Việt",
  },
  en: {
    code: "EN",
    flag: "🇺🇸",
    label: "English",
  },
};

function normalizeLanguage(input) {
  return input === "en" ? "en" : FALLBACK_LANGUAGE;
}

function detectInitialLanguage() {
  const url = new URL(window.location.href);
  const fromQuery = url.searchParams.get("lang");
  if (fromQuery) return normalizeLanguage(fromQuery);

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return normalizeLanguage(stored);

  return FALLBACK_LANGUAGE;
}

function applyLocalizedAttributes(language) {
  const placeholderAttr = `data-placeholder-${language}`;
  const titleAttr = `data-title-${language}`;
  const ariaAttr = `data-aria-label-${language}`;

  document.querySelectorAll("[data-placeholder-vi], [data-placeholder-en]").forEach((element) => {
    const value = element.getAttribute(placeholderAttr);
    if (value) element.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-title-vi], [data-title-en]").forEach((element) => {
    const value = element.getAttribute(titleAttr);
    if (value) element.setAttribute("title", value);
  });

  document.querySelectorAll("[data-aria-label-vi], [data-aria-label-en]").forEach((element) => {
    const value = element.getAttribute(ariaAttr);
    if (value) element.setAttribute("aria-label", value);
  });
}

function updateLanguageControls(language) {
  const meta = LANGUAGE_META[language];
  document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
    const flag = toggle.querySelector("[data-language-flag]");
    const label = toggle.querySelector("[data-language-label]");
    const code = toggle.querySelector("[data-language-code]");
    const menu = toggle.querySelector("[data-language-menu]");
    const trigger = toggle.querySelector("[data-language-trigger]");

    if (flag) flag.textContent = meta.flag;
    if (label) label.textContent = meta.label;
    if (code) code.textContent = meta.code;
    if (trigger) trigger.setAttribute("aria-expanded", menu?.hidden ? "false" : "true");

    toggle.querySelectorAll("[data-language-option]").forEach((option) => {
      const isActive = option.getAttribute("data-language-option") === language;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-checked", isActive ? "true" : "false");
    });
  });
}

function closeAllLanguageMenus() {
  document.querySelectorAll("[data-language-menu]").forEach((menu) => {
    menu.hidden = true;
  });
  document.querySelectorAll("[data-language-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

export function getCurrentLanguage() {
  return normalizeLanguage(document.documentElement.dataset.language);
}

export function setLanguage(nextLanguage) {
  const language = normalizeLanguage(nextLanguage);
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === "vi" ? "vi" : "en";
  window.localStorage.setItem(STORAGE_KEY, language);
  applyLocalizedAttributes(language);
  updateLanguageControls(language);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);

  document.dispatchEvent(new CustomEvent("iai:language-change", {
    detail: { language },
  }));
}

function bindLanguageToggles() {
  document.querySelectorAll("[data-language-toggle]").forEach((toggle) => {
    const trigger = toggle.querySelector("[data-language-trigger]");
    const menu = toggle.querySelector("[data-language-menu]");

    if (!trigger || !menu) return;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = menu.hidden;
      closeAllLanguageMenus();
      menu.hidden = !willOpen;
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    toggle.querySelectorAll("[data-language-option]").forEach((option) => {
      option.addEventListener("click", () => {
        const language = option.getAttribute("data-language-option");
        closeAllLanguageMenus();
        setLanguage(language);
      });
    });
  });

  document.addEventListener("click", () => {
    closeAllLanguageMenus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllLanguageMenus();
    }
  });
}

function init() {
  bindLanguageToggles();
  setLanguage(detectInitialLanguage());
}

document.addEventListener("DOMContentLoaded", init);
