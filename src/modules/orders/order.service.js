import { Order } from "./order.model.js";
import { Product } from "../products/product.model.js";
import { getCart, clearCart } from "../cart/cart.service.js";
import { HttpError } from "../../utils/httpError.js";

export function serializeOrder(order) {
  return {
    id: String(order._id),
    items: order.items,
    address: order.address,
    total: order.total,
    currency: order.currency,
    status: order.status,
    createdAt: order.createdAt,
  };
}

export async function createOrder(userId, address) {
  const { fullName, line1, city, postalCode } = address || {};
  if (!fullName || !line1 || !city || !postalCode) {
    throw new HttpError(400, "Teslimat adresi eksik");
  }

  const cart = await getCart(userId);
  if (cart.items.length === 0) {
    throw new HttpError(400, "Sepet boş");
  }

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    const variant = product?.variants.find((entry) => entry.sku === item.sku);
    if (!product || !variant || variant.stock < item.qty) {
      throw new HttpError(409, `${item.name} için yeterli stok yok`);
    }
    variant.stock -= item.qty;
    await product.save();
  }

  const order = await Order.create({
    userId,
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      sku: item.sku,
      qty: item.qty,
      unitPrice: item.unitPrice,
    })),
    address: { fullName, line1, city, postalCode },
    total: cart.subtotal,
    currency: cart.currency,
    status: "pending",
  });

  await clearCart(userId);
  return order.toObject();
}

export async function listMyOrders(userId) {
  return Order.find({ userId }).sort({ createdAt: -1 }).lean();
}

export async function getMyOrder(userId, id) {
  const order = await Order.findOne({ _id: id, userId }).lean();
  if (!order) {
    throw new HttpError(404, "Sipariş bulunamadı");
  }
  return order;
}

export async function listAllOrders() {
  return Order.find().sort({ createdAt: -1 }).lean();
}

export async function updateOrderStatus(id, status) {
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    throw new HttpError(400, "Geçersiz durum");
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new HttpError(404, "Sipariş bulunamadı");
  }
  if (status === "cancelled" && order.status === "pending") {
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      const variant = product.variants.find((entry) => entry.sku === item.sku);
      if (variant) {
        variant.stock += item.qty;
      }
      await product.save();
    }
  } else if (status === "cancelled") {
    throw new HttpError(409, "Yalnızca bekleyen sipariş iptal edilebilir");
  }
  order.status = status;
  await order.save();
  return order.toObject();
}
