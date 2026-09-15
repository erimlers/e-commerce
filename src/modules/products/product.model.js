import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String },
    stock: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    story: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "TRY" },
    images: { type: [String], default: [] },
    variants: { type: [variantSchema], required: true },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
