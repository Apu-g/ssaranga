import { NextResponse } from "next/server";

export const runtime = "nodejs";

/*
  Sends a WhatsApp enquiry via the WhatsApp Business Cloud API.

  Configure these in `.env.local` (never commit them):
    WHATSAPP_API_TOKEN   - Meta Graph API token
    WHATSAPP_PHONE_ID    - The WhatsApp Business phone number ID (sender)
    WHATSAPP_TO_NUMBER   - Destination number in E.164 format, e.g. 919663070522

  When env vars are missing, the route responds with { configured: false }
  so the frontend can fall back to the wa.me link.
*/

function buildMessage(data: {
  name: string;
  contact: string;
  program: string;
  message: string;
}) {
  const lines = [
    "Hi SsaRanga! I'd like to make an enquiry.",
    "",
    `Name: ${data.name}`,
    `Phone / Email: ${data.contact}`,
    `Program Interest: ${data.program}`,
  ];
  if (data.message) {
    lines.push("", `Message: ${data.message}`);
  }
  return lines.join("\n");
}

export async function POST(request: Request) {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const to = process.env.WHATSAPP_TO_NUMBER;

  if (!token || !phoneId || !to) {
    return NextResponse.json(
      { configured: false, error: "WhatsApp API not configured" },
      { status: 200 }
    );
  }

  let data: {
    name?: string;
    contact?: string;
    program?: string;
    message?: string;
  };
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { configured: true, success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  const name = data.name?.trim() || "—";
  const contact = data.contact?.trim() || "—";
  const program = data.program?.trim() || "—";
  const message = data.message?.trim() || "";

  if (!name || !contact || !program) {
    return NextResponse.json(
      { configured: true, success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const body = buildMessage({ name, contact, program, message });

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body },
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          configured: true,
          success: false,
          error: result?.error?.message || "WhatsApp API error",
        },
        { status: res.status }
      );
    }

    return NextResponse.json({ configured: true, success: true, result });
  } catch (err) {
    return NextResponse.json(
      {
        configured: true,
        success: false,
        error: err instanceof Error ? err.message : "Network error",
      },
      { status: 500 }
    );
  }
}
