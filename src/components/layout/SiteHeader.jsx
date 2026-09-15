"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { CartButton } from "@/components/layout/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { PageWidth } from "@/components/layout/PageWidth";
import { IconMenu } from "@/components/layout/icons";
import { shopNav } from "@/lib/nav";
import { useStorefrontSession } from "@/hooks/useStorefrontSession";

function navClass(active) {
  return `font-sans text-sm tracking-wide transition ${
    active ? "text-olive" : "text-ink/80 hover:text-olive"
  }`;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { user, cartCount, logout } = useStorefrontSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-olive/20 bg-paper pt-safe-t">
        <PageWidth className="flex items-center justify-between gap-4 py-2.5 md:py-3">
          <div className="flex min-w-0 items-center gap-2 md:gap-8">
            <button
              type="button"
              className="touch-target md:hidden"
              aria-label="Menü"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
            <Link href="/" className="shrink-0 font-serif text-[1.35rem] tracking-[0.28em] text-olive md:text-2xl">
              CALDER
            </Link>
            <nav className="hidden flex-wrap items-center gap-5 md:flex lg:gap-7" aria-label="Mağaza">
              {shopNav.map((item) => (
                <Link key={item.href} href={item.href} className={navClass(pathname === item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-1">
            <AccountMenu user={user} onLogout={logout} />
            <CartButton user={user} count={cartCount} />
          </div>
        </PageWidth>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
