"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

function EmptyCart({ guest }) {
  return (
    <div className="mt-12 max-w-md">
      <p className="font-serif text-3xl">Sepetiniz boş</p>
      {guest ? (
        <p className="mt-4 font-sans text-sm leading-7 text-metal">
          Ürün eklemek ve siparişi tamamlamak için giriş yapın.
        </p>
      ) : (
        <p className="mt-4 font-sans text-sm leading-7 text-metal">Koleksiyondan bir parça ekleyebilirsiniz.</p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {guest ? (
          <Link
            href="/login"
            className="inline-flex min-h-touch items-center justify-center rounded-full bg-ink px-6 font-sans text-sm text-paper"
          >
            Giriş yapın
          </Link>
        ) : null}
        <Link
          href="/products"
          className="inline-flex min-h-touch items-center justify-center rounded-full border border-ink/15 px-6 font-sans text-sm"
        >
          Koleksiyona bak
        </Link>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [guest, setGuest] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await api("/cart");
      setGuest(false);
      setCart(data.cart);
    } catch {
      setGuest(true);
      setCart({ items: [], subtotal: 0, currency: "TRY" });
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
          <EmptyCart guest={guest} />
        ) : (
          <div className="mt-10 max-w-2xl space-y-6">
            {cart.items.map((item) => (
              <div key={item.sku} className="flex gap-4 rounded-3xl bg-ink/5 p-4">
                {item.image ? (
                  <img src={item.image} alt="" className="h-24 w-20 rounded-2xl object-cover" />
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
            <Link href="/checkout" className="inline-flex min-h-touch items-center rounded-full bg-ink px-6 font-sans text-sm text-paper">
              Checkout
            </Link>
          </div>
        )}
      </main>
    </StorefrontShell>
  );
}
