import React from 'react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import SpotlightCard from '../common/SpotlightCard';
import Reveal from '../common/Reveal';
import Icon from '../common/Icon';
import { useI18n } from '../../i18n/I18nProvider';

const WhyChooseUs = () => {
    const { t, c } = useI18n();
    return (
    <Section id="about" labelledBy="about-title">
        <Container>
            <div className="grid items-center gap-14 lg:grid-cols-2">
                <div>
                    <SectionHeading
                        id="about-title"
                        align="left"
                        eyebrow={t('why.eyebrow')}
                        title={t('why.title')}
                        highlight={t('why.highlight')}
                    />
                    <Reveal delay={0.1}>
                        <p className="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">{c.COMPANY_INFO.summary}</p>
                    </Reveal>

                    {/* Logo showcase */}
                    <Reveal delay={0.15} className="mt-10 flex items-center gap-6">
                        <div className="relative grid h-32 w-32 shrink-0 place-items-center">
                            <div aria-hidden="true" className="absolute inset-0 rounded-full border border-dashed border-brand-300/30 animate-spin-slow" />
                            <div aria-hidden="true" className="absolute inset-3 rounded-full bg-brand-400/20 blur-xl" />
                            <div className="relative grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-white to-brand-50 shadow-glow-lg">
                                <img src="/brand/vin-logo.png" alt={t('common.logoAlt')} className="h-16 w-auto" width="575" height="627" loading="lazy" />
                            </div>
                        </div>
                        <div>
                            <p className="font-display text-xl font-semibold text-slate-50">VIN Cloud Solutions</p>
                            <p className="mt-1 text-sm text-slate-400">{t('why.tagline')}</p>
                            <p className="mt-1 font-mono text-xs text-brand-300">{t('why.serving', { location: c.COMPANY_INFO.location, region: c.COMPANY_INFO.region })}</p>
                        </div>
                    </Reveal>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {c.WHY_CHOOSE_US.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.06}>
                            <SpotlightCard as="article" className="h-full">
                                <div className="p-6">
                                    <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-400/30 to-brand-700/30 text-brand-100">
                                        <Icon name={item.icon} size={20} />
                                    </span>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    </Section>
    );
};

export default WhyChooseUs;
