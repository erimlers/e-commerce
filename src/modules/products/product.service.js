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

export function slugify(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function listAllProducts() {
  return Product.find().sort({ name: 1 }).lean();
}

export async function createProduct(payload) {
  const name = payload.name?.trim();
  if (!name || !payload.story || payload.price == null) {
    throw new HttpError(400, "İsim, hikaye ve fiyat gerekli");
  }
  const slug = payload.slug ? slugify(payload.slug) : slugify(name);
  const variants = payload.variants?.length
    ? payload.variants
    : [{ sku: `${slug.toUpperCase()}-1`, color: "Mürekkep", stock: 0 }];
  return Product.create({
    name,
    slug,
    story: payload.story,
    price: Number(payload.price),
    currency: "TRY",
    images: payload.images || [],
    variants,
    featured: Boolean(payload.featured),
    published: payload.published !== false,
  });
}

export async function updateProduct(id, payload) {
  const product = await Product.findById(id);
  if (!product) {
    throw new HttpError(404, "Ürün bulunamadı");
  }
  const fields = ["name", "story", "price", "images", "variants", "featured", "published", "slug"];
  for (const field of fields) {
    if (payload[field] !== undefined) {
      product[field] = field === "slug" ? slugify(payload[field]) : payload[field];
    }
  }
  await product.save();
  return product.toObject();
}

export async function deleteProduct(id) {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new HttpError(404, "Ürün bulunamadı");
  }
}
