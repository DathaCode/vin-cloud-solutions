import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Clock, MapPin, Plug } from 'lucide-react';
import PageLayout from '../components/common/PageLayout';
import Container from '../components/common/Container';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import SpotlightCard from '../components/common/SpotlightCard';
import Reveal from '../components/common/Reveal';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Icon from '../components/common/Icon';
import FAQ from '../components/sections/FAQ';
import CrmDashboardMock from '../components/crm/CrmDashboardMock';
import FeaturePreview from '../components/crm/FeaturePreview';
import AiChatMock from '../components/crm/AiChatMock';
import AddonsCarousel from '../components/crm/AddonsCarousel';
import CrmComparison from '../components/crm/CrmComparison';
import { useSeo } from '../utils/seo';
import { SITE_URL } from '../utils/constants';
import { useI18n } from '../i18n/I18nProvider';

const CONTACT = '/?service=crm#contact';

const serviceJsonLd = (CRM_HERO) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CRM Solutions',
    serviceType: 'CRM implementation, custom CRM development and AI for CRM',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['Sri Lanka', 'South Asia'],
    url: `${SITE_URL}/crm-solutions`,
    description: CRM_HERO.description,
});

const StatCard = ({ stat }) => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="font-display text-5xl font-semibold leading-none text-gradient md:text-6xl">{stat.value}</p>
        <p className="mt-2 text-sm font-semibold text-slate-100">{stat.label}</p>
        <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
    </div>
);

