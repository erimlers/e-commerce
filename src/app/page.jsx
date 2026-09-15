import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { ManifestoBand } from "@/components/home/ManifestoBand";
import { AtelierBand } from "@/components/home/AtelierBand";
import { SnapSlider } from "@/components/home/SnapSlider";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductCard } from "@/components/product/ProductCard";
import { catalogCategories, getBestsellers } from "@/lib/catalog";

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-6 text-center sm:mb-8">
      <p className="font-sans text-[11px] tracking-[0.22em] text-olive uppercase sm:text-xs sm:tracking-[0.28em]">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl">{title}</h2>
      {action}
    </div>
  );
}

export default function HomePage() {
  const bestsellers = getBestsellers();

  return (
    <StorefrontShell banner={<PromoCarousel />}>
      <section className="py-10 sm:py-12 md:py-14">
        <SectionHeading eyebrow="Kategorilere göre alışveriş" title="Ürün kategorileri" />
        <SnapSlider className="md:mx-auto md:grid md:max-w-2xl md:grid-cols-4 md:gap-8">
          {catalogCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </SnapSlider>
      </section>

      <ManifestoBand />

      <AtelierBand />

      <section className="py-10 sm:py-12 md:py-14">
        <SectionHeading
          eyebrow="Müşteri favorileri"
          title="Çok satanlar"
          action={
            <Link href="/products" className="mt-3 inline-block font-sans text-sm text-olive transition hover:text-ink">
              Tümünü gör
            </Link>
          }
        />
        <SnapSlider className="md:grid md:grid-cols-3 md:gap-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SnapSlider>
      </section>
    </StorefrontShell>
  );
}
