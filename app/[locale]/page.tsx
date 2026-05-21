import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BrandCross } from "@/components/brand/BrandCross";
import { RomaniaFlag } from "@/components/brand/RomaniaFlag";
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
  const tSite = await getTranslations("Site");

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Hero
           Left column carries the brand mark (cross + motto + verse).
           Right column carries the message (eyebrow + headline + CTAs).
           This split de-crowds the center of the banner. */}
      <Section surface="inverse" density="spacious">
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start md:items-center">
            {/* Brand identity — cross + motto + verse, anchored left.
                Cross draws in on page load (animated prop); motto fades
                in after the cross finishes drawing. */}
            <div className="md:col-span-5 flex md:block flex-col items-center md:items-start text-center md:text-left">
              <BrandCross
                size={200}
                strokeWidth={5.5}
                animated
                className="text-ink-inverse/85"
              />
              <p className="motto-fade-in mt-6 font-cursive text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] text-accent leading-[1.1] max-w-[14ch] mx-auto md:mx-0">
                {tSite("motto")}
              </p>
              <p className="motto-fade-in mt-3 text-body-sm text-ink-inverse/70 uppercase tracking-wider font-semibold">
                {tSite("mottoReference")}
              </p>
            </div>

            {/* Message — eyebrow + headline + subhead + CTAs */}
            <div className="md:col-span-7">
              <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-sm font-semibold uppercase tracking-wider">
                <span className="inline-flex items-center gap-2">
                  <RomaniaFlag height={20} title="Flag of Romania" />
                  <span className="text-accent">{tHero("eyebrowLocale")}</span>
                </span>
                <span aria-hidden="true" className="text-ink-inverse/40">·</span>
                <span className="text-ink-inverse/70">{tHero("eyebrowFaith")} since 1994</span>
              </div>
              <h1 className="font-display font-medium text-[2.25rem] md:text-[2.75rem] lg:text-[3.5rem] leading-[1.1] tracking-tight text-ink-inverse text-balance">
                {tHero("headline")}
              </h1>
              <p className="mt-6 text-[1.125rem] md:text-[1.375rem] leading-[1.5] text-ink-inverse/90 max-w-[58ch]">
                {tHero("subhead")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
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
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Trust band */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <h2 className="mb-10 text-caption text-ink-muted font-body font-semibold uppercase tracking-wider">
            {tTrust("label")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
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

      {/* ──────────────────────────── Projects (landing-page section) */}
      <Section surface="sunken" density="default" id="projects">
        <Container width="wide">
          <div className="max-w-[60ch]">
            <Heading as="h2" size="h2">Projects</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              We organize our work in five categories. Every project below names the families we walked with, the villages we visited, and what your gift covered.
            </Text>
          </div>

          {/* Featured project — the family in the current housing project */}
          <article className="mt-12 bg-surface-raised border border-rule rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-0 md:aspect-auto bg-surface-sunken">
              <Image
                src="/images/family-1.jpg"
                alt="A multigenerational Romanian family inside their home, at the center of our current housing project."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <Text size="caption" tone="accent" className="mb-3">{tStory("heading")}</Text>
              <Heading as="h3" size="h2">
                {tStory("title")}
              </Heading>
              <Text size="body-lg" tone="soft" className="mt-6">
                {tStory("excerpt")}
              </Text>
              <Link
                href="/projects/housing"
                className="mt-8 inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
              >
                Learn how housing aid works
                <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
              </Link>
              <p className="mt-6 text-caption text-ink-muted">
                Shared with permission of the family.
              </p>
            </div>
          </article>

          {/* 3 category cards */}
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

          {/* Photo gallery — every real photograph from the field */}
          <div className="mt-16">
            <Text size="caption" className="text-ink-muted mb-6">From Romania</Text>
            <PhotoGallery />
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-surface-raised border border-rule text-ink font-semibold text-body hover:bg-surface-sunken transition-colors duration-[160ms]"
            >
              See every project
              <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Mission trips */}
      <Section density="default" id="mission-trips">
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            <figure className="md:col-span-6 order-2 md:order-1">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-sunken">
                <Image
                  src="/images/team-build-site.jpg"
                  alt="Members of the board with partners on a Romanian project site."
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="md:col-span-6 order-1 md:order-2">
              <Heading as="h2" size="h2">Mission trips</Heading>
              <Text size="body-lg" tone="soft" className="mt-4">
                We do not have a 2026 trip scheduled yet. If you would consider going with us when one is set, the door is open. Past trips have meant ten days in rural Romania with a translator, partner pastors, and the families we walk with year-round.
              </Text>
              <ul className="mt-6 space-y-2 text-body text-ink-soft list-disc ml-6">
                <li>Useful skills: medical, electrical, basic construction, basic Romanian.</li>
                <li>Typical cost: $1,500 to $2,500 (flight, ground, lodging).</li>
                <li>Board members pay their own travel separately.</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/mission-trips"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-accent text-on-accent font-semibold text-body hover:bg-accent-strong transition-colors duration-[160ms]"
                >
                  Read about trips
                  <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                </Link>
                <a
                  href="mailto:gsworldoutreach@gmail.com?subject=2026%20trip%20interest"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-sm border border-rule text-ink font-semibold text-body hover:bg-surface-sunken transition-colors duration-[160ms]"
                >
                  Email the board
                  <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
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

// Photo gallery — every real photograph the org has shared from Romania.
// Layout: 2-col mobile, 3-col tablet, 4-col desktop. A couple of cells span
// two columns to break the uniform-grid rhythm without going masonry.
const GALLERY: { src: string; alt: string; span?: "wide" | "tall" }[] = [
  { src: "/images/countryside.jpg", alt: "A Carpathian valley in Romania.", span: "wide" },
  { src: "/images/church-build.jpg", alt: "A small Romanian church with a white cross on its roof, photographed during a construction project." },
  { src: "/images/classroom-jesus.jpg", alt: "A Sunday-school wall in Romania painted with Jesus and children, captioned in Romanian: Let the little children come to me. Luke 18:16." },
  { src: "/images/family-1.jpg", alt: "A multigenerational Romanian family at home." },
  { src: "/images/classroom-children.jpg", alt: "Children in a Romanian Sunday-school classroom with their teacher." },
  { src: "/images/food-delivery.jpg", alt: "Car trunk loaded with groceries, oil, and supplies for a family." },
  { src: "/images/goats.jpg", alt: "Two men with a herd of goats in rural Romania." },
  { src: "/images/team-build-site.jpg", alt: "Four men standing on a project site in Romania.", span: "wide" },
  { src: "/images/courtyard-1.jpg", alt: "The courtyard of a Romanian home in need of repair." },
  { src: "/images/courtyard-2.jpg", alt: "A narrow alley between two Romanian houses." },
  { src: "/images/guest-house.jpg", alt: "Partner guest house in Romania." },
];

function PhotoGallery() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {GALLERY.map((photo) => (
        <li
          key={photo.src}
          className={photo.span === "wide" ? "md:col-span-2" : undefined}
        >
          <figure className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-sunken">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-[400ms] hover:scale-[1.03]"
            />
          </figure>
        </li>
      ))}
    </ul>
  );
}

type Category = "housing" | "medical" | "firewood";

const CARD_PHOTO: Record<Category, { src: string; alt: string }> = {
  housing: {
    src: "/images/courtyard-1.jpg",
    alt: "Courtyard of a Romanian home in need of repair — the kind of project the housing fund supports.",
  },
  medical: {
    src: "/images/food-delivery.jpg",
    alt: "Car trunk packed with groceries and supplies for a Romanian family.",
  },
  firewood: {
    src: "/images/goats.jpg",
    alt: "A board member with a Romanian villager and his goats — rural life where the firewood fund makes the difference each winter.",
  },
};

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
  const photo = CARD_PHOTO[category];
  return (
    <article className="bg-surface-raised border border-rule rounded-md overflow-hidden flex flex-col">
      <div
        aria-hidden="true"
        className="h-2"
        style={{ backgroundColor: accentColor }}
      />
      <div className="relative aspect-[4/3] bg-surface-sunken">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
          className="object-cover"
        />
      </div>
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
