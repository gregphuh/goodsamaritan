import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Content Security Policy. The site is mostly static — no inline scripts of
// our own, no third-party tracking by design. The exceptions:
//   • `script-src 'unsafe-inline'`: Next.js injects small inline runtime
//     scripts and next-intl injects locale bootstrap; without 'unsafe-inline'
//     the app breaks. (Long-term fix is nonces via middleware, which we can
//     add once we know how Givebutter's embed wants to inject.)
//   • Givebutter: their widget loads from givebutter.com when the donate
//     embed is wired up. Pre-allowed here so the campaign flip is one-step.
//   • Image sources: self for /public/images and data: URIs for SVG icons.
//
// Tighten further once the Givebutter embed strategy + bot protection
// (Cloudflare Turnstile) are picked.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://widgets.givebutter.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src 'self' https://api.buttondown.email",
  "frame-src 'self' https://widgets.givebutter.com https://givebutter.com https://www.paypal.com",
  "form-action 'self' https://www.paypal.com",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // HSTS — Vercel terminates TLS; tell browsers to refuse plain-HTTP for two
  // years and submit to the HSTS preload list. Safe because we own the apex
  // and want it HTTPS-only forever.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Don't sniff content types — closes XSS via MIME confusion.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Belt-and-suspenders against clickjacking (CSP frame-ancestors does the
  // real work; this header is for older browsers).
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak the full URL (which may contain page identifiers) to
  // cross-origin destinations on link clicks. Still send origin so partners
  // see the referrer is goodsamaritaninternational.org.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny all powerful browser features by default. A donor info site needs
  // none of camera/mic/geolocation/payment-API/etc.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "ambient-light-sensor=()",
      "autoplay=()",
      "battery=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=(self)",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "sync-xhr=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  },
  // The CSP from above.
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  // Old GoDaddy URL aliases — preserve link equity on cutover
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/stories", destination: "/accountability", permanent: true },
      { source: "/stories/:slug*", destination: "/accountability", permanent: true },
      { source: "/annual-reports", destination: "/accountability", permanent: true },
      { source: "/projects", destination: "/ministries", permanent: true },
      { source: "/projects/:slug*", destination: "/ministries/:slug*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
