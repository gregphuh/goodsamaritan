import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Caveat, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import { DonateBar } from "@/components/layout/DonateBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import { buildOrganizationSchema } from "@/lib/seo";
import "../globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  // "block" hides the motto for up to 3s until Caveat finishes loading,
  // which prevents the Source-Serif fallback from briefly showing as a
  // block-letter flash. The motto only renders once it can render cursive.
  display: "block",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// metadataBase has to be a fully-qualified URL or Next.js can't expand
// relative og:image paths. We pick the right one based on where we're
// running:
//   • Vercel production with a custom domain → goodsamaritaninternational.org
//   • Vercel preview / current *.vercel.app deploy → the deployment URL
//   • Local dev → localhost
// Once Cloudflare DNS lands and `goodsamaritaninternational.org` is added
// in Vercel Project → Domains, VERCEL_PROJECT_PRODUCTION_URL auto-updates
// and this stays self-correct without a code change.
function getSiteUrl(): URL {
  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });
  const description =
    locale === "ro"
      ? "Organizație creștină 501(c)(3) care merge alături de văduve, orfani și familii din România din 1994. Anual, donatorii noștri trimit zeci de mii de dolari familiilor cunoscute pe nume — pentru alimente, medicamente, lemne de foc și reparații la case."
      : "A 501(c)(3) Christian charity that walks with widows, orphans, and families in Romania since 1994. Each year, our donors send tens of thousands of dollars to named families for food, medicine, firewood, and home repair.";
  return {
    metadataBase: getSiteUrl(),
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s · ${t("name")}`,
    },
    description,
    openGraph: {
      type: "website",
      siteName: t("name"),
      locale: locale === "ro" ? "ro_RO" : "en_US",
      title: `${t("name")} — ${t("tagline")}`,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${t("name")} — ${t("tagline")}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${t("name")} — ${t("tagline")}`,
      description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
    alternates: {
      languages: {
        en: "/",
        ro: "/ro",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "CTA" });

  return (
    <html
      lang={locale}
      className={`${sourceSerif.variable} ${sourceSans.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink pb-[5rem] md:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-ink-inverse focus:px-4 focus:py-2 focus:rounded-sm"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <DonateBar />
        </NextIntlClientProvider>
        <JsonLd data={buildOrganizationSchema()} />
      </body>
    </html>
  );
}
