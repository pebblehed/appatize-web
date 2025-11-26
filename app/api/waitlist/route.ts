// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Very light validation – you can swap for a stricter regex or library later
    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // ---------- 1) Append to local CSV backup ----------
    const line = `"${timestamp}","${email.replace(/"/g, '""')}"\n`;
    const filePath = path.join(process.cwd(), "data", "waitlist.csv");

    // Ensure folder exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Append new record
    await fs.appendFile(filePath, line, "utf8");

    // ---------- 2) Send to Beehiiv (primary list) ----------
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
          // We still return ok:true so the user sees success and the CSV has them.
        }
      } catch (beeErr) {
        console.error("Error calling Beehiiv API:", beeErr);
        // Again, don't surface as 500 – local CSV is already written.
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
