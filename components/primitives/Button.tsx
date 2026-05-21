import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import NextLink from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-body font-semibold rounded-sm " +
  "transition-[transform,background-color,border-color,color] duration-[160ms] [transition-timing-function:var(--ease-out)] " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-focus focus-visible:outline-offset-2 " +
  "disabled:opacity-60 disabled:pointer-events-none";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong",
  secondary:
    "bg-surface-raised text-ink border border-rule hover:border-ink-muted",
  ghost:
    "bg-transparent text-ink hover:bg-surface-sunken",
};

const sizeClass: Record<Size, string> = {
  sm: "h-10 px-4 text-body-sm min-w-[44px]",
  md: "h-12 px-6 text-body min-w-[44px]",
  lg: "h-14 px-8 text-body-lg",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variantClass[variant], sizeClass[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

type LinkButtonProps = SharedProps & {
  href: string;
  external?: boolean;
};

export function LinkButton({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
}: LinkButtonProps) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={classes}>
      {children}
    </NextLink>
  );
}
