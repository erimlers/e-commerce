import Link from "next/link";
import { formatPrice } from "@/lib/money";

export function ProductCard({ product }) {
  const image = product.images?.[0];

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="aspect-[4/5] overflow-hidden bg-olive-soft/40">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="px-4 py-4">
          <h3 className="font-serif text-xl tracking-wide">{product.name}</h3>
          <p className="mt-1 font-sans text-sm text-metal">{formatPrice(product.price, product.currency)}</p>
        </div>
      </Link>
    </article>
  );
}
