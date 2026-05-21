/**
 * Renders a schema.org payload as a <script type="application/ld+json">.
 * Server-only by design.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built on the server from known constants, so the
      // dangerously-set HTML is safe here. Stringify with no whitespace to
      // minimize bytes.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
