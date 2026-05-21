import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { LinkButton } from "@/components/primitives/Button";

const USE_OF_FUNDS = [
  { key: "needy" as const, pct: 56 },
  { key: "mission" as const, pct: 20 },
  { key: "housing" as const, pct: 14 },
  { key: "aid" as const, pct: 6 },
  { key: "school" as const, pct: 2 },
  { key: "admin" as const, pct: 2 },
];

const GEOGRAPHIC_SPLIT = [
  { country: "Romania", pct: 76 },
  { country: "United States", pct: 16 },
  { country: "United Kingdom", pct: 5 },
  { country: "Africa", pct: 3 },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.hero" });
  return {
    title: "About",
    description: t("subhead"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("About.hero");
  const tFounders = await getTranslations("About.founders");
  const tMission = await getTranslations("About.mission");
  const tFaith = await getTranslations("About.faith");
  const tWhere = await getTranslations("About.where");
  const tFunds = await getTranslations("About.funds");
  const tAccountability = await getTranslations("About.accountability");
  const tContact = await getTranslations("About.contact");
  const tCta = await getTranslations("CTA");

  const fundLabel = (key: (typeof USE_OF_FUNDS)[number]["key"]) =>
    tFunds(`${key}Label` as "needyLabel");

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Hero */}
      <Section surface="inverse" density="default">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">
            {tHero("eyebrow")}
          </Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            {tHero("headline")}
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            {tHero("subhead")}
          </Text>
        </Container>
      </Section>

      {/* ──────────────────────────── Founders + Mission + Faith (stacked prose) */}
      <Section density="default">
        <Container width="content" className="space-y-14">
          <article>
            <Heading as="h2" size="h2">{tFounders("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tFounders("body")}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tMission("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4 italic">
              {tMission("body")}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tFaith("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tFaith("body")}
            </Text>
          </article>
        </Container>
      </Section>

      {/* ──────────────────────────── Where we serve */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <Heading as="h2" size="h2" className="max-w-[24ch]">
            {tWhere("heading")}
          </Heading>
          <Text size="body-lg" tone="soft" className="mt-4 max-w-[60ch]">
            {tWhere("body")}
          </Text>

          <div className="mt-10 space-y-3" role="list" aria-label="2024 geographic distribution of aid">
            {GEOGRAPHIC_SPLIT.map((row) => (
              <div key={row.country} className="flex items-center gap-4" role="listitem">
                <div className="w-32 shrink-0 text-body font-semibold">{row.country}</div>
                <div className="flex-1 h-3 bg-surface-raised rounded-pill overflow-hidden border border-rule">
                  <div
                    className="h-full bg-accent rounded-pill"
                    style={{ width: `${row.pct}%` }}
                    aria-hidden="true"
                  />
                </div>
                <div className="w-12 text-right text-body font-semibold tabular-nums">{row.pct}%</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Use of funds */}
      <Section density="default">
        <Container width="standard">
          <Heading as="h2" size="h2">{tFunds("heading")}</Heading>
          <Text size="body-lg" tone="soft" className="mt-3">{tFunds("body")}</Text>

          <ul className="mt-10 divide-y divide-rule border-y border-rule" aria-label="2024 use of funds">
            {USE_OF_FUNDS.map((row) => (
              <li key={row.key} className="flex items-center gap-4 py-4">
                <span className="font-display text-h3 text-ink-strong tabular-nums w-16 shrink-0">{row.pct}%</span>
                <span className="text-body text-ink-soft flex-1">{fundLabel(row.key)}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ──────────────────────────── Accountability */}
      <Section surface="sunken" density="default">
        <Container width="content">
          <Heading as="h2" size="h2">{tAccountability("heading")}</Heading>
          <Text size="body-lg" tone="soft" className="mt-4">{tAccountability("body")}</Text>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/annual-reports/2024.pdf"
              className="inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
            >
              {tAccountability("reportLink")}
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </a>
            <a
              href="https://apps.irs.gov/app/eos/allSearch?ein1=38-3401779"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
            >
              {tAccountability("irsLink")}
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </a>
            <Text size="body" tone="muted" className="mt-2">
              {tAccountability("einLine")}
            </Text>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Contact CTA */}
      <Section surface="inverse" density="default">
        <Container width="content">
          <Heading as="h2" size="h2" className="text-ink-inverse">{tContact("heading")}</Heading>
          <Text size="body-lg" tone="inverse" className="mt-4">{tContact("body")}</Text>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/donate" variant="primary" size="lg">
              {tCta("giveMonthly")}
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Contact us
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
