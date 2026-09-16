import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductReviews } from "@/components/product/ProductReviews";
import { getStoreProduct } from "@/lib/get-product";
import { productReview } from "@/lib/catalog";
import { productCopy } from "@/lib/product-copy";

export default async function ProductReviewsPage({ params }) {
  const { slug } = await params;
  const product = await getStoreProduct(slug);
  const { rating, count } = productReview(product);
  const copy = productCopy(product);

  return (
    <StorefrontShell>
      <main className="pb-24 pt-8 md:pt-10">
        <nav className="mb-8 font-sans text-sm tracking-wide text-metal">
          <Link href="/products" className="hover:text-olive">
            Ürünler
          </Link>
          <span className="mx-2 text-olive/30">/</span>
          <Link href={`/products/${product.slug}`} className="hover:text-olive">
            {product.name}
          </Link>
          <span className="mx-2 text-olive/30">/</span>
          <span className="text-ink">Yorumlar</span>
        </nav>

        <p className="font-sans text-sm tracking-[0.28em] text-olive uppercase">CALDER</p>
        <h1 className="mt-3 font-serif text-4xl tracking-wide md:text-5xl">{product.name} değerlendirmeleri</h1>
        <Link href={`/products/${product.slug}`} className="mt-4 inline-flex min-h-12 items-center rounded-md border border-olive/20 bg-white px-5 font-sans text-base text-ink hover:border-olive/45">
          Ürüne dön
        </Link>

        <div className="mt-10">
          <ProductReviews slug={product.slug} rating={rating} count={count} reviews={copy.reviews} />
        </div>
      </main>
    </StorefrontShell>
  );
}
