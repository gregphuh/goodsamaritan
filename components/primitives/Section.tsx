import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Density = "compact" | "default" | "spacious";
type Surface = "default" | "raised" | "sunken" | "inverse";

const densityClass: Record<Density, string> = {
  compact: "py-8 md:py-12",
  default: "py-16 md:py-20 lg:py-24",
  spacious: "py-20 md:py-28 lg:py-36",
};

const surfaceClass: Record<Surface, string> = {
  default: "bg-surface text-ink",
  raised: "bg-surface-raised text-ink",
  sunken: "bg-surface-sunken text-ink",
  inverse: "bg-surface-inverse text-ink-inverse",
};

export function Section({
  id,
  density = "default",
  surface = "default",
  className,
  children,
}: {
  id?: string;
  density?: Density;
  surface?: Surface;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn(densityClass[density], surfaceClass[surface], className)}>
      {children}
    </section>
  );
}
