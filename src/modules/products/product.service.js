import { Product } from "./product.model.js";
import { HttpError } from "../../utils/httpError.js";

export async function listProducts({ featured } = {}) {
  const filter = { published: true };
  if (featured === true || featured === "true") {
    filter.featured = true;
  }
  return Product.find(filter).sort({ featured: -1, name: 1 }).lean();
}

export async function getProductBySlug(slug) {
  const product = await Product.findOne({ slug, published: true }).lean();
  if (!product) {
    throw new HttpError(404, "Ürün bulunamadı");
  }
  return product;
}

export async function getProductById(id) {
  const product = await Product.findById(id).lean();
  if (!product) {
    throw new HttpError(404, "Ürün bulunamadı");
  }
  return product;
}
