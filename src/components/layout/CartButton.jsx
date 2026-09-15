"use client";

import Link from "next/link";
import { IconBag } from "@/components/layout/icons";

export function CartButton({ user, count }) {
  return (
    <Link
      href="/cart"
      className="relative inline-flex h-touch items-center gap-2 px-2 font-sans text-sm text-ink md:px-3"
      aria-label="Sepet"
    >
      <span className="relative inline-flex">
        <IconBag />
        {user && count > 0 ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 font-sans text-[10px] text-paper">
            {count > 9 ? "9+" : count}
          </span>
        ) : null}
      </span>
      <span className="hidden md:inline">Sepet</span>
    </Link>
  );
}
