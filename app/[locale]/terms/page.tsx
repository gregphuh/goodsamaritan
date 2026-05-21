import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for the Good Samaritan International website and donation processing.",
};

const LAST_UPDATED = "May 21, 2026";

export default async function TermsPage({
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
          <Text size="caption" tone="accent" className="mb-6">Terms of use</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            The agreement, in plain English.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            By using this site or donating, you agree to the terms below. We've kept them short and readable.
          </Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="content" className="space-y-12">
          <Text size="body-sm" tone="muted">Last updated: {LAST_UPDATED}</Text>

          <article>
            <Heading as="h2" size="h2">About us</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Good Samaritan Org. is a US 501(c)(3) charitable organization, IRS EIN 38-3401779, mailing address 2060 Curtis Rd, Addison Twp, MI 48307. The site at goodsamaritaninternational.org is operated by the board.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Donations</Heading>
            <ul className="mt-4 ml-6 list-disc text-body-lg text-ink-soft space-y-2">
              <li>All donations are tax-deductible in the United States to the extent allowed by law. You will receive a receipt for IRS purposes.</li>
              <li>Card and bank donations are processed by Stripe via Givebutter. Zelle and PayPal donations go directly to our bank-linked account.</li>
              <li>Recurring monthly donations can be cancelled at any time through your Givebutter receipt link, or by emailing gsworldoutreach@gmail.com. Cancellation takes effect before the next monthly charge.</li>
              <li>Donations are non-refundable except for technical errors (duplicate charge, wrong amount). To request a refund for cause, email us within 60 days of the donation.</li>
              <li>Fund designations (Housing, Medical, etc.) are honored to the extent practical. The board reserves the right to redirect a designated gift if the named fund is already fully met, with notice to the donor.</li>
            </ul>
          </article>

          <article>
            <Heading as="h2" size="h2">Site content</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Stories, project descriptions, and photos on this site are accurate to the best of our knowledge at the time of publication. Family stories are published only with the consent of the named family. If you believe content on this site is inaccurate or should be removed, write to gsworldoutreach@gmail.com.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Acceptable use</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Don't copy and resell our content. Don't impersonate the organization or its board. Don't use the site to harass anyone. Other than that, you're welcome here.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">No warranty</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              The site is provided as-is. We try to keep it accurate and online, but we don't guarantee uptime, accuracy of every detail, or that links to external services (IRS, Givebutter, etc.) will always work.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Disputes</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Disputes about donations or this site are governed by the laws of the State of Michigan and resolved in Oakland County, Michigan. We strongly prefer to resolve any concern by email first, and have never had to do otherwise.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Changes</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              If these terms change, the date at the top changes. Material changes will be announced in the next newsletter.
            </Text>
          </article>

          <article>
            <Heading as="h2" size="h2">Contact</Heading>
            <Text size="body-lg" tone="soft" className="mt-4">
              Email <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">gsworldoutreach@gmail.com</a> or write to 2060 Curtis Rd, Addison Twp, MI 48307.
            </Text>
          </article>
        </Container>
      </Section>
    </main>
  );
}
