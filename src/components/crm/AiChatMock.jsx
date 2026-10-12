import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot, CalendarCheck, Flame, Sparkles } from 'lucide-react';
import BrandIcon from '../common/BrandIcon';
import { useI18n } from '../../i18n/I18nProvider';

const MESSAGES = [
    { from: 'customer', key: 'm1' },
    { from: 'ai', key: 'm2' },
    { from: 'customer', key: 'm3' },
    { from: 'ai', key: 'm4' },
];

/** Phone conversation handled by the AI assistant, plus the CRM record it updates. Decorative only. */
const AiChatMock = () => {
    const { t } = useI18n();
    const reduce = useReducedMotion();

    return (
        <div aria-hidden="true" className="relative grid items-end gap-5 sm:grid-cols-[minmax(0,15rem)_1fr]">
            {/* Phone */}
            <div className="mx-auto w-full max-w-[15rem] rounded-[2rem] border border-white/15 bg-ink-950 p-2 shadow-glow-lg">
                <div className="rounded-[1.6rem] bg-ink-850 p-3">
                    <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                        <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500 text-white"><BrandIcon name="whatsapp" size={14} /></span>
                        <span className="text-[11px] leading-tight">
                            <span className="block font-semibold text-white">{t('mock.chat.business')}</span>
                            <span className="text-emerald-300">{t('mock.chat.online')}</span>
                        </span>
                    </div>
                    <div className="space-y-2">
                        {MESSAGES.map((m, i) => (
                            <motion.p
                                key={i}
                                initial={reduce ? false : { opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.35 * i, duration: 0.35 }}
                                className={`max-w-[88%] rounded-2xl px-3 py-2 text-[11px] leading-snug ${
                                    m.from === 'ai' ? 'ml-auto rounded-br-md bg-emerald-600/80 text-white' : 'rounded-bl-md bg-white/10 text-slate-200'
                                }`}
                            >
                                {t(`mock.chat.${m.key}`)}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>

            {/* CRM record updated by the AI */}
            <motion.div
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-ink-850/90 p-4 shadow-2xl backdrop-blur"
            >
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{t('mock.chat.recordUpdated')}</span>
                    <span className="flex items-center gap-1 rounded-full bg-ai/15 px-2 py-0.5 text-[10px] text-violet-200"><Bot size={11} /> {t('mock.chat.byAi')}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-ai text-xs font-bold text-ink-950">KP</span>
                    <div>
                        <p className="text-sm font-semibold text-white">Kasun P.</p>
                        <p className="text-[11px] text-slate-400">{t('mock.chat.source')}</p>
                    </div>
                    <span className="ml-auto flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-orange-400/15 px-2 py-1 text-[10px] font-semibold text-orange-300"><Flame size={11} /> {t('mock.chat.hot')}</span>
                </div>
                <ul className="mt-4 space-y-2 text-[11px] text-slate-300">
                    <li className="flex items-center gap-2"><CalendarCheck size={13} className="text-glow" /> {t('mock.chat.booked')}</li>
                    <li className="flex items-center gap-2"><Sparkles size={13} className="text-violet-300" /> {t('mock.chat.summary')}</li>
                    <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-brand-300" /> {t('mock.chat.assigned')}</li>
                </ul>
            </motion.div>
        </div>
    );
};

export default AiChatMock;
