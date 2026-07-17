(function () {
  'use strict';

  const { SITE_CONFIG } = window.SUMOU_CONFIG;
  const dictionaries = window.SUMOU_LOCALES;
  let currentLocale = SITE_CONFIG.localeDefault;

  function warnMissing(locale, key) {
    console.warn(`[i18n] Missing key "${key}" in "${locale}"; falling back to Japanese.`);
  }

  function t(key, locale = currentLocale) {
    const japanese = dictionaries[SITE_CONFIG.localeDefault] || {};
    const selected = dictionaries[locale] || japanese;
    if (selected[key] == null && locale !== SITE_CONFIG.localeDefault) warnMissing(locale, key);
    return selected[key] ?? japanese[key] ?? key;
  }

  async function setLocale(locale) {
    const nextLocale = SITE_CONFIG.supportedLocales.includes(locale) ? locale : SITE_CONFIG.localeDefault;
    const japanese = dictionaries[SITE_CONFIG.localeDefault] || {};
    const selected = dictionaries[nextLocale] || japanese;

    currentLocale = nextLocale;
    document.documentElement.lang = nextLocale === 'zh' ? 'zh-CN' : nextLocale;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      let value = selected[key];
      if (value == null) {
        if (nextLocale !== SITE_CONFIG.localeDefault) warnMissing(nextLocale, key);
        value = japanese[key];
      }
      if (value != null) element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
      element.alt = t(element.dataset.i18nAlt, nextLocale);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
      element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel, nextLocale));
    });

    const title = selected['meta.title'] ?? japanese['meta.title'];
    if (title) document.title = title;
    const description = selected['meta.description'] ?? japanese['meta.description'];
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
      document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
      document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);

    document.querySelectorAll('[data-locale-select]').forEach((select) => {
      select.value = nextLocale;
    });

    const notice = document.querySelector('[data-translation-notice]');
    if (notice) {
      notice.hidden = true;
      notice.textContent = '';
    }

    try {
      localStorage.setItem('sumou-sim-locale', nextLocale);
    } catch (error) {
      console.warn('[i18n] Language preference could not be saved.', error);
    }
    document.dispatchEvent(new CustomEvent('localechange', { detail: { locale: nextLocale } }));
  }

  function getCurrentLocale() {
    return currentLocale;
  }

  async function initializeI18n() {
    let savedLocale = null;
    try {
      savedLocale = localStorage.getItem('sumou-sim-locale');
    } catch (error) {
      console.warn('[i18n] Saved language preference could not be read.', error);
    }
    await setLocale(SITE_CONFIG.supportedLocales.includes(savedLocale) ? savedLocale : SITE_CONFIG.localeDefault);
  }

  window.SUMOU_I18N = Object.freeze({ getCurrentLocale, initializeI18n, setLocale, t });
}());
