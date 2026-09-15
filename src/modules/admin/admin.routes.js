import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import { requireAdmin } from "../../middleware/requireAdmin.js";
import {
  create,
  orders,
  patchOrder,
  patchProduct,
  products,
  removeProduct,
} from "./admin.controller.js";

const router = Router();

router.use(requireAuth, requireAdmin);
router.get("/products", products);
router.post("/products", create);
router.patch("/products/:id", patchProduct);
router.delete("/products/:id", removeProduct);
router.get("/orders", orders);
router.patch("/orders/:id", patchOrder);

export default router;
