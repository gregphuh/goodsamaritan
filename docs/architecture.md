# Architecture & Frontend Rules

**Version:** 1.0 · **Date:** 2026-05-20
Authoritative reference for component structure, CSS strategy, tokens, i18n, and faith-org anti-patterns. Locked decisions; no re-litigation without spec amendment.

---

## Design dial overrides

The high-agency design skill defaults to high variance + heavy motion + Vercel-tech aesthetic. **Wrong audience.** Overridden:

| Dial | Default | This project | Why |
|---|---|---|---|
| `DESIGN_VARIANCE` | 8 | **4** | Older donor demo prefers predictable. Some asymmetry, no masonry/chaos. |
| `MOTION_INTENSITY` | 6 | **2** | CSS transitions only. No Framer Motion magnetic buttons, no infinite loops. Slow Android needs this. |
| `VISUAL_DENSITY` | 4 | **3** | Gallery-mode: generous whitespace, large text. Margaret (64yo, reading glasses) sets the floor. |

Also rejected: Bento grid paradigm (wrong vibe), Inter (banned site-wide), Geist/Satoshi (tech-startup register; wrong for faith charity), glassmorphism, magnetic hover, perpetual micro-animations.

---

## 1. Component structure

```
app/
  [locale]/                          # next-intl segment
    layout.tsx                       # locale provider, fonts, header, footer
    page.tsx                         # /
    donate/page.tsx
    about/page.tsx
    projects/
      page.tsx
      [slug]/page.tsx
    stories/
      page.tsx
      [slug]/page.tsx
    mission-trips/page.tsx
    volunteer/page.tsx
    contact/page.tsx
    privacy/page.tsx
    terms/page.tsx
  api/
    contact/route.ts
    newsletter/route.ts
  globals.css
components/
  primitives/                        # server-safe atoms, NO 'use client'
    Container.tsx
    Section.tsx
    Heading.tsx
    Text.tsx
    Button.tsx
    Link.tsx
    Card.tsx
    Scripture.tsx
    ImpactStat.tsx
  layout/                            # global shell
    Header.tsx                       # server
    Footer.tsx                       # server
    DonateBar.tsx                    # 'use client' (sticky mobile, scroll-aware)
    LanguageSwitcher.tsx             # 'use client' (router)
    Nav.tsx                          # server (mobile drawer uses client child)
  home/                              # page-specific composites
  donate/
  about/
  projects/
  stories/
content/
  en/projects/*.mdx
  en/stories/*.mdx
  ro/projects/*.mdx
  ro/stories/*.mdx
lib/
  content.ts                         # MDX loader with Zod schema validation
  i18n.ts                            # next-intl config + routing
  seo.ts                             # JSON-LD generators (NPO, Person, Place, Project, DonateAction)
  fonts.ts                           # next/font config
messages/
  en.json
  ro.json
public/
  images/
    stories/{family}/*.{webp,avif}
    projects/{slug}/*.{webp,avif}
    og/*.png
  annual-reports/2024.pdf
styles/
  tokens.css                         # CSS custom properties — single source of truth
tailwind.config.ts
next.config.mjs
```

### Rules

- **`components/primitives/`**: server-safe atoms. No `useState`, no `useEffect`, no `'use client'`. If you need interactivity, build a `*.client.tsx` sibling and import.
- **`components/<page>/`**: page-specific composites. Promote to `primitives/` only on third use.
- **`'use client'` is a leaf-only directive.** Layouts and page files stay server. The mobile donate bar is client; the page that renders it is server.
- **No barrel exports** (`index.ts` re-exports). They break Next.js tree-shaking. Import direct paths.
- **One component per file.** Filename matches default export.
- **Components that take children must accept `className`** and merge it via `cn()` helper (clsx + tailwind-merge).

---

## 2. CSS strategy — enforced token-only Tailwind

The brief bans `bg-blue-500`, `text-gray-700`, etc. in components. **Enforced at build time**, not by lint.

### Tailwind v4 reality (project uses v4, not v3)

Scaffold gave us Tailwind v4 + Next 16. There is no `tailwind.config.ts`. All theme tokens live in `app/globals.css` under `@theme inline { ... }` and override the entire color palette. The v3 example below is illustrative of the principle; actual implementation is in CSS:

```css
@import "tailwindcss";

@theme inline {
  --color-*: initial;            /* nuke every default color name */
  --color-surface: var(--gs-cream-50);
  --color-ink: var(--gs-ink-900);
  --color-accent: var(--gs-gold-500);
  --color-brand: var(--gs-navy-900);
  /* etc — see styles section in globals.css */
}
```

`--color-*: initial` is the v4 idiom for wiping Tailwind's default palette so `bg-blue-500` produces no class. The semantic tokens we define become the only valid color utilities.

### v3 reference (the principle, not the implementation)

