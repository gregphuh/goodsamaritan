"use client";

import Script from "next/script";

// `<givebutter-widget>` is a custom element from Givebutter's UMD script. We
// declare it on the JSX namespace so TypeScript doesn't reject the tag. The
// only attribute we set is `id` (the campaign slug); everything else is
// configured on Givebutter's dashboard so the org can iterate without code.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "givebutter-widget": {
        id: string;
      } & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export function GivebutterEmbed({
  campaignId,
  ariaLabel,
}: {
  campaignId: string;
  ariaLabel: string;
}) {
  return (
    <>
      {/* Givebutter loads its widget UMD once per page. `afterInteractive`
          waits until React has hydrated so we don't block the hero render;
          the form mount slot below resolves into the live widget the
          moment the script defines the custom element. */}
      <Script
        src="https://widgets.givebutter.com/latest.umd.cjs?acpv=1"
        strategy="afterInteractive"
      />
      <div
        role="region"
        aria-label={ariaLabel}
        className="mt-8 bg-surface-raised border border-rule rounded-md overflow-hidden"
      >
        <givebutter-widget id={campaignId} />
      </div>
    </>
  );
}
