import { NextResponse } from "next/server";
import { z } from "zod";

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
  console.log("[contact] message received:", {
    subject: parsed.data.subject,
    name: parsed.data.name,
    email: parsed.data.email,
    length: parsed.data.message.length,
  });

  return NextResponse.json({ ok: true });
}
