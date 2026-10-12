// Keys whose string values are not translated (ids, links, brand/product names, figures).
// Overlays may still override them where it reads better (e.g. a result `value` like "Seconds").
// Kept import-free so scripts/i18n.mjs can load it in plain Node.
export const NON_TRANSLATABLE_KEYS = new Set([
    'id', 'icon', 'href', 'logo', 'color', 'preview', 'category', 'step', 'tags', 'stack', 'examples',
    'value', 'name', 'full', 'email', 'phone', 'whatsapp', 'website', 'shortName', 'address',
    'vin', 'generic', 'manual',
]);
