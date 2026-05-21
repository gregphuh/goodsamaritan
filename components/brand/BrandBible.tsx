import { cn } from "@/lib/cn";

/**
 * Bible mark — closed book with a cross on the front cover. Outline-only
 * stroke so it can sit on any surface. Matches the BrandCross style.
 */
export function BrandBible({
  size = 44,
  strokeWidth = 1.6,
  className,
  title,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
}) {
  const w = size;
  const h = Math.round(size * (70 / 60));
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 60 70"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("inline-block", className)}
    >
      {title ? <title>{title}</title> : null}
      {/* Outer book cover */}
      <rect x="6" y="4" width="48" height="62" rx="1.5" />
      {/* Spine groove on the left */}
      <line x1="12" y1="4" x2="12" y2="66" />
      {/* Suggestion of pages along the bottom edge */}
      <line x1="14" y1="60" x2="52" y2="60" />
      <line x1="14" y1="63" x2="52" y2="63" />
      {/* Cross on the front cover — drawn with thicker stroke than the book
          outline so it reads as the focal element. */}
      <line x1="33" y1="20" x2="33" y2="48" strokeWidth={strokeWidth + 2.4} />
      <line x1="22" y1="30" x2="44" y2="30" strokeWidth={strokeWidth + 2.4} />
    </svg>
  );
}
