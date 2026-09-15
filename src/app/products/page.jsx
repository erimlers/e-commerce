import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";
import { catalogProducts } from "@/lib/catalog";

export default async function ProductsPage() {
  let products = catalogProducts;
  try {
    const data = await api("/products");
    if (data.products?.length) products = data.products;
  } catch {
    products = catalogProducts;
  }

  return (
    <StorefrontShell>
      <main className="pb-24 pt-12 md:pt-16">
        <p className="font-sans text-xs tracking-[0.28em] text-olive uppercase">Mağaza</p>
        <h1 className="mt-3 font-serif text-4xl md:text-6xl">Ürünler</h1>
        <p className="mt-4 max-w-lg font-sans text-sm leading-7 text-metal">
          Altı obje. Filtre yok. Her parça aynı dikiş dili.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p className="col-span-full font-sans text-sm text-metal">Koleksiyon şu an yüklenemedi. Biraz sonra yeniden deneyin.</p>
          )}
        </div>
      </main>
    </StorefrontShell>
  );
}
