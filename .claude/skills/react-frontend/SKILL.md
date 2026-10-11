---
name: react-frontend
description: Conventions for building or changing React components, home-page sections, styling and routing on the VIN Cloud Solutions site (React 19 + Vite + Tailwind 3, plain JSX). Use before editing anything in src/components, src/pages, src/index.css or tailwind.config.js.
---

# React frontend — VIN Cloud Solutions

## Stack facts
- React 19, **plain JSX** (no TypeScript), Vite 6, Tailwind CSS **3** (config in `tailwind.config.js`, not v4 CSS config).
- Animation: framer-motion 12. Icons: lucide-react (via `common/Icon.jsx` name map) and `common/BrandIcon.jsx`
  (Simple Icons paths: whatsapp, facebook, tiktok, github, linkedin — lucide has no WhatsApp/TikTok).
- Routing: react-router 7 `BrowserRouter` in `App.jsx`, routes `/`, `/blog`, `/blog/:slug`, `*`.
- No state library; local state + props. Content comes from `src/utils/constants.js`.

## Design tokens (tailwind.config.js) — use these, don't invent colors
- Surfaces `ink-950 … ink-600` (blue-tinted near-black). Body is `bg-ink-900 text-slate-300`.
- Brand teal `brand-50 … brand-900` (sampled from the logo; `brand-500 #4588A0`).
- Highlights: `glow` (#67E8F9 cyan), `ai` (#A78BFA violet — only for AI-related accents).
- Fonts: `font-display` Space Grotesk (all h1–h4 automatically), `font-sans` Inter, `font-mono` JetBrains Mono (eyebrows, labels, badges).
- Shadows `shadow-glow`, `shadow-glow-lg`. Animations `animate-marquee | spin-slow | pulse-soft | shimmer`.
- Utility classes in `src/index.css`: `.glass`, `.text-gradient`, `.text-gradient-ai`, `.eyebrow`, `.input-field`,
  `.bg-grid`, `.mask-radial`, `.mask-fade-x/y`, `.article` (blog typography), `.container-custom`.

## Building blocks (src/components/common) — reuse before writing new markup
| Component | Notes |
|---|---|
| `Section` | `<section>` with `id`, `labelledBy`, default `py-20 md:py-28`. Sections with `id` get scroll-margin for the fixed navbar. |
| `SectionHeading` | eyebrow + h2 (`title` + gradient `highlight`) + description; `align="left"|"center"`; pass `id` used by `labelledBy`. |
| `Container` | max-w-7xl gutter wrapper. |
| `Reveal` | fade-up on scroll, respects reduced motion; `as` prop for li etc. |
| `SpotlightCard` | card with cursor-follow glow; `as`, `glow` props. |
| `Button` | variants `primary|secondary|ghost`, sizes `sm|md|lg`. **`href` starting with `/` renders a router `<Link>`** (keeps query prefill without reload). |
| `Badge` | `default|accent|ai` pill, mono font. |
| `Dialog` | accessible modal (Esc, backdrop, focus trap, scroll lock). Pass a **stable** `onClose` (useCallback). |
| `AutoScrollSlider` | endless slow left drift (`speed` px/s). Pauses on hover, keyboard focus, drag, off-screen, hidden tab, `paused` prop; resumes ~2.5 s after interaction. Arrows, ←/→, mouse drag, swipe, pause/play, counter + progress. Loops (with clones) only when items overflow. `renderItem(item, { clone })`: clones must set `tabIndex={-1}`. Used by Our work. |
| `Logo` | mark on a light tile (the dark arrow in the logo is invisible on dark bg — always keep a light tile behind the logo). |
| `PageLayout` | skip link + Navbar + `<main id="main">` + Footer + floating WhatsApp button. Every page uses it. |

## Conventions
- Match surrounding code: 4-space indent, single quotes, named section components exported default, comments only for non-obvious "why".
- One `<h1>` per page (Hero / page header). Sections use h2 via `SectionHeading`; cards use h3.
- Copy and lists belong in `constants.js`, not hard-coded in components (see `site-content` skill).
- Icons referenced by name in constants must exist in the `ICONS` map in `common/Icon.jsx` — add them there.
- Internal anchors: use root-relative hashes (`/#services`) so they work from `/blog`. `ScrollManager` in `App.jsx`
  scrolls to `hash` on every navigation (`location.key`), retrying until the section renders.
- Accessibility: tabs use `role="tablist"/"tab"` + `aria-selected`; toggles use `aria-pressed`/`aria-checked`;
  decorative elements `aria-hidden`; keep visible focus (global `:focus-visible` ring in index.css).
- Respect `prefers-reduced-motion` (Reveal and CSS already do; new motion must too).
- Mobile first: check 390px width — no horizontal scroll, 16px gutters, tap targets ≥ 40px.

## Adding a home-page section
1. Data → `constants.js`. 2. Component in `components/sections/` using `Section` + `SectionHeading` + `Reveal`.
3. Register in `pages/Home.jsx` in story order (Hero → Partners → Services → AI → Platforms → Work → Integrations →
   Process → Why → Insights → FAQ → Contact). 4. If it needs nav, add to `NAV_LINKS` (keep ≤ 6 items).
5. `npm run build`, then screenshot desktop + mobile (`ui-verification`).

## Performance budget
- Main JS ≈ 220 kB gzip; three.js chunk ≈ 260 kB gzip loads **only** when a 3D scene nears the viewport.
- Never import `three`/`@react-three/*` outside `components/three/`, and only load scenes via `React.lazy` + `SceneMount`.
- Images: put brand assets in `public/brand/`, give `<img>` explicit `width/height`, `loading="lazy"` below the fold.
