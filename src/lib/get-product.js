import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { getCatalogProduct } from "@/lib/catalog";

export async function getStoreProduct(slug) {
  let product = getCatalogProduct(slug);
  try {
    const data = await api(`/products/${slug}`);
    if (data.product) product = data.product;
  } catch (error) {
    if (!product && error.status === 404) notFound();
  }
  if (!product) notFound();
  return product;
}
