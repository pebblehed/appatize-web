// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

// Ensure this runs server-side and isn't statically optimized
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // --- 1) Parse body safely ---
    let body: any = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // --- 2) Very light email validation ---
    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // --- 3) Try to append to local CSV (but don't fail the request if this breaks) ---
    const line = `"${timestamp}","${email.replace(/"/g, '""')}"\n`;
    const filePath = path.join(process.cwd(), "data", "waitlist.csv");

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.appendFile(filePath, line, "utf8");
    } catch (csvError) {
      console.error("Waitlist CSV write error:", csvError);
      // We *do not* throw here – the user still gets a success response.
    }

    // --- 4) Try to send to Beehiiv (also non-fatal for the user) ---
    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.warn(
        "Beehiiv env vars missing – skipping remote subscription. " +
          "Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID."
      );
    } else {
      try {
        const res = await fetch(
          `${BEEHIIV_API_BASE}/publications/${publicationId}/subscriptions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              email,
              reactivate_existing: true,
              send_welcome_email: true,
              utm_source: "appatize-waitlist",
              utm_medium: "landing-page",
            }),
          }
        );

        if (!res.ok) {
          const text = await res.text();
          console.error(
            "Beehiiv subscription failed:",
            res.status,
            res.statusText,
            text
          );
          // Still don’t fail the user-facing response.
        }
      } catch (beeErr) {
        console.error("Error calling Beehiiv API:", beeErr);
        // Also non-fatal.
      }
    }

    // --- 5) Always return success to the client if we got this far ---
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Only truly unexpected, top-level failures end up here
    console.error("Waitlist POST fatal error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
