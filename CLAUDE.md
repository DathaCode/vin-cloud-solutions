# VIN Cloud Solutions — company website

Marketing site for **VIN Cloud Solutions** (Ragama, Sri Lanka): AI solutions & integrations, web/mobile development,
cloud consulting (AWS, Azure, Google, Microsoft 365, Oracle, Atlassian), data migration and managed cloud.
Live domain: **https://cloud.vinsolutions.lk**. React SPA: home page, `/crm-solutions` page, markdown blog.

## Working rules (from the owner)
- **Never commit, push or create branches.** The owner commits everything. Leave changes in the working tree.
- Ask before anything outward-facing (real form submissions, deploys, publishing).
- **Hosting = AWS Amplify connected to GitHub** (`DathaCode/Cloud-Consulting---Reselling-Platform`, branch `main`). Amplify builds from
  `amplify.yml`; there are **no GitHub Actions** — don't add workflows. Pushing to `main` may publish the site (if auto build is on),
  so never push; the owner does.
- **Client names: only the two owner-approved clients may be named** (with logos): **Asia Broadcasting Corporation** and
  **Signature Shades** (Melbourne). Their case studies state facts only, never invented metrics. Every other client stays
  anonymous (sector only); never mention "Hiru News" and keep Graphic-Cast unattributed.
- **Never copy competitor copy.** The CRM page was inspired by vinsolutions.com (an unrelated US automotive CRM vendor);
  use them for structure ideas only, never their wording, and never mention them on the site.
- **No em dashes (—) anywhere in website copy** (src/, index.html, public/). Use commas, colons, periods or parentheses.
- **Never publish prices or budgets.** Pricing is quoted in LKR after requirement analysis — say that, nothing more.
- Case studies: 2 named client projects (facts only), 2 featured in-house AI products (real), and 5 anonymous engagements
  with owner-approved representative figures.
- Keep the look: slightly dark, techy, brand teal from the logo. Verify UI changes visually (skill `ui-verification`).

## Stack
React 19 · Vite 6 · Tailwind CSS 3 · framer-motion 12 · three.js + @react-three/fiber 9 + drei 10 · react-router 7 ·
lucide-react · react-markdown + gray-matter (blog). Plain **JavaScript/JSX** (no TypeScript). Node ≥ 20 required.
No test runner is configured; `npm run build` + visual checks are the gate.

## Commands
```bash
npm run dev       # http://localhost:5173
npm run build     # must pass before calling work done
npm run preview   # serve dist/ on :4173 (use for screenshots)
```

## Where things live
| Path | What |
|---|---|
| `src/utils/constants.js` | **All site copy & data**: company info, nav, services, AI capabilities, platforms, integrations, process, case studies, FAQ, socials |
| `src/utils/crmContent.js` | Copy for the `/crm-solutions` page (hero, 4 delivery models, features, AI, add-ons, industries, steps, results, CRM FAQ) |
| `src/pages/CrmSolutions.jsx` + `src/components/crm/` | CRM page and its HTML/CSS mocks (dashboard, feature previews, AI chat, add-ons carousel) |
| `src/components/sections/` | Home page sections (Hero, Services, AIInnovation, CrmTeaser, PlatformExplorer, CaseStudies, Integrations, Process, WhyChooseUs, BlogTeaser, FAQ, Contact). `FAQ` takes `items/id/title` props and is reused on the CRM page |
| `src/components/common/` | Design-system pieces: Button, Badge, Section, SectionHeading, Reveal, SpotlightCard, Dialog, Logo, Icon, BrandIcon, Navbar, Footer, PageLayout, WhatsAppButton |
| `src/components/three/` | 3D explorers (HeroGlobe, NeuralScene, EcosystemScene) + `SceneMount` lazy/visibility wrapper |
| `src/components/contact/` | Multi-step project request form (Formspree) |
| `src/utils/seo.js` | `useSeo()` per-route head tags; defaults live in `index.html` |
| `src/content/blog/*.md` | Blog posts (must also be imported in `src/hooks/useBlogData.js` and added to `public/sitemap.xml`) |
| `public/brand/` | Logo (`vin-logo.png`), mark (`vin-mark.png`), OG image, PWA icons |
| `design/brand-source/` | Original logo artwork (not deployed) — source for regenerating icons/OG image |
| `amplify.yml` | Amplify build spec (Node 20, `npm ci --cache .npm`, build, publish `dist/`) |
| `customHttp.yml` | Response headers: CSP, HSTS, nosniff, frame DENY, caching — applied by Amplify on each build |
| `deploy/aws-amplify/rewrites.json` | SPA rewrite rule, pasted once into the Amplify console |
| `docs/` | Human docs: `DEPLOYMENT.md` (Amplify guide), `CONTENT_GUIDE.md` |

