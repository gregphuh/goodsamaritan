import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/nav";
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
      <Container width="wide" className="py-12 md:py-16">
        {/* Top band: motto + summary */}
        <div className="flex items-start gap-5">
          <BrandCross size={32} strokeWidth={2} className="text-accent shrink-0 mt-1" />
          <div>
            <p className="font-display italic text-h3 text-accent leading-snug">
              &ldquo;{tSite("motto")}&rdquo;
            </p>
            <p className="mt-1 text-caption text-ink-inverse/60 uppercase tracking-wider">
              {tSite("mottoReference")}
            </p>
            <p className="mt-6 font-display text-h4 text-ink-inverse max-w-[40ch]">
              {tFooter("summary")}
            </p>
          </div>
        </div>

        {/* Middle band: nav + identity */}
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <p className="font-display text-h4 mb-3">{tSite("name")}</p>
            <p className="text-body-sm text-ink-inverse/80 flex items-center gap-2">
              <RomaniaFlag height={14} title="Flag of Romania" />
              <span>Serving Romanian families since 1994</span>
            </p>
            <p className="text-body-sm text-ink-inverse/80 mt-3">{tFooter("status501c3")}</p>
            <p className="text-body-sm text-ink-inverse/80">{tFooter("ein")}</p>
            <p className="text-body-sm text-ink-inverse/80 mt-2">{tFooter("address")}</p>
            <a
              href="mailto:gsworldoutreach@gmail.com"
              className="text-body-sm text-ink-inverse/80 hover:text-ink-inverse underline underline-offset-2 mt-2 inline-block"
            >
              gsworldoutreach@gmail.com
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="text-caption uppercase text-ink-inverse/60 mb-3">Pages</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
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
            <p className="text-caption uppercase text-ink-inverse/60 mb-3">Trust & legal</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/annual-reports/2024.pdf"
                  className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline"
                >
                  2024 annual report (PDF)
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-body-sm text-ink-inverse/85 hover:text-ink-inverse underline-offset-4 hover:underline"
                >
                  Terms
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <LanguageSwitcher className="text-ink-inverse [&_a]:text-ink-inverse [&_span]:text-ink-inverse/70" />
            </div>
          </div>
        </div>

        {/* Bible — quiet closing mark, paired with Galatians 2:10 reference */}
        <div className="mt-16 flex flex-col items-center text-center gap-3">
          <BrandBible
            size={48}
            strokeWidth={1.6}
            className="text-accent/80"
            title="Bible"
          />
          <p className="text-caption text-ink-inverse/60 uppercase tracking-wider">
            Remembering the poor · Galatians 2:10
          </p>
        </div>

        {/* Bottom band: legal microcopy */}
        <div className="mt-10 pt-6 border-t border-brand-strong text-body-sm text-ink-inverse/70">
          <p>{tFooter("tagline")} · &copy; {new Date().getFullYear()} Good Samaritan Org.</p>
        </div>
      </Container>
    </footer>
  );
}
