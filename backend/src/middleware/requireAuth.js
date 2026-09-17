import { COOKIE_NAME, verifyVaultToken } from "../utils/tokens.js";

/** Rejects requests without a valid vault JWT cookie. */
export function requireAuth(req, res, next) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ ok: false, error: "Not authenticated." });
  }
  try {
    req.vault = verifyVaultToken(token);
    return next();
  } catch {
    res.clearCookie(COOKIE_NAME, { path: "/" });
    return res.status(401).json({ ok: false, error: "Session expired. Please unlock again." });
  }
}
