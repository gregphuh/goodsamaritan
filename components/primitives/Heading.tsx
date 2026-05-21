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
  const resolvedSize = size ?? (as === "h5" || as === "h6" ? "h4" : (as as Size));
  return (
    <Component className={cn("font-display text-ink-strong", sizeClass[resolvedSize], className)}>
      {children}
    </Component>
  );
}
