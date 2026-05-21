import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { LinkButton } from "@/components/primitives/Button";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import Image from "next/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import { getMdxComponents } from "@/lib/mdx-components";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildProjectSchema } from "@/lib/seo";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const CATEGORY_HERO: Record<string, { src: string; alt: string; caption: string }> = {
  housing: {
    src: "/images/courtyard-1.jpg",
    alt: "The courtyard of a Romanian home in need of repair.",
    caption: "Current conditions at the home our housing fund is rebuilding.",
  },
  medical: {
    src: "/images/food-delivery.jpg",
    alt: "Open car trunk loaded with groceries, oil, and supplies for a Romanian family.",
    caption: "Supplies headed to a family the board visited.",
  },
  firewood: {
    src: "/images/goats.jpg",
    alt: "Two men with a herd of goats in rural Romania.",
    caption: "Rural life in a Romanian village we serve.",
  },
  mission: {
    src: "/images/dorin-and-kids.jpg",
    alt: "A teacher leading a Romanian Sunday school class.",
    caption: "Missionary support at a partner church.",
  },
  school: {
    src: "/images/classroom-children.jpg",
    alt: "Children in a Romanian Sunday school classroom.",
    caption: "Scholarships and supplies for Romanian schoolchildren.",
  },
  general: {
    src: "/images/countryside.jpg",
    alt: "A Carpathian valley in Romania.",
    caption: "Where most of the work happens.",
  },
};

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale as Locale, slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(locale as Locale, slug);
  if (!project) notFound();

  const tCta = await getTranslations("CTA");

  return (
    <main id="main" className="flex flex-col">
      <JsonLd
        data={buildProjectSchema({
          slug: project.slug,
          locale: project.locale,
          title: project.title,
          summary: project.summary,
          category: project.category,
          year: project.year,
          families: project.families,
          villages: project.villages,
        })}
      />
      {/* ──────────────────────────── Hero */}
      <Section surface="inverse" density="default">
        <Container width="content">
          <div className="flex items-center gap-3 mb-6">
            <Text size="caption" tone="accent">
              {project.year} · {project.category}
            </Text>
            {project.localeFellBack ? (
              <Text size="caption" tone="inverse" className="opacity-70">
                (Original English version. Translation in progress.)
              </Text>
            ) : null}
          </div>
          <Heading as="h1" size="display" className="text-ink-inverse">
            {project.title}
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            {project.summary}
          </Text>

          {(project.families.length > 0 || project.villages.length > 0) ? (
            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {project.families.length > 0 ? (
                <div>
                  <dt className="text-caption text-ink-inverse/70 uppercase tracking-wider">Families</dt>
                  <dd className="mt-1 text-body text-ink-inverse">{project.families.join(", ")}</dd>
                </div>
              ) : null}
              {project.villages.length > 0 ? (
                <div>
                  <dt className="text-caption text-ink-inverse/70 uppercase tracking-wider">Villages</dt>
                  <dd className="mt-1 text-body text-ink-inverse">{project.villages.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </Container>
      </Section>

      {/* ──────────────────────────── Photo banner */}
      <Section density="compact">
        <Container width="standard">
          <figure>
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-md overflow-hidden border border-rule bg-surface-sunken">
              <Image
                src={(CATEGORY_HERO[project.category] ?? CATEGORY_HERO.general).src}
                alt={(CATEGORY_HERO[project.category] ?? CATEGORY_HERO.general).alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-caption text-ink-muted text-center">
              {(CATEGORY_HERO[project.category] ?? CATEGORY_HERO.general).caption}
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* ──────────────────────────── MDX prose */}
      <Section density="default">
        <Container width="prose">
          <article className="max-w-none">
            <MDXRemote source={project.content} components={getMdxComponents()} />
          </article>
        </Container>
      </Section>

      {/* ──────────────────────────── Donate to this fund */}
      <Section surface="sunken" density="compact">
        <Container width="content">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Heading as="h2" size="h3">
                Give to {project.title.toLowerCase()}
              </Heading>
              <Text size="body" tone="soft" className="mt-2 max-w-[55ch]">
                Your gift goes directly to the next family the board hears about in this category.
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/donate" variant="primary" size="md">
                {tCta("giveMonthly")}
              </LinkButton>
              <LinkButton href="/projects" variant="secondary" size="md">
                All projects
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Back nav */}
      <Section density="compact">
        <Container width="content">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-body-sm text-ink-soft hover:text-ink-strong underline-offset-4 hover:underline"
          >
            <span aria-hidden="true">&larr;</span>
            Back to all projects
          </Link>
        </Container>
      </Section>
    </main>
  );
}
