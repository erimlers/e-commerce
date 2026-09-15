import { SiteHeader } from "@/components/layout/SiteHeader";
import { ProductCard } from "@/components/product/ProductCard";
import { api } from "@/lib/api";

export default async function ProductsPage() {
  const data = await api("/products");
  const products = data.products || [];

  return (
    <div>
      <SiteHeader />
      <main className="px-6 pb-24 pt-8 md:px-12">
        <h1 className="font-serif text-4xl md:text-5xl">Koleksiyon</h1>
        <p className="mt-3 max-w-lg font-sans text-sm text-metal">Altı obje. Filtre yok.</p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
