import Link from "next/link";
import { StorefrontShell } from "@/components/layout/StorefrontShell";

export default function NotFound() {
  return (
    <StorefrontShell>
      <main className="py-24">
        <h1 className="font-serif text-4xl">Bulunamadı</h1>
        <p className="mt-4 font-sans text-sm text-metal">Bu sayfa veya ürün yok.</p>
        <Link href="/products" className="mt-8 inline-block font-sans text-sm underline">
          Koleksiyona dön
        </Link>
      </main>
    </StorefrontShell>
  );
}
