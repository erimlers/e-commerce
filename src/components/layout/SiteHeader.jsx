import Link from "next/link";
import { AuthNav } from "@/components/layout/AuthNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-serif text-xl tracking-[0.28em] md:text-2xl">
          CALDER
        </Link>
        <nav className="flex items-center gap-6 font-sans text-xs tracking-wide text-metal uppercase md:gap-8 md:text-sm md:normal-case md:tracking-normal">
          <Link href="/products" className="transition hover:text-ink">
            Koleksiyon
          </Link>
          <Link href="/cart" className="transition hover:text-ink">
            Sepet
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}
