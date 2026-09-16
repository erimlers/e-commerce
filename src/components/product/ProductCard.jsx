import Link from "next/link";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { StarIcon } from "@/components/product/StarIcon";
import { productReview } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

export function ProductCard({ product }) {
  const image = product.images?.[0];
  const { rating, count } = productReview(product);
  const ratingLabel = count ? rating.toFixed(1).replace(".", ",") : "0";

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-olive/10 bg-white shadow-[0_6px_20px_rgb(31_36_28/0.05)]">
      <Link href={`/products/${product.slug}`} className="relative block min-w-0">
        {product.bestseller ? (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-white/95 px-2 py-0.5 font-sans text-[9px] tracking-wide text-olive uppercase sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px]">
            Çok satan
          </span>
        ) : null}
        <div className="aspect-[3/4] overflow-hidden bg-olive-soft/30">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/80 px-3.5 py-2 font-sans text-[11px] tracking-wide text-ink sm:text-sm">
            Ürünü incele
          </span>
        </span>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col px-2.5 py-3 sm:px-3.5 sm:py-4">
        <Link href={`/products/${product.slug}`} className="min-w-0">
          <h3 className="truncate font-serif text-base leading-snug tracking-wide sm:text-lg">{product.name}</h3>
        </Link>
        <p className="mt-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs leading-5 text-metal sm:text-sm">
          <StarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="tabular-nums">{ratingLabel}</span>
          <span className="text-olive/30">|</span>
          <span>
            {count} değerlendirme
          </span>
        </p>
        <p className="mt-2 font-sans text-lg font-semibold text-ink sm:text-xl">
          {formatPrice(product.price, product.currency)}
        </p>
        <div className="mt-3">
          <AddToCartButton
            product={product}
            className="w-full bg-olive font-sans text-xs tracking-wide text-paper disabled:opacity-50 sm:text-sm"
          />
        </div>
      </div>
    </article>
  );
}
