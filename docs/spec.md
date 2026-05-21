# Good Samaritan International — Website Rebuild Spec

**Version:** 1.0 · **Date:** 2026-05-20
**Domain:** goodsamaritaninternational.org (kept, no migration)
**Organization:** Good Samaritan Org · 501(c)(3) · EIN 38-3401779
**Founded:** 1994 · Nistor & Floare Forgaciu
**Mailing address:** 2060 Curtis Rd, Addison Twp, MI 48307
**Contact:** gsworldoutreach@gmail.com

---

## Problem Statement

The current site (GoDaddy Website Builder, last updated 2023) undermines donor trust through stale dates, generic clip-art, scripty cursive scripture, and a fragmented donation flow split across Zelle, PayPal, and mailed checks. There is no mobile-optimized donate path, no recurring-giving option, no project pages, and no testimony/story content — the single highest-converting content type for faith-based fundraising. The org distributed roughly $100,000 to named families and missionaries across Romania, USA, UK, and Africa in 2024, but a US donor visiting the current site sees none of that specificity and cannot become a monthly supporter in under five taps.

The cost of not solving this: the org's primary growth lever — recurring US donors — is gated behind a site that reads as defunct.

---

## Goals

1. **Activate monthly recurring giving.** Currently zero. Target: 25 active recurring donors within 90 days of launch, $1,500/month run-rate by day 180.
2. **One-tap donate path from anywhere.** Donate button persistent in header (desktop) + sticky bottom bar (mobile), on every page.
3. **Earn trust above the fold on home.** 501(c)(3) badge, EIN, founding year (1994), 2024 impact number ($100K to families), and link to the 2024 annual report PDF visible without scrolling on a 375px viewport.
4. **Replace clip-art with named-family specificity.** Every project page and every story uses real 2024 family names (Lutac, Dragomir, Anton, Ciobanasu, Murariu, etc.) and real Romanian villages. No stock photos. No AI-generated imagery. No clip-art.
5. **Lighthouse mobile ≥90** on `/` and `/donate`. Older donor demographic — speed matters more than animation.
6. **WCAG 2.1 AA on every page.** Same demographic reason: large text, high contrast, keyboard navigation.

---

## Non-Goals

1. **No native mobile app.** PWA-grade web is sufficient.
2. **No custom donor portal/login.** Givebutter hosts donor accounts, receipts, and recurring management.
3. **No self-service visual CMS.** Content is MDX in the repo, edited via PR. The org went 3 years without an update — a visual CMS solves a problem that doesn't exist. Revisit if cadence exceeds monthly.
4. **No e-commerce / merch.** Off-mission and adds sales-tax burden.
5. **No third-party CRM integration at launch.** Givebutter export → Google Sheets is sufficient at ~$100K annual scale.
6. **No Romanian-only marketing campaigns at launch.** RO content is for beneficiary/partner trust, not US-style fundraising. Routing is baked in; full content parity is post-launch.
7. **No comments / forum / live chat.** Moderation cost > engagement value.

---

## User Stories

### Persona 1 — Recurring US Donor ("Margaret", primary funding source)

- As a retired church member, I want to set up a $50/month recurring gift in under two minutes on my phone, so I don't have to remember to give each month.
- As a recurring donor, I want to see exactly which fund my last 12 months supported, so my giving feels specific.
- As a recurring donor, I want a one-click December tax summary.
- As a recurring donor, I want to know admin overhead before I commit (answer: 2% per the 2024 report — surface this).

### Persona 2 — One-Time US Donor ("David", moved by a specific story)

- As a one-time donor who just read the Lutac-family story, I want a "Donate to medical needs" button in that story that pre-selects the medical fund.
- As a one-time donor, I want impact-labeled tiers ("$25 = a week of groceries for one family") instead of guessing what's meaningful.
- As a one-time donor, I want a visible "Make this monthly" toggle so upgrading is one tap.
- As a one-time donor, I want my receipt to arrive within 60 seconds and read as a thank-you, not a Stripe invoice.

### Persona 3 — Mission-Trip Volunteer ("Ben", US church member, 20s–40s)

- As someone considering a 2026 Romania trip, I want to see dates, costs, and what to expect on `/mission-trips` without filling a form first.
- As a prospective volunteer, I want to know what skills are useful (medical, construction, language) so I can self-qualify.
- As a prospective volunteer, I want to submit an application that lands in the board's email, not a lead-form abyss.

### Persona 4 — Romanian Local Partner ("Pastor Andrei", beneficiary-village pastor)

