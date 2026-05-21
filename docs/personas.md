# Personas — Good Samaritan International

**Version:** 1.0 · **Date:** 2026-05-20
**Method:** Proto-personas grounded in the 2024 annual report's named beneficiaries, faith-based fundraising research, and the org's current donation methods (Zelle, PayPal, check). Not from primary interviews — flagged where assumptions should be validated post-launch.

---

## Persona 1 — Margaret · Recurring US Donor

**Primary funding source. Highest LTV. Hardest to lose, easiest to take for granted.**

### Snapshot

- 64, widowed, suburban Michigan. Retired teacher. Active member of a small evangelical church; tithes weekly.
- Currently gives Good Samaritan ~$600/year via quarterly check, written at her kitchen table.
- iPhone 13 with text size bumped up two notches. Reading glasses. Uses Safari, not Chrome.
- Does not have Venmo. Knows what Zelle is but has never used it. Has a PayPal account from buying on eBay in 2019.
- Sees giving as covenant, not transaction. Will give for years to a ministry she trusts, almost none to one she doesn't.

### Goals on this site

1. Convert her quarterly check into a $50/month automatic recurring gift — without thinking about it again until December.
2. See, in plain English, who her money helped this year.
3. Get a printable year-end giving summary for her tax return.
4. Confirm Good Samaritan is the same Forgaciu-led org she's been giving to for years.

### Fears & objections

- Card data theft / unfamiliar online form.
- Joining "another email list" that emails her three times a week.
- Getting auto-charged after she dies, with no way for her son to find and cancel the subscription.
- Discovering the org is mostly overhead.

### What wins her

- The phrase **"2% admin overhead"** visible on `/about` and `/donate`.
- Galatians 2:10 prominent in real serif type — not the current site's hard-to-read cursive.
- "Monthly" toggle as a clear, equal-weight choice — not buried.
- Visible "Cancel anytime in one click" microcopy near the recurring CTA.
- Receipt that reads as a thank-you, signed by a named board member.
- A printable December summary that arrives in her inbox without her asking.

### What loses her

- Body text below 16px. (Realistic floor is 18px.)
- Marketing-tone subject lines ("Save 20% on giving!").
- Donate button hidden below an animation or hero carousel.
- A donate form that asks for phone number as required.
- Vague impact claims ("make a difference today") instead of "$50 = a week of firewood for a Romanian family this winter."

### Design implications

- 18px+ base body; 20px+ on `/about` and `/donate`.
- Serif headline family for warmth; sans for UI.
- Donate button never below the fold on mobile.
- "Monthly" and "One-time" must be visually equal weight. No dark-pattern bias toward one-time.
- Receipt copy reviewed by a human, not GPT.
- Build a December-summary email job into Buttondown or Givebutter automation.

---

## Persona 2 — David · One-Time Story Donor

**The conversion engine. Story-driven. Won't commit recurring on first visit. Tells a friend.**

### Snapshot

- 38, married, two kids (7 and 4), works in healthcare ops, suburban Chicago.
- Attends church most Sundays, not all. Identifies as Christian but his faith life is in a quieter season.
- Doesn't budget for charitable giving. Donates impulsively after something moves him — a sermon, a news story, a friend's Instagram repost.
- Browses on iPhone, evenings 9–11 PM. Discovers content via Instagram DMs from his sister-in-law and from his pastor's Sunday email.
- Has Apple Pay set up and uses it for everything under $200.

### Goals on this site

1. Read the Lutac-family story to the end — actually finish it.
2. Donate to the specific need that moved him (Marta's cancer treatment, Bogdan's eye surgeries).
3. Share the story to one or two people.
4. Not commit to anything recurring — at least not on this visit.

### Fears & objections

- Getting trapped in a guilt-spiral email drip after a one-time gift.
- The org being 60% administrative overhead.
- The story being AI-generated or stock-photo'd. (His generation has been burned.)
- Pop-up upsell mid-checkout interrupting the moment of decision.

### What wins him

- Named family (Lutac · Rauseni, Botosani · Marta · Bogdan) — not "a family in need."
- A real photo of the family with clear consent context.
- A donate button inside the story that reads **"Help the Lutac family"**, not "Donate now," and pre-selects the medical fund.
- Apple Pay support on the donate form.
- One-tap native share sheet on mobile.
- Receipt that says thank you and stops — no upsell, no PS, no "consider making this monthly."

### What loses him

- Stock-photo grandmother. He will close the tab.
- Auto-checked "subscribe to our newsletter" box.
- Required phone field.
- Pop-up modal asking "Make this monthly?" during checkout.
- Story length over 600 words. He skims after 400.

### Design implications

- Each `/stories/[slug]` ends with a contextual donate CTA pre-selecting the fund.
- Apple Pay enabled in Givebutter config.
- Native iOS/Android share sheet on every story page.
- Story word count 250–400. Strong photo at the top. One supporting photo mid-story.
- "Make monthly" upsell appears only in the receipt email, never in the form flow.
- Consent line at the bottom of every story page: "Shared with permission of the family."

---

## Persona 3 — Ben · Mission-Trip Volunteer

**Smaller cohort. High lifetime engagement if converted. Currently has nowhere to land on the site.**

### Snapshot

- 29, single, software contractor in suburban Atlanta. Active in his church's young-adults group.
- Went on a Honduras mission trip in 2023; loved it. Looking for a 2026 trip.
- Romania interests him: his grandmother was Hungarian-Romanian. He's never been.
- Researches on his MacBook in the evenings (Notion-style note-taking); books logistics on his iPhone.
- Will spend 30+ minutes on a single trip page if the info is there. Will close it in 15 seconds if it isn't.

