import { NextResponse } from "next/server";
import { z } from "zod";

// Stub: validates the email and accepts the request. Buttondown integration
// (BUTTONDOWN_API_KEY env var → POST to https://api.buttondown.email/v1/subscribers)
// lands when the org confirms which platform they'll run on.

const Body = z.object({
  email: z.string().email().max(254),
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
    return NextResponse.json({ error: "Email looks invalid." }, { status: 400 });
  }

  // TODO: wire to Buttondown once BUTTONDOWN_API_KEY is configured.
  // For now, log + return 200 so the form flow works end-to-end.
  console.log("[newsletter] would subscribe:", parsed.data.email);

  return NextResponse.json({ ok: true });
}
