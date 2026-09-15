import bcrypt from "bcryptjs";
import { config as loadDotenv } from "dotenv";
import { loadEnv } from "../config/env.js";
import { connectDb } from "../config/db.js";
import { User } from "../modules/auth/user.model.js";
import { Product } from "../modules/products/product.model.js";

loadDotenv();

const products = [
  {
    name: "Kartlık",
    slug: "kartlik",
    story:
      "Cebi şişirmeyen, dört kartlık gözü. Bitkisel tabaklanmış dana derisi, zamanla koyulaşır.",
    price: 390000,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    published: true,
    variants: [
      { sku: "CARD-INK", color: "Mürekkep", stock: 18 },
      { sku: "CARD-SOIL", color: "Toprak", stock: 14 },
    ],
  },
  {
    name: "Cüzdan",
    slug: "cuzdan",
    story:
      "İnce bifold. Nakit, kart ve bir gizli göz. Dikişler eyer dikişi; kenarlar elle boyanmış.",
    price: 590000,
    images: [
      "https://images.unsplash.com/photo-1621985581011-295621085a2d?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    published: true,
    variants: [
      { sku: "WALL-INK", color: "Mürekkep", stock: 12 },
      { sku: "WALL-SOIL", color: "Toprak", stock: 10 },
    ],
  },
  {
    name: "Kemer",
    slug: "kemer",
    story:
      "Tek parça deri, fırçalanmış pirinç toka. Günlük ve gece aynı kemer.",
    price: 490000,
    images: [
      "https://images.unsplash.com/photo-1664286094154-c7080f5d9646?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: true,
    published: true,
    variants: [
      { sku: "BELT-INK-85", color: "Mürekkep", size: "85", stock: 8 },
      { sku: "BELT-INK-90", color: "Mürekkep", size: "90", stock: 8 },
      { sku: "BELT-SOIL-85", color: "Toprak", size: "85", stock: 6 },
      { sku: "BELT-SOIL-90", color: "Toprak", size: "90", stock: 6 },
    ],
  },
  {
    name: "Anahtarlık",
    slug: "anahtarlik",
    story: "Küçük bir kayış, pirinç halka. Cebe takılır, ses çıkarmaz.",
    price: 190000,
    images: [
      "https://images.unsplash.com/photo-1611937663566-27d3b8b2f8f0?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    published: true,
    variants: [{ sku: "KEY-INK", color: "Mürekkep", stock: 24 }],
  },
  {
    name: "Deri tepsi",
    slug: "deri-tepsi",
    story:
      "Giriş holü için valet. Anahtar, saat, bozuk para. Kalın deri, dikilmiş kenar.",
    price: 450000,
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    published: true,
    variants: [{ sku: "TRAY-SOIL", color: "Toprak", stock: 9 }],
  },
  {
    name: "Pasaport kılıfı",
    slug: "pasaport-kilifi",
    story:
      "Pasaport ve iki kart. Seyahat için tek parça; kartlıkla aynı dikiş dili.",
    price: 320000,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80",
    ],
    featured: false,
    published: true,
    variants: [
      { sku: "PASS-INK", color: "Mürekkep", stock: 11 },
      { sku: "PASS-SOIL", color: "Toprak", stock: 11 },
    ],
  },
];

async function seed() {
  const env = loadEnv();
  await connectDb(env.mongoUri);

  const adminPassword = process.env.ADMIN_SEED_PASSWORD || "calder-admin-dev";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await Product.deleteMany({});
  await User.deleteOne({ email: "admin@calder.test" });

  await Product.insertMany(products);
  await User.create({
    email: "admin@calder.test",
    passwordHash,
    name: "CALDER Admin",
    role: "admin",
  });

  console.log("Seed tamam: 6 ürün, 1 admin (admin@calder.test)");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
