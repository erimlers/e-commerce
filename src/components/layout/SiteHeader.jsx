"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30">
        <div
          className={`border-b pt-safe-t transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out motion-reduce:transition-none ${
            scrolled
              ? "site-header-scrolled border-olive/20 bg-paper/75 shadow-[0_12px_36px_rgb(31_36_28/0.12)] backdrop-blur-xl"
              : "border-olive/15 bg-paper"
          }`}
        >
          <PageWidth
            className={`grid grid-cols-[1fr_auto_1fr] items-center transition-[padding] duration-500 ease-out motion-reduce:transition-none md:flex md:justify-between ${
              scrolled ? "py-1.5 md:py-2.5" : "py-2 md:py-3"
            }`}
          >
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
            <Link href="/" className="font-serif text-[1.3rem] tracking-[0.28em] text-olive md:hidden">
              CALDER
            </Link>
            <div className="flex items-center justify-end justify-self-end">
              <AccountMenu user={user} onLogout={logout} />
              <CartButton user={user} count={cartCount} />
            </div>
          </PageWidth>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
