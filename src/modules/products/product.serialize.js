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
    published: doc.published,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
    rating: Number(doc.rating) > 0 ? Number(doc.rating) : 0,
    reviewCount: Number(doc.reviewCount) > 0 ? Number(doc.reviewCount) : 0,
  };
}
