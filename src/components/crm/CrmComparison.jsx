import React from 'react';
import { Check, X } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const STATUS = {
    yes: { labelKey: 'yes', className: 'bg-gradient-to-br from-brand-300 to-glow text-ink-950 shadow-glow', Icon: Check },
    partial: { labelKey: 'partial', className: 'bg-white/10 text-slate-300', Icon: Check },
    no: { labelKey: 'no', className: 'border border-white/15 text-slate-500', Icon: X },
};

const Mark = ({ value }) => {
    const { t } = useI18n();
    const { labelKey, className, Icon } = STATUS[value];
    const label = t(`compare.${labelKey}`);
    return (
        <span className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${className}`} title={label}>
            <Icon size={15} strokeWidth={value === 'yes' ? 3 : 2} aria-hidden="true" />
            <span className="sr-only">{label}</span>
        </span>
    );
};

/** Feature comparison table with the VIN Cloud column highlighted. Scrolls sideways on small screens. */
const CrmComparison = ({ data }) => {
    const { t } = useI18n();
    const last = data.rows.length - 1;

    return (
        <div>
            <p className="mb-3 text-center font-mono text-[11px] text-slate-500 sm:hidden" aria-hidden="true">{t('compare.swipe')} ›</p>
            <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
                    <caption className="sr-only">{t('compare.caption')}</caption>
                    <thead>
                        <tr>
                            <th scope="col" className="w-[40%] px-5 pb-5 align-bottom font-display text-lg font-semibold text-slate-100">{t('compare.capability')}</th>
                            {data.columns.map((c) => (
                                <th
                                    key={c.id}
                                    scope="col"
                                    className={`px-4 py-5 text-center align-bottom font-display text-base font-semibold ${
                                        c.highlight
                                            ? 'rounded-t-2xl border-x border-t border-brand-300/40 bg-gradient-to-b from-brand-500/40 to-brand-500/15 text-white'
                                            : 'text-slate-300'
                                    }`}
                                >
                                    {c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, i) => (
                            <tr key={row.label} className="group">
                                <th
                                    scope="row"
                                    className={`px-5 py-4 text-sm font-medium text-slate-200 ${i !== last ? 'border-b border-white/5' : ''} group-hover:bg-white/[0.02]`}
                                >
                                    {row.label}
                                </th>
                                {data.columns.map((c) => (
                                    <td
                                        key={c.id}
                                        className={`px-4 py-4 text-center ${
                                            c.highlight
                                                ? `border-x border-brand-300/40 bg-brand-500/15 ${i === last ? 'rounded-b-2xl border-b' : ''}`
                                                : `${i !== last ? 'border-b border-white/5' : ''} group-hover:bg-white/[0.02]`
                                        }`}
                                    >
                                        <Mark value={row[c.id]} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400" aria-label={t('compare.legend')}>
                {Object.entries(STATUS).map(([key, s]) => (
                    <li key={key} className="flex items-center gap-2">
                        <span className={`grid h-5 w-5 place-items-center rounded-full ${s.className}`}><s.Icon size={11} aria-hidden="true" /></span>
                        {t(`compare.${s.labelKey}`)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CrmComparison;
