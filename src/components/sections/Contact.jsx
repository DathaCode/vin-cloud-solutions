import React from 'react';
import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, WHATSAPP_URL } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import BrandIcon from '../common/BrandIcon';
import RequestForm from '../contact/RequestForm';
import { useI18n } from '../../i18n/I18nProvider';
import Rich from '../../i18n/Rich';

const telHref = `tel:${COMPANY_INFO.phone.replace(/[^\d+]/g, '')}`;

const CHANNELS = [
    { Icon: Phone, labelKey: 'contact.call', value: COMPANY_INFO.phone, href: telHref },
    { Icon: Mail, labelKey: 'contact.email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { Icon: MapPin, labelKey: 'contact.office', value: COMPANY_INFO.location, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.location)}`, external: true },
];

const Contact = () => {
    const { t } = useI18n();
    return (
    <Section id="contact" labelledBy="contact-title" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
            <div className="absolute left-1/2 top-1/2 h-[36rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[140px]" />
        </div>

        <Container>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <SectionHeading
                        id="contact-title"
                        align="left"
                        eyebrow={t('contact.eyebrow')}
                        title={t('contact.title')}
                        highlight={t('contact.highlight')}
                        description={t('contact.description')}
                    />

                    <Reveal delay={0.1}>
                        <a
                            href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('contact.waMessage'))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-8 flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 transition-colors hover:bg-emerald-400/15"
                        >
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
                                <BrandIcon name="whatsapp" size={22} />
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-white">{t('contact.waTitle')}</span>
                                <span className="text-sm text-emerald-200/80">{t('contact.waText', { phone: COMPANY_INFO.phone })}</span>
                            </span>
                        </a>

                        <ul className="mt-6 space-y-4 text-sm">
                            {CHANNELS.map(({ Icon, labelKey, value, href, external }) => (
                                <li key={labelKey}>
                                    <a
                                        href={href}
                                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                        className="flex items-center gap-4 rounded-xl transition-colors hover:text-white"
                                    >
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200">
                                            <Icon size={18} aria-hidden="true" />
                                        </span>
                                        <span>
                                            <span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">{t(labelKey)}</span>
                                            <span className="font-medium text-slate-200">{value}</span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-400">
                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                                <Clock size={16} className="mb-2 text-brand-300" aria-hidden="true" />
                                <Rich text={t('contact.reply')} strongClassName="font-normal text-slate-200" />
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                                <ShieldCheck size={16} className="mb-2 text-brand-300" aria-hidden="true" />
                                <Rich text={t('contact.nda')} strongClassName="font-normal text-slate-200" />
                            </div>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="lg:col-span-8">
                    <RequestForm />
                </Reveal>
            </div>
        </Container>
    </Section>
    );
};

export default Contact;
