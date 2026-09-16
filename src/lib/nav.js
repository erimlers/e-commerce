export const utilityNav = [
  { href: "/products", label: "Çok satanlar" },
  { href: "/about", label: "Hakkımızda" },
];

export const categoryNav = [
  { href: "/products", label: "Tüm ürünler" },
  { href: "/products?category=kartlik", label: "Kartlık", category: "kartlik" },
  { href: "/products?category=cuzdan", label: "Cüzdan", category: "cuzdan" },
  { href: "/products?category=kemer", label: "Kemer", category: "kemer" },
  { href: "/products?category=aksesuar", label: "Aksesuar", category: "aksesuar" },
];

export const shopNav = [...categoryNav, { href: "/about", label: "Hakkımızda" }];

export const shopCatalog = [
  { href: "/products/kartlik", label: "Kartlık" },
  { href: "/products/cuzdan", label: "Cüzdan" },
  { href: "/products/kemer", label: "Kemer" },
  { href: "/products/anahtarlik", label: "Anahtarlık" },
  { href: "/products/deri-tepsi", label: "Deri tepsi" },
  { href: "/products/pasaport-kilifi", label: "Pasaport kılıfı" },
];
