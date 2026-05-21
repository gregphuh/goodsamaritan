"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/**
 * Click-to-copy field for Zelle email + check mailing address.
 * Falls back to a selectable code element if Clipboard API is missing.
 */
export function CopyableField({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent: user can still select the value text manually.
    }
  }

  return (
    <div className={cn("flex items-stretch gap-2", className)}>
      <code
        aria-label={label}
        title={value}
        className="flex-1 min-w-0 px-3 py-2 bg-surface-sunken border border-rule rounded-sm text-body-sm text-ink-strong font-body whitespace-nowrap overflow-x-auto"
      >
        {value}
      </code>
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 rounded-sm border border-rule",
          "bg-surface-raised text-ink hover:bg-surface-sunken",
          "text-body-sm font-semibold min-w-[88px] justify-center",
          "transition-colors duration-[150ms]",
        )}
        aria-live="polite"
      >
        {copied ? (
          <>
            <Check size={16} weight="bold" aria-hidden="true" />
            Copied
          </>
        ) : (
          <>
            <Copy size={16} weight="regular" aria-hidden="true" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
