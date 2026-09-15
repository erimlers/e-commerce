import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import { create, list, show } from "./order.controller.js";

const router = Router();

router.use(requireAuth);
router.post("/", create);
router.get("/", list);
router.get("/:id", show);

export default router;
