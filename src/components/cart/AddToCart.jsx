"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function AddToCart({ product }) {
  const router = useRouter();
  const available = product.variants.filter((variant) => variant.stock > 0);
  const [sku, setSku] = useState(available[0]?.sku || "");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const selected = product.variants.find((variant) => variant.sku === sku);
  const maxQty = Math.max(1, selected?.stock || 1);

  if (available.length === 0) {
    return <p className="mt-6 font-sans text-sm text-metal">Tükendi</p>;
  }

  function setSkuSafe(next) {
    setSku(next);
    const nextStock = product.variants.find((variant) => variant.sku === next)?.stock || 1;
    setQty((value) => Math.min(value, Math.max(1, nextStock)));
  }

  async function add(goCheckout) {
    setMessage("");
    setPending(true);
    try {
      await api("/cart/items", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, sku, qty }),
      });
      router.push(goCheckout ? "/checkout" : "/cart");
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
    <div className="mt-8 space-y-6">
      <p className="font-sans text-base text-olive">
        {selected?.stock > 0 ? `Stokta · ${selected.stock} adet · 3–5 iş günü kargoda` : "Tükendi"}
      </p>

      <div>
        <p className="font-sans text-base text-ink">Seçenek</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {product.variants.map((variant) => {
            const out = variant.stock <= 0;
            const active = variant.sku === sku;
            const title = variant.size ? `${variant.color} · ${variant.size}` : variant.color;
            return (
              <button
                key={variant.sku}
                type="button"
                disabled={out}
                onClick={() => setSkuSafe(variant.sku)}
                className={`variant-card rounded-xl border px-4 py-4 text-left ${
                  active ? "border-olive bg-olive-soft" : "border-olive/15 bg-white hover:border-olive/40"
                } ${out ? "cursor-not-allowed opacity-40" : ""}`}
              >
                <span className="block font-sans text-base text-ink">{title}</span>
                <span className="mt-1 block font-sans text-sm text-metal">
                  {out ? "Tükendi" : `${variant.stock} adet`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-12 w-32 items-stretch overflow-hidden rounded-md border border-olive/15 bg-white">
          <button
            type="button"
            aria-label="Adet azalt"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            className="qty-nudge font-sans text-base text-olive"
          >
            −
          </button>
          <span className="flex min-w-0 flex-1 items-center justify-center font-sans text-sm text-ink">{qty}</span>
          <button
            type="button"
            aria-label="Adet artır"
            onClick={() => setQty((value) => Math.min(maxQty, value + 1))}
            className="qty-nudge font-sans text-base text-olive"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => add(false)}
          disabled={pending || !sku}
          className="min-h-12 flex-1 rounded-md bg-olive font-sans text-base text-paper disabled:opacity-50"
        >
          {pending ? "Ekleniyor…" : "Sepete ekle"}
        </button>
        <button
          type="button"
          onClick={() => add(true)}
          disabled={pending || !sku}
          className="min-h-12 flex-1 rounded-md border border-olive/20 bg-white font-sans text-base text-ink disabled:opacity-50"
        >
          Hemen satın al
        </button>
      </div>
      {message ? <p className="font-sans text-sm text-red-800">{message}</p> : null}

      <ul className="grid grid-cols-3 gap-3 border-t border-olive/10 pt-5">
        {[
          { title: "Kargo", text: "3–5 iş günü" },
          { title: "Ödeme", text: "Güvenli ödeme" },
          { title: "İade", text: "14 gün" },
        ].map((item) => (
          <li key={item.title} className="text-center">
            <p className="font-sans text-xs tracking-wide text-olive uppercase">{item.title}</p>
            <p className="mt-1 font-sans text-sm text-metal">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
