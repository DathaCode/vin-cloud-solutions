import React from 'react';
import Container from '../common/Container';
import { useI18n } from '../../i18n/I18nProvider';

const TECH = [
    'Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Google Workspace', 'Microsoft 365', 'Oracle Cloud',
    'Atlassian', 'Azure OpenAI', 'Amazon Bedrock', 'Vertex AI', 'Copilot', 'React', 'Flutter', 'Kubernetes', 'Terraform', 'Power Platform',
];

/** Scrolling strip of the platforms and technologies we work with. */
const Partners = () => {
    const { t } = useI18n();
    return (
    <section aria-label={t('partners.aria')} className="relative border-y border-white/5 bg-ink-950/50 py-8">
        <Container>
            <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                {t('partners.heading')}
            </p>
        </Container>
        <div className="mask-fade-x overflow-hidden">
            <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
                {[...TECH, ...TECH].map((name, i) => (
                    <li
                        key={i}
                        aria-hidden={i >= TECH.length}
                        className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 font-display text-sm text-slate-300"
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    </section>
    );
};

export default Partners;
