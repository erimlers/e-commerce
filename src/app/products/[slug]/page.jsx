import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { AddToCart } from "@/components/cart/AddToCart";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/money";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product;
  try {
    const data = await api(`/products/${slug}`);
    product = data.product;
  } catch (error) {
    if (error.status === 404) notFound();
    throw error;
  }

  const image = product.images?.[0];

  return (
    <div>
      <SiteHeader />
      <main className="grid gap-12 px-6 pb-24 pt-4 md:grid-cols-2 md:px-12">
        <div className="aspect-[4/5] bg-ink/5">
          {image ? (
            <img src={image} alt={product.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="md:pt-8">
          <p className="font-sans text-xs tracking-[0.3em] text-metal uppercase">CALDER</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <p className="mt-4 font-sans text-lg">{formatPrice(product.price, product.currency)}</p>
          <p className="mt-8 max-w-md font-sans text-sm leading-7 text-metal">{product.story}</p>
          <ul className="mt-8 space-y-2 font-sans text-sm">
            {product.variants.map((variant) => (
              <li key={variant.sku} className="flex justify-between border-b border-ink/10 py-2">
                <span>
                  {variant.color}
                  {variant.size ? ` · ${variant.size}` : ""}
                </span>
                <span className="text-metal">{variant.stock > 0 ? `${variant.stock} adet` : "Tükendi"}</span>
              </li>
            ))}
          </ul>
          <AddToCart product={product} />
        </div>
      </main>
    </div>
  );
}
