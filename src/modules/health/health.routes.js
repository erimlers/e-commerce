import { Router } from "express";
import { isDbConnected } from "../../config/db.js";

const router = Router();

router.get("/", (req, res) => {
  const dbUp = isDbConnected();
  res.status(dbUp ? 200 : 503).json({
    ok: dbUp,
    db: dbUp ? "up" : "down",
  });
});

export default router;
