import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { RomaniaFlag } from "@/components/brand/RomaniaFlag";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Accountability" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// 2023 actuals from the GS donor report. Romania still 76%, but the remaining
// 24% is split across UK / US / Guatemala / Spain / Niger — not Africa or the
// older Moldova/Canada/Haiti/Greece mix the placeholder used.
const GEOGRAPHIC_PCT: ReadonlyArray<{ key: string; pct: number; flag?: boolean }> = [
  { key: "romania", pct: 76, flag: true },
  { key: "unitedStates", pct: 15 },
  { key: "unitedKingdom", pct: 5 },
  { key: "guatemala", pct: 2 },
  { key: "spain", pct: 1 },
  { key: "niger", pct: 1 },
];

// 2023 use-of-funds: Housing is much bigger than the placeholder suggested
// (the Pojar roof + Dragomir home purchase dominated). Scholarships swapped
// for the actual line item, Church building.
const USE_OF_FUNDS_PCT = [
  { key: "needyFamilies", pct: 42 },
  { key: "housing", pct: 36 },
  { key: "missionarySupport", pct: 17 },
  { key: "aidDelivery", pct: 3 },
  { key: "churchBuild", pct: 1 },
  { key: "administration", pct: 1 },
] as const;

export default async function AccountabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Accountability.hero");
  const tStats = await getTranslations("Accountability.stats");
  const tGeo = await getTranslations("Accountability.geographic");
  const tFunds = await getTranslations("Accountability.fundsUse");
  const tClosing = await getTranslations("Accountability.closing");

  const headlineStats = [
    { value: tStats("countriesValue"), label: tStats("countriesLabel"), detail: tStats("countriesDetail") },
    { value: tStats("familiesValue"), label: tStats("familiesLabel"), detail: tStats("familiesDetail") },
    { value: tStats("efficiencyValue"), label: tStats("efficiencyLabel"), detail: tStats("efficiencyDetail") },
  ];

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Hero */}
      <Section surface="inverse" density="spacious">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">{tHero("eyebrow")}</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            {tHero("headline")}
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            {tHero("subhead")}
          </Text>
        </Container>
      </Section>

      {/* ──────────────────────────── Dashboard — 3 headline counters */}
      <Section surface="sunken" density="spacious">
        <Container width="wide">
          <dl className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {headlineStats.map((stat) => (
              <div key={stat.label} className="bg-surface-raised border border-rule rounded-md p-8">
                <dt className="font-display text-[3.5rem] md:text-[4rem] leading-none text-ink-strong tabular-nums">
                  {stat.value}
                </dt>
                <dd className="mt-4">
                  <p className="text-body font-semibold text-ink uppercase tracking-wide">{stat.label}</p>
                  <p className="mt-2 text-body-sm text-ink-soft">{stat.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ──────────────────────────── Geographic + funds breakdowns */}
      <Section density="spacious">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Geographic distribution */}
            <div>
              <Heading as="h2" size="h3">{tGeo("heading")}</Heading>
              <Text size="body" tone="soft" className="mt-4 max-w-[44ch]">
                {tGeo("body")}
              </Text>
              <ul className="mt-10 space-y-4" role="list" aria-label={tGeo("ariaLabel")}>
                {GEOGRAPHIC_PCT.map((row) => (
                  <li key={row.key} className="flex items-center gap-4">
                    <div className="w-40 shrink-0 flex items-center gap-2.5">
                      {row.flag ? (
                        <RomaniaFlag height={16} title={tGeo("romania")} />
                      ) : (
                        <span aria-hidden="true" className="w-6 inline-block" />
                      )}
                      <span className={row.flag ? "text-body font-semibold text-ink-strong" : "text-body font-semibold"}>
                        {tGeo(row.key)}
                      </span>
                    </div>
                    <div className="flex-1 h-3 bg-surface-sunken rounded-pill overflow-hidden border border-rule">
                      <div
                        className="h-full bg-accent rounded-pill"
                        style={{ width: `${row.pct}%` }}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="w-12 text-right text-body font-semibold tabular-nums">{row.pct}%</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use of funds */}
            <div>
              <Heading as="h2" size="h3">{tFunds("heading")}</Heading>
              <Text size="body" tone="soft" className="mt-4 max-w-[44ch]">
                {tFunds("body")}
              </Text>
              <ul className="mt-10 divide-y divide-rule border-y border-rule" aria-label={tFunds("ariaLabel")}>
                {USE_OF_FUNDS_PCT.map((row) => (
                  <li key={row.key} className="flex items-center gap-4 py-4">
                    <span className="font-display text-h4 text-ink-strong tabular-nums w-16 shrink-0">{row.pct}%</span>
                    <span className="text-body text-ink-soft flex-1">{tFunds(row.key)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Trust closing */}
      <Section surface="sunken" density="default">
        <Container width="content">
          <Heading as="h2" size="h2" className="mb-4">{tClosing("heading")}</Heading>
          <Text size="body-lg" tone="soft" className="max-w-[60ch]">
            {tClosing.rich("body", {
              email: (chunks) => (
                <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">
                  {chunks}
                </a>
              ),
            })}
          </Text>
        </Container>
      </Section>
    </main>
  );
}