## Company facts (source of truth: `COMPANY_INFO` in constants.js)
Email `info@vinsolutions.lk` · Phone/WhatsApp `+94 70 373 4412` · Ragama, Sri Lanka · Facebook page set;
LinkedIn/GitHub/TikTok are empty slots (`SOCIAL_LINKS`) — icons appear when a URL is filled in.
Formspree endpoint `https://formspree.io/f/mppqanpv` (`VITE_FORMSPREE_ENDPOINT` overrides).

## Project skills (`.claude/skills/`) — load the matching one before working
| Skill | Use for |
|---|---|
| `react-frontend` | Components, sections, design tokens, routing, styling conventions |
| `three-scenes` | Anything in `src/components/three/` or adding 3D |
| `site-content` | Editing copy, services, case studies, FAQ, blog posts |
| `seo` | Titles/meta, JSON-LD, sitemap, OG image, domain changes |
| `contact-form` | The request form, Formspree, prefill links |
| `deploy` | Build, AWS Amplify (GitHub) hosting, amplify.yml, headers/CSP, domain, costs |
| `security` | Secrets, env vars, external links, form spam, headers |
| `ui-verification` | Headless-Chrome screenshots and scripted form tests |
| `researcher` | Before adding/upgrading dependencies or using unfamiliar APIs |
| `self-healing` | When something fails; recording new lessons in this file |

## Lessons learned (append new ones here — this is the project memory)
- `react-helmet-async` is incompatible with React 19 and blocked installs; it was removed. Use `useSeo()`.
- drei `<Html>` mounted in a canvas's first commit can silently not render (intermittently) → every scene gates labels with `useLabelsReady()` from `three/utils.js`.
- `instancedMesh` colors must be set before first render or the shader compiles without instance colors.
- OrbitControls sets `touch-action: none` → never mount it on coarse pointers (blocks page scroll on phones).
- Forcing `three` into a `manualChunks` chunk pulled Vite's preload helper into it → three got eagerly preloaded. Let lazy imports split it.
- Markdown from Windows checkouts has `\r\n`; regexes must not rely on `.+\n`.
- Very tall headless screenshots (> ~8000px) repeat content — screenshot per section instead.
- Python heredocs in Git Bash break on curly quotes (’) — write the script to a file in the scratchpad and run it.
- On Windows, a shell whose cwd is inside `dist/` makes `vite build` fail with `emptyDir` — cd out first.
- A clean-copy build (`npm ci --cache .npm --prefer-offline && npm run build`, as in `amplify.yml`) was verified 2026-10-05 — re-run it after dependency changes.
- The CSP in `customHttp.yml` was verified locally (3D, blog deep links, form) — any new third-party domain must be added to it.
- react-markdown runs without remark-gfm: blog tables/strikethrough don't render.
- Headless Chrome with `--use-angle=swiftshader` draws fake horizontal "washed" bands across translucent cards on long pages. For pages
  without WebGL, screenshot with `--disable-gpu` instead before treating it as a CSS bug.
- `vite preview` may listen on IPv6 only; if Puppeteer gets ERR_CONNECTION_REFUSED on localhost, use `http://[::1]:4173`.
- Scroll-snap carousels with horizontal padding need matching `scroll-px-*`, or the first snap shifts scrollLeft and "at start" logic breaks.