```ts
// (Illustrative only — we use v4 CSS approach above)
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      // Surfaces
      surface: 'var(--color-surface)',
      'surface-raised': 'var(--color-surface-raised)',
      'surface-sunken': 'var(--color-surface-sunken)',
      'surface-inverse': 'var(--color-surface-inverse)',
      // Ink (text)
      ink: {
        DEFAULT: 'var(--color-ink)',
        strong: 'var(--color-ink-strong)',
        soft: 'var(--color-ink-soft)',
        muted: 'var(--color-ink-muted)',
        inverse: 'var(--color-ink-inverse)',
      },
      // Accent (single accent — warm gold)
      accent: {
        DEFAULT: 'var(--color-accent)',
        strong: 'var(--color-accent-strong)',
        soft: 'var(--color-accent-soft)',
      },
      // Brand (deep navy — for header, hero, footer)
      brand: {
        DEFAULT: 'var(--color-brand)',
        strong: 'var(--color-brand-strong)',
        soft: 'var(--color-brand-soft)',
      },
      rule: 'var(--color-rule)',
      focus: 'var(--color-focus)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      danger: 'var(--color-danger)',
    },
    // ...
  },
  plugins: [],
} satisfies Config;
```

Replacing (not extending) means `bg-blue-500` compiles to nothing — silent omission. To make it loud, add a **postcss check** or simple eslint rule that flags any `(bg|text|border|ring|fill|stroke|outline|divide|placeholder|caret|accent|decoration|shadow)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}` in `**/*.tsx`. Lint failure = CI failure.

### What components write

```tsx
// good
<button className="bg-accent text-ink-inverse hover:bg-accent-strong">

// banned (compile-silent, lint-fails)
<button className="bg-amber-500 text-white hover:bg-amber-600">
```

### Where raw values live

Only in `styles/tokens.css`. Components touch semantic names exclusively.

---

## 3. Token naming — two layers

### Layer 1: Primitive (the value)

Hex/rgb values. Live in `styles/tokens.css` under `:root`. Prefixed `--gs-*`. Components **never** reference these.

```css
:root {
  /* Navy scale — built from current site #43496f, refined deeper */
  --gs-navy-50:  #eef0f6;
  --gs-navy-100: #d6dae7;
  --gs-navy-300: #8a93b3;
  --gs-navy-500: #3d4670;
  --gs-navy-700: #232c52;
  --gs-navy-900: #141a35;
  --gs-navy-950: #0c1024;

  /* Warm gold — accent */
  --gs-gold-50:  #fbf6e8;
  --gs-gold-300: #e9c875;
  --gs-gold-500: #c89a35;
  --gs-gold-700: #8e6a1f;

  /* Cream — warm neutral surfaces */
  --gs-cream-50:  #faf6ef;
  --gs-cream-100: #f3ecdd;
  --gs-cream-200: #e9dec5;

  /* Ink — off-black with navy undertone */
  --gs-ink-900: #11151c;
  --gs-ink-700: #2c3340;
  --gs-ink-500: #586272;
  --gs-ink-300: #8a92a0;
  --gs-ink-100: #d8dce2;
}
```

Exact swatches will be locked in the next sub-task (palette pick) — values above are starting point.

### Layer 2: Semantic (the role)

Map roles → primitives. Components reference these.

```css
:root {
  --color-surface:         var(--gs-cream-50);    /* page background */
  --color-surface-raised:  #ffffff;               /* cards, panels */
  --color-surface-sunken:  var(--gs-cream-100);
  --color-surface-inverse: var(--gs-navy-900);    /* footer, hero overlay */

  --color-ink:         var(--gs-ink-900);
  --color-ink-strong:  var(--gs-ink-900);
  --color-ink-soft:    var(--gs-ink-700);
  --color-ink-muted:   var(--gs-ink-500);
  --color-ink-inverse: var(--gs-cream-50);

  --color-accent:        var(--gs-gold-500);
  --color-accent-strong: var(--gs-gold-700);
  --color-accent-soft:   var(--gs-gold-50);

  --color-brand:        var(--gs-navy-900);
  --color-brand-strong: var(--gs-navy-950);
  --color-brand-soft:   var(--gs-navy-50);

  --color-rule:    var(--gs-ink-100);
  --color-focus:   var(--gs-gold-500);
  --color-success: #2f7a4b;
  --color-warning: #b8861b;
  --color-danger:  #b03a3a;
}
```

Dark mode is **out of scope** for v1. Faith-org sites on light backgrounds out-convert dark-mode versions; revisit only if data shows otherwise.

---

## 4. Bilingual MDX with next-intl

### Strategy: mirror tree (one file per locale per slug)

```
content/
  en/stories/lutac-family.mdx
  ro/stories/lutac-family.mdx     # same slug, RO content
```

