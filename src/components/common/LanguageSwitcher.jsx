import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LANGUAGES } from '../../i18n/languages';
import { useI18n } from '../../i18n/I18nProvider';

/**
 * Language picker. `variant="menu"` is the compact navbar dropdown; `variant="inline"` shows all
 * languages as buttons (mobile menu). The choice is saved and applied to the whole site instantly.
 */
const LanguageSwitcher = ({ variant = 'menu', onChange }) => {
    const { lang, setLang, t } = useI18n();
    const [open, setOpen] = useState(false);
    const root = useRef(null);
    const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

    const choose = (code) => {
        setLang(code);
        setOpen(false);
        onChange?.(code);
    };

    useEffect(() => {
        if (!open) return undefined;
        const onDoc = (e) => { if (!root.current?.contains(e.target)) setOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', onDoc);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDoc);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    if (variant === 'inline') {
        return (
            <div role="group" aria-label={t('nav.language')} className="flex gap-2">
                {LANGUAGES.map((l) => (
                    <button
                        key={l.code}
                        type="button"
                        lang={l.code}
                        onClick={() => choose(l.code)}
                        aria-pressed={l.code === lang}
                        className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                            l.code === lang ? 'border-brand-300/50 bg-brand-400/15 text-white' : 'border-white/10 text-slate-300 hover:text-white'
                        }`}
                    >
                        {l.label}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div ref={root} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`${t('nav.language')}: ${current.label}`}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
                <Globe size={16} aria-hidden="true" />
                {current.short}
                <ChevronDown size={14} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        aria-label={t('nav.language')}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-white/10 bg-ink-850/95 p-1 shadow-2xl backdrop-blur-xl"
                    >
                        {LANGUAGES.map((l) => (
                            <li key={l.code} role="option" aria-selected={l.code === lang}>
                                <button
                                    type="button"
                                    lang={l.code}
                                    onClick={() => choose(l.code)}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                        l.code === lang ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <span><span className="mr-2 font-mono text-xs text-slate-500">{l.short}</span>{l.label}</span>
                                    {l.code === lang && <Check size={14} className="text-glow" aria-hidden="true" />}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
