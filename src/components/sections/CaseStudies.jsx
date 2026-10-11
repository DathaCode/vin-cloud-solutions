import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, MapPin, Sparkles } from 'lucide-react';
import { CASE_CATEGORIES, CASE_STUDIES } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Reveal from '../common/Reveal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Dialog from '../common/Dialog';

const categoryLabel = (id) => CASE_CATEGORIES.find((c) => c.id === id)?.label;

// Named client projects and in-house products get the large card layout.
const isLarge = (study) => Boolean(study.client || study.featured);

// Which request-form service a "Start a similar project" click should pre-select.
const SIMILAR_SERVICE = { 'cloud-infra': 'cloud', 'data-migration': 'cloud', crm: 'crm', atlassian: 'licensing' };

/** Client logo on a light tile (both logos are designed for light backgrounds). */
const ClientLogo = ({ client, height = 'h-16' }) => (
    <span className={`flex shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-glow ${height} ${client.wide ? 'w-56' : 'w-24'}`}>
        <img src={client.logo} alt={`${client.name} logo`} className="h-full w-full object-contain" loading="lazy" />
    </span>
);

const Results = ({ results, size = 'md' }) => (
    <dl className="grid grid-cols-3 gap-3">
        {results.map((r) => (
            <div key={r.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-slate-500">{r.label}</dt>
                <dd className={`whitespace-nowrap font-display font-semibold text-gradient ${size === 'lg' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>{r.value}</dd>
            </div>
        ))}
    </dl>
);

const FeaturedCard = ({ study, onOpen }) => (
    <SpotlightCard
        as="article"
        className={`h-full bg-gradient-to-br ${study.client ? 'from-brand-500/15 via-white/[0.03] to-glow/5' : 'from-ai/10 via-white/[0.03] to-brand-500/10'}`}
        glow={study.client ? undefined : 'rgba(167,139,250,0.16)'}
    >
        <div className="flex h-full flex-col p-7 md:p-9">
            {study.client && (
                <div className="mb-6 flex items-center gap-4">
                    <ClientLogo client={study.client} />
                    <div className="min-w-0">
                        <p className="font-semibold text-slate-100">{study.client.name}</p>
                        <p className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={12} aria-hidden="true" />{study.client.location}</p>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
                {study.client
                    ? <Badge variant="accent">Client project</Badge>
                    : <Badge variant="ai"><Sparkles size={11} className="mr-1" />Built by VIN Cloud</Badge>}
                <Badge>{study.sector}</Badge>
            </div>
            <h3 className="mt-5 text-2xl font-semibold md:text-3xl">{study.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{study.summary}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
                {study.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-slate-300">
                        <Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />{h}
                    </li>
                ))}
            </ul>
            <div className="mt-auto pt-8">
                <div className="border-t border-white/10 pt-6"><Results results={study.results} size="lg" /></div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">{study.stack.slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}</div>
                    <button onClick={() => onOpen(study)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-200 hover:text-glow">
                        Read case study <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    </SpotlightCard>
);

const CompactCard = ({ study, onOpen }) => (
    <SpotlightCard as="article" className="h-full">
        <button onClick={() => onOpen(study)} className="flex h-full w-full flex-col p-6 text-left md:p-7" aria-label={`Read case study: ${study.title}`}>
            <div className="flex flex-wrap gap-2">
                <Badge variant="accent">{categoryLabel(study.category)}</Badge>
                <Badge>{study.sector}</Badge>
            </div>
            <h3 className="mt-4 text-lg font-semibold md:text-xl">{study.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{study.summary}</p>
            <div className="mt-6 border-t border-white/10 pt-5"><Results results={study.results} /></div>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-200 group-hover:text-glow">
                View details <ArrowUpRight size={16} />
            </span>
        </button>
    </SpotlightCard>
);

const CaseDetail = ({ study }) => (
    <article>
        <header className="border-b border-white/10 bg-gradient-to-br from-brand-500/15 to-ai/10 p-7 pr-16 md:p-9 md:pr-16">
            {study.client && (
                <div className="mb-5 flex items-center gap-4">
                    <ClientLogo client={study.client} height="h-14" />
                    <div>
                        <p className="font-semibold text-slate-100">{study.client.name}</p>
                        <p className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={12} aria-hidden="true" />{study.client.location}</p>
                    </div>
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                {study.client && <Badge variant="accent">Client project</Badge>}
                {study.featured && <Badge variant="ai">Built by VIN Cloud</Badge>}
                <Badge variant="accent">{categoryLabel(study.category)}</Badge>
                <Badge>{study.sector}</Badge>
            </div>
            <h3 id="case-dialog-title" className="mt-4 text-2xl font-semibold md:text-3xl">{study.title}</h3>
            <div className="mt-7"><Results results={study.results} size="lg" /></div>
        </header>
        <div className="space-y-7 p-7 md:p-9">
            {[['Challenge', study.challenge], ['Solution', study.solution]].map(([label, text]) => (
                <section key={label}>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">{label}</h4>
                    <p className="mt-2 leading-relaxed text-slate-300">{text}</p>
                </section>
            ))}
            <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">Highlights</h4>
                <ul className="mt-3 space-y-2.5">
                    {study.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-slate-300">
                            <Check size={16} className="mt-1 shrink-0 text-glow" aria-hidden="true" />{h}
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">Technology</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">{study.stack.map((t) => <Badge key={t}>{t}</Badge>)}</div>
            </section>
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-300/20 bg-brand-500/10 p-5 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-300">Want something similar for your organization?</p>
                <Button href={`/?service=${SIMILAR_SERVICE[study.category] || 'ai'}#contact`} size="sm">
                    Start a similar project <ArrowRight size={16} />
                </Button>
            </div>
        </div>
    </article>
);

const CaseStudies = () => {
    const [category, setCategory] = useState('all');
    const [openStudy, setOpenStudy] = useState(null);
    const closeStudy = useCallback(() => setOpenStudy(null), []);

    const large = [...CASE_STUDIES.filter((s) => s.client), ...CASE_STUDIES.filter((s) => s.featured)];
    const visible = useMemo(
        () => (category === 'all' ? CASE_STUDIES.filter((s) => !isLarge(s)) : CASE_STUDIES.filter((s) => s.category === category)),
        [category]
    );
    const showFeatured = category === 'all';

    return (
        <Section id="work" labelledBy="work-title" className="bg-ink-950/40">
            <Container>
                <SectionHeading
                    id="work-title"
                    eyebrow="Our work"
                    title="Real solutions,"
                    highlight="measurable outcomes."
                    description="Client platforms we’ve delivered, AI products we’ve built in-house and cloud environments we run every day."
                />

                <Reveal className="mt-10 flex justify-center">
                    <div role="tablist" aria-label="Filter case studies" className="flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
                        {CASE_CATEGORIES.map((c) => (
                            <button
                                key={c.id}
                                role="tab"
                                aria-selected={category === c.id}
                                onClick={() => setCategory(c.id)}
                                className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${category === c.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-100'}`}
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {showFeatured && (
                            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                                {large.map((s) => <FeaturedCard key={s.id} study={s} onOpen={setOpenStudy} />)}
                            </div>
                        )}
                        <div className={`grid gap-6 md:grid-cols-2 ${showFeatured ? 'mt-6' : 'mt-10'}`}>
                            {visible.map((s) =>
                                isLarge(s) && !showFeatured
                                    ? <FeaturedCard key={s.id} study={s} onOpen={setOpenStudy} />
                                    : <CompactCard key={s.id} study={s} onOpen={setOpenStudy} />
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </Container>

            <Dialog open={!!openStudy} onClose={closeStudy} labelledBy="case-dialog-title">
                {openStudy && <CaseDetail study={openStudy} />}
            </Dialog>
        </Section>
    );
};

export default CaseStudies;
