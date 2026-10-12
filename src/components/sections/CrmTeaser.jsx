import React from 'react';
import { ArrowRight, Check, Users } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import CrmDashboardMock from '../crm/CrmDashboardMock';
import { useI18n } from '../../i18n/I18nProvider';
import Rich from '../../i18n/Rich';

/** Home-page teaser for the dedicated /crm-solutions page. */
const CrmTeaser = () => {
    const { t } = useI18n();
    return (
    <Section id="crm" labelledBy="crm-teaser-title" className="overflow-hidden">
        <Container>
            <div className="grid items-center gap-14 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/10 via-ink-850/60 to-ai/10 p-6 md:p-12 lg:grid-cols-2">
                <div>
                    <SectionHeading
                        id="crm-teaser-title"
                        align="left"
                        eyebrow={t('crmTeaser.eyebrow')}
                        title={t('crmTeaser.title')}
                        highlight={t('crmTeaser.highlight')}
                        description={t('crmTeaser.description')}
                    />
                    <Reveal delay={0.1}>
                        <ul className="mt-7 space-y-2.5 text-sm text-slate-300">
                            {t('crmTeaser.points').map((p) => (
                                <li key={p} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />{p}</li>
                            ))}
                        </ul>
                        <p className="mt-7 flex items-start gap-3 rounded-2xl border border-brand-300/25 bg-brand-500/10 p-4 text-sm text-slate-300">
                            <Users size={18} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />
                            <span>
                                <Rich text={t('crmTeaser.proof')} strongClassName="font-semibold text-white" />
                            </span>
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href="/crm-solutions">{t('crmTeaser.explore')} <ArrowRight size={16} /></Button>
                            <Button href="/?service=crm#contact" variant="secondary">{t('crmTeaser.demo')}</Button>
                        </div>
                    </Reveal>
                </div>
                <Reveal delay={0.15} className="pb-6 sm:px-4">
                    <CrmDashboardMock compact />
                </Reveal>
            </div>
        </Container>
    </Section>
    );
};

export default CrmTeaser;
