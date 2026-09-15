import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { catalogCategories, getBestsellers } from "@/lib/catalog";

export default function HomePage() {
  const bestsellers = getBestsellers();

  return (
    <StorefrontShell banner={<PromoCarousel />}>
      <section className="py-14 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Mağaza</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Ürün kategorileri</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {catalogCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Popüler</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Çok satanlar</h2>
          </div>
          <Link href="/products" className="font-sans text-sm text-olive transition hover:text-ink">
            Tümünü gör
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </StorefrontShell>
  );
}
