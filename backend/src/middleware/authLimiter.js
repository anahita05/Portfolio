import rateLimit from "express-rate-limit";


export const unlockLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { ok: false, error: "Too many attempts. Try again in a few minutes." },
});
