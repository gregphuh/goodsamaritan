import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { ShieldCheck, Lock } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";
import { CopyableField } from "@/components/donate/CopyableField";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Donate.intro" });
  return {
    title: t("headline"),
    description: t("subhead"),
  };
}

export default async function DonatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tIntro = await getTranslations("Donate.intro");
  const tFunds = await getTranslations("Donate.funds");
  const tTiers = await getTranslations("Donate.tiers");
  const tCadence = await getTranslations("Donate.cadence");
  const tOther = await getTranslations("Donate.otherWays");
  const tTrust = await getTranslations("Donate.trust");

  const funds = [
    { key: "general", label: tFunds("generalLabel"), body: tFunds("generalBody"), tint: "var(--color-brand)" },
    { key: "housing", label: tFunds("housingLabel"), body: tFunds("housingBody"), tint: "var(--color-housing)" },
    { key: "medical", label: tFunds("medicalLabel"), body: tFunds("medicalBody"), tint: "var(--color-medical)" },
    { key: "firewood", label: tFunds("firewoodLabel"), body: tFunds("firewoodBody"), tint: "var(--color-firewood)" },
    { key: "mission", label: tFunds("missionLabel"), body: tFunds("missionBody"), tint: "var(--color-mission)" },
    { key: "school", label: tFunds("schoolLabel"), body: tFunds("schoolBody"), tint: "var(--color-school)" },
  ];

  const tiers = [
    { amount: "$25", impact: tTiers("tier25") },
    { amount: "$50", impact: tTiers("tier50") },
    { amount: "$100", impact: tTiers("tier100") },
    { amount: "$250", impact: tTiers("tier250") },
    { amount: "$500", impact: tTiers("tier500") },
  ];

  return (
    <main id="main" className="flex flex-col">
      {/* ──────────────────────────── Intro */}
      <Section surface="inverse" density="default">
        <Container width="content">
          <Heading as="h1" size="display" className="text-ink-inverse">
            {tIntro("headline")}
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6 max-w-[60ch]">
            {tIntro("subhead")}
          </Text>
        </Container>
      </Section>

      {/* ──────────────────────────── Funds */}
      <Section density="default">
        <Container width="wide">
          <Heading as="h2" size="h2">
            Six ways to direct your gift
          </Heading>
          <Text size="body-lg" tone="soft" className="mt-3 max-w-[60ch]">
            Pick any fund below — or choose &ldquo;Where most needed&rdquo; and let the board decide each week.
          </Text>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funds.map((f) => (
              <article
                key={f.key}
                className="bg-surface-raised border border-rule rounded-md overflow-hidden flex flex-col"
              >
                <div aria-hidden="true" className="h-1.5" style={{ backgroundColor: f.tint }} />
                <div className="p-6 flex-1">
                  <Heading as="h3" size="h4">{f.label}</Heading>
                  <Text size="body-sm" tone="soft" className="mt-2">{f.body}</Text>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Tiers preview */}
      <Section surface="sunken" density="default">
        <Container width="standard">
          <Heading as="h2" size="h2">
            Suggested amounts, with what they reach
          </Heading>
          <Text size="body-lg" tone="soft" className="mt-3 max-w-[60ch]">
            Every tier is anchored to a real 2024 expense, not a category.
          </Text>
          <ul className="mt-8 divide-y divide-rule border-y border-rule">
            {tiers.map((t) => (
              <li key={t.amount} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5">
                <span className="font-display text-h3 text-ink-strong w-24 shrink-0">{t.amount}</span>
                <span className="text-body text-ink-soft">{t.impact}</span>
              </li>
            ))}
          </ul>
          <Text size="body-sm" tone="muted" className="mt-4">
            {tTiers("custom")}: pick any amount on the form below.
          </Text>
        </Container>
      </Section>

      {/* ──────────────────────────── Givebutter embed (placeholder until campaign ID lands) */}
      <Section density="default" id="give">
        <Container width="content">
          <Heading as="h2" size="h2">
            Card or bank, monthly or one-time
          </Heading>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} weight="regular" aria-hidden="true" className="text-success" />
              {tTrust("taxDeductible")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Lock size={16} weight="regular" aria-hidden="true" className="text-success" />
              {tTrust("secureProcessing")}
            </span>
          </div>
          <Text size="body-sm" tone="muted" className="mt-2">
            {tTrust("cancelAnytime")}
          </Text>

          {/* Givebutter widget mount point. Replace with real embed when campaign ID is set.
              Docs: https://givebutter.com/help/articles/embed-options */}
          <div
            id="givebutter-mount"
            role="region"
            aria-label="Donation form"
            data-givebutter-campaign-id="TODO-CAMPAIGN-ID"
            className="mt-8 bg-surface-raised border-2 border-dashed border-rule rounded-md p-10 text-center"
          >
            <p className="font-display text-h4 text-ink-strong">Givebutter form loads here</p>
            <Text size="body-sm" tone="muted" className="mt-2 max-w-[50ch] mx-auto">
              Drop your Givebutter widget script and <code className="font-body">&lt;givebutter-widget&gt;</code> tag into this slot. The form will show monthly/one-time toggle, fund selector, and tier amounts as configured in your Givebutter campaign.
            </Text>
            <Text size="body-sm" tone="muted" className="mt-3">
              Until then, the methods below are fully active.
            </Text>
          </div>

          <p className="mt-4 text-caption text-ink-muted">
            {tCadence("monthly")} · {tCadence("once")} · {tTiers("custom")} all configured inside Givebutter.
          </p>
        </Container>
      </Section>

      {/* ──────────────────────────── Other ways (fully working today) */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <Heading as="h2" size="h2">
            {tOther("heading")}
          </Heading>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Zelle */}
            <article className="bg-surface-raised border border-rule rounded-md p-6 flex flex-col">
              <Text size="caption" tone="accent" className="mb-2">Preferred</Text>
              <Heading as="h3" size="h4">{tOther("zelleHeading")}</Heading>
              <Text size="body-sm" tone="soft" className="mt-3 flex-1">{tOther("zelleBody")}</Text>
              <div className="mt-4">
                <CopyableField value="gsworldoutreach@gmail.com" label="Zelle email address" />
              </div>
            </article>

            {/* PayPal */}
            <article className="bg-surface-raised border border-rule rounded-md p-6 flex flex-col">
              <Heading as="h3" size="h4">{tOther("paypalHeading")}</Heading>
              <Text size="body-sm" tone="soft" className="mt-3 flex-1">
                Send to the same email via PayPal&rsquo;s send-money flow.
              </Text>
              <a
                href="https://www.paypal.com/donate?business=gsworldoutreach@gmail.com&item_name=Good+Samaritan+International&currency_code=USD"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center h-11 px-5 rounded-sm bg-accent text-on-accent font-semibold text-body-sm hover:bg-accent-strong transition-colors duration-[160ms]"
              >
                {tOther("paypalCta")}
              </a>
            </article>

            {/* Check */}
            <article className="bg-surface-raised border border-rule rounded-md p-6 flex flex-col">
              <Heading as="h3" size="h4">{tOther("checkHeading")}</Heading>
              <Text size="body-sm" tone="soft" className="mt-3">{tOther("checkBody")}</Text>
              <div className="mt-4 space-y-3">
                <div>
                  <Text size="caption" tone="muted" className="mb-1">Payable to</Text>
                  <CopyableField value="Good Samaritan" label="Check payable name" />
                </div>
                <div>
                  <Text size="caption" tone="muted" className="mb-1">Mailing address</Text>
                  <CopyableField
                    value="2060 Curtis Rd, Addison Twp, MI 48307"
                    label="Mailing address"
                  />
                </div>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ──────────────────────────── Receipt / closing */}
      <Section surface="inverse" density="compact">
        <Container width="content">
          <Text size="body-lg" tone="inverse" className="max-w-[60ch]">
            Whichever method you choose, every gift is acknowledged within seven days and counted in next year&rsquo;s annual report by category.
          </Text>
        </Container>
      </Section>
    </main>
  );
}
