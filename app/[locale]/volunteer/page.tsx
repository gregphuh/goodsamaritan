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
  const t = await getTranslations({ locale, namespace: "Volunteer.hero" });
  return {
    title: "Volunteer",
    description: t("subhead"),
  };
}

const ROLES = [
  {
    title: "Donor records keeper",
    body: "Light data entry, quarterly. Match donations across Zelle, PayPal, and checks; tag by fund. Currently the board chair does this by hand.",
  },
  {
    title: "Annual report writer",
    body: "Help draft the next annual report from the board's notes and photos. Three to four evenings of work each November.",
  },
  {
    title: "Event hosts",
    body: "Host a small donor gathering at your church or home once a year. The board provides photos and stories; you provide coffee and a room.",
  },
  {
    title: "Social media coordinator",
    body: "We do not yet have social accounts. If you would set them up and post quarterly updates, write to us.",
  },
];

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

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="default">
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
            {ROLES.map((role) => (
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
              Use the contact form
            </LinkButton>
            <LinkButton
              href="mailto:gsworldoutreach@gmail.com?subject=Volunteer"
              variant="secondary"
              size="lg"
              external
            >
              Email the board directly
            </LinkButton>
          </div>
        </Container>
      </Section>
    </main>
  );
}
