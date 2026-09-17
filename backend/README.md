# Portfolio Vault API (Express backend)

Separate Node.js + Express backend that guards the portfolio's hidden section.
The frontend never sees the password — it POSTs a guess, and on success the
server sets a signed JWT in an `httpOnly` cookie. The secret portfolio content
itself is served from `GET /api/secret/content`, so it is never in the public
page bundle.

## Folder structure

```
backend/
├── src/
│   ├── server.js            # Express setup (CORS + credentials, cookies, routes, errors)
│   ├── config.js            # Env loading + validation (fails fast if secrets missing)
│   ├── routes/
│   │   ├── auth.js          # POST /unlock, POST /logout, GET /me
│   │   └── secret.js        # GET /content (auth required)
│   ├── controllers/
│   │   └── authController.js# Unlock / me / logout logic
│   ├── middleware/
│   │   ├── requireAuth.js   # Verifies the JWT cookie, clears it when expired
│   │   └── authLimiter.js   # Rate-limit: 10 unlock attempts / 10 min / IP
│   ├── utils/
│   │   └── tokens.js        # JWT sign/verify, timing-safe compare, cookie flags
│   └── data/
│       └── secret.js        # Hidden portfolio content (edit freely)
├── .env.example
├── .gitignore
└── package.json
```

## API endpoints

| Method | Path                 | Auth | Description                          |
| ------ | -------------------- | ---- | ------------------------------------ |
| GET    | `/api/health`        | no   | Health check                         |
| POST   | `/api/auth/unlock`   | no   | `{ "password": "..." }` → sets cookie |
| GET    | `/api/auth/me`       | yes  | Session check (used on page refresh) |
| POST   | `/api/auth/logout`   | no   | Clears the cookie                    |
| GET    | `/api/secret/content`| yes  | Hidden projects / texts / images     |

Failure responses always look like `{ "ok": false, "error": "..." }`.

## Local setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in SECRET_PASSWORD + JWT_SECRET
npm run dev            # http://localhost:4000 (auto-reload via --watch)
```

Generate secrets:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Frontend: copy the root `.env.example` to `.env.local` (`NEXT_PUBLIC_API_URL=http://localhost:4000`)
and run the Next.js dev server.

Quick manual test:

```bash
curl -c jar.txt -X POST localhost:4000/api/auth/unlock \
  -H "Content-Type: application/json" -d '{"password":"<SECRET_PASSWORD>"}'
curl -b jar.txt localhost:4000/api/auth/me
curl -b jar.txt localhost:4000/api/secret/content
curl -b jar.txt -X POST localhost:4000/api/auth/logout
```

## Security best practices (implemented + recommended)

- **Password never leaves the server** — compared against `SECRET_PASSWORD` with
  `crypto.timingSafeEqual` (constant-time, resists timing attacks).
- **JWT in `httpOnly` cookie** — JavaScript (and any XSS payload) cannot read the
  token. No token in `localStorage`.
- **Cookie flags** — `Secure` + `SameSite=None` in production (required for
  cross-site Vercel → Render setups over HTTPS), `SameSite=Lax` locally.
- **Rate limiting** — 10 unlock tries per 10 min per IP slows brute force.
- **Generic error messages** — wrong password returns "Incorrect password",
  never hints about what was wrong.
- **CORS allowlist** — only origins in `FRONTEND_URL` with `credentials: true`;
  unknown origins get 403. Cookie auth (`include`) instead of bearer headers.
- **Secret content is server-gated** — `requireAuth` runs before
  `GET /api/secret/content`, so logged-out users can't fetch it even directly.
- **Fail fast on missing secrets** — the server refuses to boot without
  `SECRET_PASSWORD` / `JWT_SECRET`; short JWT secrets log a warning.
- **Still to do for production**: serve only over HTTPS, put the backend behind a
  WAF/reverse proxy, rotate `JWT_SECRET` + `SECRET_PASSWORD` periodically, add
  request logging (morgan/pino), and consider hashing the password with
  bcrypt/argon2 instead of a plaintext env comparison if multiple passwords
  or users are ever needed.

## Deployment

### Backend → Render (or Railway / Fly / VPS)

1. Push the repo (`.env` is gitignored — never commit it).
2. Create a **Web Service**: build `npm install`, start `npm start`, Node 20+.
3. Set environment variables in the dashboard:
   `NODE_ENV=production`, `FRONTEND_URL=https://<your-frontend>`,
   `SECRET_PASSWORD=<long-random>`, `JWT_SECRET=<long-random>`.
4. The service must be **HTTPS** (Render/Railway give this by default) or the
   `Secure` cookie will be rejected by browsers.

### Frontend → Vercel

1. Set `NEXT_PUBLIC_API_URL=https://<your-backend>` in Vercel env vars.
2. Redeploy. The browser will POST cross-origin with credentials; CORS allows
   only your frontend origin.

### Same-machine alternative

Serve both from one origin (e.g. Express `express.static` for the Next.js
`out/` export, or a reverse proxy mapping `/api/*` → backend) — then cookies
are first-party and `SameSite=Lax` works without HTTPS complications.
