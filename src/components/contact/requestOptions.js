import { useMemo } from 'react';
import { EN_CONTENT } from '../../i18n/content';
import { tEn } from '../../i18n/translate';
import { useI18n } from '../../i18n/I18nProvider';

export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mppqanpv';

// Option ids are stored in drafts and sent to Formspree; labels come from ui `form.*` / localized content.
const STEP_IDS = ['needs', 'project', 'contact', 'review'];
const STAGE_IDS = ['idea', 'planning', 'improve', 'support'];
const TIMELINE_IDS = ['asap', 'month', '1-3', '3-6', 'flexible'];
const METHOD_IDS = ['email', 'whatsapp', 'phone'];

/** All option lists for the request form, labelled in the given language. */
export const buildOptions = (c, t) => ({
    steps: STEP_IDS.map((id) => ({ id, label: t(`form.steps.${id}`) })),
    services: [
        ...c.SERVICES.map((s) => ({ id: s.id, label: s.short, icon: s.icon })),
        { id: 'data-migration', label: t('form.extraServices.dataMigration'), icon: 'Database' },
        { id: 'managed', label: t('form.extraServices.managed'), icon: 'ShieldCheck' },
    ],
    platforms: [...c.PLATFORMS.map((p) => ({ id: p.id, label: p.name, color: p.color })), { id: 'unsure', label: t('form.notSure') }],
    stages: STAGE_IDS.map((id) => ({ id, label: t(`form.stages.${id}.label`), hint: t(`form.stages.${id}.hint`) })),
    timelines: TIMELINE_IDS.map((id) => ({ id, label: t(`form.timelines.${id}`) })),
    methods: METHOD_IDS.map((id) => ({ id, label: t(`form.methods.${id}`) })),
});

/** Labels for the current language (what the visitor sees). */
export const useRequestOptions = () => {
    const { c, t } = useI18n();
    return useMemo(() => buildOptions(c, t), [c, t]);
};

/** English labels, used in the email the team receives whatever language the visitor uses. */
export const EN_OPTIONS = buildOptions(EN_CONTENT, tEn);

export const STEP_COUNT = STEP_IDS.length;

export const EMPTY_REQUEST = {
    services: [],
    platforms: [],
    stage: '',
    timeline: '',
    message: '',
    name: '',
    email: '',
    company: '',
    phone: '',
    contactMethod: 'email',
    consent: false,
};

export const labelFor = (options, id) => options.find((o) => o.id === id)?.label || id;