const Hero = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    const reduce = useReducedMotion();
    const fade = (delay) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    });

    return (
        <section aria-labelledby="crm-title" className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
                <div className="absolute -top-32 right-0 h-[34rem] w-[34rem] rounded-full bg-brand-500/20 blur-[120px]" />
                <div className="absolute bottom-0 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-ai/10 blur-[120px]" />
            </div>
            <Container>
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    <div>
                        <motion.span {...fade(0)} className="eyebrow">{CRM_HERO.eyebrow}</motion.span>
                        <motion.h1 {...fade(0.08)} id="crm-title" className="mt-6 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                            {CRM_HERO.title} <span className="text-gradient">{CRM_HERO.highlight}</span>
                        </motion.h1>
                        <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">{CRM_HERO.description}</motion.p>
                        <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Button href={CONTACT} size="lg">{t('crm.demo')} <ArrowRight size={18} /></Button>
                            <Button href="#crm-features" variant="secondary" size="lg">{t('crm.howItWorks')}</Button>
                        </motion.div>
                        <motion.div {...fade(0.32)} className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
                            <StatCard stat={CRM_SCALE} />
                            <StatCard stat={CRM_HERO.stat} />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="px-2 sm:px-6"
                    >
                        <CrmDashboardMock />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

const ScaleProof = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-scale" labelledBy="crm-scale-title" padding="pb-20 md:pb-28">
        <Container>
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-brand-300/25 bg-gradient-to-br from-brand-500/20 via-ink-850/70 to-ai/10 p-6 md:p-10">
                    <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30 mask-radial" />
                    <div className="relative grid items-center gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <p className="font-display text-7xl font-semibold leading-none text-gradient md:text-8xl">{CRM_SCALE.value}</p>
                            <p className="mt-3 text-sm font-semibold text-slate-100">{CRM_SCALE.label}</p>
                            <p className="mt-1 text-xs text-slate-400">{t('crm.scaleSector')}</p>
                        </div>
                        <div className="lg:col-span-8">
                            <span className="eyebrow">{CRM_SCALE.eyebrow}</span>
                            <h2 id="crm-scale-title" className="mt-4 text-2xl font-semibold md:text-3xl">
                                {CRM_SCALE.title} <span className="text-gradient">{CRM_SCALE.highlight}</span>
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{CRM_SCALE.description}</p>
                            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                                {CRM_SCALE.points.map((pt) => (
                                    <li key={pt.title} className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
                                        <Icon name={pt.icon} size={18} className="text-glow" />
                                        <p className="mt-2 text-sm font-semibold text-slate-100">{pt.title}</p>
                                        <p className="mt-1 text-xs leading-relaxed text-slate-400">{pt.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    </Section>
    );
};

const Models = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-options" labelledBy="crm-options-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="crm-options-title"
                eyebrow={t('crm.models.eyebrow')}
                title={t('crm.models.title')}
                highlight={t('crm.models.highlight')}
                description={t('crm.models.description')}
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {CRM_MODELS.map((m, i) => (
                    <Reveal key={m.id} delay={i * 0.06}>
                        <SpotlightCard as="article" className={`h-full ${m.id === 'ai-addons' ? 'bg-gradient-to-br from-ai/10 via-white/[0.03] to-transparent' : ''}`}>
                            <div className="flex h-full flex-col p-6">
                                <div className="flex items-center justify-between">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-300/25 bg-brand-500/10 text-brand-200"><Icon name={m.icon} size={20} /></span>
                                    <Badge variant={m.id === 'ai-addons' ? 'ai' : 'accent'}>{m.badge}</Badge>
                                </div>
                                <h3 className="mt-5 text-xl font-semibold">{m.title}</h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{m.description}</p>
                                <ul className="mt-5 space-y-2 border-t border-white/5 pt-5 text-sm">
                                    {m.points.map((p) => (
                                        <li key={p} className="flex items-start gap-2 text-slate-300"><Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </Container>
    </Section>
    );
};

const Features = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-features" labelledBy="crm-features-title">
        <Container>
            <SectionHeading
                id="crm-features-title"
                eyebrow={t('crm.features.eyebrow')}
                title={t('crm.features.title')}
                highlight={t('crm.features.highlight')}
                description={t('crm.features.description')}
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {CRM_FEATURES.map((f, i) => (
                    <Reveal key={f.title} delay={(i % 4) * 0.05}>
                        <SpotlightCard as="article" className="h-full">
                            <div className="flex h-full flex-col p-5">
                                <FeaturePreview type={f.preview} />
                                <h3 className="mt-5 flex items-center gap-2 text-base font-semibold">
                                    <Icon name={f.icon} size={16} className="text-brand-300" />{f.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
                            </div>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </Container>
    </Section>
    );
};

const Comparison = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-compare" labelledBy="crm-compare-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="crm-compare-title"
                eyebrow={CRM_COMPARISON.eyebrow}
                title={CRM_COMPARISON.title}
                highlight={CRM_COMPARISON.highlight}
                description={CRM_COMPARISON.description}
            />
            <Reveal className="mx-auto mt-14 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] p-4 md:p-8">
                <CrmComparison data={CRM_COMPARISON} />
            </Reveal>
        </Container>
    </Section>
    );
};

const ClientSpotlight = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    const SPOTLIGHT = c.CASE_STUDIES.find((cs) => cs.id === 'signature-shades');
    return (
    <Section id="crm-client" labelledBy="crm-client-title">
        <Container>
            <Reveal>
                <article className="grid gap-10 rounded-3xl border border-brand-300/20 bg-gradient-to-br from-brand-500/15 via-ink-850/60 to-glow/5 p-6 md:p-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <span className="eyebrow">{t('crm.spotlight')}</span>
                        <div className="mt-6 flex items-center gap-4">
                            <span className="flex h-20 w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-glow">
                                <img src={SPOTLIGHT.client.logo} alt={t('common.clientLogoAlt', { name: SPOTLIGHT.client.name })} className="h-full w-full object-contain" loading="lazy" />
                            </span>
                            <div>
                                <p className="font-display text-xl font-semibold text-slate-50">{SPOTLIGHT.client.name}</p>
                                <p className="flex items-center gap-1 text-sm text-slate-400"><MapPin size={14} aria-hidden="true" />{SPOTLIGHT.client.location}</p>
                            </div>
                        </div>
                        <h2 id="crm-client-title" className="mt-6 text-2xl font-semibold md:text-3xl">{SPOTLIGHT.title}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{SPOTLIGHT.summary}</p>
                        <Button href="/#work" variant="secondary" size="sm" className="mt-7">
                            {t('crm.moreProjects')} <ArrowUpRight size={16} />
                        </Button>
                    </div>
                    <div className="lg:col-span-7">
                        <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-ink-950/40 p-5">
                            {SPOTLIGHT.results.map((r) => (
                                <div key={r.label} className="flex flex-col-reverse">
                                    <dt className="mt-1 text-xs leading-snug text-slate-400">{r.label}</dt>
                                    <dd className="font-display text-3xl font-semibold text-gradient md:text-4xl">{r.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <ul className="mt-6 space-y-3 text-sm">
                            {SPOTLIGHT.highlights.map((h) => (
                                <li key={h} className="flex items-start gap-2 text-slate-300">
                                    <Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />{h}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-1.5">{SPOTLIGHT.stack.map((tech) => <Badge key={tech}>{tech}</Badge>)}</div>
                    </div>
                </article>
            </Reveal>
        </Container>
    </Section>
    );
};

const AiSection = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-ai" labelledBy="crm-ai-title" className="overflow-hidden bg-ink-950/40">
        <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-ai/10 blur-[140px]" />
        <Container>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <SectionHeading id="crm-ai-title" align="left" eyebrow={CRM_AI.eyebrow} title={CRM_AI.title} highlight={CRM_AI.highlight} description={CRM_AI.description} />
                    <Reveal delay={0.1} className="mt-8">
                        <Button href={CONTACT}>{t('crm.aiCta')} <ArrowRight size={16} /></Button>
                    </Reveal>
                </div>
                <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9"><StatCard stat={CRM_AI.stat} /></Reveal>
            </div>

            <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
                <Reveal><AiChatMock /></Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {CRM_AI.capabilities.map((cap, i) => (
                        <Reveal key={cap.title} delay={i * 0.06}>
                            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ai/15 text-violet-200"><Icon name={cap.icon} size={18} /></span>
                                <h3 className="mt-4 text-base font-semibold">{cap.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{cap.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    </Section>
    );
};

const Addons = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-addons" labelledBy="crm-addons-title" className="overflow-hidden">
        <Container>
            <SectionHeading
                id="crm-addons-title"
                align="left"
                eyebrow={t('crm.addons.eyebrow')}
                title={t('crm.addons.title')}
                highlight={t('crm.addons.highlight')}
                description={t('crm.addons.description')}
            />
            <div className="-mt-6"><AddonsCarousel items={CRM_ADDONS} /></div>
        </Container>
    </Section>
    );
};

const IntegrationsAndIndustries = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-industries" labelledBy="crm-industries-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="crm-industries-title"
                eyebrow={t('crm.industries.eyebrow')}
                title={t('crm.industries.title')}
                highlight={t('crm.industries.highlight')}
            />
            <Reveal className="mt-10">
                <div className="flex flex-wrap justify-center gap-2">
                    <span className="flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-100">
                        <Plug size={15} aria-hidden="true" /> {t('crm.integratesWith')}
                    </span>
                    {CRM_INTEGRATIONS.map((name) => (
                        <span key={name} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">{name}</span>
                    ))}
                </div>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {CRM_INDUSTRIES.map((ind, i) => (
                    <Reveal key={ind.title} delay={(i % 4) * 0.05}>
                        <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-brand-300/30">
                            <Icon name={ind.icon} size={22} className="text-brand-300" />
                            <h3 className="mt-4 text-base font-semibold">{ind.title}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{ind.description}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Container>
    </Section>
    );
};

const ProcessAndResults = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section id="crm-results" labelledBy="crm-results-title">
        <Container>
            <SectionHeading
                id="crm-results-title"
                eyebrow={t('crm.results.eyebrow')}
                title={t('crm.results.title')}
                highlight={t('crm.results.highlight')}
            />
            <ol className="mt-14 grid gap-5 md:grid-cols-4">
                {CRM_STEPS.map((s, i) => (
                    <Reveal as="li" key={s.step} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                        <span className="font-mono text-xs text-brand-300">{s.step}</span>
                        <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.description}</p>
                    </Reveal>
                ))}
            </ol>

            <Reveal className="mt-10">
                <div className="rounded-3xl border border-brand-300/20 bg-gradient-to-br from-brand-500/15 via-white/[0.02] to-ai/10 p-6 md:p-9">
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
                        <Clock size={13} aria-hidden="true" /> {t('crm.typicalResults')}
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                        {CRM_RESULTS.map((r) => (
                            <div key={r.label} className="flex flex-col-reverse">
                                <dt className="mt-1 text-sm text-slate-400">{r.label}</dt>
                                <dd className="whitespace-nowrap font-display text-3xl font-semibold text-gradient md:text-4xl">{r.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </Reveal>
        </Container>
    </Section>
    );
};

const FinalCta = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    return (
    <Section padding="pb-24" labelledBy="crm-cta-title">
        <Container>
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850 p-8 text-center md:p-14">
                    <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 mask-radial" />
                    <div className="relative">
                        <h2 id="crm-cta-title" className="text-balance text-3xl font-semibold md:text-4xl">
                            {t('crm.cta.title')} <span className="text-gradient">{t('crm.cta.highlight')}</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            {t('crm.cta.text')}
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button href={CONTACT} size="lg">{t('crm.demo')} <ArrowRight size={18} /></Button>
                            <Button href="/#work" variant="secondary" size="lg">{t('crm.cta.work')}</Button>
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    </Section>
    );
};

const CrmSolutions = () => {
    const { t, c } = useI18n();
    const { CRM_HERO, CRM_SCALE, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES,
        CRM_STEPS, CRM_RESULTS, CRM_FAQ, CRM_COMPARISON } = c;
    const jsonLd = useMemo(() => serviceJsonLd(CRM_HERO), [CRM_HERO]);
    useSeo({
        title: t('seo.crm.title'),
        description: t('seo.crm.description'),
        keywords: 'CRM Sri Lanka, CRM software, Salesforce implementation, Dynamics 365 CRM, HubSpot, Zoho CRM, custom CRM development, AI CRM, WhatsApp CRM',
        path: '/crm-solutions',
        jsonLd,
    });

    return (
        <PageLayout>
            <Hero />
            <ScaleProof />
            <Models />
            <Features />
            <Comparison />
            <AiSection />
            <Addons />
            <IntegrationsAndIndustries />
            <ClientSpotlight />
            <ProcessAndResults />
            <FAQ
                id="crm-faq"
                items={CRM_FAQ}
                title={t('crm.faq.title')}
                highlight={t('crm.faq.highlight')}
                description={t('crm.faq.description')}
            />
            <FinalCta />
        </PageLayout>
    );
};

export default CrmSolutions;
