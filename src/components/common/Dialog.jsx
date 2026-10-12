import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

/** Accessible modal: Esc / backdrop to close, focus moved in and restored, page scroll locked. */
const Dialog = ({ open, onClose, labelledBy, children, className = '' }) => {
    const { t } = useI18n();
    const panel = useRef(null);

    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement;
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && panel.current) {
                const focusable = panel.current.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => panel.current?.focus());
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
            previous?.focus?.();
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
                    <motion.div
                        ref={panel}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={labelledBy}
                        tabIndex={-1}
                        initial={{ y: 40, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-850 shadow-2xl focus:outline-none focus-visible:ring-0 sm:max-w-3xl sm:rounded-3xl ${className}`}
                    >
                        <button
                            onClick={onClose}
                            aria-label={t('common.close')}
                            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-900/80 text-slate-300 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Dialog;
