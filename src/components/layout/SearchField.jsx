"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconSearch } from "@/components/layout/icons";
import { listingHref } from "@/lib/shop";

export function SearchField({ className = "", onNavigate }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  function onSubmit(event) {
    event.preventDefault();
    const query = value.trim();
    onNavigate?.();
    if (!pathname.startsWith("/products")) {
      router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
      return;
    }
    router.push(listingHref(searchParams, { q: query }));
  }

  return (
    <form role="search" onSubmit={onSubmit} className={className}>
      <label className="relative flex items-center overflow-hidden">
        <span className="sr-only">Ürün ara</span>
        <IconSearch className="pointer-events-none absolute left-3.5 h-4 w-4 shrink-0 text-olive" />
        <input
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Ürün ara..."
          autoComplete="off"
          className="search-input w-full border-0 bg-olive-soft/70 pl-10 pr-4 font-sans text-sm text-ink outline-none placeholder:text-metal/70 focus:bg-olive-soft"
        />
      </label>
    </form>
  );
}
