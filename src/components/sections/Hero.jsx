import React, { lazy } from 'react';
import { ArrowRight, MousePointer2, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../common/Button';
import Container from '../common/Container';
import SceneMount from '../three/SceneMount';
import { useI18n } from '../../i18n/I18nProvider';
import Rich from '../../i18n/Rich';

const HeroGlobe = lazy(() => import('../three/HeroGlobe'));

const GlobeFallback = () => (
    <div className="grid h-full w-full place-items-center">
        <div className="relative aspect-square w-3/4 rounded-full border border-brand-300/20 bg-[radial-gradient(circle_at_35%_30%,rgba(124,196,218,0.25),rgba(10,26,38,0.9)_60%)] shadow-glow-lg" />
    </div>
);

const Hero = () => {
    const { t, c } = useI18n();
    const reduce = useReducedMotion();
    const fade = (delay) => ({
        initial: reduce ? false : { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    });

    return (
        <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 md:pt-32">
            {/* Ambient background */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
                <div className="absolute -top-40 right-[-10%] h-[38rem] w-[38rem] rounded-full bg-brand-500/20 blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] h-[30rem] w-[30rem] rounded-full bg-ai/10 blur-[120px]" />
            </div>

            <Container>
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
                    <div className="relative z-10 lg:col-span-6 xl:col-span-6">
                        <motion.a href="/#ai" {...fade(0)} className="eyebrow mb-7 hover:border-brand-300/50">
                            <Sparkles size={14} className="text-glow" />
                            {t('hero.eyebrow')}
                            <ArrowRight size={14} />
                        </motion.a>

                        <motion.h1
                            id="hero-title"
                            {...fade(0.08)}
                            className="text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl"
                        >
                            {t('hero.titleBefore')}<span className="text-gradient animate-shimmer">{t('hero.titleHighlight')}</span>{t('hero.titleAfter')}
                        </motion.h1>

                        <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                            <Rich text={t('hero.description')} />
                        </motion.p>

                        <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
                            <Button href="/#contact" size="lg">
                                {t('hero.cta')}
                                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button href="/#services" variant="secondary" size="lg">
                                {t('hero.secondary')}
                            </Button>
                        </motion.div>

                        <motion.dl {...fade(0.32)} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
                            {c.HERO_STATS.map((stat) => (
                                <div key={stat.label} className="flex flex-col-reverse bg-ink-900/90 p-4">
                                    <dt className="mt-1 text-xs text-slate-500">{stat.label}</dt>
                                    <dd className="font-display text-xl font-semibold text-slate-50 md:text-2xl">{stat.value}</dd>
                                </div>
                            ))}
                        </motion.dl>
                    </div>

                    <motion.div
                        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative lg:col-span-6 xl:col-span-6"
                    >
                        <SceneMount
                            scene={HeroGlobe}
                            labels={t('hero.globe')}
                            fallback={<GlobeFallback />}
                            className="relative mx-auto aspect-square w-full max-w-[640px] cursor-grab active:cursor-grabbing"
                        />

                        {/* Brand badge floating over the globe */}
                        <div className="pointer-events-none absolute bottom-6 left-0 hidden items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 p-2.5 pr-4 backdrop-blur-xl sm:flex">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-white to-brand-50">
                                <img src="/brand/vin-logo.png" alt="" className="h-8 w-auto" width="575" height="627" />
                            </span>
                            <span className="text-xs leading-tight">
                                <span className="block font-semibold text-slate-100">{t('hero.hubTitle')}</span>
                                <span className="text-slate-400">{t('hero.hubText')}</span>
                            </span>
                        </div>
                        <p className="pointer-events-none absolute right-2 top-4 hidden items-center gap-1.5 font-mono text-[11px] text-slate-500 md:flex">
                            <MousePointer2 size={12} /> {t('hero.drag')}
                        </p>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
};

export default Hero;
