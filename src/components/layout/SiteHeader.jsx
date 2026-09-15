"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { CartButton } from "@/components/layout/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { IconMenu } from "@/components/layout/icons";
import { useStorefrontSession } from "@/hooks/useStorefrontSession";

export function SiteHeader() {
  const pathname = usePathname();
  const { user, cartCount, logout } = useStorefrontSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const collectionActive = pathname.startsWith("/products");

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper pt-safe-t">
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-12 md:py-3">
          <div className="flex min-w-0 items-center gap-2 md:gap-10">
            <button
              type="button"
              className="touch-target md:hidden"
              aria-label="Menü"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
            <Link href="/" className="font-serif text-[1.35rem] tracking-[0.28em] md:text-2xl">
              CALDER
            </Link>
            <Link
              href="/products"
              className={`hidden font-sans text-sm tracking-wide md:inline-flex ${
                collectionActive ? "text-ink underline decoration-ink/40 underline-offset-8" : "text-metal"
              }`}
            >
              Koleksiyon
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <AccountMenu user={user} onLogout={logout} />
            <CartButton user={user} count={cartCount} />
          </div>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
