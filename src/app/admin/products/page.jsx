"use client";

import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    story: "",
    price: "",
    image: "",
    published: true,
  });

  async function load() {
    const data = await api("/admin/products");
    setProducts(data.products);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, []);

  async function create(event) {
    event.preventDefault();
    setError("");
    try {
      await api("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          story: form.story,
          price: Math.round(Number(form.price) * 100),
          images: form.image ? [form.image] : [],
          published: form.published,
        }),
      });
      setForm({ name: "", story: "", price: "", image: "", published: true });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function togglePublished(product) {
    await api(`/admin/products/${product.id}`, {
      method: "PATCH",
      body: JSON.stringify({ published: !product.published }),
    });
    await load();
  }

  async function remove(product) {
    await api(`/admin/products/${product.id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminGuard>
      <main className="px-6 py-12 md:px-12">
        <h1 className="font-serif text-3xl">Ürünler</h1>
        {error ? <p className="mt-4 font-sans text-sm text-red-800">{error}</p> : null}
        <form onSubmit={create} className="mt-8 max-w-lg space-y-3">
          <input
            required
            placeholder="İsim"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/15 px-3 py-2"
          />
          <textarea
            required
            placeholder="Hikaye"
            value={form.story}
            onChange={(e) => setForm({ ...form, story: e.target.value })}
            className="w-full border border-ink/15 px-3 py-2"
          />
          <input
            required
            type="number"
            min="0"
            step="1"
            placeholder="Fiyat (TL)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border border-ink/15 px-3 py-2"
          />
          <input
            placeholder="Görsel URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border border-ink/15 px-3 py-2"
          />
          <label className="flex items-center gap-2 font-sans text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Yayında
          </label>
          <button type="submit" className="bg-ink px-4 py-2 font-sans text-sm text-paper">
            Ekle
          </button>
        </form>
        <ul className="mt-12 max-w-2xl space-y-4">
          {products.map((product) => (
            <li key={product.id} className="flex items-center justify-between gap-4 border-b border-ink/10 pb-3">
              <div>
                <p className="font-serif text-xl">{product.name}</p>
                <p className="font-sans text-sm text-metal">
                  {formatPrice(product.price, product.currency)} · {product.published ? "yayında" : "gizli"}
                </p>
              </div>
              <div className="flex gap-3 font-sans text-sm">
                <button type="button" onClick={() => togglePublished(product)}>
                  {product.published ? "Gizle" : "Yayınla"}
                </button>
                <button type="button" onClick={() => remove(product)}>
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </AdminGuard>
  );
}
