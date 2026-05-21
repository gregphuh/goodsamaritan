/**
 * schema.org JSON-LD generators for Good Samaritan International.
 * All output is plain JS objects ready to JSON.stringify into a
 * <script type="application/ld+json"> tag.
 */

const SITE_URL = "https://goodsamaritaninternational.org" as const;

const ORG_CONSTANTS = {
  legalName: "Good Samaritan Org.",
  name: "Good Samaritan International",
  alternateName: ["Good Samaritan", "Good Samaritan Org"],
  ein: "38-3401779",
  foundingDate: "1994",
  email: "gsworldoutreach@gmail.com",
  address: {
    streetAddress: "2060 Curtis Rd",
    addressLocality: "Addison Twp",
    addressRegion: "MI",
    postalCode: "48307",
    addressCountry: "US",
  },
  founders: [
    { givenName: "Nistor", familyName: "Forgaciu" },
    { givenName: "Floare", familyName: "Forgaciu" },
  ],
} as const;

const orgId = `${SITE_URL}/#organization`;

// ─────────────────────────────────────────────────────────────────────────────
// Organization / NGO core
// ─────────────────────────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "Organization"],
    "@id": orgId,
    name: ORG_CONSTANTS.name,
    legalName: ORG_CONSTANTS.legalName,
    alternateName: [...ORG_CONSTANTS.alternateName],
    url: SITE_URL,
    foundingDate: ORG_CONSTANTS.foundingDate,
    description:
      "A Christian 501(c)(3) charity walking with widows, orphans, and families in Romania since 1994. The board visits every named family in person and pays its own travel.",
    taxID: ORG_CONSTANTS.ein,
    nonprofitStatus: "Nonprofit501c3",
    email: ORG_CONSTANTS.email,
    sameAs: [] as string[],
    address: {
      "@type": "PostalAddress",
      ...ORG_CONSTANTS.address,
    },
    areaServed: [
      { "@type": "Country", name: "Romania", "@id": `${SITE_URL}/#romania` },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Continent", name: "Africa" },
    ],
    founder: ORG_CONSTANTS.founders.map((f) => buildPersonSchema(f, { withContext: false })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Person (founders)
// ─────────────────────────────────────────────────────────────────────────────

type PersonInput = {
  givenName: string;
  familyName: string;
};

export function buildPersonSchema(
  person: PersonInput,
  opts: { withContext?: boolean } = { withContext: true },
) {
  const slug = `${person.givenName}-${person.familyName}`.toLowerCase();
  return {
    ...(opts.withContext ? { "@context": "https://schema.org" } : {}),
    "@type": "Person",
    "@id": `${SITE_URL}/about#${slug}`,
    name: `${person.givenName} ${person.familyName}`,
    givenName: person.givenName,
    familyName: person.familyName,
    foundingRole: "Founder",
    founderOf: { "@id": orgId },
  };
}

export function buildFoundersSchema() {
  return ORG_CONSTANTS.founders.map((f) => buildPersonSchema(f));
}

// ─────────────────────────────────────────────────────────────────────────────
// Place (Romania + villages)
// ─────────────────────────────────────────────────────────────────────────────

const ROMANIA_VILLAGES = [
  "Comana de Sus",
  "Rauseni",
  "Botosani",
  "Otelu Rosu",
  "Avrameni",
  "Sarafinesti",
] as const;

export function buildRomaniaPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Country",
    "@id": `${SITE_URL}/#romania`,
    name: "Romania",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RO",
    },
    containsPlace: ROMANIA_VILLAGES.map((village) => ({
      "@type": "Place",
      name: village,
      address: { "@type": "PostalAddress", addressCountry: "RO" },
    })),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DonateAction (used on /donate)
// ─────────────────────────────────────────────────────────────────────────────

export function buildDonateActionSchema(locale: string) {
  const donateUrl = locale === "en" ? `${SITE_URL}/donate` : `${SITE_URL}/${locale}/donate`;
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Donate to Good Samaritan International",
    description:
      "Direct a monthly or one-time gift to a named Romanian family. 98¢ of every dollar reaches the field; the board pays its own travel.",
    recipient: { "@id": orgId },
    target: {
      "@type": "EntryPoint",
      urlTemplate: donateUrl,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/IOSPlatform",
        "https://schema.org/AndroidPlatform",
      ],
    },
    potentialAction: [
      { "@type": "PayAction", name: "Zelle to gsworldoutreach@gmail.com" },
      { "@type": "PayAction", name: "PayPal" },
      { "@type": "PayAction", name: "Check by mail" },
      { "@type": "PayAction", name: "Credit or debit card via Givebutter" },
    ],
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Project (per /projects/[slug])
// ─────────────────────────────────────────────────────────────────────────────

type ProjectSchemaInput = {
  slug: string;
  locale: string;
  title: string;
  summary: string;
  category: string;
  year: number;
  families: string[];
  villages: string[];
};

export function buildProjectSchema(p: ProjectSchemaInput) {
  const path = p.locale === "en" ? `/projects/${p.slug}` : `/${p.locale}/projects/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    "@id": `${SITE_URL}${path}#project`,
    name: p.title,
    description: p.summary,
    url: `${SITE_URL}${path}`,
    startDate: `${p.year}-01-01`,
    endDate: `${p.year}-12-31`,
    funder: { "@id": orgId },
    about: {
      "@type": "Thing",
      name: p.category,
    },
    spatialCoverage: p.villages.length > 0
      ? p.villages.map((v) => ({
          "@type": "Place",
          name: v,
          address: { "@type": "PostalAddress", addressCountry: "RO" },
        }))
      : { "@id": `${SITE_URL}/#romania` },
    // Families: we list the surname only (no first names/photos in markup) so
    // we never expose more here than what's already public in the annual report.
    keywords: p.families.length > 0
      ? p.families.map((f) => `${f} family`).join(", ")
      : undefined,
  };
}
