import express from "express";
import cookieParser from "cookie-parser";
import healthRoutes from "./modules/health/health.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.json({ name: "CALDER API" });
  });
  app.use("/health", healthRoutes);
  app.use("/auth", authRoutes);
  app.use("/products", productRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
