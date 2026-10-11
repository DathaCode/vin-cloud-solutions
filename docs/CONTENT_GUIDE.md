# Content guide

How to change the website's text, offerings, contact details, case studies and blog posts.
After any change: `npm run dev` to check it, then follow [DEPLOYMENT.md](DEPLOYMENT.md) → "Releasing updates".

## Content rules
- **Never name clients** anywhere on the site — describe them by sector (e.g. "Financial Services").
- **Never publish prices or budgets.** Pricing is shared after the free requirement analysis.
- Keep company facts in one place (`COMPANY_INFO`) — components read from it.

## Where the text lives: `src/utils/constants.js`

| Section on the site | Edit |
|---|---|
| Phone, WhatsApp, email, location, domain | `COMPANY_INFO`, `SITE_URL` |
| Footer social icons | `SOCIAL_LINKS` — paste a URL to show the icon (LinkedIn, GitHub, TikTok are empty for now); leave `''` to hide |
| Top menu | `NAV_LINKS` |
| Hero numbers | `HERO_STATS` |
| Services cards (also menu, footer, form options) | `SERVICES` |
| AI section tabs | `AI_CAPABILITIES` (`outcome` = label in the 3D network) |
| Cloud platform explorer | `PLATFORMS` (`infra`, `services`, `products` lists) |
| Integrations, Process, Why us | `INTEGRATIONS`, `PROCESS_STEPS`, `WHY_CHOOSE_US` |
| Our work (case studies) | `CASE_STUDIES` + filter tabs `CASE_CATEGORIES` |
| FAQ | `FAQ_ITEMS` (also published to Google as FAQ structured data) |

### CRM Solutions page (`/crm-solutions`)
All text for the CRM page is in `src/utils/crmContent.js`: hero, the four ways to get started (VIN CRM, leading platforms,
custom build, AI add-ons), features, AI section, add-ons carousel, integrations, industries, steps, typical results and the CRM FAQ.
Add or remove an add-on by editing `CRM_ADDONS`; the carousel adjusts automatically.

Icons are referenced by name (e.g. `icon: 'Cloud'`). New names must also be added to `src/components/common/Icon.jsx`
(names from [lucide.dev/icons](https://lucide.dev/icons)).

### Case study format
```js
{
    id: 'unique-id',
    category: 'ai-solution' | 'ai-integration' | 'data-migration' | 'cloud-infra',
    featured: true,              // optional — large card, "Built by VIN Cloud" badge (in-house products)
    title: '…',
    sector: 'Financial Services',
    summary: 'One or two sentences for the card.',
    challenge: '…',
    solution: '…',
    highlights: ['…', '…', '…'],
    results: [{ value: '99.99%', label: 'uptime SLA achieved' }, /* exactly 3 */],
    stack: ['Microsoft Azure', 'Terraform'],
}
```

### When company details change
Also update the structured data in `index.html` (`email`, `telephone`, `address`, `sameAs`) so Google sees the same facts.

## Request form options
Stages, timelines and contact methods are in `src/components/contact/requestOptions.js`. Submissions go to Formspree
(form `mppqanpv`) and arrive by email with all answers and a reference number.

## Blog posts

1. Create `src/content/blog/YYYY-MM-short-name.md`:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2026-10-05"
   author: "VIN Cloud Solutions"
   category: "Cloud Infrastructure"
   tags: ["AWS", "Migration"]
   excerpt: "150–160 character summary used on cards and in Google results."
   slug: "your-post-title"
   ---

   # Your Post Title

   Intro paragraph…

   ## Section heading
   Text with **bold**, *italic*, [links](https://example.com), lists and `code`.
   ```
   The first `# Title` line is removed automatically (the page already shows the title).
2. Register it in `src/hooks/useBlogData.js`:
   ```js
   import post6 from '../content/blog/2026-10-your-post.md?raw';
   const rawPosts = [post1, post2, post3, post4, post5, post6];
   ```
3. Add it to `public/sitemap.xml`:
   ```xml
   <url><loc>https://cloud.vinsolutions.lk/blog/your-post-title</loc><lastmod>2026-10-05</lastmod><priority>0.6</priority></url>
   ```
4. Check it at `http://localhost:5173/blog/your-post-title`.

Supported markdown: headings, paragraphs, bold/italic, links, images (`/images/...` in `public/`), lists, blockquotes and code.
**Tables and ~~strikethrough~~ are not supported** (standard CommonMark only) — use lists instead.
Covers are generated automatically from the category and tags; no image is required.

## Images & branding
- Live logo files: `public/brand/vin-logo.png` and `public/brand/vin-mark.png`. Original artwork: `design/brand-source/`.
- The logo always sits on a light tile — its dark arrow is invisible on the dark background.
- Colours, fonts and effects are design tokens in `tailwind.config.js` (`ink`, `brand`, `glow`, `ai`).
- The social share image is `public/brand/og-image.png` (1200×630). If the domain or tagline changes, regenerate it
  (ask Claude Code — see the `seo` skill).
- Keep new images small (PNG/SVG for graphics, WebP/JPG for photos, ideally < 200 KB).
