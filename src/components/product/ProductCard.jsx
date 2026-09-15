import Link from "next/link";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/money";

export function ProductCard({ product }) {
  const image = product.images?.[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-olive/10 bg-white shadow-[0_6px_20px_rgb(31_36_28/0.05)]">
      <Link href={`/products/${product.slug}`} className="group relative block">
        {product.bestseller ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-paper/95 px-2.5 py-1 font-sans text-[10px] tracking-wide text-olive uppercase">
            Çok satan
          </span>
        ) : null}
        <div className="aspect-[4/3] overflow-hidden bg-olive-soft/30">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-3.5 py-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg leading-snug tracking-wide">{product.name}</h3>
        </Link>
        <p className="mt-1 font-sans text-sm text-ink">{formatPrice(product.price, product.currency)}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="card-btn inline-flex items-center justify-center border border-olive/20 bg-paper font-sans text-[11px] tracking-wide text-ink"
          >
            Ürünü incele
          </Link>
          <AddToCartButton
            product={product}
            className="bg-olive font-sans text-[11px] tracking-wide text-paper disabled:opacity-50"
          />
        </div>
      </div>
    </article>
  );
}
