export function serializeProduct(doc) {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    story: doc.story,
    price: doc.price,
    currency: doc.currency,
    images: doc.images,
    variants: doc.variants,
    featured: doc.featured,
  };
}
