import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";

export default function HelpPage() {
  return (
    <StorefrontShell>
      <main className="py-16 text-center md:py-24">
        <p className="font-sans text-xs tracking-[0.3em] text-olive uppercase">Yardım</p>
        <h1 className="mt-3 font-serif text-4xl md:text-5xl">Kargo ve iade</h1>
        <div className="mx-auto mt-10 max-w-lg space-y-8 font-sans text-sm leading-7 text-metal">
          <p>
            Siparişler 3–5 iş günü içinde kargoya verilir. Kargo ücreti checkout’ta hesaplanır; sahte ödeme
            altyapısında tahsilat yapılmaz.
          </p>
          <p>
            Teslimattan sonra 14 gün içinde iade talebi oluşturabilirsiniz. Ürün kullanılmamış ve etiketli
            olmalıdır.
          </p>
        </div>
        <Link
          href="/products"
          className="mt-10 inline-flex min-h-touch items-center rounded-full bg-olive px-6 font-sans text-sm text-paper"
        >
          Koleksiyona dön
        </Link>
      </main>
    </StorefrontShell>
  );
}