### Goals on this site

1. See trip dates and cost upfront, not in a follow-up email.
2. Understand daily life on the trip: where you sleep, what you eat, language barrier reality.
3. Know what skills are useful so he can self-qualify.
4. Connect with a past volunteer who can answer real questions.

### Fears & objections

- Unstructured trip with no real schedule.
- Org's last trip was 2019 — he'd be the test case.
- Language barrier with no translator on the ground.
- Form-letter response saying "we'll match you with a 2027 trip" with no further detail.

### What wins him

- A dated 2026 trip schedule, even if tentative.
- The board's 2024 RO visit photos repurposed as "this is what your trip will look like" — those are real, recent.
- Specific useful skills listed: medical, electrical, basic construction, basic Romanian.
- A named past volunteer (or board member) with email surfaced for follow-up questions.
- Ballpark cost range with what's included (flight, lodging, food, insurance).

### What loses him

- "Sign up to learn more!" form with no info above it.
- "Contact us about future trips" with no further specifics.
- No cost ballpark anywhere.
- No specific village named.

### Design implications

- `/mission-trips` must show real content even when no trip is scheduled — history of board visits (with 2024 report photos), expected 2026 cost band, skills needed, FAQ.
- Application form is a real form (lands in the board's inbox), not "we'll be in touch."
- Board chair's email surfaced on the page for direct follow-up.
- If no 2026 trip is set: page reads "Trip planning for 2026 — join the interest list" with explicit next-step expectations ("we'll email when dates lock; expected June/July").

---

## Persona 4 — Pastor Andrei · Romanian Local Partner

**Beneficiary-side. Validates the org's accountability narrative. Mostly invisible to US-only thinking.**

### Snapshot

- 47, pastor of a small evangelical church in Botosani county, Romania.
- Knows the Lutac and Ciobanasu families personally — he connected them to GS in 2023.
- Hosts board visits when they come to Romania (the 2024 report's group photos are partly his congregation).
- Samsung A-series Android, patchy 4G. Uses WhatsApp/Messenger for almost all communication; email rarely.
- His English is conversational but he wants the site in Romanian to share with his village.

### Goals on this site

1. Show village families that GS is a real, accountable US 501(c)(3).
2. Flag a new family in need to the board.
3. Share project and story pages with his Romanian congregation.
4. See his own region named on the site so the relationship feels real.

### Fears & objections

- GS is a one-off operation with no continuity.
- American donor norms publish photos in ways that don't match Romanian dignity norms (e.g., putting a sick child's face on a fundraising page without consent).
- The site only exists in English, so it can't be shared with his congregation.

### What wins him

- RO copy that reads as natively Romanian — reviewed by a native speaker, not Google Translated.
- Village names from the 2024 report visible in RO: Botosani, Comana de Sus, Otelu Rosu, Avrameni, Rauseni.
- Photos with clear consent context; option to obscure faces when family asks.
- A "Recomandă o familie" (Recommend a family) Romanian-language form going straight to the board.
- WhatsApp or Messenger contact option alongside email.

### What loses him

- Google-translated Romanian. ("Donați acum!" tone is jarring; native speaker would phrase it differently.)
- Beneficiary photos without obvious consent context.
- Slow page loads on 4G (he gets 1–3 Mbps on a good day).
- PDF-only Romanian content (large download cost on his data plan).

### Design implications

- RO is a real translation track, not a widget. Spec Q2 is blocking for RO launch parity.
- All beneficiary stories include a visible "Shared with permission" line.
- Image lazy-loading, AVIF/WebP, aggressive compression — page weight matters here more than for the US donor.
- Romanian-language contact form with category "Family in need" / "Familie în nevoie."
- Consider surfacing a WhatsApp link in the RO footer alongside email.
- Skip the bandwidth-heavy hero video animation that designers love. Static photo loads on his connection.

---

## Cross-persona implications

These show up in more than one persona and rise to first-class design constraints:

| Constraint | Driven by | Where it lands |
|---|---|---|
| 18px+ base body, 4.5:1 contrast minimum | Margaret, Pastor Andrei | Phase 1 design tokens |
| Real photos, real names, consent visible | All four | Phase 3–4 content rules |
| Donate CTA always one tap away, never below fold | Margaret, David | Phase 1 layout primitives |
| Page weight budget < 200KB on first paint | David (impulse), Andrei (4G) | Phase 1 tooling + Phase 5 audit |
| No dark-pattern bias toward recurring or one-time | Margaret, David | Phase 2 donate form spec |
| RO content must be human-translated | Andrei | Spec Q2 — blocker for RO parity |
| "Shared with permission" line on every story | David, Andrei | Phase 4 story template |
| Mobile native share sheet on stories | David | Phase 4 implementation |

## What to validate post-launch

These are proto-personas, not interview-derived. Within 90 days of launch, validate via Plausible + Givebutter data:

- **Margaret hypothesis:** check-to-recurring conversion happens. Measure: % of new recurring donors whose first GS gift on file was a check.
- **David hypothesis:** stories drive donations. Measure: `/stories/[slug]` → `/donate` CTR. Target ≥15%.
- **Ben hypothesis:** trip interest exists. Measure: `/mission-trips` traffic + interest-list signups. If <10 in first 90 days, deprioritize trip funnel investment.
- **Andrei hypothesis:** RO audience is real. Measure: RO-prefixed pageviews, RO contact form submissions. If RO traffic <2% after 90 days, scale back RO content investment to about/donate only.

If primary research becomes possible (interviewing 2–3 actual recurring donors, 1–2 RO partners), update this doc with quotes and refine personas accordingly.
