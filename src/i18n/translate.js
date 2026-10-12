import { DEFAULT_LANG } from './languages';
import { getPath } from './merge';
import en from './ui/en';
import sv from './ui/sv';
import it from './ui/it';

export const UI = { en, sv, it };

const interpolate = (text, vars) =>
    vars ? text.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : text;

/**
 * Returns t(key, vars) for a language. Falls back to English, then to the key itself,
 * so a missing translation never breaks the page. Non-string values (arrays/objects) are returned as-is.
 */
export const makeT = (lang) => (key, vars) => {
    const hit = getPath(UI[lang], key) ?? getPath(UI[DEFAULT_LANG], key);
    if (typeof hit === 'string') return interpolate(hit, vars);
    return hit ?? key;
};

/** English translator, used where output must stay English (e.g. emails to the team). */
export const tEn = makeT('en');
