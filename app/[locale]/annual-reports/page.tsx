import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, FilePdf } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";

export const metadata: Metadata = {
  title: "Annual reports",
  description:
    "Every year we publish a report naming every family, every village, and every dollar. Read the most recent and the archive here.",
};

type Report = {
  year: number;
  title: string;
  summary: string;
  pdfHref: string;
  cover: { src: string; alt: string };
  stats: { value: string; label: string }[];
};

const REPORTS: Report[] = [
  {
    year: 2024,
    title: "2024 annual report",
    summary:
      "Nearly $100,000 distributed across Romania, the United States, the United Kingdom, and Africa. Every family, every village, and every category named.",
    pdfHref: "/annual-reports/2024.pdf",
    cover: {
      src: "/images/countryside.jpg",
      alt: "A Carpathian valley in Romania.",
    },
    stats: [
      { value: "$100K", label: "Distributed" },
      { value: "50+", label: "Named families" },
      { value: "76%", label: "Reached Romania" },
    ],
  },
];

export default async function AnnualReportsPage({
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
          <Text size="caption" tone="accent" className="mb-6">Annual reports</Text>
          <Heading as="h1" size="display" className="text-ink-inverse">
            Every dollar, named.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6">
            Every year we publish a report that names every family we walked with, every village we visited, and every dollar we distributed. Transparency is how a small charity earns the trust of donors who give in good faith.
          </Text>
        </Container>
      </Section>

      <Section density="default">
        <Container width="standard">
          <ul className="space-y-10">
            {REPORTS.map((report) => (
              <li key={report.year}>
                <article className="bg-surface-raised border border-rule rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
                  <div className="relative aspect-[16/10] md:aspect-auto md:col-span-5 bg-surface-sunken">
                    <Image
                      src={report.cover.src}
                      alt={report.cover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 md:col-span-7 flex flex-col">
                    <p className="font-display text-h1 text-ink-strong leading-none">
                      {report.year}
                    </p>
                    <Heading as="h2" size="h3" className="mt-3">
                      {report.title}
                    </Heading>
                    <Text size="body-lg" tone="soft" className="mt-4">
                      {report.summary}
                    </Text>
                    <dl className="mt-6 grid grid-cols-3 gap-4">
                      {report.stats.map((s) => (
                        <div key={s.label}>
                          <dt className="font-display text-h4 text-ink-strong leading-none">{s.value}</dt>
                          <dd className="mt-1 text-body-sm text-ink-muted">{s.label}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto pt-6">
                      <a
                        href={report.pdfHref}
                        className="inline-flex items-center gap-2 h-12 px-6 rounded-sm bg-accent text-on-accent font-semibold text-body hover:bg-accent-strong transition-colors duration-[160ms]"
                      >
                        <FilePdf size={20} weight="regular" aria-hidden="true" />
                        Download the report (PDF)
                        <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-rule pt-6">
            <Text size="body-sm" tone="muted">
              The next annual report is posted here within ninety days of the calendar year close. The board double-checks every family name, village, and dollar figure before publishing.
            </Text>
          </div>
        </Container>
      </Section>

      <Section surface="sunken" density="compact">
        <Container width="content">
          <Text size="body-lg" tone="soft" className="max-w-[60ch]">
            Want a paper copy of any annual report? Email <a href="mailto:gsworldoutreach@gmail.com" className="text-accent-strong underline underline-offset-4 hover:no-underline">gsworldoutreach@gmail.com</a> and we will mail one to you.
          </Text>
        </Container>
      </Section>
    </main>
  );
}
