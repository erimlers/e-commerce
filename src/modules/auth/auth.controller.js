import {
  cookieOptions,
  loginUser,
  registerUser,
  tokenCookieName,
} from "./auth.service.js";
import { serializeUser } from "./user.serialize.js";

export async function register(req, res) {
  const { user, token } = await registerUser(req.body);
  res.cookie(tokenCookieName(), token, cookieOptions());
  res.status(201).json({ user: serializeUser(user) });
}

export async function login(req, res) {
  const { user, token } = await loginUser(req.body);
  res.cookie(tokenCookieName(), token, cookieOptions());
  res.json({ user: serializeUser(user) });
}

export async function logout(req, res) {
  res.clearCookie(tokenCookieName(), { ...cookieOptions(), maxAge: 0 });
  res.json({ ok: true });
}

export async function me(req, res) {
  res.json({ user: serializeUser(req.user) });
}
