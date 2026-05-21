import { cn } from "@/lib/cn";

/**
 * Outlined Latin cross — the brand mark from the original site.
 * Stroke-only so it can sit on any surface. currentColor lets the parent
 * decide the line color (gold accent on dark surfaces, ink on light).
 */
export function BrandCross({
  size = 24,
  strokeWidth = 2,
  className,
  title,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.4)}
      viewBox="0 0 50 70"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("inline-block", className)}
    >
      {title ? <title>{title}</title> : null}
      {/* Vertical beam */}
      <rect x="22" y="2" width="6" height="66" />
      {/* Horizontal beam — crossbeam set at ~30% from top, Latin cross proportions */}
      <rect x="8" y="20" width="34" height="6" />
    </svg>
  );
}
