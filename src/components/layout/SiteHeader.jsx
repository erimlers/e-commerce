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
      <header className="sticky top-0 z-30 bg-paper/80 pt-safe-t backdrop-blur-md">
        <PageWidth className="py-3 md:py-4">
          <div className="flex items-center justify-between gap-4 border border-olive/20 bg-paper/90 px-2 py-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.45)] md:px-4">
            <div className="flex min-w-0 items-center gap-2 md:gap-7">
              <button
                type="button"
                className="touch-target md:hidden"
                aria-label="Menü"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <IconMenu />
              </button>
              <Link href="/" className="shrink-0 font-serif text-[1.3rem] tracking-[0.28em] text-olive md:text-[1.65rem]">
                CALDER
              </Link>
              <span className="hidden h-5 w-px bg-olive/20 md:block" aria-hidden="true" />
              <nav className="hidden items-center gap-7 md:flex" aria-label="Mağaza">
                {shopNav.map((item) => (
                  <Link key={item.href} href={item.href} className={navClass(isActive(pathname, item.href))}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-1">
              <AccountMenu user={user} onLogout={logout} />
              <CartButton user={user} count={cartCount} />
            </div>
          </div>
        </PageWidth>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
