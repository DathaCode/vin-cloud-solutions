#!/usr/bin/env node
// Translation layer guard for the VIN Cloud site.
//
//   npm run i18n:check            strict: exit 1 if any translation is missing or any English text changed since last accept
//   npm run i18n:check -- --warn  report only (used by `npm run build`, never fails the build)
//   npm run i18n:accept           after updating sv/it, record the current English text as "translated"
//   npm run i18n:export           write docs/translations-review.csv (key, English, Swedish, Italian) for native-speaker review
//
// Sources checked: src/i18n/ui/*.js (interface text), src/utils/constants.js + crmContent.js vs src/i18n/content/<lang>.js,
// and blog posts src/content/blog/*.md vs src/content/blog/<lang>/*.md (matched by `slug`).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const LANGS = ['sv', 'it'];
const HASH_FILE = join(SRC, 'i18n', 'source-hashes.json');
const mode = process.argv[2] || 'check';
const warnOnly = process.argv.includes('--warn');

const load = async (rel) => import(pathToFileURL(join(SRC, rel)).href);
const sha = (s) => createHash('sha1').update(String(s)).digest('hex').slice(0, 12);

const { NON_TRANSLATABLE_KEYS } = await load('i18n/nonTranslatable.js');
const site = await load('utils/constants.js');
const crm = await load('utils/crmContent.js');

// English content = the exports listed in src/i18n/content.js (parsed so this script stays in sync with it).
const contentJs = readFileSync(join(SRC, 'i18n', 'content.js'), 'utf8');
const contentKeys = [...contentJs.matchAll(/^\s+(\w+): (site|crm)\.\1,/gm)].map((m) => [m[1], m[2]]);
const EN_CONTENT = Object.fromEntries(contentKeys.map(([k, mod]) => [k, (mod === 'site' ? site : crm)[k]]));

// Text exports that exist in constants/crmContent but were never registered for translation.
const NOT_CONTENT = new Set(['SITE_URL', 'WHATSAPP_URL', 'SOCIAL_LINKS', 'NAV_LINKS']);
const unregistered = [...Object.entries(site), ...Object.entries(crm)]
    .filter(([k, v]) => !NOT_CONTENT.has(k) && !(k in EN_CONTENT) && typeof v === 'object')
    .map(([k]) => k);

/** Flatten translatable string leaves to { path: text }. */
const flatten = (node, prefix, out, skipKeys) => {
    if (typeof node === 'string') {
        if (node.trim()) out[prefix] = node;
    } else if (Array.isArray(node)) {
        node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out, skipKeys));
    } else if (node && typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
            if (skipKeys?.has(k)) continue;
            flatten(v, prefix ? `${prefix}.${k}` : k, out, skipKeys);
        }
    }
    return out;
};
const flatAll = (node) => {
    const out = {};
    const walk = (n, p) => {
        if (typeof n === 'string') out[p] = n;
        else if (Array.isArray(n)) n.forEach((v, i) => walk(v, `${p}[${i}]`));
        else if (n && typeof n === 'object') for (const [k, v] of Object.entries(n)) walk(v, p ? `${p}.${k}` : k);
    };
    walk(node, '');
    return out;
};

// ---- gather English sources and translations ----
const ui = { en: (await load('i18n/ui/en.js')).default };
const overlays = {};
for (const l of LANGS) {
    ui[l] = (await load(`i18n/ui/${l}.js`)).default;
    overlays[l] = (await load(`i18n/content/${l}.js`)).default;
}

const enUi = flatten(ui.en, 'ui', {});
const enContent = flatten(EN_CONTENT, 'content', {}, NON_TRANSLATABLE_KEYS);

// Blog posts: { slug: { file, text } } per language.
const blogDir = join(SRC, 'content', 'blog');
const readPosts = (dir) => {
    if (!existsSync(dir)) return {};
    const posts = {};
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.md'))) {
        const text = readFileSync(join(dir, f), 'utf8');
        const slug = (text.match(/^slug:\s*"?([^"\r\n]+)"?/m) || [])[1] || f.replace(/\.md$/, '');
        posts[slug.trim()] = { file: f, text };
    }
    return posts;
};
const enPosts = readPosts(blogDir);

