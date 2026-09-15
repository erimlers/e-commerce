export function listingHref(searchParams, patch = {}) {
  const params = new URLSearchParams(searchParams?.toString?.() ?? "");
  for (const [key, value] of Object.entries(patch)) {
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) params.delete(key);
    else params.set(key, Array.isArray(value) ? value.join(",") : String(value));
  }
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
