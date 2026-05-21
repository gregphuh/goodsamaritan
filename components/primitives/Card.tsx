import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

const paddingClass: Record<Padding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  padding = "md",
  className,
  children,
}: {
  padding?: Padding;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-surface-raised border border-rule rounded-md",
        paddingClass[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
