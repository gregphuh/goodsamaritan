import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Big trust-signal number with descriptive label beneath. Used in the home
 * trust band ($100K distributed, 2% admin, 76% Romania, etc.) and on /about.
 */
export function ImpactStat({
  value,
  label,
  detail,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  detail?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-display text-h1 text-ink-strong leading-none">{value}</span>
      <span className="text-body-sm font-semibold text-ink uppercase tracking-wide">
        {label}
      </span>
      {detail ? (
        <span className="text-body-sm text-ink-muted">{detail}</span>
      ) : null}
    </div>
  );
}