- As a Romanian pastor working with GS-funded families, I want a Romanian-language `/about` and `/projects`, so I can show our village this is a real US org with accountability.
- As a Romanian partner, I want a contact form in Romanian to flag a family in need.
- As a Romanian partner, I want to see the board has visited my region by name in the 2024 report, so I trust the relationship.

---

## Requirements

### P0 — Must-Have for Launch

**Site-wide**

- Persistent **Donate** CTA: header (desktop), sticky bottom bar (mobile), on every page.
- Footer on every page: 501(c)(3) status, EIN 38-3401779, mailing address, Zelle email, link to 2024 annual report PDF.
- Language switcher EN ↔ RO, top-right, persists across navigation.
- WCAG 2.1 AA: ≥4.5:1 body contrast, keyboard nav, focus rings, alt text on all images, skip-to-content link.
- Lighthouse mobile ≥90 on `/`, `/donate`, `/about`; ≥85 elsewhere.
- Real field photos only (from 2024 report + Greg uploads). No stock, AI imagery, or clip-art.

**Home (`/`)**

- Hero: cross + Galatians 2:10 NIV scripture, set in a real serif (not cursive). Headline grounded in specifics ("Serving Romanian families since 1994").
- Trust band above the fold: 1994 founded · 501(c)(3) · ~$100K distributed in 2024 · 2% admin overhead.
- Current project teaser → `/projects`.
- One named-family story preview → `/stories`.
- Newsletter signup (Buttondown).

**Donate (`/donate`)**

- Givebutter embed: monthly/one-time toggle.
- Tiered amounts with impact labels: $25 groceries · $50 firewood · $100 medical · $250 home repair · custom.
- Fund selector: General · Housing · Medical · Firewood · Mission · School.
- Zelle, PayPal, and check-by-mail options shown below the embed — the org's preferred methods stay first-class.
- Receipt copy = thank-you, not transaction confirmation (configured in Givebutter).
- `DonateAction` schema.org JSON-LD.

**About (`/about`)**

- Founder story: Nistor & Floare Forgaciu, 1994 founding.
- Faith statement.
- 2024 annual report embedded/downloadable.
- Use-of-funds breakdown: Needy 56% · Mission 20% · Housing 14% · Aid delivery 6% · School 2% · Admin 2%.
- Geographic split: Romania 76% · USA 16% · UK 5% · Africa 3%.
- `Person` schema for founders, `Place` schema for Romania.

**Projects (`/projects`, `/projects/[slug]`)**

- List of active + recent projects: Housing · Medical · Firewood/Winter · Missionary Support · Scholarships.
- Per-project page with named families served, photos, "Donate to this fund" CTA.
- Minimum 5 project pages at launch (one per category from 2024 report).

**Stories (`/stories`, `/stories/[slug]`)**

- Minimum 5 named-family testimony pages at launch, drawn from 2024 report: Lutac · Dragomir · Anton · Ciobanasu · Murariu.
- Each story: photo, family name, village, what GS provided, scripture if applicable, donate-to-this-fund CTA.
- **Consent required from named families before publishing.**

**Contact (`/contact`)**

- Form posting to gsworldoutreach@gmail.com (no third-party CRM).
- Phone (if org provides), mailing address, Zelle email.
- Subject selector: General · Mission trip · Romanian partner · Press.

**Legal**

- `/privacy` and `/terms` — required for donations and email capture under most state nonprofit-registration rules.

**Technical**

- Next.js 15 App Router, Tailwind with custom tokens (no default blue/gray surfaced).
- next-intl with EN (default) + RO routing (`/ro/...` prefix).
- MDX in `/content/{projects,stories}`, Zod-validated frontmatter.
- Givebutter embed on `/donate`, recurring giving enabled.
- Buttondown API for newsletter capture.
- Plausible analytics (no cookie banner needed).
- Vercel hosting, free tier.
- Redirects from old URLs (`/about-us` → `/about`, `/contact-us` → `/contact`).

### P1 — Fast-Follow

- `/mission-trips`: page ships at launch as "interest list" if no 2026 trip is scheduled; full trip funnel when one is.
- `/volunteer`: US-based non-trip roles.
- `/api/og` dynamic Open Graph images per project/story.
- RSS feed for `/stories`.
- Donor wall (anonymous default, opt-in recognition via Givebutter).

### P2 — Future Considerations

