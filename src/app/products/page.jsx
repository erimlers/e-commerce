import { Suspense } from "react";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterDrawer } from "@/components/shop/FilterDrawer";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductSort } from "@/components/shop/ProductSort";
import { api } from "@/lib/api";
import { catalogProducts, filterProducts, parseCategories, parseSort, parseTl, sortProducts } from "@/lib/catalog";
import { categoryNav } from "@/lib/nav";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const selected = parseCategories(params.category);
  const minTl = parseTl(typeof params.min === "string" ? params.min : "");
  const maxTl = parseTl(typeof params.max === "string" ? params.max : "");
  const sort = parseSort(typeof params.sort === "string" ? params.sort : "");
  const current = selected.length === 1 ? categoryNav.find((item) => item.category === selected[0]) : null;

  let products = catalogProducts;
  try {
    const data = await api("/products");
    if (data.products?.length) products = data.products;
  } catch {
    products = catalogProducts;
  }

  products = sortProducts(filterProducts(products, { categories: selected, query, minTl, maxTl }), sort);

  const emptyMessage = query
    ? "Bu aramaya uyan ürün yok."
    : selected.length || minTl != null || maxTl != null
      ? "Bu filtrelere uyan ürün yok."
      : "Koleksiyon şu an yüklenemedi. Biraz sonra yeniden deneyin.";

  const title = query ? `“${query}”` : current?.label ?? "Ürünler";
  const intro = query
    ? products.length
      ? "Aramanla eşleşen parçalar."
      : "Bu aramaya uyan ürün yok."
    : selected.length
      ? "Seçtiğin kategorilerdeki parçalar."
      : "Altı obje. Her parça aynı dikiş dili.";

  return (
    <StorefrontShell>
      <main className="pb-24 pt-8 md:pt-10">
        <div className="grid gap-6 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:items-start lg:gap-8">
          <aside className="hidden lg:sticky lg:top-[10.25rem] lg:z-10 lg:block lg:self-start">
            <div className="max-h-[calc(100dvh-11rem)] overflow-y-auto">
              <Suspense fallback={<div className="h-64 rounded-2xl bg-olive-soft/30" aria-hidden="true" />}>
                <ProductFilters boxed />
              </Suspense>
            </div>
          </aside>

          <div className="min-w-0">
            <h1 className="font-serif text-3xl tracking-wide md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-lg font-sans text-base leading-7 text-metal">{intro}</p>

            <div className="mb-4 mt-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="lg:hidden">
                  <Suspense fallback={null}>
                    <FilterDrawer />
                  </Suspense>
                </div>
                <p className="font-sans text-sm text-metal">{products.length} ürün</p>
              </div>
              <Suspense fallback={<div className="h-10 w-28 rounded-full bg-olive-soft/40" aria-hidden="true" />}>
                <ProductSort />
              </Suspense>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {products.length ? (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <p className="col-span-full font-sans text-sm text-metal">{emptyMessage}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </StorefrontShell>
  );
}
