import { addItem, getCart, removeItem, updateItem } from "./cart.service.js";

export async function show(req, res) {
  const cart = await getCart(req.user._id);
  res.json({ cart });
}

export async function add(req, res) {
  const cart = await addItem(req.user._id, req.body);
  res.json({ cart });
}

export async function patch(req, res) {
  const cart = await updateItem(req.user._id, req.params.sku, req.body.qty);
  res.json({ cart });
}

export async function remove(req, res) {
  const cart = await removeItem(req.user._id, req.params.sku);
  res.json({ cart });
}
