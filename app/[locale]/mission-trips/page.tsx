import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { LinkButton } from "@/components/primitives/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MissionTrips" });
  const tHero = await getTranslations({ locale, namespace: "MissionTrips.hero" });
  return {
    title: t("metaTitle"),
    description: tHero("subhead"),
  };
}

export default async function MissionTripsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("MissionTrips.hero");
  const tHistory = await getTranslations("MissionTrips.history");
  const tWhat = await getTranslations("MissionTrips.what");
  const tSkills = await getTranslations("MissionTrips.skills");
  const tCost = await getTranslations("MissionTrips.cost");
  const tApply = await getTranslations("MissionTrips.apply");

  const tripIncludes = [
    tWhat("item1"),
    tWhat("item2"),
    tWhat("item3"),
    tWhat("item4"),
    tWhat("item5"),
  ];

  const helpfulSkills = [
    tSkills("item1"),
    tSkills("item2"),
    tSkills("item3"),
    tSkills("item4"),
    tSkills("item5"),
  ];

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="spacious" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/countryside.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-surface-inverse/40" />
        </div>
        <Container width="content" className="relative">
          <Text size="caption" tone="accent" className="mb-6">{tHero("eyebrow")}</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">{tHero("headline")}</Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">{tHero("subhead")}</Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="content" className="space-y-14">
          <article>
            <Heading as="h2" size="h2">{tHistory("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tHistory("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tWhat("heading")}</Heading>
            <ul className="mt-4 space-y-2 text-body-lg text-ink-soft list-disc ml-6">
              {tripIncludes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tSkills("heading")}</Heading>
            <ul className="mt-4 space-y-2 text-body-lg text-ink-soft list-disc ml-6">
              {helpfulSkills.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tCost("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tCost("body")}</Text>
          </article>
        </Container>
      </Section>

      <Section surface="sunken" density="default">
        <Container width="content">
          <Heading as="h2" size="h2">{tApply("heading")}</Heading>
          <Text size="body-lg" tone="soft" className="mt-4">{tApply("body")}</Text>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton
              href="mailto:gsworldoutreach@gmail.com?subject=Trip%20interest"
              variant="primary"
              size="lg"
              external
            >
              {tApply("cta")}
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              {tApply("ctaContactForm")}
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
