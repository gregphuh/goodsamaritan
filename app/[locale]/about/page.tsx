import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { LinkButton } from "@/components/primitives/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFoundersSchema, buildRomaniaPlaceSchema } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const tHero = await getTranslations({ locale, namespace: "About.hero" });
  return {
    title: t("metaTitle"),
    description: tHero("subhead"),
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
  const tContact = await getTranslations("About.contact");
  const tCta = await getTranslations("CTA");

  return (
    <main id="main" className="flex flex-col">
      {buildFoundersSchema().map((person) => (
        <JsonLd key={person["@id"]} data={person} />
      ))}
      <JsonLd data={buildRomaniaPlaceSchema()} />
      {/* ──────────────────────────── Hero */}
      <Section surface="inverse" density="spacious">
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

      {/* ──────────────────────────── Our team (volunteer + non-compensated, front and center) */}
      <Section density="default">
        <Container width="content">
          <Heading as="h2" size="h2">{tTeam("heading")}</Heading>
          <p className="mt-4 font-display text-h3 text-ink-strong italic">
            {tTeam("lead")}
          </p>
          <Text size="body-lg" tone="soft" className="mt-6">
            {tTeam("body")}
          </Text>
        </Container>
      </Section>

      {/* ──────────────────────────── Our history + Mission + Faith (text-only) */}
      <Section surface="sunken" density="default">
        <Container width="content" className="space-y-14">
          <article>
            <Heading as="h2" size="h2">{tHistory("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tHistory("body")}
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
              {tCta("contactUs")}
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
