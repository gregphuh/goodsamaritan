"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/**
 * Mobile-only sticky donate CTA. Visible on every page below md breakpoint.
 * Spec requirement: "Donate CTA reachable in 1 tap from any page (mobile)."
 * On desktop, the Header donate button covers this role and this bar hides.
 */
export function DonateBar() {
  const t = useTranslations("CTA");

  return (
    <div
      role="complementary"
      aria-label="Donate"
      className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-surface-inverse border-t border-brand-strong px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <Link
        href="/donate"
        className="flex items-center justify-center h-12 bg-accent text-on-accent font-semibold rounded-sm text-body"
      >
        {t("giveMonthly")}
      </Link>
    </div>
  );
}
