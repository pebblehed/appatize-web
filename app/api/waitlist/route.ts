// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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

    // Store as CSV: timestamp,email
    const line = `"${timestamp}","${email.replace(/"/g, '""')}"\n`;
    const filePath = path.join(process.cwd(), "data", "waitlist.csv");

    // Ensure folder exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Append new record
    await fs.appendFile(filePath, line, "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
