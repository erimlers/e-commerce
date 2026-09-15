import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";

const facts = [
  { title: "Az parça", text: "Altı obje. Filtre yok. Her parça aynı dikiş dili." },
  { title: "Atölye", text: "Bitkisel tabaklanmış dana derisi. Balıkesir’den, elde." },
  { title: "Ömür", text: "Kargo 3–5 iş günü. 14 gün iade. Sahte ödeme yok." },
];

export default async function HomePage() {
  let featured = [];
  try {
    const data = await api("/products?featured=true");
    featured = (data.products || []).slice(0, 3);
  } catch {
    featured = [];
  }

  return (
    <StorefrontShell banner={<PromoCarousel />}>
      <section className="grid gap-8 border-b border-olive/15 py-8 md:grid-cols-3 md:gap-10 md:py-10">
        {facts.map((fact) => (
          <div key={fact.title}>
            <p className="font-sans text-xs tracking-[0.22em] text-olive uppercase">{fact.title}</p>
            <p className="mt-3 font-sans text-sm leading-6 text-metal">{fact.text}</p>
          </div>
        ))}
      </section>

      <section className="py-16 md:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Koleksiyon</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Öne çıkanlar</h2>
          </div>
          <Link href="/products" className="font-sans text-sm text-olive transition hover:text-ink">
            Tümünü gör
          </Link>
        </div>
        {featured.length ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="font-sans text-sm text-metal">Koleksiyon şu an yüklenemedi. Biraz sonra yeniden deneyin.</p>
        )}
      </section>
    </StorefrontShell>
  );
}
