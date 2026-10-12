import React, { lazy, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Badge from '../common/Badge';
import Icon from '../common/Icon';
import Button from '../common/Button';
import SceneMount from '../three/SceneMount';
import { useI18n } from '../../i18n/I18nProvider';

const NeuralScene = lazy(() => import('../three/NeuralScene'));

const AIInnovation = () => {
    const { t, c } = useI18n();
    const AI_CAPABILITIES = c.AI_CAPABILITIES;
    const OUTCOMES = AI_CAPABILITIES.map((cap) => cap.outcome);
    const [activeIndex, setActiveIndex] = useState(0);
    const active = AI_CAPABILITIES[activeIndex];

    const onKeyDown = (e) => {
        if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        e.preventDefault();
        const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
        const next = (activeIndex + dir + AI_CAPABILITIES.length) % AI_CAPABILITIES.length;
        setActiveIndex(next);
        document.getElementById(`ai-tab-${AI_CAPABILITIES[next].id}`)?.focus();
    };

    return (
        <Section id="ai" labelledBy="ai-title" className="overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/3 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-ai/10 blur-[140px]" />
            </div>

            <Container>
                <SectionHeading
                    id="ai-title"
                    eyebrow={t('ai.eyebrow')}
                    title={t('ai.title')}
                    highlight={t('ai.highlight')}
                    description={t('ai.description')}
                />

                <div className="mt-14 grid gap-8 lg:grid-cols-12">
                    {/* Capability selector */}
                    <Reveal className="lg:col-span-4">
                        <div role="tablist" aria-label={t('ai.tablist')} aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-2">
                            {AI_CAPABILITIES.map((cap, i) => {
                                const selected = i === activeIndex;
                                return (
                                    <button
                                        key={cap.id}
                                        id={`ai-tab-${cap.id}`}
                                        role="tab"
                                        aria-selected={selected}
                                        aria-controls="ai-panel"
                                        tabIndex={selected ? 0 : -1}
                                        onClick={() => setActiveIndex(i)}
                                        className={`group flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                                            selected
                                                ? 'border-ai/40 bg-gradient-to-r from-ai/15 to-transparent'
                                                : 'border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
                                        }`}
                                    >
                                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${selected ? 'bg-ai/20 text-violet-100' : 'bg-white/5 text-slate-400 group-hover:text-slate-200'}`}>
                                            <Icon name={cap.icon} size={18} />
                                        </span>
                                        <span className={`text-sm font-semibold ${selected ? 'text-white' : 'text-slate-300'}`}>{cap.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </Reveal>

                    {/* 3D explorer + detail */}
                    <Reveal delay={0.1} className="lg:col-span-8">
                        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-800/80 to-ink-950/80">
                            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 mask-radial" />
                            <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 font-mono text-[11px] text-slate-500">
                                <span className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-soft" />
                                    {t('ai.live')}
                                </span>
                                <span className="hidden items-center gap-1.5 sm:flex"><MousePointer2 size={12} /> {t('ai.drag')}</span>
                            </div>

                            <SceneMount
                                scene={NeuralScene}
                                outputs={OUTCOMES}
                                inputs={t('ai.inputs')}
                                ariaLabel={t('ai.sceneAria')}
                                activeIndex={activeIndex}
                                className="relative h-[300px] sm:h-[380px]"
                                fallback={<div className="h-full w-full bg-[radial-gradient(circle,rgba(167,139,250,0.15),transparent_60%)]" />}
                            />

                            <div id="ai-panel" role="tabpanel" aria-labelledby={`ai-tab-${active.id}`} className="relative border-t border-white/5 p-6 md:p-7">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={active.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                        className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end"
                                    >
                                        <div>
                                            <h3 className="text-xl font-semibold md:text-2xl">{active.title}</h3>
                                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">{active.description}</p>
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {active.stack.map((s) => <Badge key={s} variant="ai">{s}</Badge>)}
                                            </div>
                                        </div>
                                        <Button href="/?service=ai#contact" variant="secondary" size="sm" className="self-start md:self-end">
                                            {t('ai.pilot')} <ArrowRight size={16} />
                                        </Button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
};

export default AIInnovation;
