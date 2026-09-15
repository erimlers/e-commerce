"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function AuthNav() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    api("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  if (user === undefined) {
    return <span className="text-metal">…</span>;
  }

  if (!user) {
    return (
      <>
        <Link href="/login" className="hover:text-ink">
          Giriş
        </Link>
        <Link href="/register" className="hover:text-ink">
          Kayıt
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/account" className="hover:text-ink">
        {user.name}
      </Link>
      <button type="button" onClick={logout} className="hover:text-ink">
        Çıkış
      </button>
    </>
  );
}
