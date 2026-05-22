import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { getAllProjects } from "@/lib/content";
import { Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ministries" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getAllProjects(locale as Locale);
  const tHero = await getTranslations("Ministries.hero");
  const tPage = await getTranslations("Ministries");
  const tCta = await getTranslations("CTA");

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
        <Container width="wide">
          {projects.length === 0 ? (
            <Text size="body-lg" tone="muted">
              {tPage("empty")}
            </Text>
          ) : (
            <ul className="space-y-8">
              {projects.map((project) => (
                <li key={project.slug}>
                  <article className="bg-surface-raised border border-rule rounded-md overflow-hidden">
                    <div
                      aria-hidden="true"
                      className="h-1.5"
                      style={{ backgroundColor: `var(--color-${project.category})` }}
                    />
                    <div className="p-8 md:p-10">
                      <div className="flex items-baseline gap-3 mb-2">
                        <Text size="caption" tone="muted">
                          {project.category}
                        </Text>
                        {project.localeFellBack ? (
                          <Text size="caption" tone="muted">
                            {tPage("fallbackPending")}
                          </Text>
                        ) : null}
                      </div>
                      <Heading as="h2" size="h2">{project.title}</Heading>
                      <Text size="body-lg" tone="soft" className="mt-3 max-w-[68ch]">
                        {project.summary}
                      </Text>
                      {project.families.length > 0 ? (
                        <Text size="body-sm" tone="muted" className="mt-4">
                          {tPage("familiesHelped", { count: project.families.length })}
                        </Text>
                      ) : null}
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/ministries/${project.slug}`}
                          className="inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
                        >
                          {tPage("readAbout", { title: project.title.toLowerCase() })}
                          <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                        </Link>
                        <Link
                          href="/donate"
                          className="text-body-sm text-ink-soft hover:text-ink-strong underline-offset-4 hover:underline"
                        >
                          {tCta("giveMonthly")}
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </main>
  );
}
