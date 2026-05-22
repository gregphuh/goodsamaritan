import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { ContactForm } from "@/components/contact/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tHero = await getTranslations({ locale, namespace: "Contact.hero" });
  return {
    title: t("metaTitle"),
    description: tHero("subhead"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Contact.hero");
  const tAlt = await getTranslations("Contact.alt");

  return (
    <main id="main" className="flex flex-col">
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

      <Section density="default">
        <Container width="content">
          <ContactForm />
        </Container>
      </Section>

      <Section surface="sunken" density="default">
        <Container width="content">
          <Heading as="h2" size="h2">{tAlt("heading")}</Heading>
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <dt className="text-caption text-ink-muted uppercase tracking-wider">{tAlt("emailLabel")}</dt>
              <dd className="mt-2">
                <a
                  href="mailto:gsworldoutreach@gmail.com"
                  className="text-body font-semibold text-accent-strong underline-offset-4 hover:underline break-words"
                >
                  gsworldoutreach@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-ink-muted uppercase tracking-wider">{tAlt("mailLabel")}</dt>
              <dd className="mt-2 text-body text-ink">
                Good Samaritan<br />
                2060 Curtis Rd<br />
                Addison Twp, MI 48307
              </dd>
            </div>
            <div>
              <dt className="text-caption text-ink-muted uppercase tracking-wider">{tAlt("zelleLabel")}</dt>
              <dd className="mt-2 text-body text-ink">gsworldoutreach@gmail.com</dd>
            </div>
          </dl>
        </Container>
      </Section>
    </main>
  );
}
