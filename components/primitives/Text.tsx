import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Size = "body-lg" | "body" | "body-sm" | "caption";
type Tone = "default" | "soft" | "muted" | "inverse" | "accent";
type As = "p" | "span" | "div";

const sizeClass: Record<Size, string> = {
  "body-lg": "text-body-lg",
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "text-caption uppercase font-semibold",
};

const toneClass: Record<Tone, string> = {
  default: "text-ink",
  soft: "text-ink-soft",
  muted: "text-ink-muted",
  inverse: "text-ink-inverse",
  accent: "text-accent-strong",
};

export function Text({
  as = "p",
  size = "body",
  tone = "default",
  className,
  children,
}: {
  as?: As;
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const Component = as;
  return (
    <Component className={cn(sizeClass[size], toneClass[tone], className)}>
      {children}
    </Component>
  );
}
