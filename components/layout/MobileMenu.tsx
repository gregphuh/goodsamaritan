"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { List, X } from "@phosphor-icons/react";
import { Link } from "@/i18n/routing";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const tNav = useTranslations("Nav");
  const tCta = useTranslations("CTA");

  // Close on Escape, lock body scroll, move focus into drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Move focus to first link when drawer opens.
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      // Return focus to the trigger on close.
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className={cn(
          "md:hidden inline-flex items-center justify-center h-11 w-11 rounded-sm",
          "text-ink-inverse hover:bg-brand-strong transition-colors duration-[150ms]",
        )}
      >
        {open ? (
          <X size={24} weight="regular" aria-hidden="true" />
        ) : (
          <List size={24} weight="regular" aria-hidden="true" />
        )}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={tNav("home")}
          className="md:hidden fixed inset-0 top-[var(--header-h,4rem)] z-40 bg-surface-inverse text-ink-inverse overflow-y-auto"
        >
          <nav className="flex flex-col px-5 py-8 gap-2" aria-label="Primary">
            {NAV_ITEMS.map((item, i) => (
              <Link
                key={item.key}
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-h3 font-display py-3 border-b border-brand-strong"
              >
                {tNav(item.key)}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center h-14 px-8 bg-accent text-on-accent font-semibold rounded-sm text-body-lg"
            >
              {tCta("giveMonthly")}
            </Link>
            <div className="mt-8 pt-6 border-t border-brand-strong">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
