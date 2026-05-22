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
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Privacy.hero");
  const tPage = await getTranslations("Privacy");
  const tCollect = await getTranslations("Privacy.collect");
  const tUse = await getTranslations("Privacy.use");
  const tNever = await getTranslations("Privacy.never");
  const tWho = await getTranslations("Privacy.who");
  const tRetention = await getTranslations("Privacy.retention");
  const tChoices = await getTranslations("Privacy.choices");
  const tChildren = await getTranslations("Privacy.children");
  const tChanges = await getTranslations("Privacy.changes");
  const tDate = await getTranslations("LegalDate");

  const richBold = {
    strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
  };

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
            <Heading as="h2" size="h2">{tCollect("heading")}</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>{tCollect.rich("donation", richBold)}</li>
              <li>{tCollect.rich("newsletter", richBold)}</li>
              <li>{tCollect.rich("contact", richBold)}</li>
              <li>{tCollect.rich("analytics", richBold)}</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tUse("heading")}</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>{tUse("receipt")}</li>
              <li>{tUse("newsletter")}</li>
              <li>{tUse("ack")}</li>
              <li>{tUse("aggregate")}</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tNever("heading")}</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>{tNever("sell")}</li>
              <li>{tNever("share")}</li>
              <li>{tNever("publish")}</li>
              <li>{tNever("track")}</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">{tWho("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tWho("body")}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tRetention("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tRetention("body")}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tChoices("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tChoices.rich("body", {
                email: (chunks) => (
                  <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">
                    {chunks}
                  </a>
                ),
              })}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tChildren("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tChildren("body")}
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">{tChanges("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tChanges("body")}
            </Text>
          </article>
        </Container>
      </Section>
    </main>
  );
}
