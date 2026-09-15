"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

const statusLabel = {
  pending: "Beklemede",
  confirmed: "Onaylandı",
  cancelled: "İptal",
};

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api("/orders")
      .then((data) => setOrders(data.orders))
      .catch((err) => {
        if (err.status === 401) router.replace("/login");
      });
  }, [router]);

  return (
    <div>
      <SiteHeader />
      <main className="px-6 py-12 md:px-12">
        <h1 className="font-serif text-4xl">Siparişlerim</h1>
        {!orders ? (
          <p className="mt-8 font-sans text-sm text-metal">Yükleniyor…</p>
        ) : orders.length === 0 ? (
          <p className="mt-8 font-sans text-sm text-metal">Henüz sipariş yok.</p>
        ) : (
          <ul className="mt-10 max-w-xl space-y-4">
            {orders.map((order) => (
              <li key={order.id} className="border-b border-ink/10 pb-4">
                <Link href={`/account/orders/${order.id}`} className="font-serif text-2xl">
                  {formatPrice(order.total, order.currency)}
                </Link>
                <p className="font-sans text-sm text-metal">
                  {statusLabel[order.status]} · {new Date(order.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
