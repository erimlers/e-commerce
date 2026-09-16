"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { AccountMenu } from "@/components/layout/AccountMenu";
import { CartButton } from "@/components/layout/CartButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { PageWidth } from "@/components/layout/PageWidth";
import { IconMenu } from "@/components/layout/icons";
import { SearchField } from "@/components/layout/SearchField";
import { categoryNav, utilityNav } from "@/lib/nav";
import { listingHref } from "@/lib/shop";
import { useStorefrontSession } from "@/hooks/useStorefrontSession";

function navClass(active) {
  return `font-sans text-sm tracking-wide transition ${
    active ? "text-olive" : "text-ink/70 hover:text-olive"
  }`;
}

function isUtilityActive(pathname, href) {
  if (href === "/products") return pathname.startsWith("/products");
  return pathname === href;
}

function isCategoryActive(pathname, selected, item) {
  if (pathname !== "/products") return false;
  const selectedIds = (selected || "").split(",").filter(Boolean);
  if (item.category) return selectedIds.includes(item.category);
  return selectedIds.length === 0;
}

function SearchFallback() {
  return <div className="h-10 rounded-full bg-olive-soft/50" aria-hidden="true" />;
}

function CategoryStripFallback({ scrolled }) {
  return (
    <div className="hidden lg:block">
      <PageWidth
        className={`flex justify-center ${scrolled ? "py-2" : "py-2.5"}`}
      >
        <nav className="flex flex-nowrap items-center justify-center gap-x-5 overflow-x-auto lg:gap-x-6" aria-label="Kategoriler">
          {categoryNav.map((item) => (
            <Link key={item.href} href={item.href} className={navClass(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </PageWidth>
    </div>
  );
}

function CategoryStrip({ scrolled }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  return (
    <div className="hidden lg:block">
      <PageWidth
        className={`flex justify-center transition-[padding] duration-500 ease-out motion-reduce:transition-none ${
          scrolled ? "py-2" : "py-2.5"
        }`}
      >
        <nav className="flex flex-nowrap items-center justify-center gap-x-5 overflow-x-auto lg:gap-x-6" aria-label="Kategoriler">
          {categoryNav.map((item) => (
            <Link
              key={item.href}
              href={pathname === "/products" ? listingHref(searchParams, { category: item.category ?? "" }) : item.href}
              className={navClass(isCategoryActive(pathname, selectedCategory, item))}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </PageWidth>
    </div>
  );
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
            className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 transition-[padding] duration-500 ease-out motion-reduce:transition-none lg:grid-cols-[1fr_minmax(0,20rem)_1fr] lg:gap-6 ${
              scrolled ? "pb-1.5 pt-3 lg:pb-2 lg:pt-3" : "pb-2 pt-3.5 lg:pb-2.5 lg:pt-4"
            }`}
          >
            <div className="flex items-center justify-self-start">
              <button
                type="button"
                className="touch-target lg:hidden"
                aria-label="Menü"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <IconMenu />
              </button>
              <Link
                href="/"
                className="hidden shrink-0 font-serif text-[1.65rem] tracking-[0.28em] text-olive lg:inline"
              >
                CALDER
              </Link>
            </div>
            <Link href="/" className="font-serif text-[1.2rem] tracking-[0.22em] text-olive sm:text-[1.3rem] sm:tracking-[0.28em] lg:hidden">
              CALDER
            </Link>
            <div className="hidden min-w-0 justify-self-stretch lg:block">
              <Suspense fallback={<SearchFallback />}>
                <SearchField className="w-full" />
              </Suspense>
            </div>
            <div className="flex shrink-0 items-center justify-end justify-self-end gap-1.5 lg:gap-4">
              <nav className="hidden items-center gap-4 lg:flex" aria-label="Mağaza">
                {utilityNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={navClass(isUtilityActive(pathname, item.href))}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <AccountMenu user={user} onLogout={logout} />
                <CartButton user={user} count={cartCount} />
              </div>
            </div>
          </PageWidth>
          <div className="px-4 pb-2.5 lg:hidden">
            <Suspense fallback={<SearchFallback />}>
              <SearchField />
            </Suspense>
          </div>
          <Suspense fallback={<CategoryStripFallback scrolled={scrolled} />}>
            <CategoryStrip scrolled={scrolled} />
          </Suspense>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} user={user} onLogout={logout} />
    </>
  );
}
