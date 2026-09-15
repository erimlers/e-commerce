import Link from "next/link";
import { PageWidth } from "@/components/layout/PageWidth";
import { shopCatalog } from "@/lib/nav";

const customerLinks = [
  { href: "/about", label: "Hakkımızda" },
  { href: "/cart", label: "Sepet" },
  { href: "/checkout", label: "Ödeme" },
  { href: "/account/orders", label: "Siparişlerim" },
  { href: "/login", label: "Giriş" },
  { href: "/register", label: "Hesap oluştur" },
  { href: "/help", label: "Kargo ve iade" },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="font-sans text-xs tracking-[0.2em] text-olive-soft uppercase">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href} className="font-sans text-sm text-paper/90 transition hover:text-paper">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-olive text-paper">
      <PageWidth className="py-14 text-center md:py-16 md:text-left">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl tracking-[0.28em]">CALDER</p>
            <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-6 text-paper/80 md:mx-0">
              Unisex deri objeler. Az parça, uzun ömür. Balıkesir’den, atölyeden.
            </p>
          </div>
          <FooterColumn title="Mağaza" links={shopCatalog} />
          <FooterColumn title="Müşteri" links={customerLinks} />
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-olive-soft uppercase">İletişim</p>
            <ul className="mt-4 space-y-2 font-sans text-sm text-paper/90">
              <li>Balıkesir, Türkiye</li>
              <li>
                <a href="mailto:merhaba@calder.test" className="transition hover:text-paper">
                  merhaba@calder.test
                </a>
              </li>
              <li>Hafta içi 10:00–18:00</li>
              <li>Kargo 3–5 iş günü</li>
              <li>14 gün iade hakkı</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-paper/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs text-paper/70">© {new Date().getFullYear()} CALDER. Tüm hakları saklıdır.</p>
        </div>
      </PageWidth>
    </footer>
  );
}
