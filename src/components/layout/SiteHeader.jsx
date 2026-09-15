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
    active ? "text-olive" : "text-ink/70 hover:text-olive"
  }`;
}

function isActive(pathname, href) {
  if (href === "/products") return pathname.startsWith("/products");
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const { user, cartCount, logout } = useStorefrontSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-olive/15 bg-paper pt-safe-t">
        <PageWidth className="grid grid-cols-[1fr_auto_1fr] items-center py-2 md:flex md:justify-between md:py-3">
          <div className="flex items-center justify-self-start md:gap-8">
            <button
              type="button"
              className="touch-target md:hidden"
              aria-label="Menü"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <IconMenu />
            </button>
            <Link
              href="/"
              className="hidden shrink-0 font-serif text-[1.65rem] tracking-[0.28em] text-olive md:inline"
            >
              CALDER
            </Link>
            <nav className="hidden items-center gap-7 md:flex" aria-label="Mağaza">
              {shopNav.map((item) => (
                <Link key={item.href} href={item.href} className={navClass(isActive(pathname, item.href))}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link
            href="/"
            className="font-serif text-[1.3rem] tracking-[0.28em] text-olive md:hidden"
          >
            CALDER
          </Link>
          <div className="flex items-center justify-end justify-self-end">
            <AccountMenu user={user} onLogout={logout} />
            <CartButton user={user} count={cartCount} />
          </div>
        </PageWidth>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
