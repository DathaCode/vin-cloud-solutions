import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WHATSAPP_URL } from '../../utils/constants';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import BrandIcon from './BrandIcon';
import { useI18n } from '../../i18n/I18nProvider';

/** Floating quick-contact button; appears once the visitor starts scrolling. */
const WhatsAppButton = () => {
    const { t } = useI18n();
    const visible = useScrollPosition() > 400;
    const reduce = useReducedMotion();

    return (
        <motion.a
            href={`${WHATSAPP_URL}?text=${encodeURIComponent(t('whatsapp.message'))}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('whatsapp.aria')}
            initial={false}
            animate={visible ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: reduce ? 0 : 20, pointerEvents: 'none' }}
            transition={{ duration: 0.25 }}
            className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-emerald-500 p-3.5 text-white shadow-[0_10px_40px_-10px_rgba(16,185,129,0.8)] transition-colors hover:bg-emerald-400 md:bottom-7 md:right-7"
        >
            <BrandIcon name="whatsapp" size={24} />
            <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[8rem] group-hover:pr-1 md:inline">
                {t('whatsapp.label')}
            </span>
        </motion.a>
    );
};

export default WhatsAppButton;
