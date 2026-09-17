import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[vault-api] Missing required env var: ${name}. See .env.example.`);
    process.exit(1);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  isProd: process.env.NODE_ENV === "production",
  frontendOrigins: (process.env.FRONTEND_URL ?? "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  secretPassword: required("SECRET_PASSWORD"),
  jwtSecret: required("JWT_SECRET"),
  jwtExpiresIn: Number(process.env.JWT_EXPIRES_IN ?? 604_800), // 7 days
};

if (config.jwtSecret.length < 32) {
  console.warn("[vault-api] WARNING: JWT_SECRET is shorter than 32 chars. Use a long random value in production.");
}
