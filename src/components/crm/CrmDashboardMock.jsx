import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';

const FUNNEL = [
    { label: 'Leads', value: 248 },
    { label: 'Contacted', value: 196 },
    { label: 'Qualified', value: 121 },
    { label: 'Proposal', value: 64 },
    { label: 'Won', value: 38 },
];

const RESPONSE = [
    { label: '< 5 min', share: 0.62, color: '#67E8F9' },
    { label: '< 30 min', share: 0.27, color: '#4588A0' },
    { label: 'Later', share: 0.11, color: '#1E2F44' },
];

/** Donut chart of first-response times, drawn with stroke-dasharray segments. */
const ResponseDonut = ({ total = 126 }) => {
    const r = 40;
    const c = 2 * Math.PI * r;
    let offset = 0;
    return (
        <div className="relative mx-auto h-32 w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="11" />
                {RESPONSE.map((s) => {
                    const len = s.share * c;
                    const el = (
                        <circle
                            key={s.label}
                            cx="50" cy="50" r={r} fill="none" stroke={s.color} strokeWidth="11"
                            strokeDasharray={`${len - 1.5} ${c - len + 1.5}`} strokeDashoffset={-offset}
                        />
                    );
                    offset += len;
                    return el;
                })}
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                    <div className="font-display text-3xl font-semibold text-white">{total}</div>
                    <div className="text-[10px] text-slate-400">leads today</div>
                </div>
            </div>
        </div>
    );
};

/** Illustrative CRM dashboard (pipeline funnel, response times, KPIs, AI tip). Decorative only. */
const CrmDashboardMock = ({ compact = false }) => {
    const reduce = useReducedMotion();
    const float = (delay) =>
        reduce ? {} : { animate: { y: [0, -6, 0] }, transition: { duration: 6, delay, repeat: Infinity, ease: 'easeInOut' } };

    return (
        <div aria-hidden="true" className="relative pb-14">
            {/* App frame */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850/90 shadow-glow-lg backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">vin-crm · sales dashboard</span>
                    <span className="h-2 w-14 rounded-full bg-white/10" />
                </div>

                <div className="grid gap-3 p-4 sm:grid-cols-5">
                    {/* Funnel */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 sm:col-span-3">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-200">Sales pipeline</span>
                            <span className="font-mono text-[10px] text-slate-500">this month</span>
                        </div>
                        <div className="space-y-2">
                            {FUNNEL.map((f, i) => (
                                <div key={f.label} className="flex items-center gap-3">
                                    <span className="w-16 shrink-0 text-[11px] text-slate-400">{f.label}</span>
                                    <div className="h-5 flex-1 overflow-hidden rounded-md bg-white/5">
                                        <motion.div
                                            className="h-full rounded-md bg-gradient-to-r from-brand-500 to-glow"
                                            initial={reduce ? false : { width: 0 }}
                                            whileInView={{ width: `${(f.value / FUNNEL[0].value) * 100}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ opacity: 1 - i * 0.12 }}
                                        />
                                    </div>
                                    <span className="w-8 text-right font-mono text-[11px] text-slate-200">{f.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Donut */}
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 sm:col-span-2">
                        <span className="text-xs font-semibold text-slate-200">First response time</span>
                        <div className="mt-3"><ResponseDonut /></div>
                        <ul className="mt-3 space-y-1">
                            {RESPONSE.map((s) => (
                                <li key={s.label} className="flex items-center justify-between text-[10px] text-slate-400">
                                    <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.label}</span>
                                    <span className="font-mono text-slate-300">{Math.round(s.share * 100)}%</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {!compact && (
                        <div className="grid grid-cols-3 gap-3 sm:col-span-5">
                            {[['Open tasks', '12'], ['Meetings today', '7'], ['Pipeline value', '+18%']].map(([k, v]) => (
                                <div key={k} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                                    <div className="text-[10px] text-slate-500">{k}</div>
                                    <div className="mt-1 font-display text-lg font-semibold text-white">{v}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Floating AI suggestion */}
            <motion.div
                {...float(0)}
                className="absolute bottom-0 -left-3 w-60 rounded-xl border border-ai/30 bg-ink-900/95 p-3 shadow-2xl backdrop-blur sm:-left-8"
            >
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-violet-200">
                    <Sparkles size={12} /> AI next best action
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-slate-300">
                    Call <span className="text-white">Kasun P.</span> today. Opened your quote 3 times, buying score 92.
                </p>
            </motion.div>

            {!compact && (
                <motion.div
                    {...float(1.5)}
                    className="absolute -right-3 -top-5 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-ink-900/95 px-3 py-2 shadow-2xl backdrop-blur sm:-right-6"
                >
                    <TrendingUp size={14} className="text-emerald-300" />
                    <span className="text-[11px] text-slate-200">Win rate <span className="font-semibold text-emerald-300">+9%</span> vs last month</span>
                </motion.div>
            )}
        </div>
    );
};

export default CrmDashboardMock;
