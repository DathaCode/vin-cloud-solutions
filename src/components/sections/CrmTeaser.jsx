import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import Button from '../common/Button';
import CrmDashboardMock from '../crm/CrmDashboardMock';

const POINTS = [
    'Our own VIN CRM, or Salesforce, Dynamics 365, HubSpot and Zoho',
    'AI lead scoring and a 24/7 WhatsApp assistant',
    'One customer record across sales, service and support',
];

/** Home-page teaser for the dedicated /crm-solutions page. */
const CrmTeaser = () => (
    <Section id="crm" labelledBy="crm-teaser-title" className="overflow-hidden">
        <Container>
            <div className="grid items-center gap-14 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/10 via-ink-850/60 to-ai/10 p-6 md:p-12 lg:grid-cols-2">
                <div>
                    <SectionHeading
                        id="crm-teaser-title"
                        align="left"
                        eyebrow="New · CRM solutions"
                        title="An intelligent CRM that"
                        highlight="grows with you."
                        description="Capture every enquiry, follow up automatically and let AI point your team to the customers most ready to buy."
                    />
                    <Reveal delay={0.1}>
                        <ul className="mt-7 space-y-2.5 text-sm text-slate-300">
                            {POINTS.map((p) => (
                                <li key={p} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-glow" aria-hidden="true" />{p}</li>
                            ))}
                        </ul>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button href="/crm-solutions">Explore CRM solutions <ArrowRight size={16} /></Button>
                            <Button href="/?service=crm#contact" variant="secondary">Book a demo</Button>
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

export default CrmTeaser;
