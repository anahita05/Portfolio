import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, isMisconfigured, verifyVaultToken } from "@/server/vault-auth";

export async function GET() {
  try {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
    }
    try {
      const payload = verifyVaultToken(token);
      return NextResponse.json({ ok: true, authenticated: true, expiresAt: payload.exp ?? null });
    } catch {
      const res = NextResponse.json(
        { ok: false, error: "Session expired. Please unlock again." },
        { status: 401 },
      );
      res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
      return res;
    }
  } catch (e) {
    if (isMisconfigured(e)) {
      return NextResponse.json({ ok: false, error: "Server misconfigured." }, { status: 500 });
    }
    throw e;
  }
}