- Custom donor portal (only if Givebutter's portal proves insufficient).
- Translated RO newsletter list.
- Sermon/teaching audio embeds if leadership adds teaching content.
- Beneficiary-side updates (Romanian families post moderated thank-you notes).
- Multi-currency donation (EUR/RON) if EU donors materialize.
- Auto-generated annual report PDF from MDX content.

---

## Success Metrics

### Leading Indicators (measured 7–30 days post-launch)

| Metric | Target | Stretch | Source |
|---|---|---|---|
| Monthly recurring donor signups | 5 in first 30 days | 10 | Givebutter |
| `/donate` conversion rate | 4% of visitors complete a donation | 7% | Givebutter + Plausible |
| `/stories` → `/donate` CTR | 15% | 25% | Plausible |
| Mobile bounce rate on `/` | <55% | <40% | Plausible |
| RO language switch usage | 5%+ of sessions | 10% | Plausible custom event |
| Newsletter signups | 10 in first 30 days | 25 | Buttondown |

### Lagging Indicators (measured 90–180 days post-launch)

| Metric | Target | Stretch |
|---|---|---|
| Active recurring donors | 25 | 50 |
| Monthly recurring revenue | $1,500/mo | $3,500/mo |
| Annual giving via site | $40K (40% of 2024 baseline) | $75K |
| Mission-trip applications | 5 | 15 |
| Story-page → donate conversion | 8% | 15% |

### Measurement Rules

- Source of truth for revenue: Givebutter monthly report.
- Source of truth for traffic: Plausible.
- Review cadence: 30, 90, 180 days post-launch.

---

## Open Questions

| # | Question | Owner | Blocking |
|---|---|---|---|
| Q1 | Which 2024 families consent to being named publicly on `/stories`? | Org board | **Blocks Phase 4** |
| Q2 | Who translates EN → RO? Greg, org volunteer, or paid translator? | Greg / Org | **Blocks RO launch parity** |
| Q3 | Additional scripture verses beyond Galatians 2:10? | Org board | Not blocking; default to single anchor verse |
| Q4 | Forgaciu family still actively leading, or successor to name? Assumed "same people" from Greg's confirmation. | Org board | Not blocking |
| Q5 | Board roster: individual pages or single team paragraph on `/about`? | Org board | Not blocking; default = paragraph |
| Q6 | $1 test donation card source for end-to-end Phase 2 test | Greg | **Blocks Phase 2 sign-off** |
| Q7 | Phone number publishable on `/contact`, or email-only? | Org board | Not blocking; default email-only |
| Q8 | Any 2026 mission trip scheduled? | Org board | Not blocking; ships as interest list |
| Q9 | Photo library beyond annual report + current site? | Greg | Not blocking |
| Q10 | Givebutter account: existing, or create new? Named admin? | Greg + Org | **Blocks Phase 2** |

---

## Timeline & Phasing

No external hard deadline. One PR per phase, each independently shippable to a preview deploy.

| Phase | Scope | Est. | Blockers |
|---|---|---|---|
| 0 | Spec + personas (this doc) | done at commit | — |
| 1 | Brand tokens + base components | ~2 days | Token review |
| 2 | `/` + `/donate` | ~3 days | Q6, Q10 |
| 3 | `/about` + `/projects` + 1 `/projects/[slug]` | ~3 days | None |
| 4 | `/stories` + `/mission-trips` + `/volunteer` | ~3 days | Q1 |
| 5 | Pre-launch (SEO, a11y, Lighthouse, redirects) | ~2 days | — |
| Cutover | DNS switch in low-traffic window, 24h monitoring | ~1 day | All phases shipped |

RO content parity is a parallel track that may lag launch by ~2 weeks if translator capacity is constrained; routing is in place from Phase 1.

---

## Architectural Decisions (no re-litigation)

1. **Next.js 15 App Router on Vercel.** Stable features only, no canary.
2. **Tailwind + custom tokens.** No CSS-in-JS. Raw Tailwind color names (`bg-blue-500`) forbidden in components — must reference token names.
3. **MDX in `/content/{projects,stories}`** with Zod-validated frontmatter.
4. **next-intl, `/` (EN) + `/ro` routing.** No subdomain split.
5. **Givebutter for donations.** Embedded form; org keeps Zelle + PayPal + mailing as alternates.
6. **Buttondown for newsletter.** API-driven signup form, not embed.
7. **Plausible analytics.** Use Plausible's NPO program for free managed plan.
8. **Static + ISR by default.** Server functions only for contact form and newsletter signup.
