import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// twMerge groups Tailwind classes by their semantic role (color, font-size,
// padding, etc.) and dedupes within a group. Our design system adds custom
// utilities under the `text-*` prefix for BOTH colors (text-ink, text-soft,
// text-on-accent) AND sizes (text-body-lg, text-caption, text-h2). Without
// teaching twMerge which is which, it lumps them together and silently drops
// the color when both appear (see Button.tsx variants — secondary buttons
// rendered as "cream on cream" on inverse-surface sections before this fix).
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-body-lg",
        "text-body",
        "text-body-sm",
        "text-caption",
      ],
      "text-color": [
        "text-ink",
        "text-ink-strong",
        "text-ink-soft",
        "text-ink-muted",
        "text-ink-inverse",
        "text-on-accent",
        "text-accent",
        "text-accent-strong",
        "text-success",
        "text-danger",
        "text-danger-bright",
        "text-focus",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
