# HANDOFF

Current status of the Good Samaritan International website rebuild.

## Quickstart

```bash
cd /Users/gregphuh/Claude/GoodSamaritan
npm install                 # if fresh checkout
npm run dev                 # localhost:3000 (PORT=3030 used during dev)
npm run build               # full prod build, 31 prerendered pages
npm run typecheck           # strict TS check
```

## Stack

- Next.js 16 (App Router), React 19, Turbopack
- Tailwind v4 (CSS-only `@theme inline` tokens in `app/globals.css`)
- next-intl 4 for EN/RO routing (`/` and `/ro` prefix)
- next-mdx-remote + gray-matter for `/content/{locale}/{type}/{slug}.mdx`
- Zod-validated frontmatter (project: required title/category/summary; story: required `consent: true`)
- Fraunces was rejected (impeccable reflex list); Source Serif 4 + Source Sans 3, both Google Fonts, both Latin Extended for Romanian diacritics
- Givebutter (donation), Buttondown (email), Plausible (analytics), Vercel (hosting) — all locked in spec
- Phosphor Icons (regular weight) for restrained iconography, no emoji

## What is shipping

| Route | EN | RO |
|---|---|---|
| `/` home | ✅ | ✅ (RO copy AI-drafted, needs native review) |
| `/about` | ✅ | ✅ same |
| `/donate` | ✅ (Givebutter placeholder; Zelle+PayPal+check fully live) | ✅ |
| `/projects` list | ✅ | ✅ (project MDX renders EN via fallback) |
| `/projects/{housing,medical,firewood}` | ✅ (real 2024 content) | falls back to EN |
| `/stories` list | ✅ empty-state until consent | ✅ same |
| `/mission-trips` | ✅ (interest-list pattern) | ✅ |
| `/volunteer` | ✅ | ✅ |
| `/contact` + `/api/contact` | ✅ form + stub API | ✅ |
| `/privacy`, `/terms` | ✅ EN-only inline copy | RO routes show EN |
| `/api/newsletter` | ✅ stub (logs payload; TODO Buttondown wire) | — |
| `/annual-reports/2024.pdf` | ✅ static | — |

JSON-LD schema rendered on every page: Organization (site-wide), Person × 2 + Place (on /about), DonateAction (on /donate), Project (on /projects/[slug]). Validate at https://search.google.com/test/rich-results.

## Open questions blocking launch

| # | Question | Owner | Blocks |
|---|---|---|---|
| Q1 | Which 2024 families consent to being named publicly on `/stories`? | Org board | `/stories/[slug]` content (page shell ready) |
| Q2 | EN→RO translator (Greg, org volunteer, or paid)? | Greg + Org | RO content parity for prose pages |
| Q6 | $1 test card for end-to-end donation test | Greg | Phase 2 close-out E2E test |
| Q7 | Phone number publishable on /contact? | Org | Not blocking; default is email-only |
| Q10 | Givebutter account + campaign ID for embed | Greg + Org | `/donate` card-payment path |

## Phase progression

- **Phase 0** — spec.md + personas.md committed (1 commit)
- **Phase 1** — design system + i18n + audit (5 commits): tokens, 8 primitives, font + palette, scaffold, EN/RO routing, /impeccable audit + fixes
- **Phase 2** — home + donate (5 commits): UX copy via /ux-copy, header/footer/MobileMenu/DonateBar/LanguageSwitcher, real home page, full /donate, /accessibility-review fixes (9 → 0)
- **Phase 3** — trust pages + schema (4 commits): MDX loader with Zod, /about with funds-breakdown chart, /projects list + /[slug] dynamic + 3 real MDX, lib/seo.ts schema generators wired
- **Phase 4** — engagement + legal (5 commits): /contact + /mission-trips + /volunteer + /privacy + /terms + /stories empty-state + welcome-email-sequence markdown
- **Phase 5** — pre-launch QA (next): full SEO audit, per-page a11y review, repo-level /impeccable pass, Lighthouse, redirect verification
- **Cutover** — DNS switch at low-traffic window

## Architectural decisions (do not re-litigate; see docs/architecture.md)

