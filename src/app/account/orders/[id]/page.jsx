"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

const statusLabel = {
  pending: "Beklemede",
  confirmed: "Onaylandı",
  cancelled: "İptal",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!params.id) return;
    api(`/orders/${params.id}`)
      .then((data) => setOrder(data.order))
      .catch((err) => {
        if (err.status === 401) router.replace("/login");
        if (err.status === 404) router.replace("/account/orders");
      });
  }, [params.id, router]);

  return (
    <StorefrontShell>
      <main className="py-12">
        {!order ? (
          <p className="font-sans text-sm text-metal">Yükleniyor…</p>
        ) : (
          <>
            <p className="font-sans text-xs tracking-[0.3em] text-metal uppercase">Sipariş alındı</p>
            <h1 className="mt-3 font-serif text-4xl">{formatPrice(order.total, order.currency)}</h1>
            <p className="mt-2 font-sans text-sm text-metal">{statusLabel[order.status]}</p>
            <ul className="mt-10 max-w-md space-y-2 font-sans text-sm">
              {order.items.map((item) => (
                <li key={item.sku} className="flex justify-between border-b border-ink/10 py-2">
                  <span>
                    {item.name} · {item.sku} × {item.qty}
                  </span>
                  <span>{formatPrice(item.unitPrice * item.qty, order.currency)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-sans text-sm text-metal">
              {order.address.fullName}, {order.address.line1}, {order.address.city} {order.address.postalCode}
            </p>
            <Link href="/account/orders" className="mt-8 inline-block font-sans text-sm underline">
              Tüm siparişler
            </Link>
          </>
        )}
      </main>
    </StorefrontShell>
  );
}
