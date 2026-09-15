import { createOrder, getMyOrder, listMyOrders, serializeOrder } from "./order.service.js";

export async function create(req, res) {
  const order = await createOrder(req.user._id, req.body.address);
  res.status(201).json({ order: serializeOrder(order) });
}

export async function list(req, res) {
  const orders = await listMyOrders(req.user._id);
  res.json({ orders: orders.map(serializeOrder) });
}

export async function show(req, res) {
  const order = await getMyOrder(req.user._id, req.params.id);
  res.json({ order: serializeOrder(order) });
}
