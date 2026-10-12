// Deep-merges a translation overlay onto English source data. Objects merge by key, arrays by index,
// strings replace. Anything the overlay omits (ids, icons, links, brand names) falls back to English.
export const deepMerge = (base, overlay) => {
    if (overlay === undefined || overlay === null) return base;
    if (Array.isArray(base)) {
        if (!Array.isArray(overlay)) return base;
        return base.map((item, i) => deepMerge(item, overlay[i]));
    }
    if (base && typeof base === 'object') {
        if (typeof overlay !== 'object') return base;
        const out = { ...base };
        for (const key of Object.keys(overlay)) out[key] = key in base ? deepMerge(base[key], overlay[key]) : overlay[key];
        return out;
    }
    return typeof overlay === typeof base ? overlay : base;
};

/** Looks up "a.b.c" in a nested object. */
export const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
