import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export async function Header() {
  const tNav = await getTranslations("Nav");
  const tCta = await getTranslations("CTA");
  const tSite = await getTranslations("Site");

  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-16 md:h-20",
        "bg-surface-inverse text-ink-inverse",
        "border-b border-brand-strong",
      )}
      style={{ ["--header-h" as string]: "4rem" }}
    >
      <div className="mx-auto h-full max-w-[var(--container-wide)] px-5 sm:px-6 md:px-8 flex items-center justify-between gap-6">
        <Link href="/" className="font-display text-body-lg md:text-h4 font-semibold leading-none">
          {tSite("name")}
        </Link>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-body-sm font-semibold text-ink-inverse/90 hover:text-ink-inverse transition-colors duration-[150ms]"
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <LanguageSwitcher className="text-ink-inverse [&_a]:text-ink-inverse [&_span]:text-ink-inverse/70" />
          </div>
          <Link
            href="/donate"
            className="hidden md:inline-flex items-center justify-center h-11 px-5 bg-accent text-on-accent font-semibold rounded-sm text-body-sm hover:bg-accent-strong transition-colors duration-[160ms]"
          >
            {tCta("giveMonthly")}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
