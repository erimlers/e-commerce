import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

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

  const hero = featured[0];
  const heroImage = hero?.images?.[0];

  return (
    <StorefrontShell>
      <section className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div>
          <p className="font-sans text-[11px] tracking-[0.32em] text-olive uppercase">Unisex deri atölyesi</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] md:text-6xl lg:text-7xl">
            Her gün taşınan şeyler.
          </h1>
          <p className="mt-6 max-w-md font-sans text-base leading-7 text-metal">
            Kartlık, cüzdan, kemer. Az parça, uzun ömür. CALDER, Balıkesir’de üretilen unisex deri objeler.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex min-h-touch items-center rounded-full bg-olive px-6 font-sans text-sm text-paper"
            >
              Ürünlere bak
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-touch items-center rounded-full border border-olive/25 px-6 font-sans text-sm text-olive"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
        <Link
          href={hero ? `/products/${hero.slug}` : "/products"}
          className="group block border border-olive/15 bg-olive-soft/40"
        >
          <div className="aspect-[4/5] overflow-hidden bg-ink/5 sm:aspect-[5/4] lg:aspect-[4/5]">
            {heroImage ? (
              <img
                src={heroImage}
                alt={hero.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-serif text-3xl tracking-[0.28em] text-olive/40">
                CALDER
              </div>
            )}
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-olive/15 px-5 py-4">
            <p className="font-serif text-2xl">{hero?.name || "Koleksiyon"}</p>
            <p className="font-sans text-sm text-metal">
              {hero ? formatPrice(hero.price, hero.currency) : "Ürünlere git"}
            </p>
          </div>
        </Link>
      </section>

      <section className="grid gap-8 border-y border-olive/15 py-8 md:grid-cols-3 md:gap-10 md:py-10">
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
