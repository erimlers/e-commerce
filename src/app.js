import express from "express";
import healthRoutes from "./modules/health/health.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.get("/", (req, res) => {
    res.json({ name: "CALDER API" });
  });
  app.use("/health", healthRoutes);
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
