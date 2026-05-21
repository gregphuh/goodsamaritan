import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });
  return {
    metadataBase: new URL("https://goodsamaritaninternational.org"),
    title: {
      default: `${t("name")} — ${t("tagline")}`,
      template: `%s · ${t("name")}`,
    },
    description:
      "A 501(c)(3) Christian charity that walks with widows, orphans, and families in Romania. Founded 1994. In 2024 we distributed roughly $100,000 to named families for food, medicine, firewood, and home repair.",
    openGraph: {
      type: "website",
      siteName: t("name"),
      locale: locale === "ro" ? "ro_RO" : "en_US",
    },
    twitter: { card: "summary_large_image" },
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
      className={`${fraunces.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-ink-inverse focus:px-4 focus:py-2 focus:rounded-sm"
        >
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
