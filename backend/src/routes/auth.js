import { Router } from "express";
import { logout, me, unlock } from "../controllers/authController.js";
import { unlockLimiter } from "../middleware/authLimiter.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.post("/unlock", unlockLimiter, unlock);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
