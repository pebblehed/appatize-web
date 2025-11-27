// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Ensure we’re on the Node runtime (needed for fs, not Edge)
export const runtime = "nodejs";

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

    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

    if (!apiKey || !publicationId) {
      console.error("[waitlist] Missing Beehiiv env vars");
      return NextResponse.json(
        { error: "Server not configured for waitlist" },
        { status: 500 }
      );
    }

    // --- Beehiiv subscribe call ---
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
        }),
      }
    );

    const beehiivText = await beehiivRes.text();
    console.log("[waitlist] Beehiiv status:", beehiivRes.status);
    console.log("[waitlist] Beehiiv response:", beehiivText);

    // Treat 201 (created) and 409 (already subscribed) as success
    if (
      beehiivRes.status !== 201 &&
      beehiivRes.status !== 409
    ) {
      return NextResponse.json(
        { error: "Failed to subscribe via Beehiiv" },
        { status: 500 }
      );
    }

    // --- Local CSV logging (dev only) ---
    // Skip on Vercel to avoid filesystem issues
    if (!process.env.VERCEL) {
      try {
        const timestamp = new Date().toISOString();
        const line = `"${timestamp}","${email.replace(/"/g, '""')}"\n`;
        const filePath = path.join(process.cwd(), "data", "waitlist.csv");

        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.appendFile(filePath, line, "utf8");
        console.log("[waitlist] CSV append OK at", filePath);
      } catch (csvErr) {
        console.error("[waitlist] CSV write failed (non-fatal):", csvErr);
        // important: do NOT throw here
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
