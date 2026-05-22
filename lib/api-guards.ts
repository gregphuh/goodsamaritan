// Shared guards for our form-handling API routes.
//
// We collect two pieces of personal info from the public web:
//   • contact form: name + email + message
//   • newsletter: email
//
// The board reads gsworldoutreach@gmail.com daily, so the long-term plan is
// to forward both to that inbox via Resend/Postmark/Buttondown. Until then
// the handlers stub-and-log. These guards make sure that stub:
//   • can't be spammed cheaply (rate limit)
//   • can't be CSRF'd from another origin (origin check)
//   • doesn't leak full PII into Vercel function logs (hashing helper)

import { createHash } from "node:crypto";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// In-memory rate limit. Per-instance, so on Vercel this protects each
// serverless instance independently — not perfect, but enough friction to
// stop trivial scripting. Upgrade to Vercel KV / Upstash if we ever see
// real abuse.
const hits = new Map<string, { count: number; resetAt: number }>();

function clientKey(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  return (xff?.split(",")[0]?.trim() || real || "unknown").toLowerCase();
}

export function rateLimit(req: Request): { ok: true } | { ok: false; retryAfter: number } {
  const key = clientKey(req);
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true };
}

// Block cross-origin POSTs to our form endpoints. Browsers send an Origin
// header on every non-GET fetch; if it's not ours, refuse. Curl/server
// clients can spoof this, so this is light defense, not a replacement for
// CSRF tokens — but for form endpoints with no auth or cookies, it's the
// right level of friction.
export function sameOriginOnly(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    const u = new URL(origin);
    return u.host === host;
  } catch {
    return false;
  }
}

// Redact PII for logging. We never want raw names/emails in Vercel logs;
// they're visible to anyone with project read access. A SHA-256 hash lets
// the board correlate complaints/dupes without storing the original.
export function redactEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "[redacted]";
  const hash = createHash("sha256").update(email.toLowerCase()).digest("hex").slice(0, 8);
  return `${local[0]}***@${domain}#${hash}`;
}
