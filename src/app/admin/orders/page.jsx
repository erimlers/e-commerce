"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

const labels = {
  pending: "Beklemede",
  confirmed: "Onaylandı",
  cancelled: "İptal",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    const data = await api("/admin/orders");
    setOrders(data.orders);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function setStatus(id, status) {
    setError("");
    try {
      await api(`/admin/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AdminGuard>
      <main className="px-6 py-12 md:px-12">
        <h1 className="font-serif text-3xl">Siparişler</h1>
        {error ? <p className="mt-4 font-sans text-sm text-red-800">{error}</p> : null}
        <ul className="mt-10 max-w-3xl space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-4">
              <div>
                <p className="font-serif text-xl">{formatPrice(order.total, order.currency)}</p>
                <p className="font-sans text-sm text-metal">
                  {labels[order.status]} · {order.address.fullName} · {order.items.length} kalem
                </p>
              </div>
              <div className="flex gap-2 font-sans text-sm">
                {order.status === "pending" ? (
                  <>
                    <button type="button" onClick={() => setStatus(order.id, "confirmed")}>
                      Onayla
                    </button>
                    <button type="button" onClick={() => setStatus(order.id, "cancelled")}>
                      İptal
                    </button>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </AdminGuard>
  );
}
