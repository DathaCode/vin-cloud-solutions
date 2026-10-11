import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_ITEMS } from '../../utils/constants';
import Container from '../common/Container';
import Section from '../common/Section';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

const FAQItem = ({ item, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const id = useId();

    return (
        <div className={`rounded-2xl border transition-colors ${isOpen ? 'border-brand-300/25 bg-white/[0.04]' : 'border-white/10 bg-white/[0.015]'}`}>
            <h3 className="text-base font-medium md:text-lg">
                <button
                    onClick={() => setIsOpen((o) => !o)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-answer`}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-slate-100 md:px-6"
                >
                    {item.question}
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-45 text-glow' : 'text-slate-400'}`}>
                        <Plus size={16} aria-hidden="true" />
                    </span>
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={`${id}-answer`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <p className="px-5 pb-6 text-sm leading-relaxed text-slate-400 md:px-6 md:text-base">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// FAQPage structured data lets search engines show these answers as rich results.
const toJsonLd = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
});

const FAQ = ({
    items = FAQ_ITEMS,
    id = 'faq',
    title = 'Questions,',
    highlight = 'answered.',
    description = 'Can’t find what you need? Ask us directly. We reply within one business day.',
}) => (
    <Section id={id} labelledBy={`${id}-title`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toJsonLd(items)) }} />
        <Container>
            <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <SectionHeading
                        id={`${id}-title`}
                        align="left"
                        eyebrow="FAQ"
                        title={title}
                        highlight={highlight}
                        description={description}
                    />
                </div>
                <Reveal className="flex flex-col gap-3 lg:col-span-8">
                    {items.map((item, index) => (
                        <FAQItem key={item.question} item={item} defaultOpen={index === 0} />
                    ))}
                </Reveal>
            </div>
        </Container>
    </Section>
);

export default FAQ;
