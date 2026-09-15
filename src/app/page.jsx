import { SiteHeader } from "@/components/layout/SiteHeader";
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
    <div>
      <SiteHeader />
      <section className="px-6 pb-24 pt-16 md:px-12 md:pt-24">
        <p className="font-sans text-xs tracking-[0.35em] text-metal uppercase">Atelier</p>
        <h1 className="mt-4 max-w-3xl font-serif text-6xl font-medium leading-none tracking-wide md:text-8xl">
          CALDER
        </h1>
        <p className="mt-8 max-w-md font-sans text-base text-metal">
          Unisex deri objeler. Az parça, uzun ömür. Kartlık, cüzdan, kemer.
        </p>
      </section>
      <section className="px-6 pb-24 md:px-12">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-serif text-3xl">Öne çıkanlar</h2>
          <a href="/products" className="font-sans text-sm text-metal hover:text-ink">
            Tümü
          </a>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
