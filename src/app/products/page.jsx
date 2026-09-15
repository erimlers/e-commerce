import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";

export default async function ProductsPage() {
  let products = [];
  try {
    const data = await api("/products");
    products = data.products || [];
  } catch {
    products = [];
  }

  return (
    <StorefrontShell>
      <main className="pb-28 pt-12">
        <h1 className="font-serif text-5xl md:text-6xl">Koleksiyon</h1>
        <p className="mt-4 max-w-lg font-sans text-sm leading-7 text-metal">Altı obje. Filtre yok. Her parça aynı dikiş dili.</p>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
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
