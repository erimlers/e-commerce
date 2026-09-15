import { userFromToken } from "../modules/auth/auth.service.js";
import { tokenCookieName } from "../modules/auth/auth.service.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[tokenCookieName()];
    req.user = await userFromToken(token);
    next();
  } catch (error) {
    next(error);
  }
}
