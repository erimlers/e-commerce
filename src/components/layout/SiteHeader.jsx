import Link from "next/link";
import { AuthNav } from "@/components/layout/AuthNav";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-12">
      <Link href="/" className="font-serif text-2xl tracking-[0.2em]">
        CALDER
      </Link>
      <nav className="flex items-center gap-8 font-sans text-sm text-metal">
        <Link href="/products" className="hover:text-ink">
          Koleksiyon
        </Link>
        <Link href="/cart" className="hover:text-ink">
          Sepet
        </Link>
        <AuthNav />
      </nav>
    </header>
  );
}
