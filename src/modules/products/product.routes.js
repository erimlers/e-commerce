import { Router } from "express";
import { getBySlug, list } from "./product.controller.js";

const router = Router();

router.get("/", list);
router.get("/:slug", getBySlug);

export default router;
