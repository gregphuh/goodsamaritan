import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { LinkButton } from "@/components/primitives/Button";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { Link } from "@/i18n/routing";
import { getAllStories } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Named families, named villages, real winters. Stories from the families we walk with in Romania.",
};

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stories = await getAllStories(locale as Locale);

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="default">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">Stories</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            Real families. By name.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            We publish stories only with the named family's permission. Every story below is one we visited in person, prayed with, and continue to walk with.
          </Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="standard">
          {stories.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="space-y-8">
              {stories.map((story) => (
                <li key={story.slug}>
                  <article className="bg-surface-raised border border-rule rounded-md p-8 md:p-10">
                    <Text size="caption" tone="muted" className="mb-2">
                      {story.year} · {story.village} · {story.category}
                    </Text>
                    <Heading as="h2" size="h2">{story.title}</Heading>
                    <Text size="body-lg" tone="soft" className="mt-3 max-w-[68ch]">
                      {story.excerpt}
                    </Text>
                    <Link
                      href={`/stories/${story.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
                    >
                      Read the {story.family} family&rsquo;s story
                      <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                    </Link>
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

function EmptyState() {
  return (
    <div className="bg-surface-raised border border-rule rounded-md overflow-hidden max-w-2xl mx-auto">
      <div className="relative aspect-[16/9] bg-surface-sunken">
        <Image
          src="/images/classroom-children.jpg"
          alt="Children in a Romanian Sunday-school classroom, listening to a teacher at the table."
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="object-cover"
        />
      </div>
      <div className="p-10 md:p-14 text-center">
      <Heading as="h2" size="h3">Stories are coming, with permission.</Heading>
      <Text size="body" tone="soft" className="mt-4 max-w-[55ch] mx-auto">
        We&rsquo;re confirming consent with the families we walked with in 2024 before publishing their stories on a public site. We expect the first five stories — the Lutac, Dragomir, Anton, Ciobanasu, and Murariu families — within the next several weeks.
      </Text>
      <Text size="body" tone="soft" className="mt-4 max-w-[55ch] mx-auto">
        Until then, the 2024 annual report names every family and includes the photos from our visit.
      </Text>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href="/annual-reports/2024.pdf"
          className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-accent text-on-accent font-semibold text-body"
        >
          Read the 2024 report
          <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
        </a>
        <LinkButton href="/projects" variant="secondary" size="md">
          See projects by category
        </LinkButton>
      </div>
      </div>
    </div>
  );
}
