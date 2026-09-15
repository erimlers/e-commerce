import Link from "next/link";
import { formatPrice } from "@/lib/money";

export function ProductCard({ product }) {
  const image = product.images?.[0];

  return (
    <article>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="aspect-[4/5] overflow-hidden bg-ink/5">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl">{product.name}</h2>
          <p className="font-sans text-sm text-metal">{formatPrice(product.price, product.currency)}</p>
        </div>
      </Link>
    </article>
  );
}
