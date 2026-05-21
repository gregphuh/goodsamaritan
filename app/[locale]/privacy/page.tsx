import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Good Samaritan International handles donor and visitor information. We do not sell donor data, ever.",
};

const LAST_UPDATED = "May 21, 2026";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main" className="flex flex-col">
      <Section surface="inverse" density="default">
        <Container width="content">
          <Text size="caption" tone="accent" className="mb-6">Privacy</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            How we handle your information.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            We do not sell donor data. We do not share donor lists. We collect only what we need to send tax receipts, process gifts, and keep you updated if you ask us to.
          </Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="content" className="space-y-12">
          <Text size="body-sm" tone="muted">Last updated: {LAST_UPDATED}</Text>

          <article>
            <Heading as="h2" size="h2">What we collect</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li><strong>Donation information.</strong> Name, email, mailing address, donation amount, and method. Card data is processed by Stripe via Givebutter; we never see or store full card numbers.</li>
              <li><strong>Newsletter signups.</strong> Email only. Stored in our email provider (Buttondown).</li>
              <li><strong>Contact form messages.</strong> Your name, email, subject, and message, sent directly to the board inbox.</li>
              <li><strong>Site analytics.</strong> Anonymous, aggregated page-view counts via Plausible. No cookies, no tracking pixels, no IP storage.</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">What we do with it</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>Send your tax-deductible donation receipt (required by the IRS).</li>
              <li>Send the newsletter you signed up for (about four times a year).</li>
              <li>Acknowledge your message if you used the contact form.</li>
              <li>Publish anonymous aggregate giving totals in our annual report.</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">What we never do</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>Sell, rent, or trade donor information to anyone.</li>
              <li>Share donor lists with other nonprofits.</li>
              <li>Publish a donor's name without explicit permission.</li>
              <li>Use tracking pixels in newsletters.</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">Who else sees your data</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Only the providers who help us run the site: Givebutter (donation processing), Stripe (card processing), Buttondown (newsletter), and our hosting provider. Each is bound by their own privacy terms. We do not give your information to any other third party.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">How long we keep it</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Donation records are retained for seven years (IRS standard for charitable organizations). Newsletter subscriptions stay active until you unsubscribe (one click in any email). Contact form messages are kept as long as the conversation is useful, typically under two years.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Your choices</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Email <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">gsworldoutreach@gmail.com</a> to request a copy of your data, correct anything that's wrong, or have your information deleted (subject to the seven-year IRS retention rule for donation records).
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Children</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              This site is not directed at children under 13, and we do not knowingly collect information from them.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Changes</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              If we update this policy, the date at the top changes. Material changes will be announced in the next newsletter.
            </Text>
          </article>
        </Container>
      </Section>
    </main>
  );
}
