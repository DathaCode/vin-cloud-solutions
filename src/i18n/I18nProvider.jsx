import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEY, detectLanguage, localeFor } from './languages';
import { getContent } from './content';
import { makeT } from './translate';

const I18nContext = createContext(null);

export const I18nProvider = ({ children }) => {
    const [lang, setLangState] = useState(detectLanguage);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = useCallback((code) => {
        setLangState(code);
        try { localStorage.setItem(STORAGE_KEY, code); } catch { /* ignore */ }
    }, []);

    const value = useMemo(
        () => ({ lang, setLang, t: makeT(lang), c: getContent(lang), locale: localeFor(lang) }),
        [lang, setLang]
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

/** { lang, setLang, t(key, vars), c: localized content, locale } */
export const useI18n = () => useContext(I18nContext);
