import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Terms.hero");
  const tPage = await getTranslations("Terms");
  const tAbout = await getTranslations("Terms.about");
  const tDonations = await getTranslations("Terms.donations");
  const tContent = await getTranslations("Terms.content");
  const tAcceptable = await getTranslations("Terms.acceptable");
  const tWarranty = await getTranslations("Terms.warranty");
  const tDisputes = await getTranslations("Terms.disputes");
  const tChanges = await getTranslations("Terms.changes");
  const tContact = await getTranslations("Terms.contact");
  const tDate = await getTranslations("LegalDate");

  return (
    <main id="main" className="flex flex-col">
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

      <Section density="default">
        <Container width="content" className="space-y-12">
          <Text size="body-sm" tone="muted">
            {tPage("lastUpdatedLabel")} {tDate("lastUpdated")}
          </Text>

          <article>
            <Heading as="h2" size="h2">{tAbout("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tAbout("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tDonations("heading")}</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>{tDonations("item1")}</li>
              <li>{tDonations("item2")}</li>
              <li>{tDonations("item3")}</li>
              <li>{tDonations("item4")}</li>
              <li>{tDonations("item5")}</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tContent("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tContent("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tAcceptable("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tAcceptable("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tWarranty("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tWarranty("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tDisputes("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tDisputes("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tChanges("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">{tChanges("body")}</Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tContact("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tContact.rich("body", {
                email: (chunks) => (
                  <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">
                    {chunks}
                  </a>
                ),
              })}
            </Text>
          </article>
        </Container>
      </Section>
    </main>
  );
}
