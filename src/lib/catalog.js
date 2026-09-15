export const catalogProducts = [
  {
    id: "static-kartlik",
    name: "Kartlık",
    slug: "kartlik",
    category: "kartlik",
    story: "Cebi şişirmeyen, dört kartlık gözü. Bitkisel tabaklanmış dana derisi, zamanla koyulaşır.",
    price: 390000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1600&q=80"],
    bestseller: true,
    variants: [
      { sku: "CARD-INK", color: "Mürekkep", stock: 18 },
      { sku: "CARD-SOIL", color: "Toprak", stock: 14 },
    ],
  },
  {
    id: "static-cuzdan",
    name: "Cüzdan",
    slug: "cuzdan",
    category: "cuzdan",
    story: "İnce bifold. Nakit, kart ve bir gizli göz. Dikişler eyer dikişi; kenarlar elle boyanmış.",
    price: 590000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80"],
    bestseller: true,
    variants: [
      { sku: "WALL-INK", color: "Mürekkep", stock: 12 },
      { sku: "WALL-SOIL", color: "Toprak", stock: 10 },
    ],
  },
  {
    id: "static-kemer",
    name: "Kemer",
    slug: "kemer",
    category: "kemer",
    story: "Tek parça deri, fırçalanmış pirinç toka. Günlük ve gece aynı kemer.",
    price: 490000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1600&q=80"],
    bestseller: true,
    variants: [
      { sku: "BELT-INK-85", color: "Mürekkep", size: "85", stock: 8 },
      { sku: "BELT-INK-90", color: "Mürekkep", size: "90", stock: 8 },
    ],
  },
  {
    id: "static-anahtarlik",
    name: "Anahtarlık",
    slug: "anahtarlik",
    category: "aksesuar",
    story: "Küçük bir kayış, pirinç halka. Cebe takılır, ses çıkarmaz.",
    price: 190000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80"],
    bestseller: false,
    variants: [{ sku: "KEY-INK", color: "Mürekkep", stock: 24 }],
  },
  {
    id: "static-deri-tepsi",
    name: "Deri tepsi",
    slug: "deri-tepsi",
    category: "aksesuar",
    story: "Giriş holü için valet. Anahtar, saat, bozuk para. Kalın deri, dikilmiş kenar.",
    price: 450000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1600&q=80"],
    bestseller: false,
    variants: [{ sku: "TRAY-SOIL", color: "Toprak", stock: 9 }],
  },
  {
    id: "static-pasaport-kilifi",
    name: "Pasaport kılıfı",
    slug: "pasaport-kilifi",
    category: "aksesuar",
    story: "Pasaport ve iki kart. Seyahat için tek parça; kartlıkla aynı dikiş dili.",
    price: 320000,
    currency: "TRY",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"],
    bestseller: true,
    variants: [
      { sku: "PASS-INK", color: "Mürekkep", stock: 11 },
      { sku: "PASS-SOIL", color: "Toprak", stock: 11 },
    ],
  },
];

export const catalogCategories = [
  {
    id: "kartlik",
    name: "Kartlık",
    href: "/products/kartlik",
    image: catalogProducts[0].images[0],
    count: 1,
  },
  {
    id: "cuzdan",
    name: "Cüzdan",
    href: "/products/cuzdan",
    image: catalogProducts[1].images[0],
    count: 1,
  },
  {
    id: "kemer",
    name: "Kemer",
    href: "/products/kemer",
    image: catalogProducts[2].images[0],
    count: 1,
  },
  {
    id: "aksesuar",
    name: "Aksesuar",
    href: "/products/anahtarlik",
    image: catalogProducts[4].images[0],
    count: 3,
  },
];

export function getCatalogProduct(slug) {
  return catalogProducts.find((product) => product.slug === slug) || null;
}

export function getBestsellers() {
  return catalogProducts.filter((product) => product.bestseller);
}
