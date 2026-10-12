import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS, NAV_LINKS, WHATSAPP_URL } from '../../utils/constants';
import Container from './Container';
import BrandIcon from './BrandIcon';
import { useI18n } from '../../i18n/I18nProvider';

// Profiles with an empty URL in constants.js stay hidden until they're filled in.
const socials = [
    { href: WHATSAPP_URL, label: 'WhatsApp', icon: 'whatsapp' },
    { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: 'facebook' },
    { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', icon: 'linkedin' },
    { href: SOCIAL_LINKS.github, label: 'GitHub', icon: 'github' },
    { href: SOCIAL_LINKS.tiktok, label: 'TikTok', icon: 'tiktok' },
].filter((s) => s.href);

const FooterColumn = ({ title, children }) => (
    <div>
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{title}</h3>
        <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
);

const FooterLink = ({ href, children }) => (
    <li>
        <a href={href} className="text-slate-400 transition-colors hover:text-brand-200">
            {children}
        </a>
    </li>
);

const Footer = () => {
    const { t, c } = useI18n();
    const COMPANY_INFO = c.COMPANY_INFO;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
            <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl" />

            <Container className="relative">
                <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-12">
                    <div className="col-span-2 md:col-span-4">
                        <a href="/" aria-label={t('nav.home')} className="inline-flex items-center gap-4">
                            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-white to-brand-50 shadow-glow">
                                <img src="/brand/vin-logo.png" alt={t('common.logoAlt')} className="h-11 w-auto" width="575" height="627" loading="lazy" />
                            </span>
                            <span className="font-display text-xl font-semibold text-slate-50">
                                VIN Cloud Solutions
                            </span>
                        </a>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
                            {t('footer.blurb', { region: COMPANY_INFO.region })}
                        </p>
                        <div className="mt-6 flex gap-2">
                            {socials.map(({ href, label, icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-brand-300/40 hover:text-brand-200"
                                >
                                    <BrandIcon name={icon} size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <FooterColumn title={t('footer.services')}>
                            {c.SERVICES.map((s) => (
                                <FooterLink key={s.id} href={s.href || `/#service-${s.id}`}>{s.short}</FooterLink>
                            ))}
                        </FooterColumn>
                    </div>

                    <div className="md:col-span-2">
                        <FooterColumn title={t('footer.platforms')}>
                            {c.PLATFORMS.map((p) => (
                                <FooterLink key={p.id} href="/#platforms">{p.name}</FooterLink>
                            ))}
                        </FooterColumn>
                    </div>

                    <div className="col-span-2 md:col-span-3">
                        <FooterColumn title={t('footer.contact')}>
                            <li className="flex items-start gap-2.5">
                                <Mail size={16} className="mt-0.5 shrink-0 text-brand-300" />
                                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-400 hover:text-brand-200">
                                    {COMPANY_INFO.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Phone size={16} className="mt-0.5 shrink-0 text-brand-300" />
                                <span className="text-slate-400">
                                    <a href={`tel:${COMPANY_INFO.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand-200">{COMPANY_INFO.phone}</a>
                                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="block text-xs text-emerald-400/90 hover:text-emerald-300">{t('footer.callOrWhatsApp')}</a>
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-300" />
                                <span className="text-slate-400">{COMPANY_INFO.location}<span className="block text-xs text-slate-500">{t('footer.serving', { region: COMPANY_INFO.region })}</span></span>
                            </li>
                        </FooterColumn>
                        <a
                            href="/#contact"
                            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-200 hover:text-glow"
                        >
                            {t('footer.startProject')} <ArrowUpRight size={16} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 md:flex-row">
                    <p>{t('footer.rights', { year: currentYear, name: COMPANY_INFO.name })}</p>
                    <nav aria-label={t('nav.footer')} className="flex flex-wrap gap-5">
                        {NAV_LINKS.map((l) => (
                            <a key={l.key} href={l.href} className="hover:text-slate-300">{t(`nav.${l.key}`)}</a>
                        ))}
                    </nav>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
