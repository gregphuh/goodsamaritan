import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Size = "display" | "h1" | "h2" | "h3" | "h4";
type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const sizeClass: Record<Size, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

// Default visual size when only `as` is supplied. h5/h6 share the h4 scale —
// they're for outline structure, not extra size steps.
const sizeForTag: Record<As, Size> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h4",
  h6: "h4",
};

export function Heading({
  as = "h2",
  size,
  className,
  children,
}: {
  as?: As;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  const Component = as;
  const resolvedSize = size ?? sizeForTag[as];
  return (
    <Component className={cn("font-display text-ink-strong", sizeClass[resolvedSize], className)}>
      {children}
    </Component>
  );
}
