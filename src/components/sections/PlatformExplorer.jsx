import React, { lazy, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Hand, Server, Wrench, Boxes } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import SceneMount from '../three/SceneMount';
import { useI18n } from '../../i18n/I18nProvider';

const EcosystemScene = lazy(() => import('../three/EcosystemScene'));

const GROUPS = [
    { key: 'infra', Icon: Server },
    { key: 'services', Icon: Wrench },
    { key: 'products', Icon: Boxes },
];

const PlatformExplorer = () => {
    const { t, c } = useI18n();
    const PLATFORMS = c.PLATFORMS;
    const [activeId, setActiveId] = useState(PLATFORMS[0].id);
    const platform = PLATFORMS.find((p) => p.id === activeId);

    return (
        <Section id="platforms" labelledBy="platforms-title" className="overflow-hidden bg-ink-950/40">
            <Container>
                <SectionHeading
                    id="platforms-title"
                    eyebrow={t('platforms.eyebrow')}
                    title={t('platforms.title')}
                    highlight={t('platforms.highlight')}
                    description={t('platforms.description')}
                />

                {/* Accessible platform picker (also the primary control on touch devices) */}
                <Reveal className="mt-12 flex justify-center">
                    <div role="tablist" aria-label={t('platforms.tablist')} className="flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
                        {PLATFORMS.map((p) => (
                            <button
                                key={p.id}
                                role="tab"
                                aria-selected={p.id === activeId}
                                aria-controls="platform-panel"
                                onClick={() => setActiveId(p.id)}
                                className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                                    p.id === activeId ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-100'
                                }`}
                            >
                                <span className="h-2 w-2 rounded-full" style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
                                {p.name}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-12">
                    <Reveal className="relative lg:col-span-7">
                        <div className="relative h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(69,136,160,0.18),transparent_65%)] sm:h-[460px] lg:h-full lg:min-h-[480px]">
                            <SceneMount
                                scene={EcosystemScene}
                                platforms={PLATFORMS}
                                activeId={activeId}
                                onSelect={setActiveId}
                                ariaLabel={t('platforms.sceneAria')}
                                className="absolute inset-0"
                            />
                            <p className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-slate-500">
                                <Hand size={12} /> {t('platforms.hint')}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1} className="lg:col-span-5">
                        <div id="platform-panel" role="tabpanel" aria-live="polite" className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 md:p-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={platform.id}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex h-full flex-col"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full" style={{ background: platform.color, boxShadow: `0 0 16px ${platform.color}` }} />
                                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{platform.full}</span>
                                    </div>
                                    <h3 className="mt-3 text-3xl font-semibold">{platform.name}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">{platform.summary}</p>

                                    <div className="mt-7 space-y-5">
                                        {GROUPS.map(({ key, Icon }) => (
                                            <div key={key}>
                                                <h4 className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
                                                    <Icon size={13} aria-hidden="true" /> {t(`platforms.${key}`)}
                                                </h4>
                                                <ul className="flex flex-wrap gap-2">
                                                    {platform[key].map((item) => (
                                                        <li key={item} className="rounded-lg border border-white/10 bg-ink-900/60 px-3 py-1.5 text-sm text-slate-200">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-8">
                                        <Button href={`/?service=cloud&platform=${platform.id}#contact`} variant="secondary" size="sm">
                                            {t('platforms.talk', { name: platform.name })} <ArrowRight size={16} />
                                        </Button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
};

export default PlatformExplorer;
