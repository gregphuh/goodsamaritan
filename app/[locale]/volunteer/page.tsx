import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
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
  const t = await getTranslations({ locale, namespace: "Volunteer" });
  const tHero = await getTranslations({ locale, namespace: "Volunteer.hero" });
  return {
    title: t("metaTitle"),
    description: tHero("subhead"),
  };
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Volunteer.hero");
  const tRoles = await getTranslations("Volunteer.roles");
  const tContact = await getTranslations("Volunteer.contact");

  const roles = [
    { title: tRoles("role1Title"), body: tRoles("role1Body") },
    { title: tRoles("role2Title"), body: tRoles("role2Body") },
    { title: tRoles("role3Title"), body: tRoles("role3Body") },
    { title: tRoles("role4Title"), body: tRoles("role4Body") },
  ];

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="spacious">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">{tHero("eyebrow")}</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">{tHero("headline")}</Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">{tHero("subhead")}</Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="standard">
          <Heading as="h2" size="h2">{tRoles("heading")}</Heading>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <li
                key={role.title}
                className="bg-surface-raised border border-rule rounded-md p-6 md:p-7"
              >
                <Heading as="h3" size="h4">{role.title}</Heading>
                <Text size="body" tone="soft" className="mt-3">{role.body}</Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section surface="sunken" density="default">
        <Container width="content">
          <Heading as="h2" size="h2">{tContact("heading")}</Heading>
          <Text size="body-lg" tone="soft" className="mt-4">{tContact("body")}</Text>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/contact" variant="primary" size="lg">
              {tContact("ctaForm")}
            </LinkButton>
            <LinkButton
              href="mailto:gsworldoutreach@gmail.com?subject=Volunteer"
              variant="secondary"
              size="lg"
              external
            >
              {tContact("ctaEmail")}
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
