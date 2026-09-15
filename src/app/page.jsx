import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";

export default async function HomePage() {
  let featured = [];
  try {
    const data = await api("/products?featured=true");
    featured = (data.products || []).slice(0, 3);
  } catch {
    featured = [];
  }

  return (
    <StorefrontShell>
      <section className="pb-28 pt-20 md:pt-28">
        <p className="font-sans text-[11px] tracking-[0.42em] text-metal uppercase">Leather atelier</p>
        <h1 className="mt-6 max-w-3xl font-serif text-7xl font-medium leading-[0.9] tracking-wide md:text-9xl">
          CALDER
        </h1>
        <p className="mt-10 max-w-md font-sans text-base leading-7 text-metal">
          Unisex deri objeler. Az parça, uzun ömür. Kartlık, cüzdan, kemer — her gün taşınan şeyler.
        </p>
      </section>
      <section className="pb-28">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl md:text-4xl">Öne çıkanlar</h2>
          <Link href="/products" className="font-sans text-sm text-metal transition hover:text-ink">
            Tümü
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </StorefrontShell>
  );
}
