import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME,
  cookieFlags,
  isMisconfigured,
  passwordsMatch,
  rateLimitKey,
  signVaultToken,
  unlockRateLimited,
} from "@/server/vault-auth";

function getPassword(): string {
  const value = process.env.SECRET_PASSWORD;
  if (!value) {
    throw new Error(
      "[vault] Missing required env var: SECRET_PASSWORD. Set it in .env.local (local) or the Vercel dashboard.",
    );
  }
  return value;
}

export async function POST(req: NextRequest) {
  if (unlockRateLimited(rateLimitKey(req.headers.get("x-forwarded-for")))) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 });
  }

  const { password } = body ?? {};
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ ok: false, error: "Password is required." }, { status: 400 });
  }
  if (password.length > 256) {
    return NextResponse.json({ ok: false, error: "Password is too long." }, { status: 400 });
  }

  try {
    // Generic message on purpose: don't leak whether the field was wrong vs missing.
    if (!passwordsMatch(password, getPassword())) {
      return NextResponse.json(
        { ok: false, error: "Incorrect password. Try again." },
        { status: 401 },
      );
    }
    const token = signVaultToken();
    const res = NextResponse.json({ ok: true, message: "Unlocked. Welcome to the vault." });
    res.cookies.set(COOKIE_NAME, token, cookieFlags());
    return res;
  } catch (e) {
    if (isMisconfigured(e)) {
      return NextResponse.json({ ok: false, error: "Server misconfigured." }, { status: 500 });
    }
    throw e;
  }
}
