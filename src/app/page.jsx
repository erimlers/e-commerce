import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { catalogCategories, getBestsellers } from "@/lib/catalog";

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-8 text-center">
      <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h2>
      {action}
    </div>
  );
}

export default function HomePage() {
  const bestsellers = getBestsellers();

  return (
    <StorefrontShell banner={<PromoCarousel />}>
      <TrustStrip />

      <section className="py-12 md:py-14">
        <SectionHeading eyebrow="Kategorilere göre alışveriş" title="Ürün kategorileri" />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {catalogCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <SectionHeading
          eyebrow="Müşteri favorileri"
          title="Çok satanlar"
          action={
            <Link href="/products" className="mt-3 inline-block font-sans text-sm text-olive transition hover:text-ink">
              Tümünü gör
            </Link>
          }
        />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </StorefrontShell>
  );
}
