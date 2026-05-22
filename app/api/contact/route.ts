import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, redactEmail, sameOriginOnly } from "@/lib/api-guards";

// Stub: validates the payload and accepts it. The board reads
// gsworldoutreach@gmail.com daily. When the org picks an email transport
// (Resend, Postmark, Mailgun), forward parsed.data to that gmail inbox here.

const Body = z.object({
  name: z.string().max(200).optional().default(""),
  email: z.string().email().max(254),
  subject: z.enum(["general", "trip", "partner", "press"]),
  message: z.string().min(1).max(5000),
});

export async function POST(req: Request) {
  if (!sameOriginOnly(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const limit = rateLimit(req);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = Body.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  }

  // TODO: forward to gsworldoutreach@gmail.com via Resend/Postmark/etc.
  // PII redacted: raw email never enters the log stream.
  console.log("[contact] message received:", {
    subject: parsed.data.subject,
    email: redactEmail(parsed.data.email),
    length: parsed.data.message.length,
  });

  return NextResponse.json({ ok: true });
}
