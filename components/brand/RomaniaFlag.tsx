import { cn } from "@/lib/cn";

/**
 * Flag of Romania — vertical tricolor (blue / yellow / red). Official Pantone
 * approximations: 280C / 116C / 186C. Rendered as inline SVG so it scales
 * cleanly at any size and inherits no color (the bands are fixed hex).
 *
 * Use `title` to make it an a11y-labeled image, or leave it as decorative
 * (aria-hidden) when paired with adjacent "Romania" text.
 */
export function RomaniaFlag({
  height = 18,
  className,
  title,
  withBorder = true,
}: {
  height?: number;
  className?: string;
  title?: string;
  withBorder?: boolean;
}) {
  // Romanian flag aspect ratio is 2:3 (height:width).
  const width = Math.round(height * 1.5);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 20"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={cn("inline-block shrink-0", className)}
      shapeRendering="crispEdges"
    >
      {title ? <title>{title}</title> : null}
      <rect x="0" y="0" width="10" height="20" fill="#002B7F" />
      <rect x="10" y="0" width="10" height="20" fill="#FCD116" />
      <rect x="20" y="0" width="10" height="20" fill="#CE1126" />
      {withBorder ? (
        <rect
          x="0.25"
          y="0.25"
          width="29.5"
          height="19.5"
          fill="none"
          stroke="rgb(0 0 0 / 0.15)"
          strokeWidth="0.5"
        />
      ) : null}
    </svg>
  );
}
