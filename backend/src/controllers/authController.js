import { config } from "../config.js";
import {
  COOKIE_NAME,
  passwordsMatch,
  signVaultToken,
  vaultCookieOptions,
} from "../utils/tokens.js";

export function unlock(req, res) {
  const { password } = req.body ?? {};
  if (typeof password !== "string" || password.length === 0) {
    return res.status(400).json({ ok: false, error: "Password is required." });
  }
  if (password.length > 256) {
    return res.status(400).json({ ok: false, error: "Password is too long." });
  }

  if (!passwordsMatch(password, config.secretPassword)) {
    // Generic message on purpose: don't leak whether the field was wrong vs missing.
    return res.status(401).json({ ok: false, error: "Incorrect password. Try again." });
  }

  const token = signVaultToken();
  res.cookie(COOKIE_NAME, token, vaultCookieOptions());
  return res.json({ ok: true, message: "Unlocked. Welcome to the vault." });
}

export function me(req, res) {
  // requireAuth already verified the cookie; reaching here means valid.
  return res.json({ ok: true, authenticated: true, expiresAt: req.vault?.exp ?? null });
}

export function logout(_req, res) {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  return res.json({ ok: true, message: "Locked." });
}
