import React, { useEffect, useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { NAV_LINKS } from '../../utils/constants';
import Button from './Button';
import Container from './Container';
import Logo from './Logo';
import Icon from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../../i18n/I18nProvider';

const ServicesMenu = () => {
    const { t, c } = useI18n();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <a
                href="/#services"
                aria-haspopup="true"
                aria-expanded={open}
                onFocus={() => setOpen(true)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
                {t('nav.services')}
                <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </a>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
                    >
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-ink-850/95 p-2 shadow-2xl backdrop-blur-xl">
                            {c.SERVICES.map((s) => (
                                <a
                                    key={s.id}
                                    href={s.href || `/#service-${s.id}`}
                                    onClick={() => setOpen(false)}
                                    className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
                                >
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-300/20 bg-brand-500/10 text-brand-200 group-hover:text-glow">
                                        <Icon name={s.icon} size={18} />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-semibold text-slate-100">{s.short}</span>
                                        <span className="line-clamp-2 text-xs text-slate-400">{s.description}</span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Navbar = () => {
    const { t } = useI18n();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isScrolled = useScrollPosition() > 20;

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                isScrolled || isMenuOpen ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl' : 'border-b border-transparent'
            }`}
        >
            <Container>
                <nav aria-label={t('nav.main')} className="flex h-16 items-center justify-between md:h-20">
                    <a href="/" aria-label={t('nav.home')}>
                        <Logo />
                    </a>

                    <div className="hidden items-center gap-1 lg:flex">
                        <ServicesMenu />
                        {NAV_LINKS.filter((l) => l.key !== 'services').map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                            >
                                {t(`nav.${link.key}`)}
                            </a>
                        ))}
                    </div>

                    <div className="hidden items-center gap-2 lg:flex">
                        <LanguageSwitcher />
                        <Button href="/#contact" size="sm">
                            {t('nav.book')}
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen((o) => !o)}
                        className="rounded-lg p-2 text-slate-200 transition-colors hover:bg-white/5 lg:hidden"
                        aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </Container>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-y-auto border-t border-white/10 bg-ink-900/95 backdrop-blur-xl lg:hidden"
                    >
                        <Container className="flex flex-col gap-1 py-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-xl px-3 py-3 font-display text-lg text-slate-100 hover:bg-white/5"
                                >
                                    {t(`nav.${link.key}`)}
                                    <ArrowRight size={18} className="text-brand-300" />
                                </a>
                            ))}
                            <div className="mt-4">
                                <p className="mb-2 px-1 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{t('nav.language')}</p>
                                <LanguageSwitcher variant="inline" />
                            </div>
                            <Button href="/#contact" className="mt-4 w-full" onClick={() => setIsMenuOpen(false)}>
                                {t('nav.book')}
                            </Button>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
