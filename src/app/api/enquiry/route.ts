import { NextResponse } from "next/server";

export const runtime = "nodejs";

/*
  Forwards leads to a Google Sheets via a Google Apps Script web app.

  Configure in `.env.local` (never commit it):
    GOOGLE_SHEETS_APPS_SCRIPT_URL - the "/exec" URL of your deployed Apps Script

  Paste the apps script (see scripts/google_sheets_leads.gs) into
  script.google.com, deploy it as a web app with "Anyone" access,
  and put the resulting URL here.

  When the env var is missing the route responds with { configured: false }
  so the frontend can fall back to the wa.me link.
*/

export async function POST(request: Request) {
  const sheetsUrl = process.env.GOOGLE_SHEETS_APPS_SCRIPT_URL;

  if (!sheetsUrl) {
    return NextResponse.json(
      { configured: false, error: "Google Sheets not configured" },
      { status: 200 }
    );
  }

  let data: {
    name?: string;
    phone?: string;
    email?: string;
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

  const name = data.name?.trim() || "";
  const phone = data.phone?.trim() || "";
  const email = data.email?.trim() || "";
  const program = data.program?.trim() || "";
  const message = data.message?.trim() || "";

  if (!name || !phone || !program) {
    return NextResponse.json(
      { configured: true, success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        program,
        message,
        submittedAt: new Date().toISOString(),
      }),
    });

    const text = await res.text();
    let result: { success?: boolean; error?: string } | null = null;
    try {
      result = JSON.parse(text);
    } catch {
      result = null;
    }

    if (!result || result.success !== true) {
      const message = result?.error
        ? result.error
        : 'Google Sheets did not return a success response. Is the Apps Script web app deployed with "Anyone" access?';
      return NextResponse.json(
        { configured: true, success: false, error: message },
        { status: 502 }
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