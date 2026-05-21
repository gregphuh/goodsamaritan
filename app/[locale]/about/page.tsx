import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { LinkButton } from "@/components/primitives/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { RomaniaFlag } from "@/components/brand/RomaniaFlag";
import { buildFoundersSchema, buildRomaniaPlaceSchema } from "@/lib/seo";

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
  const tTeam = await getTranslations("About.team");
  const tHistory = await getTranslations("About.history");
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
      {buildFoundersSchema().map((person) => (
        <JsonLd key={person["@id"]} data={person} />
      ))}
      <JsonLd data={buildRomaniaPlaceSchema()} />
      {/* ──────────────────────────── Hero — Romania countryside as full-bleed */}
      <Section surface="inverse" density="default" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/countryside.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-surface-inverse/40" />
        </div>
        <Container width="content" className="relative">
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

      {/* ──────────────────────────── Our team (volunteer + non-compensated, front and center) */}
      <Section density="default">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <Heading as="h2" size="h2">{tTeam("heading")}</Heading>
              <p className="mt-4 font-display text-h3 text-ink-strong italic">
                {tTeam("lead")}
              </p>
              <Text size="body-lg" tone="soft" className="mt-6">
                {tTeam("body")}
              </Text>
            </div>

            <figure className="lg:col-span-5 self-start">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-sunken">
                <Image
                  src="/images/team-build-site.jpg"
                  alt="Members of the team standing together at a project site in Romania."
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-caption text-ink-muted">
                On site in Romania.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Our history + Mission + Faith (with photos) */}
      <Section surface="sunken" density="default">
        <Container width="wide" className="space-y-16">
          <article className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-7">
              <Heading as="h2" size="h2">{tHistory("heading")}</Heading>
              <Text size="body-lg" tone="soft" className="mt-4">
                {tHistory("body")}
              </Text>
            </div>
            <figure className="md:col-span-5">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-raised">
                <Image
                  src="/images/church-build.jpg"
                  alt="A small Romanian church with a white cross on its roof, photographed during a recent construction project."
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-caption text-ink-muted">
                A partner church we have walked with for years.
              </figcaption>
            </figure>
          </article>

          <article className="max-w-[68ch] mx-auto">
            <Heading as="h2" size="h2">{tMission("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4 italic">
              {tMission("body")}
            </Text>
          </article>

          <article className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <figure className="md:col-span-5 md:order-1">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-raised">
                <Image
                  src="/images/classroom-jesus.jpg"
                  alt="A Romanian Sunday-school classroom wall showing a painted scene of Jesus with children, captioned in Romanian: 'Let the little children come to me' (Luke 18:16)."
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-caption text-ink-muted">
                <em>&ldquo;Lăsați copilașii să vină la Mine&rdquo;</em> — Luke 18:16, on a Romanian Sunday-school wall.
              </figcaption>
            </figure>
            <div className="md:col-span-7 md:order-2">
              <Heading as="h2" size="h2">{tFaith("heading")}</Heading>
              <Text size="body-lg" tone="soft" className="mt-4">
                {tFaith("body")}
              </Text>
            </div>
          </article>
        </Container>
      </Section>

      {/* ──────────────────────────── Where we serve */}
      <Section density="default">
        <Container width="wide">
          <Heading as="h2" size="h2" className="max-w-[24ch]">
            {tWhere("heading")}
          </Heading>
          <Text size="body-lg" tone="soft" className="mt-4 max-w-[60ch]">
            {tWhere("body")}
          </Text>

          <div className="mt-10 space-y-3" role="list" aria-label="2024 geographic distribution of aid">
            {GEOGRAPHIC_SPLIT.map((row) => {
              const isRomania = row.country === "Romania";
              return (
                <div key={row.country} className="flex items-center gap-4" role="listitem">
                  <div className="w-40 shrink-0 flex items-center gap-2.5">
                    {isRomania ? (
                      <RomaniaFlag height={16} title="Flag of Romania" />
                    ) : (
                      <span aria-hidden="true" className="w-6 inline-block" />
                    )}
                    <span
                      className={isRomania
                        ? "text-body font-semibold text-ink-strong"
                        : "text-body font-semibold"}
                    >
                      {row.country}
                    </span>
                  </div>
                  <div className="flex-1 h-3 bg-surface-raised rounded-pill overflow-hidden border border-rule">
                    <div
                      className="h-full bg-accent rounded-pill"
                      style={{ width: `${row.pct}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="w-12 text-right text-body font-semibold tabular-nums">{row.pct}%</div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Use of funds */}
      <Section surface="sunken" density="default">
        <Container width="standard">
          <Heading as="h2" size="h2">{tFunds("heading")}</Heading>

          <ul className="mt-8 divide-y divide-rule border-y border-rule" aria-label="2024 use of funds">
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
      <Section density="default">
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
