import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";

export default function AboutPage() {
  return (
    <StorefrontShell>
      <main className="py-14 md:py-20">
        <p className="font-sans text-xs tracking-[0.3em] text-olive uppercase">Atölye</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl md:text-6xl">Hakkımızda</h1>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="space-y-6 font-sans text-base leading-8 text-metal">
            <p>
              CALDER, her gün cebe ve bele alınan az sayıda deri obje üretir. Kartlık, cüzdan, kemer, anahtarlık —
              hepsi aynı dikiş diliyle, unisex.
            </p>
            <p>
              Deri bitkisel tabaklanır; zamanla koyulaşır. Kenarlar elde boyanır. Koleksiyon kasıtlı olarak küçüktür:
              altı parça, iki renk, uzun ömür.
            </p>
            <p>Atölye Balıkesir’dedir. Siparişler 3–5 iş gününde kargoya verilir. Gerçek tahsilat yoktur.</p>
          </div>
          <aside className="h-fit border border-olive/15 bg-olive-soft/50 p-6 md:p-8">
            <p className="font-sans text-xs tracking-[0.22em] text-olive uppercase">Notlar</p>
            <ul className="mt-5 space-y-4 font-sans text-sm leading-6 text-ink/80">
              <li>Balıkesir, Türkiye</li>
              <li>Hafta içi 10:00–18:00</li>
              <li>14 gün iade</li>
              <li>
                <a href="mailto:merhaba@calder.test" className="text-olive hover:text-ink">
                  merhaba@calder.test
                </a>
              </li>
            </ul>
            <Link
              href="/products"
              className="mt-8 inline-flex min-h-touch items-center rounded-full bg-olive px-6 font-sans text-sm text-paper"
            >
              Ürünlere bak
            </Link>
          </aside>
        </div>
      </main>
    </StorefrontShell>
  );
}
