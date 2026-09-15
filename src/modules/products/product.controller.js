import { getProductBySlug, listProducts } from "./product.service.js";
import { serializeProduct } from "./product.serialize.js";

export async function list(req, res) {
  const products = await listProducts({ featured: req.query.featured });
  res.json({ products: products.map(serializeProduct) });
}

export async function getBySlug(req, res) {
  const product = await getProductBySlug(req.params.slug);
  res.json({ product: serializeProduct(product) });
}
