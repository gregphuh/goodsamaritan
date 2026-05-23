import { cn } from "@/lib/cn";

/**
 * Calligraphic Latin cross. Soft curves, rounded caps, hand-drawn feel —
 * the opposite of the original rigid rectangular blocks.
 *
 * Pass `animated` to draw the beams in on page load (vertical first,
 * horizontal after a short delay). Honors prefers-reduced-motion via the
 * global override in globals.css.
 */
export function BrandCross({
  size = 24,
  strokeWidth = 6,
  className,
  title,
  animated = false,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
  title?: string;
  animated?: boolean;
}) {
  return (
    // strokeLinecap="butt": the half-circle round caps were rendering as
    // small visible "dots" at the four cross tips. Bezier curves still
    // give it the calligraphic hand-drawn feel; the ends just finish
    // cleanly now instead of bulging.
    <svg
      width={size}
      height={Math.round(size * 1.4)}
      viewBox="0 0 60 84"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("inline-block", animated && "cross-draw", className)}
    >
      {title ? <title>{title}</title> : null}

      {/* Vertical beam — drawn with a subtle S-curve so the line breathes
          like a single hand-pulled brush stroke instead of a ruled line. */}
      <path
        d="M 30 4 C 28 28 32 56 30 80"
        pathLength="1"
        className="cross-beam cross-beam-vertical"
      />

      {/* Horizontal beam — placed at the upper third (canonical Latin
          cross), with a gentle bow so the right end lifts very slightly. */}
      <path
        d="M 9 27 C 24 25 36 25 51 27"
        pathLength="1"
        className="cross-beam cross-beam-horizontal"
      />
    </svg>
  );
}
