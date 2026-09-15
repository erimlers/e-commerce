"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api("/cart");
      setCart(data.cart);
    } catch (err) {
      if (err.status === 401) {
        router.replace("/login");
        return;
      }
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function setQty(sku, qty) {
    setError("");
    try {
      const data = await api(`/cart/items/${encodeURIComponent(sku)}`, {
        method: "PATCH",
        body: JSON.stringify({ qty }),
      });
      setCart(data.cart);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <StorefrontShell>
      <main className="px-6 py-12 md:px-16">
        <h1 className="font-serif text-4xl">Sepet</h1>
        {error ? <p className="mt-4 font-sans text-sm text-red-800">{error}</p> : null}
        {!cart ? (
          <p className="mt-8 font-sans text-sm text-metal">Yükleniyor…</p>
        ) : cart.items.length === 0 ? (
          <p className="mt-8 font-sans text-sm text-metal">
            Sepet boş.{" "}
            <Link href="/products" className="text-ink underline">
              Koleksiyona git
            </Link>
          </p>
        ) : (
          <div className="mt-10 max-w-2xl space-y-6">
            {cart.items.map((item) => (
              <div key={item.sku} className="flex gap-4 border-b border-ink/10 pb-4">
                {item.image ? (
                  <img src={item.image} alt="" className="h-24 w-20 object-cover" />
                ) : null}
                <div className="flex-1">
                  <Link href={`/products/${item.slug}`} className="font-serif text-2xl">
                    {item.name}
                  </Link>
                  <p className="font-sans text-sm text-metal">
                    {item.color}
                    {item.size ? ` · ${item.size}` : ""}
                  </p>
                  <p className="mt-2 font-sans text-sm">{formatPrice(item.lineTotal, cart.currency)}</p>
                </div>
                <div className="flex items-start gap-2 font-sans text-sm">
                  <button type="button" onClick={() => setQty(item.sku, item.qty - 1)}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.sku, item.qty + 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <p className="font-sans text-sm">Ara toplam</p>
              <p className="font-serif text-2xl">{formatPrice(cart.subtotal, cart.currency)}</p>
            </div>
            <Link href="/checkout" className="inline-block bg-ink px-6 py-3 font-sans text-sm text-paper">
              Checkout
            </Link>
          </div>
        )}
      </main>
    </StorefrontShell>
  );
}
