import { Cart } from "./cart.model.js";
import { getProductById } from "../products/product.service.js";
import { HttpError } from "../../utils/httpError.js";

function variantOf(product, sku) {
  return product.variants.find((variant) => variant.sku === sku);
}

export async function getCart(userId) {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, items: [] } },
    { new: true, upsert: true },
  ).lean();
  return decorateCart(cart);
}

async function decorateCart(cart) {
  const items = [];
  for (const item of cart.items) {
    const product = await getProductById(item.productId);
    const variant = variantOf(product, item.sku);
    items.push({
      productId: String(product._id),
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || null,
      sku: item.sku,
      color: variant?.color,
      size: variant?.size,
      qty: item.qty,
      unitPrice: product.price,
      lineTotal: product.price * item.qty,
      stock: variant?.stock ?? 0,
    });
  }
  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items, subtotal, currency: "TRY" };
}

export async function addItem(userId, { productId, sku, qty = 1 }) {
  const quantity = Number(qty) || 1;
  if (quantity < 1) {
    throw new HttpError(400, "Miktar geçersiz");
  }
  const product = await getProductById(productId);
  if (!product.published) {
    throw new HttpError(404, "Ürün bulunamadı");
  }
  const variant = variantOf(product, sku);
  if (!variant) {
    throw new HttpError(400, "Varyant bulunamadı");
  }

  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, items: [] } },
    { new: true, upsert: true },
  );

  const existing = cart.items.find((item) => item.sku === sku);
  const nextQty = (existing?.qty || 0) + quantity;
  if (nextQty > variant.stock) {
    throw new HttpError(409, "Yeterli stok yok");
  }
  if (existing) {
    existing.qty = nextQty;
  } else {
    cart.items.push({ productId: product._id, sku, qty: quantity });
  }
  await cart.save();
  return getCart(userId);
}

export async function updateItem(userId, sku, qty) {
  const quantity = Number(qty);
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new HttpError(404, "Sepet boş");
  }
  if (quantity === 0) {
    cart.items = cart.items.filter((item) => item.sku !== sku);
    await cart.save();
    return getCart(userId);
  }
  if (quantity < 1) {
    throw new HttpError(400, "Miktar geçersiz");
  }
  const item = cart.items.find((entry) => entry.sku === sku);
  if (!item) {
    throw new HttpError(404, "Satır yok");
  }
  const product = await getProductById(item.productId);
  const variant = variantOf(product, sku);
  if (!variant || quantity > variant.stock) {
    throw new HttpError(409, "Yeterli stok yok");
  }
  item.qty = quantity;
  await cart.save();
  return getCart(userId);
}

export async function removeItem(userId, sku) {
  return updateItem(userId, sku, 0);
}

export async function clearCart(userId) {
  await Cart.findOneAndUpdate({ userId }, { items: [] }, { upsert: true });
}
