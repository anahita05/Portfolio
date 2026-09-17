import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const COOKIE_NAME = "vault_token";

/** Constant-time password comparison (resists timing attacks). */
export function passwordsMatch(input, expected) {
  const a = Buffer.from(String(input ?? ""));
  const b = Buffer.from(String(expected));
  if (a.length !== b.length) {
    const dummy = crypto.randomBytes(Math.max(a.length, 1));
    try {
      crypto.timingSafeEqual(dummy.subarray(0, a.length).fill(0), Buffer.alloc(a.length));
    } catch { /* ignore */ }
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

export function signVaultToken() {
  return jwt.sign({ sub: "vault-guest", scope: "vault" }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function verifyVaultToken(token) {
  const payload = jwt.verify(token, config.jwtSecret);
  if (payload?.scope !== "vault") throw new Error("invalid scope");
  return payload;
}

export function vaultCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProd,
    sameSite: config.isProd ? "none" : "lax",
    path: "/",
    maxAge: config.jwtExpiresIn * 1000,
  };
}
