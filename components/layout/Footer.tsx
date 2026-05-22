import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { FOOTER_NAV_ITEMS } from "@/lib/nav";
import { Container } from "@/components/primitives/Container";
import { BrandBible } from "@/components/brand/BrandBible";
import { BrandCross } from "@/components/brand/BrandCross";
import { RomaniaFlag } from "@/components/brand/RomaniaFlag";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Footer() {
  const tNav = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const tSite = await getTranslations("Site");

  return (
    <footer className="mt-auto bg-surface-inverse text-ink-inverse">
      <Container width="wide" className="py-10 md:py-12">
        {/* Top — motto + summary, anchored by the cross */}
        <div className="flex items-start gap-4">
          <BrandCross size={28} strokeWidth={2.5} className="text-accent shrink-0 mt-1" />
          <div>
            <p className="font-cursive text-[1.75rem] md:text-[2rem] text-accent leading-[1.05]">
              {tSite("motto")}
            </p>
            <p className="mt-1 text-caption text-ink-inverse/60 uppercase tracking-wider">
              {tSite("mottoReference")}
            </p>
            <p className="mt-4 text-body text-ink-inverse/90 max-w-[44ch]">
              {tFooter("summary")}
            </p>
          </div>
        </div>

        {/* Middle — identity / nav / trust, three even columns */}
        <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <p className="font-display text-h4 mb-2">{tSite("name")}</p>
            <p className="text-body-sm text-ink-inverse/80 flex items-center gap-2">
              <RomaniaFlag height={14} title="Flag of Romania" />
              <span>{tFooter("servingLine")}</span>
            </p>
            <p className="text-body-sm text-ink-inverse/70 mt-3">{tFooter("status501c3")}</p>
            <p className="text-body-sm text-ink-inverse/70">{tFooter("ein")}</p>
            <p className="text-body-sm text-ink-inverse/70 mt-2">{tFooter("address")}</p>
            <a
              href="mailto:gsworldoutreach@gmail.com"
              className="text-body-sm text-ink-inverse/80 hover:text-ink-inverse underline underline-offset-2 mt-2 inline-block"
            >
              gsworldoutreach@gmail.com
            </a>
          </div>

          <nav aria-label={tFooter("pagesLabel")}>
            <p className="text-caption uppercase text-ink-inverse/60 mb-3">{tFooter("pagesLabel")}</p>
            <ul className="space-y-1.5">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline"
                >
                  {tNav("donate")}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="text-caption uppercase text-ink-inverse/60 mb-3">{tFooter("trustLabel")}</p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/accountability" className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline">
                  {tNav("accountability")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline">
                  {tFooter("linkPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline">
                  {tFooter("linkTerms")}
                </Link>
              </li>
            </ul>
            <div className="mt-5">
              <LanguageSwitcher className="text-ink-inverse [&_a]:text-ink-inverse [&_span]:text-ink-inverse/70" />
            </div>
          </div>
        </div>

        {/* Closing band — Bible mark + verse + copyright on one rule */}
        <div className="mt-8 pt-5 border-t border-ink-inverse/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <BrandBible size={22} strokeWidth={1.8} className="text-accent/70" title="Bible" />
            <p className="text-caption text-ink-inverse/60 uppercase tracking-wider">
              {tFooter("verseRemembering")} · {tFooter("verseReference")}
            </p>
          </div>
          <p className="text-body-sm text-ink-inverse/60">
            &copy; {new Date().getFullYear()} {tSite("name")} · {tFooter("tagline")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
