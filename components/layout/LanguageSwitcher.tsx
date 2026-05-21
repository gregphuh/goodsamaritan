"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, Link } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const LOCALES: Locale[] = ["en", "ro"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <nav aria-label={t("label")} className={cn("flex items-center gap-1 text-body-sm", className)}>
      {LOCALES.map((code, i) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center gap-1">
            <Link
              href={pathname}
              locale={code}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "px-1 py-0.5 rounded-xs transition-colors duration-[150ms]",
                isActive
                  ? "font-semibold text-ink-strong underline underline-offset-4 decoration-accent decoration-2"
                  : "text-ink-soft hover:text-ink-strong",
              )}
            >
              {t(code)}
            </Link>
            {i < LOCALES.length - 1 ? (
              <span aria-hidden="true" className="text-ink-muted">·</span>
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}