const sources = { ...enUi, ...enContent };
for (const [slug, p] of Object.entries(enPosts)) sources[`blog/${slug}`] = p.text;

// ---- modes ----
if (mode === 'accept') {
    const hashes = Object.fromEntries(Object.entries(sources).map(([k, v]) => [k, sha(v)]));
    writeFileSync(HASH_FILE, `${JSON.stringify(hashes, null, 2)}\n`);
    console.log(`Recorded ${Object.keys(hashes).length} English source texts as translated (${HASH_FILE.replace(ROOT, '.')}).`);
    process.exit(0);
}

if (mode === 'export') {
    const rows = [['key', 'en', ...LANGS]];
    const trUi = Object.fromEntries(LANGS.map((l) => [l, flatAll({ ui: ui[l] })]));
    const trContent = Object.fromEntries(LANGS.map((l) => [l, flatAll({ content: overlays[l] })]));
    for (const [k, v] of Object.entries(enUi)) rows.push([k, v, ...LANGS.map((l) => trUi[l][k] ?? '')]);
    for (const [k, v] of Object.entries(enContent)) rows.push([k, v, ...LANGS.map((l) => trContent[l][k] ?? '')]);
    for (const [slug] of Object.entries(enPosts)) rows.push([`blog/${slug}`, `src/content/blog/${enPosts[slug].file}`, ...LANGS.map((l) => `src/content/blog/${l}/ (slug ${slug})`)]);
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const out = join(ROOT, 'docs', 'translations-review.csv');
    writeFileSync(out, `﻿${csv}\r\n`, 'utf8');
    console.log(`Wrote ${rows.length - 1} rows to docs/translations-review.csv`);
    process.exit(0);
}

// check
const problems = [];
const stale = [];
for (const l of LANGS) {
    const trUi = flatAll({ ui: ui[l] });
    const trContent = flatAll({ content: overlays[l] });
    for (const k of Object.keys(enUi)) if (!trUi[k]?.trim()) problems.push(`[${l}] missing UI text   ${k}`);
    for (const k of Object.keys(enContent)) if (!trContent[k]?.trim()) problems.push(`[${l}] missing content    ${k}`);
    for (const k of Object.keys(trUi)) if (!(k in enUi) && !k.startsWith('ui.hero.globe.cities')) problems.push(`[${l}] unused UI key     ${k} (removed from en.js?)`);
    const trPosts = readPosts(join(blogDir, l));
    for (const slug of Object.keys(enPosts)) if (!trPosts[slug]) problems.push(`[${l}] missing blog post  ${slug} (src/content/blog/${l}/)`);
    for (const [k, v] of [...Object.entries(trUi), ...Object.entries(trContent)]) {
        if (v.includes('—')) problems.push(`[${l}] em dash not allowed ${k}`);
    }
}
for (const [k, v] of Object.entries(sources)) if (v.includes('—')) problems.push(`[en] em dash not allowed ${k}`);
for (const k of unregistered) problems.push(`[en] text export "${k}" is not registered in src/i18n/content.js (add it there and translate it)`);

const recorded = existsSync(HASH_FILE) ? JSON.parse(readFileSync(HASH_FILE, 'utf8')) : {};
for (const [k, v] of Object.entries(sources)) {
    if (!recorded[k]) stale.push(`new English text, translate then accept: ${k}`);
    else if (recorded[k] !== sha(v)) stale.push(`English changed since translated:      ${k}`);
}

const total = problems.length + stale.length;
if (!total) {
    console.log(`i18n OK: ${Object.keys(enUi).length} UI strings, ${Object.keys(enContent).length} content strings, ${Object.keys(enPosts).length} posts × ${LANGS.length} languages.`);
    process.exit(0);
}
const print = warnOnly ? console.warn : console.error;
print(`\n⚠ Translation layer out of sync (${problems.length} problem(s), ${stale.length} stale):`);
[...problems, ...stale].slice(0, 80).forEach((m) => print(`  ${m}`));
if (total > 80) print(`  …and ${total - 80} more`);
print('\nFix: update src/i18n/ui/<lang>.js, src/i18n/content/<lang>.js or src/content/blog/<lang>/, then run `npm run i18n:accept`.\n');
process.exit(warnOnly ? 0 : 1);
