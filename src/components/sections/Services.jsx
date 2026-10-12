import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Reveal from '../common/Reveal';
import Badge from '../common/Badge';
import Icon from '../common/Icon';
import FeaturePreview from '../crm/FeaturePreview';
import { useI18n } from '../../i18n/I18nProvider';

// Bento layout: AI and CRM cards span two columns; licensing fills the last cell.
const SPANS = {
    ai: 'md:col-span-2',
    crm: 'md:col-span-2',
    licensing: 'md:col-span-2 lg:col-span-1',
};

// Small illustrative copilot exchange that fills the featured AI card.
const AIPreview = () => {
    const { t } = useI18n();
    return (
    <div aria-hidden="true" className="rounded-2xl border border-white/10 bg-ink-950/60 p-4 font-mono text-[12px] leading-relaxed">
        <div className="flex items-center gap-2 text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" /> vin-copilot
        </div>
        <p className="mt-3 text-slate-300">
            <span className="text-brand-300">{t('services.previewYou')} ›</span> {t('services.previewPrompt')}
        </p>
        <p className="mt-2 text-slate-400">
            <span className="text-violet-300">ai ›</span> {t('services.previewAnswer')}
            <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-glow animate-pulse-soft" />
        </p>
    </div>
    );
};

const ServiceCard = ({ service, index }) => {
    const { t } = useI18n();
    const featured = service.featured;

    return (
        <Reveal delay={index * 0.05} className={`${SPANS[service.id] || ''}`}>
            <SpotlightCard
                as="article"
                id={`service-${service.id}`}
                className={`h-full scroll-mt-28 ${featured ? 'bg-gradient-to-br from-brand-500/15 via-white/[0.03] to-ai/10' : ''}`}
                glow={featured ? 'rgba(167,139,250,0.16)' : undefined}
            >
                <div className="flex h-full flex-col gap-6 p-7 md:p-8">
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <span className={`grid h-12 w-12 place-items-center rounded-xl border ${featured ? 'border-ai/40 bg-ai/15 text-violet-200' : 'border-brand-300/25 bg-brand-500/10 text-brand-200'}`}>
                                <Icon name={service.icon} size={22} />
                            </span>
                            {featured && <Badge variant="ai">{t('services.flagship')}</Badge>}
                            {service.isNew && <Badge variant="accent">{t('services.new')}</Badge>}
                        </div>
                        <h3 className={`font-semibold ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{service.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{service.description}</p>
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-6">
                        <ul className={`grid gap-2.5 text-sm ${featured || service.isNew ? 'sm:grid-cols-2' : ''}`}>
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-slate-300">
                                    <Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        {featured && <AIPreview />}
                        {service.id === 'crm' && <FeaturePreview type="pipeline" />}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5">
                            <div className="flex flex-wrap gap-1.5">
                                {service.tags.map((t) => <Badge key={t}>{t}</Badge>)}
                            </div>
                            <Link
                                to={service.href || (service.id === 'ai' ? '/#ai' : `/?service=${service.id}#contact`)}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-200 hover:text-glow"
                                aria-label={t('services.learnMore', { title: service.title })}
                            >
                                {service.href ? t('services.exploreCrm') : service.id === 'ai' ? t('services.exploreAi') : t('services.discuss')} <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </Reveal>
    );
};

const Services = () => {
    const { t, c } = useI18n();
    return (
    <Section id="services" labelledBy="services-title">
        <Container>
            <SectionHeading
                id="services-title"
                eyebrow={t('services.eyebrow')}
                title={t('services.title')}
                highlight={t('services.highlight')}
                description={t('services.description')}
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {c.SERVICES.map((service, index) => (
                    <ServiceCard key={service.id} service={service} index={index} />
                ))}
            </div>
        </Container>
    </Section>
    );
};

export default Services;
