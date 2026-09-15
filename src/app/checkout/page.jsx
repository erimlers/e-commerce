"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { api } from "@/lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    line1: "",
    city: "",
    postalCode: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify({ address: form }),
      });
      router.push(`/account/orders/${data.order.id}`);
    } catch (err) {
      if (err.status === 401) {
        router.replace("/login");
        return;
      }
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  const fieldClass = "mt-2 w-full border border-ink/15 bg-transparent px-3 py-2 outline-none focus:border-ink";

  return (
    <StorefrontShell>
      <main className="px-6 py-12 md:px-16">
        <h1 className="font-serif text-4xl">Checkout</h1>
        <p className="mt-3 max-w-md font-sans text-sm text-metal">
          Ödeme alınmaz. Sipariş kaydı oluşur, stok düşer.
        </p>
        <form onSubmit={submit} className="mt-10 max-w-md space-y-4">
          <label className="block font-sans text-sm">
            Ad soyad
            <input required value={form.fullName} onChange={(e) => setField("fullName", e.target.value)} className={fieldClass} />
          </label>
          <label className="block font-sans text-sm">
            Adres
            <input required value={form.line1} onChange={(e) => setField("line1", e.target.value)} className={fieldClass} />
          </label>
          <label className="block font-sans text-sm">
            Şehir
            <input required value={form.city} onChange={(e) => setField("city", e.target.value)} className={fieldClass} />
          </label>
          <label className="block font-sans text-sm">
            Posta kodu
            <input required value={form.postalCode} onChange={(e) => setField("postalCode", e.target.value)} className={fieldClass} />
          </label>
          {error ? <p className="font-sans text-sm text-red-800">{error}</p> : null}
          <button type="submit" disabled={pending} className="bg-ink px-6 py-3 font-sans text-sm text-paper disabled:opacity-50">
            {pending ? "Kaydediliyor…" : "Siparişi tamamla"}
          </button>
        </form>
      </main>
    </StorefrontShell>
  );
}
