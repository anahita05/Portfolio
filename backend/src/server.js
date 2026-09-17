import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config.js";
import authRoutes from "./routes/auth.js";
import secretRoutes from "./routes/secret.js";

const app = express();

// Behind Render/Railway/Heroku proxies so Secure cookies + x-forwarded-proto work.
app.set("trust proxy", 1);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin / curl (no Origin header) and the allowlist.
      if (!origin || config.frontendOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-vault-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/secret", secretRoutes);

app.use("/api", (_req, res) => {
  res.status(404).json({ ok: false, error: "Not found." });
});

// Central error handler (must be last; 4 args).
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err?.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ ok: false, error: "Origin not allowed." });
  }
  console.error("[vault-api]", err);
  return res.status(500).json({ ok: false, error: "Something went wrong." });
});

app.listen(config.port, () => {
  console.log(`[vault-api] listening on http://localhost:${config.port} (${process.env.NODE_ENV ?? "development"})`);
});
