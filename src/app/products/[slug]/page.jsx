import { notFound } from "next/navigation";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { AddToCart } from "@/components/cart/AddToCart";
import { api } from "@/lib/api";
import { getCatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product = getCatalogProduct(slug);
  try {
    const data = await api(`/products/${slug}`);
    if (data.product) product = data.product;
  } catch (error) {
    if (!product && error.status === 404) notFound();
  }

  if (!product) notFound();

  const image = product.images?.[0];

  return (
    <StorefrontShell>
      <main className="grid gap-10 pb-24 pt-8 md:grid-cols-2 md:gap-14 md:pt-12">
        <div className="overflow-hidden rounded-2xl bg-olive-soft/40">
          {image ? (
            <img src={image} alt={product.name} className="aspect-[4/5] h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="md:pt-4">
          <p className="font-sans text-xs tracking-[0.3em] text-olive uppercase">CALDER</p>
          <h1 className="mt-3 font-serif text-5xl">{product.name}</h1>
          <p className="mt-4 font-sans text-lg">{formatPrice(product.price, product.currency)}</p>
          <p className="mt-8 max-w-md font-sans text-sm leading-7 text-metal">{product.story}</p>
          <ul className="mt-8 space-y-0 border-y border-olive/15 font-sans text-sm">
            {product.variants.map((variant) => (
              <li key={variant.sku} className="flex justify-between border-b border-olive/10 py-3 last:border-b-0">
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
    </StorefrontShell>
  );
}
