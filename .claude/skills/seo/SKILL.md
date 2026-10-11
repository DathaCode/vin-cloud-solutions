---
name: seo
description: SEO setup of the VIN Cloud Solutions site — static head tags and JSON-LD in index.html, per-route useSeo hook, FAQ/BlogPosting structured data, sitemap, robots, OG share image and favicons. Use when changing titles/meta, pages, domain, company details or brand images.
---

# SEO

Domain: **https://cloud.vinsolutions.lk** (`SITE_URL` in constants.js). Target: AI / software / cloud consulting in **Sri Lanka** (local) and South Asia.

## Pieces
| Where | What |
|---|---|
| `index.html` | Default title/description/keywords, canonical, Open Graph + Twitter, `geo.*`, favicons, manifest, **JSON-LD @graph**: Organization (email, telephone, address Ragama/LK, sameAs Facebook, contactPoint), ProfessionalService (OfferCatalog of services), WebSite. Plus `<noscript>` summary for crawlers. |
| `src/utils/seo.js` → `useSeo({ title, description, keywords, image, path, type, jsonLd })` | Call once per page. Upserts a single copy of each meta tag + canonical; optional route JSON-LD script removed on unmount. |
| `FAQ.jsx` | Emits FAQPage JSON-LD from `FAQ_ITEMS`. |
| `BlogPostPage.jsx` | BlogPosting JSON-LD per article. |
| `CrmSolutions.jsx` | `useSeo` with Service JSON-LD; its FAQ section emits a second FAQPage. Listed in sitemap and the OfferCatalog in `index.html`. |
| `public/sitemap.xml`, `public/robots.txt` | Hand-maintained. Add every new route / blog post. |
| `public/brand/og-image.png` | 1200×630 share image (generated — see below). |
| `public/favicon*.png`, `favicon.ico`, `apple-touch-icon.png`, `brand/icon-192/512.png`, `site.webmanifest` | Icons generated from `design/brand-source/vin-mark-original.png`. |

Do **not** reintroduce `react-helmet-async` (incompatible with React 19).

## Rules
- One h1 per page; sections labelled with `aria-labelledby` → h2 ids.
- Titles: `<Page> | VIN Cloud Solutions`; home title mentions "in Sri Lanka". Descriptions 140–160 chars.
- Never put client names or prices in meta/JSON-LD (see `site-content`).
- Keep JSON-LD facts identical to `COMPANY_INFO`.

## Domain or company change checklist
`SITE_URL` · index.html (canonical, og:url, og:image, all JSON-LD `@id`/`url`/`logo`) · sitemap.xml · robots.txt · regenerate OG image ·
`grep -rn "old-domain" --exclude-dir=node_modules --exclude-dir=dist .`

## Regenerating the OG image / icons
Python + Pillow (available on the dev machine; Windows fonts `segoeuib.ttf`, `seguisb.ttf`, `segoeui.ttf`). Write the script to the scratchpad
(not a bash heredoc — curly quotes break it). Layout used: dark `#070D16` background, teal blurred glows, dot grid, mark on a light rounded tile
at x=870,y=185 (260px), headline 56px at x=80, footer line `cloud.vinsolutions.lk · Ragama, Sri Lanka`. Always `Read` the PNG afterwards to check text doesn't collide with the tile.
Favicons: crop `design/brand-source/vin-mark-original.png` (already transparent) to bbox, pad, export 16/32/48 + multi-size .ico; apple/PWA icons on white.

## Verify
After build: `grep -c "application/ld+json" dist/index.html`; validate JSON-LD at validator.schema.org / Google Rich Results test (manual, by owner).
Post-launch steps (Search Console, sitemap submission, Business Profile) are in `docs/DEPLOYMENT.md` §10.
