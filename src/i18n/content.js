import * as site from '../utils/constants';
import * as crm from '../utils/crmContent';
import { deepMerge } from './merge';
import sv from './content/sv';
import it from './content/it';

// English source content: every text export of constants.js and crmContent.js.
// New text exports must be added here AND translated in content/sv.js and content/it.js.
export const EN_CONTENT = {
    COMPANY_INFO: site.COMPANY_INFO,
    HERO_STATS: site.HERO_STATS,
    SERVICES: site.SERVICES,
    AI_CAPABILITIES: site.AI_CAPABILITIES,
    PLATFORMS: site.PLATFORMS,
    INTEGRATIONS: site.INTEGRATIONS,
    PROCESS_STEPS: site.PROCESS_STEPS,
    WHY_CHOOSE_US: site.WHY_CHOOSE_US,
    CASE_CATEGORIES: site.CASE_CATEGORIES,
    CASE_STUDIES: site.CASE_STUDIES,
    FAQ_ITEMS: site.FAQ_ITEMS,
    CRM_HERO: crm.CRM_HERO,
    CRM_SCALE: crm.CRM_SCALE,
    CRM_MODELS: crm.CRM_MODELS,
    CRM_FEATURES: crm.CRM_FEATURES,
    CRM_AI: crm.CRM_AI,
    CRM_ADDONS: crm.CRM_ADDONS,
    CRM_INTEGRATIONS: crm.CRM_INTEGRATIONS,
    CRM_INDUSTRIES: crm.CRM_INDUSTRIES,
    CRM_STEPS: crm.CRM_STEPS,
    CRM_RESULTS: crm.CRM_RESULTS,
    CRM_FAQ: crm.CRM_FAQ,
    CRM_COMPARISON: crm.CRM_COMPARISON,
};

export const CONTENT_OVERLAYS = { sv, it };

const cache = { en: EN_CONTENT };
export const getContent = (lang) => {
    if (!cache[lang]) cache[lang] = deepMerge(EN_CONTENT, CONTENT_OVERLAYS[lang]);
    return cache[lang];
};

export { NON_TRANSLATABLE_KEYS } from './nonTranslatable';
