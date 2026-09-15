import { HttpError } from "../utils/httpError.js";

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    next(new HttpError(403, "Yetkin yok"));
    return;
  }
  next();
}
