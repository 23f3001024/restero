import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STAFF_COOKIE, getStaffPin } from "@/lib/staff";

// Is the caller already unlocked? (the PinGate checks this on load)
export async function GET() {
  const authed = cookies().get(STAFF_COOKIE)?.value === getStaffPin();
  return NextResponse.json({ authed }, { headers: { "Cache-Control": "no-store" } });
}

// Validate the PIN and, on success, set the staff cookie.
export async function POST(req: Request) {
  let body: { pin?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const pin = (body.pin ?? "").trim();
  if (!pin || pin !== getStaffPin()) {
    return NextResponse.json({ error: "Incorrect PIN." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, pin, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  });
  return res;
}

// Sign out (clear the cookie).
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(STAFF_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
