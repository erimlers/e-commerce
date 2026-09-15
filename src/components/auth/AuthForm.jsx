"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";

export function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      await api(isRegister ? "/auth/register" : "/auth/login", {
        method: "POST",
        body: JSON.stringify(isRegister ? { name, email, password } : { email, password }),
      });
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-5">
      {isRegister ? (
        <label className="block font-sans text-sm">
          Ad
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-ink/15 bg-transparent px-3 py-2 outline-none focus:border-ink"
          />
        </label>
      ) : null}
      <label className="block font-sans text-sm">
        E-posta
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border border-ink/15 bg-transparent px-3 py-2 outline-none focus:border-ink"
        />
      </label>
      <label className="block font-sans text-sm">
        Şifre
        <input
          required
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-ink/15 bg-transparent px-3 py-2 outline-none focus:border-ink"
        />
      </label>
      {error ? <p className="font-sans text-sm text-red-800">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-ink px-4 py-3 font-sans text-sm text-paper disabled:opacity-50"
      >
        {pending ? "Gönderiliyor…" : isRegister ? "Kayıt ol" : "Giriş yap"}
      </button>
      <p className="font-sans text-sm text-metal">
        {isRegister ? (
          <>
            Hesabın var mı?{" "}
            <Link href="/login" className="text-ink underline">
              Giriş
            </Link>
          </>
        ) : (
          <>
            Hesabın yok mu?{" "}
            <Link href="/register" className="text-ink underline">
              Kayıt
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
