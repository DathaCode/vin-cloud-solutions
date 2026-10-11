import React from 'react';
import { CalendarCheck, Check, GitMerge, Mail, MessageCircle, Phone, Smartphone } from 'lucide-react';
import BrandIcon from '../common/BrandIcon';

// Tiny decorative UI vignettes for the CRM feature cards. Purely illustrative, hidden from screen readers.
const Bar = ({ w = 'w-24', tone = 'bg-white/10' }) => <span className={`block h-1.5 rounded-full ${tone} ${w}`} />;
const Row = ({ children, active }) => (
    <div className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${active ? 'border-brand-300/40 bg-brand-400/15' : 'border-white/5 bg-white/[0.03]'}`}>
        {children}
    </div>
);

const previews = {
    automation: () => (
        <div className="space-y-1.5">
            <Row><Mail size={12} className="text-slate-400" /><span className="text-[10px] text-slate-400">New web lead</span></Row>
            <Row active><CalendarCheck size={12} className="text-glow" /><span className="text-[10px] font-semibold text-white">Follow-up task assigned</span></Row>
            <Row><MessageCircle size={12} className="text-emerald-300" /><span className="text-[10px] text-slate-400">WhatsApp sent in 2 min</span></Row>
        </div>
    ),
    contact: () => (
        <Row active>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-ai text-[10px] font-bold text-ink-950">NP</span>
            <span className="flex-1 space-y-1"><span className="block text-[10px] font-semibold text-white">Nadeesha Perera</span><Bar w="w-20" /></span>
            <Phone size={12} className="text-glow" />
        </Row>
    ),
    dashboard: () => (
        <div className="flex items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] p-2.5" style={{ height: 76 }}>
            {[40, 62, 48, 75, 58, 88, 70].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-glow" style={{ height: `${h}%`, opacity: 0.5 + i * 0.07 }} />
            ))}
        </div>
    ),
    mobile: () => (
        <div className="mx-auto flex w-24 flex-col gap-1.5 rounded-2xl border border-white/15 bg-ink-950/70 p-2">
            <Smartphone size={12} className="mx-auto text-slate-500" />
            <Bar w="w-full" tone="bg-brand-400/40" />
            <Bar w="w-3/4" />
            <Bar w="w-5/6" />
            <span className="mt-1 rounded-md bg-glow/80 py-1 text-center text-[8px] font-semibold text-ink-950">Log visit</span>
        </div>
    ),
    inbox: () => (
        <div className="flex flex-wrap gap-1.5">
            {[
                ['whatsapp', 'WhatsApp', 'text-emerald-300'],
                ['facebook', 'Messenger', 'text-sky-300'],
            ].map(([icon, label, tone]) => (
                <span key={label} className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-slate-300">
                    <BrandIcon name={icon} size={10} className={tone} />{label}
                </span>
            ))}
            {['Email', 'Web chat', 'Calls'].map((l) => (
                <span key={l} className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-slate-300">{l}</span>
            ))}
            <span className="rounded-full bg-glow/15 px-2 py-1 text-[10px] font-semibold text-glow">3 unread</span>
        </div>
    ),
    clean: () => (
        <div className="space-y-1.5">
            <Row><Bar w="w-16" /><span className="ml-auto text-[9px] text-amber-300">duplicate</span></Row>
            <Row><Bar w="w-14" /><span className="ml-auto text-[9px] text-amber-300">duplicate</span></Row>
            <Row active><GitMerge size={12} className="text-glow" /><span className="text-[10px] font-semibold text-white">Merged into 1 record</span><Check size={12} className="ml-auto text-emerald-300" /></Row>
        </div>
    ),
    pipeline: () => (
        <div className="grid grid-cols-3 gap-1.5">
            {['New', 'Quote', 'Won'].map((col, i) => (
                <div key={col} className="space-y-1 rounded-lg border border-white/5 bg-white/[0.03] p-1.5">
                    <span className="block text-[9px] text-slate-500">{col}</span>
                    {Array.from({ length: 3 - i }).map((_, j) => (
                        <span key={j} className={`block h-3 rounded ${i === 2 ? 'bg-emerald-400/40' : 'bg-brand-400/30'}`} />
                    ))}
                </div>
            ))}
        </div>
    ),
    coaching: () => (
        <div className="space-y-2 rounded-lg border border-white/5 bg-white/[0.03] p-2.5">
            {[['Adoption', 86], ['Response SLA', 92], ['Win rate goal', 71]].map(([k, v]) => (
                <div key={k}>
                    <div className="flex justify-between text-[9px] text-slate-400"><span>{k}</span><span className="text-slate-200">{v}%</span></div>
                    <span className="mt-1 block h-1.5 rounded-full bg-white/5"><span className="block h-full rounded-full bg-gradient-to-r from-brand-400 to-glow" style={{ width: `${v}%` }} /></span>
                </div>
            ))}
        </div>
    ),
};

const FeaturePreview = ({ type }) => {
    const Preview = previews[type];
    if (!Preview) return null;
    return (
        <div aria-hidden="true" className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent p-3">
            <div className="w-full max-w-[15rem]"><Preview /></div>
        </div>
    );
};

export default FeaturePreview;
