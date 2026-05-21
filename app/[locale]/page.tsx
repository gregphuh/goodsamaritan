import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { LinkButton } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { ImpactStat } from "@/components/primitives/ImpactStat";
import { Scripture } from "@/components/primitives/Scripture";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { Link } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tHero = await getTranslations("Home.hero");
  const tTrust = await getTranslations("Home.trustBand");
  const tProj = await getTranslations("Home.projects");
  const tStory = await getTranslations("Home.story");
  const tNews = await getTranslations("Home.newsletter");
  const tCta = await getTranslations("CTA");

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Hero */}
      <Section surface="inverse" density="spacious">
        <Container width="wide">
          <div className="max-w-[42ch]">
            <Text size="caption" tone="accent" className="mb-6">
              {tHero("eyebrow")}
            </Text>
            <Heading as="h1" size="display" className="text-ink-inverse">
              {tHero("headline")}
            </Heading>
            <Text size="body-lg" tone="inverse" className="mt-6 max-w-[55ch]">
              {tHero("subhead")}
            </Text>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href="/donate" variant="primary" size="lg">
                {tCta("giveMonthly")}
              </LinkButton>
              <a
                href="/annual-reports/2024.pdf"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 text-body-lg font-semibold rounded-sm border border-ink-inverse/30 text-ink-inverse hover:bg-brand-strong transition-colors duration-[160ms]"
              >
                {tCta("readReport")}
                <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Trust band */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <h2 className="mb-10 text-caption text-ink-muted font-body font-semibold uppercase tracking-wider">
            {tTrust("label")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <ImpactStat
              value={tTrust("stat1Value")}
              label={tTrust("stat1Label")}
              detail={tTrust("stat1Detail")}
            />
            <ImpactStat
              value={tTrust("stat2Value")}
              label={tTrust("stat2Label")}
              detail={tTrust("stat2Detail")}
            />
            <ImpactStat
              value={tTrust("stat3Value")}
              label={tTrust("stat3Label")}
              detail={tTrust("stat3Detail")}
            />
            <ImpactStat
              value={tTrust("stat4Value")}
              label={tTrust("stat4Label")}
              detail={tTrust("stat4Detail")}
            />
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Scripture moment */}
      <Section density="default">
        <Container width="content" className="text-center">
          <div className="inline-block text-left">
            <Scripture reference="Galatians 2:10" translation="NIV">
              All they asked was that we should continue to remember the poor — the very thing I was eager to do.
            </Scripture>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Projects teaser */}
      <Section density="default">
        <Container width="wide">
          <Heading as="h2" size="h2" className="max-w-[24ch]">
            {tProj("heading")}
          </Heading>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard
              category="housing"
              title={tProj("housingTitle")}
              body={tProj("housingBody")}
              href="/projects/housing"
              cta={tCta("seeHousing")}
            />
            <ProjectCard
              category="medical"
              title={tProj("medicalTitle")}
              body={tProj("medicalBody")}
              href="/projects/medical"
              cta={tCta("seeMedical")}
            />
            <ProjectCard
              category="firewood"
              title={tProj("firewoodTitle")}
              body={tProj("firewoodBody")}
              href="/projects/firewood"
              cta={tCta("seeWinterAid")}
            />
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Story preview */}
      <Section surface="sunken" density="default">
        <Container width="content">
          <h2 className="mb-6 text-caption text-ink-muted font-body font-semibold uppercase tracking-wider">
            {tStory("heading")}
          </h2>
          <article className="bg-surface-raised border border-rule rounded-md p-8 md:p-10">
            <Heading as="h3" size="h2">
              {tStory("title")}
            </Heading>
            <Text size="body-lg" tone="soft" className="mt-6">
              {tStory("excerpt")}
            </Text>
            <Link
              href="/stories/lutac-family"
              className="mt-8 inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
            >
              {tCta("readStory")}
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </Link>
          </article>
        </Container>
      </Section>

      {/* ──────────────────────────── Newsletter */}
      <Section surface="inverse" density="default">
        <Container width="content">
          <Heading as="h2" size="h2" className="text-ink-inverse max-w-[22ch]">
            {tNews("heading")}
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-4 max-w-[60ch]">
            {tNews("body")}
          </Text>
          <div className="mt-8">
            <NewsletterForm />
          </div>
          <Text size="body-sm" tone="inverse" className="mt-4 text-ink-inverse/70">
            {tNews("trust")}
          </Text>
        </Container>
      </Section>
    </main>
  );
}

type Category = "housing" | "medical" | "firewood";

function ProjectCard({
  category,
  title,
  body,
  href,
  cta,
}: {
  category: Category;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  const accentColor = `var(--color-${category})`;
  return (
    <article className="bg-surface-raised border border-rule rounded-md overflow-hidden flex flex-col">
      <div
        aria-hidden="true"
        className="h-2"
        style={{ backgroundColor: accentColor }}
      />
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <Heading as="h3" size="h3">
          {title}
        </Heading>
        <Text size="body" tone="soft" className="mt-3 flex-1">
          {body}
        </Text>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-body-sm font-semibold text-accent-strong hover:underline underline-offset-4"
        >
          {cta}
          <ArrowUpRight size={16} weight="regular" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
