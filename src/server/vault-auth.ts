/**
 * SERVER-ONLY vault auth: password check + JWT httpOnly-cookie session.
 * Ported 1:1 from ./backend (same cookie name, payload, and messages) so
 * sessions stay compatible. Never import this file from client components.
 */

import crypto from "node:crypto";
import jwt from "jsonwebtoken";

export const COOKIE_NAME = "vault_token";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[vault] Missing required env var: ${name}. Set it in .env.local (local) or the Vercel dashboard.`,
    );
  }
  return value;
}

function getConfig() {
  return {
    secretPassword: getEnv("SECRET_PASSWORD"),
    jwtSecret: getEnv("JWT_SECRET"),
    jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN ?? 604_800), // 7 days
    // Same-origin (Next.js Route Handlers), so Lax works in production too.
    secure: process.env.NODE_ENV === "production",
  };
}

/** Constant-time password comparison (resists timing attacks). */
export function passwordsMatch(input: unknown, expected: string): boolean {
  const a = Buffer.from(String(input ?? ""));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) {
    const dummy = crypto.randomBytes(Math.max(a.length, 1));
    try {
      crypto.timingSafeEqual(dummy.subarray(0, a.length).fill(0), Buffer.alloc(a.length));
    } catch {
      /* ignore */
    }
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export function signVaultToken(): string {
  const { jwtSecret, jwtExpiresIn } = getConfig();
  return jwt.sign({ sub: "vault-guest", scope: "vault" }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
}

export function verifyVaultToken(token: string): { exp?: number } {
  const { jwtSecret } = getConfig();
  const payload = jwt.verify(token, jwtSecret) as { scope?: string; exp?: number };
  if (payload?.scope !== "vault") throw new Error("invalid scope");
  return payload;
}

export function cookieFlags() {
  const { jwtExpiresIn, secure } = getConfig();
  return {
    httpOnly: true as const,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: jwtExpiresIn,
  };
}

// ---- Best-effort in-memory rate limit: 10 unlock attempts / 10 min / IP.
// (On serverless each instance tracks its own counters — fine for a portfolio
// vault; use Redis/Upstash if you ever need strict global limiting.)
const attempts = new Map<string, { count: number; resetAt: number }>();

export function unlockRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

export function rateLimitKey(forwardedFor: string | null): string {
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export function isMisconfigured(e: unknown): boolean {
  return e instanceof Error && e.message.includes("Missing required env var");
}
