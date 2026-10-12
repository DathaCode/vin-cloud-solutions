---
name: i18n
description: The VIN Cloud site's language layer (English source + Swedish and Italian). Use for ANY change to visible text, content data, blog posts, components with copy, or when adding/removing a section. Every English change must be mirrored in sv and it in the same task, then verified with `npm run i18n:check`.
---

# Language layer (en · sv · it)

The whole site is translated. **Rule: no English text change ships without its Swedish and Italian counterparts.**
Language is a client-side switch (same URLs), auto-detected from the browser on first visit, saved in `localStorage['vin-lang']`.

## Where text lives
| Kind | English source | Translations |
|---|---|---|
| Interface strings (headings, buttons, labels, aria, form, mocks) | `src/i18n/ui/en.js` | `src/i18n/ui/sv.js`, `src/i18n/ui/it.js` (same keys) |
| Content data (services, AI, platforms, case studies, FAQ, CRM page…) | `src/utils/constants.js`, `src/utils/crmContent.js` | `src/i18n/content/sv.js`, `content/it.js`: overlays with the **same shape** (arrays by index), text fields only |
| Blog posts | `src/content/blog/*.md` | `src/content/blog/sv/*.md`, `blog/it/*.md` with the **same `slug`** (auto-discovered, no imports) |

Non-translated keys (ids, icons, links, brand names, `value` figures…) are listed in `src/i18n/nonTranslatable.js`; overlays may still
override them (e.g. `value: 'Sekunder'`).

## Using it in components
```jsx
import { useI18n } from '../../i18n/I18nProvider';
const { t, c, lang, locale } = useI18n();
t('hero.cta')                     // UI string; t('footer.rights', { year }) fills {year}
<Rich text={t('contact.reply')} /> // `**bold**` segments → <strong> (import Rich from 'i18n/Rich')
c.SERVICES                        // localized content (never import text exports from constants.js in components)
formatDate(date, locale)          // dates in the visitor's language
```
- Never hard-code visible text, `aria-label`, `alt`, `placeholder` or `title` in JSX. Brand names/figures may stay literal.
- React Three Fiber canvases are a separate tree: pass strings into 3D scenes as props (`labels`, `inputs`, `ariaLabel`).
- The request form shows localized labels but **emails stay English** (`EN_OPTIONS` in `requestOptions.js`) + `visitor_language`.
- SEO: `useSeo({ title: t('seo.…') })`; `index.html` stays English (crawlers see the English default).

## Workflow for every text change
1. Edit English (ui/en.js, constants.js / crmContent.js, or the English .md).
2. Add/update the same key or position in `ui/sv.js` + `ui/it.js` / `content/sv.js` + `content/it.js` / `blog/sv` + `blog/it`.
   New text export in constants/crmContent → also register it in `EN_CONTENT` in `src/i18n/content.js`.
3. `npm run i18n:check` (strict). It reports missing translations, unused keys, em dashes, unregistered exports, and
   **English that changed since it was last translated** (via `src/i18n/source-hashes.json`).
4. When sv/it are updated: `npm run i18n:accept`, then `npm run i18n:check` must print `i18n OK`.
5. `npm run i18n:export` refreshes `docs/translations-review.csv` for the owner's native-speaker reviewers.
6. Build (`prebuild` runs the check in warn mode; it never blocks a deploy) and screenshot one page in sv and it.

## Style
- Same house rules in every language: no em dashes, no client names except ABC + Signature Shades, no prices.
- Swedish addresses the reader as **ni** (company); Italian as **tu**. Keep product/brand names in English.
- Expect text ~20–30% longer than English: check buttons, tabs and table headers at 1440px and 390px.

## Adding a language
Add it to `src/i18n/languages.js`, create `ui/<code>.js`, `content/<code>.js`, `src/content/blog/<code>/`, import the UI file in
`translate.js` and the overlay in `content.js`, add the code to `LANGS` in `scripts/i18n.mjs`, then check + accept.
