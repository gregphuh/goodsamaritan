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

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Housing, medical, firewood, mission, and scholarship work since 1994. Every project named, photographed in the annual report, visited by a board member.",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getAllProjects(locale as Locale);
  const tCta = await getTranslations("CTA");

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="default">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">
            Projects
          </Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            Categories of aid, by year and by name.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            We organize our work in five categories. Each project below lists the families we walked with this year, the villages we visited, and what your gift covered.
          </Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="wide">
          {projects.length === 0 ? (
            <Text size="body-lg" tone="muted">
              No projects published yet. Check back soon.
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
                          {project.year} · {project.category}
                        </Text>
                        {project.localeFellBack ? (
                          <Text size="caption" tone="muted">
                            (translation pending)
                          </Text>
                        ) : null}
                      </div>
                      <Heading as="h2" size="h2">{project.title}</Heading>
                      <Text size="body-lg" tone="soft" className="mt-3 max-w-[68ch]">
                        {project.summary}
                      </Text>
                      {project.families.length > 0 ? (
                        <Text size="body-sm" tone="muted" className="mt-4">
                          Families this year: {project.families.join(", ")}
                          {project.villages.length > 0 ? (
                            <> &middot; Villages: {project.villages.join(", ")}</>
                          ) : null}
                        </Text>
                      ) : null}
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
                        >
                          Read about {project.title.toLowerCase()}
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
