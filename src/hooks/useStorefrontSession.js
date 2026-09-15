"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useStorefrontSession() {
  const [user, setUser] = useState(undefined);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { user: nextUser } = await api("/auth/me");
        if (cancelled) return;
        setUser(nextUser);
        const { cart } = await api("/cart");
        if (cancelled) return;
        setCartCount(cart.items.reduce((sum, item) => sum + item.qty, 0));
      } catch {
        if (!cancelled) {
          setUser(null);
          setCartCount(0);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await api("/auth/logout", { method: "POST" });
    setUser(null);
    setCartCount(0);
    window.location.href = "/";
  }

  return { user, cartCount, logout };
}
