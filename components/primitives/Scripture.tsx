import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * Sacred content. Never animates. Renders immediately. Italic serif at
 * editorial size, attribution below in caption case.
 */
export function Scripture({
  reference,
  translation = "NIV",
  className,
  children,
}: {
  reference: string;
  translation?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={cn("max-w-[60ch]", className)}>
      <blockquote className="font-display text-h3 italic text-ink-strong leading-snug">
        <span aria-hidden="true" className="select-none text-accent-strong">&ldquo;</span>
        {children}
        <span aria-hidden="true" className="select-none text-accent-strong">&rdquo;</span>
      </blockquote>
      <figcaption className="mt-4 text-caption text-ink-muted uppercase tracking-wider">
        {reference} · {translation}
      </figcaption>
    </figure>
  );
}