- Token-only Tailwind v4: default colors nuked via `--color-*: initial`. Components reference semantic tokens (`bg-surface`, `text-ink-soft`, `bg-accent`).
- Two-layer tokens: primitives (`--gs-navy-900` in `:root`) wrapped by semantics (`--color-brand: var(--gs-navy-900)` in `@theme inline`).
- `/` is EN; `/ro` is Romanian; localePrefix `as-needed`.
- App router: `app/layout.tsx` is a pass-through; `app/[locale]/layout.tsx` owns `<html>`/`<body>`/`<NextIntlClientProvider>`/Header/Footer/DonateBar.
- Primitives in `components/primitives/` are server-safe. Client components live alongside in `components/{layout,home,donate,contact}/` with explicit `'use client'`.
- No em dashes in user copy (architecture ban). Scripture quotes are exempt (NIV is canonical).
- Side-stripe borders banned (impeccable). Top accent stripes (used on project cards) are acceptable.
- Body text floor 18px. WCAG 2.1 AA across the board.
- prefers-reduced-motion: all transitions 100ms opacity-only.
- Body has `pb-[5rem] md:pb-0` so the mobile sticky DonateBar doesn't obscure content.

## Files that need attention before launch

| File | What to do |
|---|---|
| `app/[locale]/donate/page.tsx` | Replace the `#givebutter-mount` placeholder with the real `<script>` + `<givebutter-widget>` tags once Q10 returns |
| `app/api/newsletter/route.ts` | Wire to Buttondown via `BUTTONDOWN_API_KEY` env var (TODO comment in file) |
| `app/api/contact/route.ts` | Wire to email transport (Resend/Postmark) so messages forward to gsworldoutreach@gmail.com (TODO comment) |
| `messages/ro.json` | Native-speaker review of every Romanian string (`_translatorNote` flags this) |
| `content/en/projects/*.mdx` | Add 2+ more real 2024 projects (Mission and Scholarships are not yet covered) |
| `content/en/stories/*.mdx` | Add at least 5 named-family stories once Q1 consent returns. Schema requires `consent: true` — won't compile otherwise |
| `app/[locale]/stories/[slug]/page.tsx` | Build this page once at least one story MDX exists; pattern mirrors `/projects/[slug]/page.tsx` |
| `README.md`, `AGENTS.md`, `CLAUDE.md` | Currently the create-next-app defaults; replace with org-specific guidance |
| `app/favicon.ico` | Currently Next.js default. Replace with GS-specific favicon |

## How to add a new project

```bash
# Drop a file at content/en/projects/{slug}.mdx with frontmatter:
---
title: Mission
category: mission
summary: 1-2 sentence description, 240 chars max.
year: 2024
featured: false
families: ["Family A", "Family B"]
villages: ["Village 1"]
---

Body in Markdown / MDX. Will auto-appear at /projects/{slug}
and in the list at /projects.
```

Translation: optional. Mirror at `content/ro/projects/{slug}.mdx` with same frontmatter shape and translated body. Until then, RO route falls back to EN with a "translation pending" notice.

## How to add a new story

Same pattern as projects but in `content/en/stories/{slug}.mdx`. Frontmatter MUST include `consent: true` (Zod will throw at build otherwise). When the first story MDX lands, build the `/stories/[slug]` page (it's not in the tree yet because there's nothing to render).

## How to update the home hero

UI strings live in `messages/en.json` under `Home.hero`. Body sections in `messages/en.json` under `Home.*`. Update once, both `/` and `/ro` reflect (RO via `messages/ro.json`).

## Deploy

Not yet pushed to GitHub or Vercel (no remote configured). When ready:

1. Create `good-samaritan-web` GitHub repo. Push `main`.
2. Create Vercel project, import the repo. Vercel auto-detects Next.js.
3. Set env vars (`BUTTONDOWN_API_KEY`, future donation processor keys).
4. Connect domain `goodsamaritaninternational.org` once parity is verified.
5. Old GoDaddy URL redirects (`/about-us`, `/contact-us`) already configured in `next.config.ts`.

## Daily-log section

### 2026-05-20 / 21 (cross-day session)

- Phase 0 closed: spec.md + personas.md.
- Phase 1 closed: tokens (two-layer), 8 primitives, EN+RO routing, audit fixes including Fraunces → Source Serif 4 swap.
- Phase 2 closed: UX copy, full chrome, real home, /donate (with Givebutter placeholder + working alt methods), 9-issue a11y review fixed.
- Phase 3 closed: MDX loader with Zod + consent-gated stories schema, /about with gold-bar geographic chart and use-of-funds list, /projects + /[slug] + 3 MDX, JSON-LD schema generators wired into 4 page types.
- Phase 4 closed: /contact + /api stub, /mission-trips, /volunteer, /privacy, /terms, /stories empty-state, 5-email welcome sequence in docs/email-sequences.md.
- Verified visually at 1400px throughout. Mobile 375px verification deferred to Phase 5 (Chrome MCP couldn't resize below 1350).
- All 31 pages prerendered; build clean; no TS errors.
- Two Phase-2 blockers and one Phase-4 blocker remain owned by Greg / org.
