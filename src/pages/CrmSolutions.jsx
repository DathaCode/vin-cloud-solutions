import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Clock, Plug } from 'lucide-react';
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
import { useSeo } from '../utils/seo';
import { SITE_URL } from '../utils/constants';
import {
    CRM_HERO, CRM_MODELS, CRM_FEATURES, CRM_AI, CRM_ADDONS, CRM_INTEGRATIONS, CRM_INDUSTRIES, CRM_STEPS, CRM_RESULTS, CRM_FAQ,
} from '../utils/crmContent';

const CONTACT = '/?service=crm#contact';

const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'CRM Solutions',
    serviceType: 'CRM implementation, custom CRM development and AI for CRM',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['Sri Lanka', 'South Asia'],
    url: `${SITE_URL}/crm-solutions`,
    description: CRM_HERO.description,
};

const StatCard = ({ stat }) => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="font-display text-5xl font-semibold leading-none text-gradient md:text-6xl">{stat.value}</p>
        <p className="mt-2 text-sm font-semibold text-slate-100">{stat.label}</p>
        <p className="mt-1 text-xs text-slate-500">{stat.note}</p>
    </div>
);

const Hero = () => {
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
                            <Button href={CONTACT} size="lg">Book a CRM demo <ArrowRight size={18} /></Button>
                            <Button href="#crm-features" variant="secondary" size="lg">See how it works</Button>
                        </motion.div>
                        <motion.div {...fade(0.32)} className="mt-10 max-w-xs"><StatCard stat={CRM_HERO.stat} /></motion.div>
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

const Models = () => (
    <Section id="crm-options" labelledBy="crm-options-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="crm-options-title"
                eyebrow="Four ways to get started"
                title="The right CRM for your business,"
                highlight="not a one-size-fits-all."
                description="Start with our own product, implement a global platform, build something bespoke, or add AI to the CRM you already use."
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

const Features = () => (
    <Section id="crm-features" labelledBy="crm-features-title">
        <Container>
            <SectionHeading
                id="crm-features-title"
                eyebrow="Featured capabilities"
                title="Everything your team needs to"
                highlight="sell and serve better."
                description="Built-in tools that replace scattered spreadsheets, chats and notebooks with one reliable system."
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

const AiSection = () => (
    <Section id="crm-ai" labelledBy="crm-ai-title" className="overflow-hidden bg-ink-950/40">
        <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-ai/10 blur-[140px]" />
        <Container>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <SectionHeading id="crm-ai-title" align="left" eyebrow={CRM_AI.eyebrow} title={CRM_AI.title} highlight={CRM_AI.highlight} description={CRM_AI.description} />
                    <Reveal delay={0.1} className="mt-8">
                        <Button href={CONTACT}>Get started with CRM AI <ArrowRight size={16} /></Button>
                    </Reveal>
                </div>
                <Reveal delay={0.1} className="self-end lg:col-span-4 lg:col-start-9"><StatCard stat={CRM_AI.stat} /></Reveal>
            </div>

            <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
                <Reveal><AiChatMock /></Reveal>
                <div className="grid gap-4 sm:grid-cols-2">
                    {CRM_AI.capabilities.map((c, i) => (
                        <Reveal key={c.title} delay={i * 0.06}>
                            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ai/15 text-violet-200"><Icon name={c.icon} size={18} /></span>
                                <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{c.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    </Section>
);

const Addons = () => (
    <Section id="crm-addons" labelledBy="crm-addons-title" className="overflow-hidden">
        <Container>
            <SectionHeading
                id="crm-addons-title"
                align="left"
                eyebrow="Extend your CRM"
                title="Available"
                highlight="add-ons."
                description="Switch on extra capabilities when you need them. Every add-on works with VIN CRM, and most with leading CRM platforms too."
            />
            <div className="-mt-6"><AddonsCarousel items={CRM_ADDONS} /></div>
        </Container>
    </Section>
);

const IntegrationsAndIndustries = () => (
    <Section id="crm-industries" labelledBy="crm-industries-title" className="bg-ink-950/40">
        <Container>
            <SectionHeading
                id="crm-industries-title"
                eyebrow="Built for your industry"
                title="Connected to your tools,"
                highlight="shaped for your sector."
            />
            <Reveal className="mt-10">
                <div className="flex flex-wrap justify-center gap-2">
                    <span className="flex items-center gap-2 rounded-full border border-brand-300/30 bg-brand-400/10 px-4 py-2 text-sm font-semibold text-brand-100">
                        <Plug size={15} aria-hidden="true" /> Integrates with
                    </span>
                    {CRM_INTEGRATIONS.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">{t}</span>
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

const ProcessAndResults = () => (
    <Section id="crm-results" labelledBy="crm-results-title">
        <Container>
            <SectionHeading
                id="crm-results-title"
                eyebrow="From kickoff to results"
                title="Live in weeks,"
                highlight="improving every month."
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
                        <Clock size={13} aria-hidden="true" /> Typical results from our CRM engagements
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

const FinalCta = () => (
    <Section padding="pb-24" labelledBy="crm-cta-title">
        <Container>
            <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850 p-8 text-center md:p-14">
                    <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 mask-radial" />
                    <div className="relative">
                        <h2 id="crm-cta-title" className="text-balance text-3xl font-semibold md:text-4xl">
                            Ready to see your <span className="text-gradient">customers clearly?</span>
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Book a free requirement analysis and live demo. We’ll show you what your CRM could look like, built around your process.
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button href={CONTACT} size="lg">Book a CRM demo <ArrowRight size={18} /></Button>
                            <Button href="/#work" variant="secondary" size="lg">See our work</Button>
                        </div>
                    </div>
                </div>
            </Reveal>
        </Container>
    </Section>
);

const CrmSolutions = () => {
    useSeo({
        title: 'CRM Solutions in Sri Lanka: VIN CRM, Salesforce, Dynamics 365 & AI',
        description: 'CRM solutions for Sri Lankan businesses: our VIN CRM, Salesforce, Dynamics 365, HubSpot and Zoho implementation, custom CRM development and AI lead scoring.',
        keywords: 'CRM Sri Lanka, CRM software, Salesforce implementation, Dynamics 365 CRM, HubSpot, Zoho CRM, custom CRM development, AI CRM, WhatsApp CRM',
        path: '/crm-solutions',
        jsonLd: serviceJsonLd,
    });

    return (
        <PageLayout>
            <Hero />
            <Models />
            <Features />
            <AiSection />
            <Addons />
            <IntegrationsAndIndustries />
            <ProcessAndResults />
            <FAQ
                id="crm-faq"
                items={CRM_FAQ}
                title="CRM questions,"
                highlight="answered."
                description="Not sure which option fits? Ask us. We’ll recommend one after a free requirement analysis."
            />
            <FinalCta />
        </PageLayout>
    );
};

export default CrmSolutions;
