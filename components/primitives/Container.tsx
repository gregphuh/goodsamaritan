import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Width = "prose" | "content" | "standard" | "wide" | "full";

const widthClass: Record<Width, string> = {
  prose: "max-w-[var(--container-prose)]",
  content: "max-w-[var(--container-content)]",
  standard: "max-w-[var(--container-standard)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-none",
};

export function Container({
  width = "standard",
  className,
  children,
}: {
  width?: Width;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 md:px-8", widthClass[width], className)}>
      {children}
    </div>
  );
}
