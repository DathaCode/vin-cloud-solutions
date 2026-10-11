import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLIENTS } from '../../utils/constants';
import Container from '../common/Container';

const TECH = [
    'Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Google Workspace', 'Microsoft 365', 'Oracle Cloud',
    'Atlassian', 'Azure OpenAI', 'Amazon Bedrock', 'Vertex AI', 'Copilot', 'React', 'Flutter', 'Kubernetes', 'Terraform', 'Power Platform',
];

/** "Trusted by" client logos plus a scrolling strip of the platforms we work with. */
const Partners = () => (
    <section aria-label="Clients and platforms" className="relative border-y border-white/5 bg-ink-950/50 py-8">
        <Container>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Trusted by</p>
                <ul className="flex flex-wrap items-center justify-center gap-3">
                    {CLIENTS.map((c) => (
                        <li key={c.name}>
                            <a
                                href="/#work"
                                title={`${c.name}: see the case study`}
                                className={`flex h-16 items-center justify-center rounded-xl bg-white px-4 py-2 opacity-90 shadow-glow transition-opacity hover:opacity-100 ${c.wide ? 'w-72' : 'w-36'}`}
                            >
                                <img src={c.logo} alt={c.name} width={c.width} height={c.height} className="h-full w-full object-contain" loading="lazy" />
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="/#work" className="hidden items-center gap-1 text-xs font-semibold text-brand-200 hover:text-glow sm:inline-flex">
                    Case studies <ArrowUpRight size={14} />
                </a>
            </div>
            <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
                Certified expertise across the platforms you already use
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

export default Partners;
