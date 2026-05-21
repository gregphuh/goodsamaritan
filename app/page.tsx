import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Heading } from "@/components/primitives/Heading";
import { ImpactStat } from "@/components/primitives/ImpactStat";
import { Scripture } from "@/components/primitives/Scripture";
import { Section } from "@/components/primitives/Section";
import { Text } from "@/components/primitives/Text";

/**
 * Phase 1 preview — design-system showcase. Replaced in Phase 2 by the real
 * home page. Lives at `/` so the team can sanity-check tokens visually.
 */
export default function DesignSystemPreview() {
  return (
    <main id="main" className="flex flex-col">
      {/* Header band — brand surface */}
      <Section surface="inverse" density="spacious">
        <Container width="standard">
          <Text size="caption" tone="accent" className="mb-4">
            Good Samaritan International · Design system v1
          </Text>
          <Heading as="h1" size="display" className="text-ink-inverse max-w-[20ch]">
            Walking with Romanian families since 1994.
          </Heading>
          <Text size="body-lg" tone="inverse" className="mt-6 max-w-[55ch]">
            This is a token-and-primitives preview, not the home page yet. The real
            hero arrives in Phase 2.
          </Text>
          <div className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="#" variant="primary" size="lg">Give monthly</LinkButton>
            <LinkButton href="#" variant="secondary" size="lg">Read our 2024 report</LinkButton>
          </div>
        </Container>
      </Section>

      {/* Scripture — Galatians 2:10, the org's anchor verse */}
      <Section density="default">
        <Container width="content">
          <Scripture reference="Galatians 2:10" translation="NIV">
            All they asked was that we should continue to remember the poor — the
            very thing I was eager to do.
          </Scripture>
        </Container>
      </Section>

      {/* Trust band — real 2024 numbers */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <Text size="caption" className="mb-8 text-ink-muted">
            2024 in numbers · from the annual report
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <ImpactStat value="$100K" label="Distributed in 2024" detail="To named families and missionaries" />
            <ImpactStat value="76%" label="Reached Romania" detail="USA 16% · UK 5% · Africa 3%" />
            <ImpactStat value="2%" label="Admin overhead" detail="98¢ of every dollar reaches the field" />
            <ImpactStat value="1994" label="Founded" detail="Nistor & Floare Forgaciu" />
          </div>
        </Container>
      </Section>

      {/* Type scale */}
      <Section density="default">
        <Container width="content">
          <Text size="caption" className="mb-6">Type scale</Text>
          <div className="space-y-6">
            <Heading as="h2" size="display">Display — Fraunces 500</Heading>
            <Heading as="h2" size="h1">Headline 1 — section opener</Heading>
            <Heading as="h2" size="h2">Headline 2 — group title</Heading>
            <Heading as="h3" size="h3">Headline 3 — sub-group</Heading>
            <Heading as="h4" size="h4">Headline 4 — minor title</Heading>
            <Text size="body-lg">Body large — used for hero subheads and intro paragraphs at 20–22px.</Text>
            <Text size="body">
              Body — the floor for all prose at 18px. This is the size Margaret
              reads with her reading glasses on her iPhone in the evenings. We
              never go below this in story or project content. Romanian
              diacritics work: ăâîșțĂÂÎȘȚ.
            </Text>
            <Text size="body-sm" tone="soft">Body small — captions, supporting copy, form labels.</Text>
            <Text size="caption" tone="muted">Caption — uppercase categorical labels</Text>
          </div>
        </Container>
      </Section>

      {/* Buttons */}
      <Section surface="sunken" density="default">
        <Container width="standard">
          <Text size="caption" className="mb-6">Buttons</Text>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Give now</Button>
              <Button variant="primary" size="md">Give now</Button>
              <Button variant="primary" size="lg">Give monthly</Button>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="secondary" size="md">Read the 2024 report</Button>
              <Button variant="ghost" size="md">Maybe later</Button>
              <Button variant="primary" size="md" disabled>Processing…</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Cards */}
      <Section density="default">
        <Container width="wide">
          <Text size="caption" className="mb-6">Cards</Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <Heading as="h3" size="h4">Housing</Heading>
              <Text size="body-sm" tone="soft" className="mt-2">
                Home repair, electrical service, insulation. Dragomir family
                received a home in Sept 2023.
              </Text>
            </Card>
            <Card>
              <Heading as="h3" size="h4">Medical</Heading>
              <Text size="body-sm" tone="soft" className="mt-2">
                Surgeries, medicine, hospital travel. Marta Lutac's treatment;
                Bogdan's two eye surgeries.
              </Text>
            </Card>
            <Card>
              <Heading as="h3" size="h4">Firewood &amp; winter</Heading>
              <Text size="body-sm" tone="soft" className="mt-2">
                Ciobanasu family in Avrameni; Murariu family in Moldova; firewood
                + utility bills before the cold.
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Color tokens */}
      <Section surface="sunken" density="default">
        <Container width="wide">
          <Text size="caption" className="mb-6">Semantic color tokens</Text>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <Swatch name="surface" />
            <Swatch name="surface-raised" />
            <Swatch name="surface-sunken" />
            <Swatch name="surface-inverse" dark />
            <Swatch name="ink" dark />
            <Swatch name="ink-soft" dark />
            <Swatch name="ink-muted" />
            <Swatch name="accent" />
            <Swatch name="accent-strong" dark />
            <Swatch name="accent-soft" />
            <Swatch name="brand" dark />
            <Swatch name="brand-soft" />
            <Swatch name="housing" dark />
            <Swatch name="medical" dark />
            <Swatch name="firewood" dark />
            <Swatch name="mission" dark />
          </div>
        </Container>
      </Section>

      {/* Footer placeholder */}
      <Section surface="inverse" density="compact">
        <Container width="standard">
          <Text size="body-sm" tone="inverse">
            Good Samaritan Org · 501(c)(3) · EIN 38-3401779 · 2060 Curtis Rd,
            Addison Twp, MI 48307 · gsworldoutreach@gmail.com
          </Text>
        </Container>
      </Section>
    </main>
  );
}

function Swatch({ name, dark = false }: { name: string; dark?: boolean }) {
  return (
    <div className="border border-rule rounded-md overflow-hidden">
      <div
        className="h-20"
        style={{ backgroundColor: `var(--color-${name})` }}
      />
      <div className="px-3 py-2 bg-surface-raised">
        <code className={`text-caption ${dark ? "text-ink-strong" : "text-ink"}`}>
          {name}
        </code>
      </div>
    </div>
  );
}
