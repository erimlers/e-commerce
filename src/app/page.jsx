import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { catalogCategories, catalogProducts, getBestsellers } from "@/lib/catalog";

export default function HomePage() {
  const bestsellers = getBestsellers();
  const rest = catalogProducts.filter((product) => !product.bestseller);

  return (
    <StorefrontShell banner={<PromoCarousel />}>
      <TrustStrip />

      <section className="py-12 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Kategorilere göre alışveriş</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Ürün kategorileri</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {catalogCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="pb-12 md:pb-14">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Müşteri favorileri</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Çok satanlar</h2>
          </div>
          <Link href="/products" className="font-sans text-sm text-olive transition hover:text-ink">
            Tümünü gör
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {rest.length ? (
        <section className="pb-14 md:pb-16">
          <div className="mb-6">
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Koleksiyon</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Atölyeden</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {rest.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </StorefrontShell>
  );
}
