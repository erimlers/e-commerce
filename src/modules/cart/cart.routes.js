import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import { add, patch, remove, show } from "./cart.controller.js";

const router = Router();

router.use(requireAuth);
router.get("/", show);
router.post("/items", add);
router.patch("/items/:sku", patch);
router.delete("/items/:sku", remove);

export default router;
