import { Router } from "express";
import { secretContent } from "../data/secret.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

// Everything under /api/secret requires a valid vault cookie.
router.use(requireAuth);

router.get("/content", (_req, res) => {
  res.json({ ok: true, vault: secretContent });
});

export default router;
