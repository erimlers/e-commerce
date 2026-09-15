import {
  createProduct,
  deleteProduct,
  listAllProducts,
  updateProduct,
} from "../products/product.service.js";
import { serializeProduct } from "../products/product.serialize.js";
import { listAllOrders, serializeOrder, updateOrderStatus } from "../orders/order.service.js";

export async function products(req, res) {
  const items = await listAllProducts();
  res.json({ products: items.map(serializeProduct) });
}

export async function create(req, res) {
  const product = await createProduct(req.body);
  res.status(201).json({ product: serializeProduct(product.toObject ? product.toObject() : product) });
}

export async function patchProduct(req, res) {
  const product = await updateProduct(req.params.id, req.body);
  res.json({ product: serializeProduct(product) });
}

export async function removeProduct(req, res) {
  await deleteProduct(req.params.id);
  res.json({ ok: true });
}

export async function orders(req, res) {
  const items = await listAllOrders();
  res.json({ orders: items.map(serializeOrder) });
}

export async function patchOrder(req, res) {
  const order = await updateOrderStatus(req.params.id, req.body.status);
  res.json({ order: serializeOrder(order) });
}