- Loader (`lib/content.ts`) reads `content/<locale>/<type>/<slug>.mdx`.
- Falls back to EN if RO missing, with a translator banner: "Această poveste încă nu este disponibilă în română."
- Frontmatter validated with Zod — same schema across locales:

```ts
const StorySchema = z.object({
  slug: z.string(),
  family: z.string(),
  village: z.string(),
  category: z.enum(['housing','medical','firewood','mission','school']),
  published: z.string(),                // ISO date
  consent: z.literal(true),             // hard gate — story doesn't render without
  heroImage: z.string(),
  excerpt: z.string().max(180),
});
```

- next-intl handles all UI strings (`messages/{locale}.json`) — buttons, nav, labels.
- MDX handles long-form prose (stories, project descriptions).
- Hard rule: **`consent: true` frontmatter is required** for any `/stories/*` MDX to compile. Loader throws on missing.

### Why not strategy B (one file, both locales in frontmatter)

Translators want plain files. JSON-in-frontmatter is hostile to non-developers. Mirror-tree wins.

---

## 5. Faith-org / nonprofit anti-patterns — banned upfront

| Pattern | Why banned | Use instead |
|---|---|---|
| Stock photo families | Donors detect stock instantly; collapses trust | Real beneficiary photos with named consent |
| AI-generated crosses, hands praying, doves | Faith audience finds generative religious imagery offensive | Real photos or restrained iconography only |
| Animated crosses, light rays, dove gradients | Reads as televangelist kitsch | Static photographic + serif typography |
| Scripture from quote APIs | Verse choice signals tradition; wrong pick alienates | Only verses the org has already publicly used (Galatians 2:10 confirmed) |
| Red "DONATE NOW" buttons | PBS pledge-drive aesthetic | Warm-gold accent + warm verbs ("Give", "Help the Lutacs", "Support Marta") |
| Vague impact copy ("make a difference") | Costs nothing, signals nothing | Always tie to real number from 2024 report ($25 = a week of groceries) |
| Donor-saviorism framing | Patronizes beneficiary partners; offends mature donors | Partnership language: "Walking with Romanian families since 1994" |
| Animation on scripture | Cheapens sacred content | Scripture appears, never animates in |
| Carousel hero rotating stories | A11y nightmare, slide 2 unread, dilutes any single story | Pick one story, give it weight |
| Pop-up cookie banner | Plausible needs none; banners feel corporate | No banner |
| "Diverse hands meeting in middle" clip-art | Generic stock-NPO trope | Real field photos from 2024 |
| Trust-badge wall (Charity Navigator etc) below the fold | These earn rating after years; org isn't rated | Show 501(c)(3) + EIN + 2024 report link instead |
| "Stories of impact" without family consent | Legal + ethical | `consent: true` frontmatter gate enforced by loader |

---

## 6. Performance budget

| Metric | Budget | Reason |
|---|---|---|
| Initial HTML | < 30 KB | Pastor Andrei's 4G |
| First-paint CSS | < 20 KB inline-critical | LCP target |
| JS on `/` | < 50 KB gzipped | Older Android |
| JS on `/donate` | < 90 KB (Givebutter embed counts separately) | Donor demo |
| Image format | AVIF with WebP fallback | Bandwidth on 4G |
| Image sizing | `next/image` with explicit width/height always | CLS = 0 |
| Fonts | 2 families × 2 weights max, self-hosted via next/font | FOUT control |
| Lighthouse mobile | ≥ 90 on `/`, `/donate`; ≥ 85 elsewhere | Spec goal |

---

## 7. Accessibility floor (WCAG 2.1 AA, with stricter local minimums)

- Body text: **18px minimum** (not the 16px floor most guides set). Set in tokens.
- Contrast: 4.5:1 body, 3:1 large text — but design to 7:1 where possible.
- Focus rings: visible, gold against navy and navy against cream. Never `outline: none` without replacement.
- Tap targets: 44×44 px minimum.
- Heading hierarchy: one `<h1>` per page, no skipping levels.
- Skip-to-content link in `<Header>`, first focusable element.
- Alt text: every image (decorative gets `alt=""`).
- Forms: `<label>` above input, error text below, `aria-describedby` linking error to input.
- `prefers-reduced-motion`: respected. All transitions become instant.

---

## 8. What the build never does

- No client-side data fetching on page first paint (server fetch only).
- No third-party fonts via `<link>` (use `next/font` always — self-hosts, prevents FOUT).
- No Tailwind defaults: every color must reference a semantic token.
- No emojis. Anywhere. Including alt text. Use restrained SVG icons (Phosphor `regular`, stroke 1.5).
- No magic numbers in JSX (`mt-[37px]`). Use the spacing scale.
- No `as any` in TypeScript. Type properly or use `unknown`.
- No `<a target="_blank">` without `rel="noopener noreferrer"`.
- No tracking pixels beyond Plausible.
