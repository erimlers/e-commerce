"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function AddToCart({ product }) {
  const router = useRouter();
  const available = product.variants.filter((variant) => variant.stock > 0);
  const [sku, setSku] = useState(available[0]?.sku || "");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  if (available.length === 0) {
    return <p className="mt-10 font-sans text-sm text-metal">Tükendi</p>;
  }

  async function add() {
    setMessage("");
    setPending(true);
    try {
      await api("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, sku, qty: 1 }),
      });
      router.push("/cart");
    } catch (error) {
      if (error.status === 401) {
        router.push("/login");
        return;
      }
      setMessage(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10 space-y-4">
      <label className="block font-sans text-sm">
        Seçenek
        <select
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="mt-2 w-full border border-ink/15 bg-paper px-3 py-2"
        >
          {available.map((variant) => (
            <option key={variant.sku} value={variant.sku}>
              {variant.color}
              {variant.size ? ` · ${variant.size}` : ""}
            </option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={add}
        disabled={pending}
        className="bg-ink px-6 py-3 font-sans text-sm text-paper disabled:opacity-50"
      >
        {pending ? "Ekleniyor…" : "Sepete ekle"}
      </button>
      {message ? <p className="font-sans text-sm text-red-800">{message}</p> : null}
    </div>
  );
}
