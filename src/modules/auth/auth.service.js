import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./user.model.js";
import { HttpError } from "../../utils/httpError.js";
import { loadEnv } from "../../config/env.js";

const TOKEN_COOKIE = "calder_token";
const TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function tokenCookieName() {
  return TOKEN_COOKIE;
}

export function cookieOptions() {
  const env = loadEnv();
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production",
    path: "/",
    maxAge: TOKEN_MAX_AGE_MS,
  };
}

function signToken(user) {
  const env = loadEnv();
  return jwt.sign({ sub: String(user._id), role: user.role }, env.jwtSecret, {
    expiresIn: "7d",
  });
}

export async function registerUser({ email, password, name }) {
  if (!email || !password || !name) {
    throw new HttpError(400, "Ad, e-posta ve şifre gerekli");
  }
  if (String(password).length < 8) {
    throw new HttpError(400, "Şifre en az 8 karakter olmalı");
  }

  const existing = await User.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) {
    throw new HttpError(409, "Bu e-posta zaten kayıtlı");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    email: String(email).toLowerCase().trim(),
    passwordHash,
    name: String(name).trim(),
    role: "customer",
  });
  return { user, token: signToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: String(email || "").toLowerCase().trim() });
  if (!user) {
    throw new HttpError(401, "E-posta veya şifre hatalı");
  }
  const ok = await bcrypt.compare(password || "", user.passwordHash);
  if (!ok) {
    throw new HttpError(401, "E-posta veya şifre hatalı");
  }
  return { user, token: signToken(user) };
}

export async function userFromToken(token) {
  if (!token) {
    throw new HttpError(401, "Giriş gerekli");
  }
  const env = loadEnv();
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user) {
      throw new HttpError(401, "Giriş gerekli");
    }
    return user;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(401, "Giriş gerekli");
  }
}
