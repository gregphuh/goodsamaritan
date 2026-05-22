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
  const tScripture = await getTranslations("Home.scripture");
  const tMin = await getTranslations("Home.ministriesSection");
  const tGallery = await getTranslations("Home.gallery");
  const tTrips = await getTranslations("Home.missionTripsSection");
  const tFeatured = await getTranslations("Home.featuredProject");
  const tStories = await getTranslations("Home.stories");

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Hero
           Left column carries the brand mark (cross + motto + verse).
           Right column carries the message (eyebrow + headline + CTAs).
           This split de-crowds the center of the banner. */}
      <Section surface="inverse" density="default">
        <Container width="wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start md:items-center">
            {/* Brand identity — cross + motto + verse, anchored left.
                Cross still draws in on page load (animated prop). The
                motto and verse-reference render statically — Greg asked
                for the text to present normally without fade/write-in. */}
            <div className="md:col-span-5 flex md:block flex-col items-center md:items-start text-center md:text-left">
              <BrandCross
                size={170}
                strokeWidth={5.5}
                animated
                className="text-accent"
              />
              <p className="mt-5 font-cursive text-[2.5rem] md:text-[3.125rem] lg:text-[3.75rem] text-accent leading-[1.05] max-w-[14ch] mx-auto md:mx-0">
                {tSite("motto")}
              </p>
              <p className="mt-2 text-caption text-ink-inverse/70 uppercase tracking-wider font-semibold">
                {tSite("mottoReference")}
              </p>
            </div>

            {/* Message — eyebrow + headline + subhead + CTAs */}
            <div className="md:col-span-7">
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-sm font-semibold uppercase tracking-wider">
                <span className="inline-flex items-center gap-2">
                  <RomaniaFlag height={18} title="Flag of Romania" />
                  <span className="text-accent">{tHero("eyebrowLocale")}</span>
                </span>
                <span aria-hidden="true" className="text-ink-inverse/40">·</span>
                <span className="text-ink-inverse/70">{tHero("eyebrowFaith")}</span>
              </div>
              <h1 className="font-display font-medium text-[2.125rem] md:text-[2.5rem] lg:text-[3.125rem] leading-[1.1] tracking-tight text-ink-inverse text-balance">
                {tHero("headline")}
              </h1>
              <p className="mt-5 text-[1.125rem] md:text-[1.25rem] leading-[1.5] text-ink-inverse/90 max-w-[58ch]">
                {tHero("subhead")}
              </p>
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
            <Scripture reference={tScripture("reference")} translation={tScripture("translation")}>
              {tScripture("verseText")}
            </Scripture>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Ministries (landing-page section) */}
      <Section surface="sunken" density="default" id="ministries">
        <Container width="wide">
          <div className="max-w-[60ch]">
            <Heading as="h2" size="h2">{tMin("heading")}</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              {tMin("body")}
            </Text>
          </div>

          {/* 5 category cards — Word of God leads, then physical aid categories */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <ProjectCard
              category="word"
              title={tMin("wordTitle")}
              body={tMin("wordBody")}
              href="/ministries"
              cta={tMin("wordCta")}
            />
            <ProjectCard
              category="housing"
              title={tProj("housingTitle")}
              body={tProj("housingBody")}
              href="/ministries/housing"
              cta={tCta("seeHousing")}
            />
            <ProjectCard
              category="groceries"
              title={tMin("groceriesTitle")}
              body={tMin("groceriesBody")}
              href="/ministries"
              cta={tMin("groceriesCta")}
            />
            <ProjectCard
              category="medical"
              title={tProj("medicalTitle")}
              body={tProj("medicalBody")}
              href="/ministries/medical"
              cta={tCta("seeMedical")}
            />
            <ProjectCard
              category="firewood"
              title={tProj("firewoodTitle")}
              body={tProj("firewoodBody")}
              href="/ministries/firewood"
              cta={tCta("seeWinterAid")}
            />
          </div>

          {/* Featured project — the family in the current housing project */}
          <article className="mt-16 bg-surface-raised border border-rule rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-0 md:aspect-auto bg-surface-sunken">
              <Image
                src="/images/family-1.jpg"
                alt={tFeatured("imageAlt")}
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
                href="/ministries/housing"
                className="mt-8 inline-flex items-center gap-2 text-body font-semibold text-accent-strong hover:underline underline-offset-4"
              >
                {tMin("housingLearn")}
                <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
              </Link>
              <p className="mt-6 text-caption text-ink-muted">
                {tMin("permissionNote")}
              </p>
            </div>
          </article>

          {/* Stories from the field — three completed projects */}
          <div className="mt-16">
            <div className="max-w-[60ch]">
              <Heading as="h2" size="h2">{tStories("heading")}</Heading>
              <Text size="body-lg" tone="soft" className="mt-4">
                {tStories("intro")}
              </Text>
            </div>

            <div className="mt-12 space-y-12">
              {STORIES.map((story, idx) => {
                const reversed = idx % 2 === 1;
                return (
                  <article
                    key={story.n}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                  >
                    <figure className={reversed ? "md:col-span-6 md:order-2" : "md:col-span-6"}>
                      <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-sunken">
                        <Image
                          src={story.image}
                          alt={tStories(`case${story.n}ImageAlt`)}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      {story.beforeImage ? (
                        <figcaption className="mt-3 grid grid-cols-2 gap-3">
                          <div className="relative aspect-[4/3] rounded-md overflow-hidden border border-rule bg-surface-sunken">
                            <Image
                              src={story.beforeImage}
                              alt={tStories(`case${story.n}BeforeAlt`)}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover"
                            />
                            <span className="absolute left-2 top-2 text-caption font-semibold uppercase tracking-wider bg-surface-inverse/85 text-ink-inverse px-2 py-0.5 rounded-sm">
                              {tStories(`case${story.n}BeforeBadge`)}
                            </span>
                          </div>
                          <div className="text-caption text-ink-muted self-center">
                            {tStories(`case${story.n}BeforeCaption`)}
                          </div>
                        </figcaption>
                      ) : null}
                    </figure>

                    <div className={reversed ? "md:col-span-6 md:order-1" : "md:col-span-6"}>
                      <Heading as="h3" size="h3">{tStories(`case${story.n}Name`)}</Heading>
                      <Text size="caption" tone="muted" className="mt-1 uppercase tracking-wider">
                        {tStories(`case${story.n}Location`)}
                      </Text>
                      <Text size="body-lg" tone="soft" className="mt-4">
                        {tStories(`case${story.n}Body`)}
                      </Text>
                      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-body-sm">
                        <div>
                          <dt className="text-caption text-ink-muted uppercase tracking-wider">
                            {tStories("amountLabel")}
                          </dt>
                          <dd className="mt-1 font-display text-h4 text-ink-strong tabular-nums">
                            {tStories(`case${story.n}Amount`)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-caption text-ink-muted uppercase tracking-wider">
                            {tStories("completedLabel")}
                          </dt>
                          <dd className="mt-1 text-body text-ink font-semibold">
                            {tStories("completedValue")}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Photo gallery — every real photograph from the field */}
          <div className="mt-16">
            <Text size="caption" className="text-ink-muted mb-6">{tGallery("label")}</Text>
            <PhotoGallery tGallery={tGallery} />
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
                  alt={tTrips("imageAlt")}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="md:col-span-6 order-1 md:order-2">
              <Heading as="h2" size="h2">{tTrips("heading")}</Heading>
              <Text size="body-lg" tone="soft" className="mt-4">
                {tTrips("body")}
              </Text>
              <ul className="mt-6 space-y-2 text-body text-ink-soft list-disc ml-6">
                <li>{tTrips("skill1")}</li>
                <li>{tTrips("skill2")}</li>
                <li>{tTrips("skill3")}</li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/mission-trips"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-accent text-on-accent font-semibold text-body hover:bg-accent-strong transition-colors duration-[160ms]"
                >
                  {tTrips("ctaTrips")}
                  <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                </Link>
                <a
                  href="mailto:gsworldoutreach@gmail.com?subject=Trip%20interest"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-sm border border-rule text-ink font-semibold text-body hover:bg-surface-sunken transition-colors duration-[160ms]"
                >
                  {tTrips("ctaEmail")}
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

// Photo gallery — one full-width establishing shot, then a tight grid of
// smaller thumbnails. Category-specific photos already appear on the cards
// above, so this gallery only carries images that aren't duplicated there.
const STORIES = [
  { n: 1, image: "/images/case-elena-puchia.jpg", beforeImage: "/images/case-elena-before.jpg" as string | null },
  { n: 2, image: "/images/case-vlascu-family.jpg", beforeImage: null as string | null },
  { n: 3, image: "/images/case-pojar-house.jpg", beforeImage: null as string | null },
] as const;

const GRID_PHOTO_KEYS = [
  { src: "/images/classroom-jesus.jpg", altKey: "classroomJesusAlt" },
  { src: "/images/classroom-children.jpg", altKey: "classroomChildrenAlt" },
  { src: "/images/food-delivery.jpg", altKey: "foodDeliveryAlt" },
  { src: "/images/team-build-site.jpg", altKey: "teamBuildSiteAlt" },
  { src: "/images/goats.jpg", altKey: "goatsAlt" },
  { src: "/images/guest-house.jpg", altKey: "guestHouseAlt" },
  { src: "/images/courtyard-1.jpg", altKey: "courtyard1Alt" },
  { src: "/images/courtyard-2.jpg", altKey: "courtyard2Alt" },
] as const;

type GalleryT = (key: string) => string;

function PhotoGallery({ tGallery }: { tGallery: GalleryT }) {
  return (
    <div className="space-y-4">
      {/* Hero — full-width establishing shot */}
      <figure className="relative aspect-[21/9] rounded-md overflow-hidden border border-rule bg-surface-sunken">
        <Image
          src="/images/countryside.jpg"
          alt={tGallery("countrysideAlt")}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </figure>

      {/* Eight smaller thumbnails in a tight grid */}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GRID_PHOTO_KEYS.map((photo) => (
          <li key={photo.src}>
            <figure className="relative aspect-square rounded-md overflow-hidden border border-rule bg-surface-sunken">
              <Image
                src={photo.src}
                alt={tGallery(photo.altKey)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-[400ms] hover:scale-[1.03]"
              />
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Category = "word" | "housing" | "groceries" | "medical" | "firewood";

// Maps category → CSS custom-property name used for the top accent stripe.
// "word" and "groceries" reuse existing tint tokens (mission slate, school
// moss) so we don't need to add new palette entries.
const CATEGORY_TINT: Record<Category, string> = {
  word: "var(--color-mission)",
  housing: "var(--color-housing)",
  groceries: "var(--color-school)",
  medical: "var(--color-medical)",
  firewood: "var(--color-firewood)",
};

const CARD_PHOTO: Record<Category, { src: string; alt: string }> = {
  word: {
    src: "/images/church-build.jpg",
    alt: "A small Romanian church with a white cross on its roof, under construction with partners and board members at the new entrance.",
  },
  housing: {
    src: "/images/case-elena-puchia.jpg",
    alt: "Elena Puchia in front of her newly built one-room house — the kind of completed home the housing fund delivers.",
  },
  groceries: {
    src: "/images/food-delivery.jpg",
    alt: "Car trunk packed with bread, oil, and other groceries for a Romanian family.",
  },
  medical: {
    src: "/images/guest-house.jpg",
    alt: "A partner community building in Romania where medical aid is coordinated.",
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
  const accentColor = CATEGORY_TINT[category];
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
