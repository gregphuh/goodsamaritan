import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
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
  const t = await getTranslations({ locale, namespace: "MissionTrips.hero" });
  return {
    title: "Mission trips",
    description: t("subhead"),
  };
}

const TRIP_INCLUDES = [
  "Flights to and from Bucharest (volunteer pays)",
  "Ground transport across rural Romanian counties",
  "Lodging with partner pastors or budget guesthouses",
  "Meals with the families we visit",
  "A translator alongside the team at every visit",
];

const HELPFUL_SKILLS = [
  "Medical training (nurses, doctors, EMTs)",
  "Construction or basic electrical",
  "Basic Romanian (limba română) — not required",
  "Patience for long drives on rough roads",
  "Willingness to sit with grief",
];

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

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="default" className="relative overflow-hidden">
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
            <a
              href="/annual-reports/2024.pdf"
              className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
            >
              Read the 2024 annual report (PDF)
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </a>
          </article>

          <article>
            <Heading as="h2" size="h2">{tWhat("heading")}</Heading>
            <ul className="mt-4 space-y-2 text-body-lg text-ink-soft list-disc ml-6">
              {TRIP_INCLUDES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tSkills("heading")}</Heading>
            <ul className="mt-4 space-y-2 text-body-lg text-ink-soft list-disc ml-6">
              {HELPFUL_SKILLS.map((line) => (
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
              href="mailto:gsworldoutreach@gmail.com?subject=2026%20trip%20interest"
              variant="primary"
              size="lg"
              external
            >
              {tApply("cta")}
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" size="lg">
              Use the contact form instead
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
