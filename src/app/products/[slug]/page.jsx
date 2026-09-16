import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { AddToCart } from "@/components/cart/AddToCart";
import { ProductAccordion } from "@/components/product/ProductAccordion";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductReviews } from "@/components/product/ProductReviews";
import { StarIcon } from "@/components/product/StarIcon";
import { categoryNav } from "@/lib/nav";
import { productImages, productReview, resolveCategory } from "@/lib/catalog";
import { getStoreProduct } from "@/lib/get-product";
import { formatPrice } from "@/lib/money";
import { productCopy } from "@/lib/product-copy";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);

  const images = productImages(product);
  const { rating, count } = productReview(product);
  const ratingLabel = count ? rating.toFixed(1).replace(".", ",") : "0";
  const category = resolveCategory(product);
  const categoryItem = categoryNav.find((item) => item.category === category);
  const copy = productCopy(product);

  return (
    <StorefrontShell>
      <main className="pb-24 pt-8 md:pt-10">
        <nav className="mb-8 font-sans text-sm tracking-wide text-metal">
          <Link href="/" className="hover:text-olive">
            Ana sayfa
          </Link>
          <span className="mx-2 text-olive/30">/</span>
          <Link href="/products" className="hover:text-olive">
            Ürünler
          </Link>
          {categoryItem ? (
            <>
              <span className="mx-2 text-olive/30">/</span>
              <Link href={categoryItem.href} className="hover:text-olive">
                {categoryItem.label}
              </Link>
            </>
          ) : null}
          <span className="mx-2 text-olive/30">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="grid items-start gap-8 lg:grid-cols-[4.75rem_minmax(0,32rem)_minmax(0,1fr)] lg:gap-10">
          <ProductGallery images={images} name={product.name} />

          <div className="order-3 min-w-0 lg:pt-1">
            <p className="font-sans text-sm tracking-[0.28em] text-olive uppercase">CALDER</p>
            <h1 className="mt-3 font-serif text-4xl tracking-wide md:text-5xl">{product.name}</h1>
            <a
              href="#yorumlar"
              className="mt-4 inline-flex items-center gap-2 font-sans text-base text-metal hover:text-olive"
            >
              <StarIcon className="h-5 w-5" />
              <span>{ratingLabel}</span>
              <span className="text-olive/40">·</span>
              <span>{count} değerlendirme</span>
            </a>
            <p className="mt-5 font-sans text-4xl font-semibold text-ink">
              {formatPrice(product.price, product.currency)}
            </p>
            <p className="mt-5 max-w-xl font-sans text-base leading-8 text-metal">{product.story}</p>
            <AddToCart product={product} />
          </div>
        </div>

        <div className="mt-20 space-y-12 border-t border-olive/10 pt-14">
          <section>
            <h2 className="font-serif text-3xl tracking-wide text-ink">Ürün detayları</h2>
            <p className="mt-5 max-w-3xl font-sans text-base leading-8 text-metal">{copy.details}</p>
            <dl className="mt-8 max-w-2xl overflow-hidden rounded-2xl border border-olive/10">
              {copy.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-2 gap-4 border-b border-olive/10 px-5 py-4 last:border-b-0"
                >
                  <dt className="font-sans text-base text-metal">{spec.label}</dt>
                  <dd className="font-sans text-base text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <ProductAccordion
            items={[
              { title: "Bakım", body: copy.care },
              ...copy.faqs.map((faq) => ({ title: faq.q, body: faq.a })),
            ]}
          />

          <ProductReviews slug={product.slug} rating={rating} count={count} reviews={copy.reviews} preview />
        </div>
      </main>
    </StorefrontShell>
  );
}
