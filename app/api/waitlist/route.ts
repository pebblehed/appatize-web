// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

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

    // Very light email validation
    const basicEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailPattern.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // --- Debug: make sure env vars are present ---
    console.log("[waitlist] Incoming email:", email);
    console.log("[waitlist] Beehiiv key present? ", !!BEEHIIV_API_KEY);
    console.log("[waitlist] Beehiiv publication present? ", !!BEEHIIV_PUBLICATION_ID);

    // --- 1) Try Beehiiv first (if configured) ---
    let beehiivStatus:
      | "created"
      | "exists"
      | "skipped_env_missing"
      | "error" = "skipped_env_missing";

    if (BEEHIIV_API_KEY && BEEHIIV_PUBLICATION_ID) {
      try {
        const url = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: "appatize_waitlist",
          }),
        });

        console.log("[waitlist] Beehiiv status code:", res.status);

        if (res.status === 201 || res.status === 200) {
          beehiivStatus = "created";
        } else if (res.status === 409) {
          // Already subscribed / conflict
          beehiivStatus = "exists";
          const msg = await res.text().catch(() => "");
          console.log("[waitlist] Beehiiv 409 (already exists):", msg);
        } else {
          beehiivStatus = "error";
          const msg = await res.text().catch(() => "");
          console.error("[waitlist] Beehiiv error:", res.status, msg);
        }
      } catch (err) {
        beehiivStatus = "error";
        console.error("[waitlist] Beehiiv request failed:", err);
      }
    } else {
      console.warn(
        "[waitlist] Beehiiv env vars missing – skipping Beehiiv subscription."
      );
    }

    // --- 2) Always log to local CSV as backup ---
    const line = `"${timestamp}","${email.replace(/"/g, '""')}"\n`;
    const filePath = path.join(process.cwd(), "data", "waitlist.csv");

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.appendFile(filePath, line, "utf8");

    console.log("[waitlist] CSV append OK at", filePath);

    return NextResponse.json({
      ok: true,
      beehiivStatus,
    });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
