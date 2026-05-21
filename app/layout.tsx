import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://goodsamaritaninternational.org"),
  title: {
    default: "Good Samaritan International — Serving Romanian families since 1994",
    template: "%s · Good Samaritan International",
  },
  description:
    "A 501(c)(3) Christian charity that walks with widows, orphans, and families in Romania. Founded 1994. In 2024 we distributed roughly $100,000 to named families for food, medicine, firewood, and home repair.",
  openGraph: {
    type: "website",
    siteName: "Good Samaritan International",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-ink-inverse focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
