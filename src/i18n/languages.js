// Supported site languages. English is the source language; every other language must cover all of its keys
// (run `npm run i18n:check`). To add a language: add it here, add src/i18n/ui/<code>.js, src/i18n/content/<code>.js
// and src/content/blog/<code>/ translations.
export const LANGUAGES = [
    { code: 'en', label: 'English', short: 'EN', locale: 'en-US' },
    { code: 'sv', label: 'Svenska', short: 'SV', locale: 'sv-SE' },
    { code: 'it', label: 'Italiano', short: 'IT', locale: 'it-IT' },
];

export const DEFAULT_LANG = 'en';
export const STORAGE_KEY = 'vin-lang';
export const isSupported = (code) => LANGUAGES.some((l) => l.code === code);
export const localeFor = (code) => (LANGUAGES.find((l) => l.code === code) || LANGUAGES[0]).locale;

/** Saved choice first, then the browser's preferred languages, then English. */
export const detectLanguage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (isSupported(saved)) return saved;
    } catch { /* storage unavailable */ }
    const prefs = typeof navigator !== 'undefined' ? navigator.languages || [navigator.language] : [];
    for (const p of prefs) {
        const code = String(p || '').toLowerCase().split('-')[0];
        if (isSupported(code)) return code;
    }
    return DEFAULT_LANG;
};
