"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function AddToCartButton({ product, className = "" }) {
  const router = useRouter();
  const sku = product.variants?.find((variant) => variant.stock > 0)?.sku;
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function add(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!sku || pending) return;
    setPending(true);
    try {
      await api("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, sku, qty: 1 }),
      });
      setDone(true);
    } catch (error) {
      if (error.status === 401) {
        router.push("/login");
        return;
      }
      router.push(`/products/${product.slug}`);
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={add} disabled={pending || !sku} className={`card-btn ${className}`.trim()}>
      {pending ? "Ekleniyor…" : done ? "Eklendi" : "Sepete ekle"}
    </button>
  );
}
