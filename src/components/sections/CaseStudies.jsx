import React, { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, MapPin, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Reveal from '../common/Reveal';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Dialog from '../common/Dialog';
import AutoScrollSlider from '../common/AutoScrollSlider';
import { useI18n } from '../../i18n/I18nProvider';

const categoryLabel = (categories, id) => categories.find((cat) => cat.id === id)?.label;

// Slider order: named client projects first, then in-house products, then the other engagements.
const rank = (study) => (study.client ? 0 : study.featured ? 1 : 2);
const ordered = (studies) => [...studies].sort((a, b) => rank(a) - rank(b));

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

/** One slide. The "Read case study" button stretches over the whole card, so the entire card is clickable. */
const WorkCard = ({ study, onOpen, clone = false }) => {
    const { t, c } = useI18n();
    return (
    <SpotlightCard
        as="article"
        className={`h-full ${
            study.client
                ? 'bg-gradient-to-br from-brand-500/15 via-white/[0.03] to-glow/5'
                : study.featured ? 'bg-gradient-to-br from-ai/10 via-white/[0.03] to-brand-500/10' : ''
        }`}
        glow={study.featured ? 'rgba(167,139,250,0.16)' : undefined}
    >
        <div className="flex h-full flex-col p-6 md:p-7">
            <div className="flex min-h-[6.5rem] flex-col justify-start">
                {study.client ? (
                    <div className="flex min-w-0 flex-col items-start gap-2">
                        <ClientLogo client={study.client} height="h-14" />
                        <p className="flex min-w-0 items-center gap-1 text-xs text-slate-400">
                            <span className="truncate font-semibold text-slate-100">{study.client.name}</span>
                            <span aria-hidden="true">·</span>
                            <MapPin size={12} className="shrink-0" aria-hidden="true" />
                            <span className="truncate">{study.client.location}</span>
                        </p>
                    </div>
                ) : (
                    <span className={`grid h-12 w-12 place-items-center rounded-xl ${study.featured ? 'bg-ai/15 text-violet-200' : 'bg-brand-500/15 text-brand-200'}`}>
                        <Sparkles size={20} aria-hidden="true" />
                    </span>
                )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
                {study.client && <Badge variant="accent">{t('work.clientProject')}</Badge>}
                {study.featured && <Badge variant="ai">{t('work.builtByVin')}</Badge>}
                {!study.client && !study.featured && <Badge variant="accent">{categoryLabel(c.CASE_CATEGORIES, study.category)}</Badge>}
                <Badge>{study.sector}</Badge>
            </div>
            <h3 className="mt-4 text-xl font-semibold leading-snug">{study.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{study.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
                {study.highlights.slice(0, 2).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-slate-300">
                        <Check size={15} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" /><span className="line-clamp-2">{h}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto pt-6">
                <div className="border-t border-white/10 pt-5"><Results results={study.results} /></div>
                <button
                    type="button"
                    onClick={() => onOpen(study)}
                    tabIndex={clone ? -1 : undefined}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-200 after:absolute after:inset-0 after:rounded-2xl after:content-[''] hover:text-glow"
                >
                    {t('work.read')} <span className="sr-only">: {study.title}</span><ArrowUpRight size={16} aria-hidden="true" />
                </button>
            </div>
        </div>
    </SpotlightCard>
    );
};

const CaseDetail = ({ study }) => {
    const { t, c } = useI18n();
    return (
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
                {study.client && <Badge variant="accent">{t('work.clientProject')}</Badge>}
                {study.featured && <Badge variant="ai">{t('work.builtByVin')}</Badge>}
                <Badge variant="accent">{categoryLabel(c.CASE_CATEGORIES, study.category)}</Badge>
                <Badge>{study.sector}</Badge>
            </div>
            <h3 id="case-dialog-title" className="mt-4 text-2xl font-semibold md:text-3xl">{study.title}</h3>
            <div className="mt-7"><Results results={study.results} size="lg" /></div>
        </header>
        <div className="space-y-7 p-7 md:p-9">
            {[[t('work.challenge'), study.challenge], [t('work.solution'), study.solution]].map(([label, text]) => (
                <section key={label}>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">{label}</h4>
                    <p className="mt-2 leading-relaxed text-slate-300">{text}</p>
                </section>
            ))}
            <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">{t('work.highlights')}</h4>
                <ul className="mt-3 space-y-2.5">
                    {study.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-slate-300">
                            <Check size={16} className="mt-1 shrink-0 text-glow" aria-hidden="true" />{h}
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">{t('work.technology')}</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">{study.stack.map((t) => <Badge key={t}>{t}</Badge>)}</div>
            </section>
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-300/20 bg-brand-500/10 p-5 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-300">{t('work.similarQ')}</p>
                <Button href={`/?service=${SIMILAR_SERVICE[study.category] || 'ai'}#contact`} size="sm">
                    {t('work.similarCta')} <ArrowRight size={16} />
                </Button>
            </div>
        </div>
    </article>
    );
};

const CaseStudies = () => {
    const { t, c } = useI18n();
    const [category, setCategory] = useState('all');
    const [openStudy, setOpenStudy] = useState(null);
    const closeStudy = useCallback(() => setOpenStudy(null), []);

    const items = useMemo(() => {
        const all = ordered(c.CASE_STUDIES);
        return category === 'all' ? all : all.filter((s) => s.category === category);
    }, [category, c]);

    return (
        <Section id="work" labelledBy="work-title" className="bg-ink-950/40">
            <Container>
                <SectionHeading
                    id="work-title"
                    eyebrow={t('work.eyebrow')}
                    title={t('work.title')}
                    highlight={t('work.highlight')}
                    description={t('work.description')}
                />

                <Reveal className="mt-10 flex justify-center">
                    <div role="tablist" aria-label={t('work.filter')} className="flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
                        {c.CASE_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                role="tab"
                                aria-selected={category === cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${category === cat.id ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-100'}`}
                            >
                                {cat.label}
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
                        className="mt-10"
                    >
                        <AutoScrollSlider
                            items={items}
                            getKey={(s) => s.id}
                            label={t('work.sliderLabel')}
                            paused={!!openStudy}
                            itemClassName="w-[85vw] max-w-[380px] sm:w-[380px]"
                            renderItem={(s, { clone }) => <WorkCard study={s} onOpen={setOpenStudy} clone={clone} />}
                        />
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
