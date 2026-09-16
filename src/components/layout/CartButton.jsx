"use client";

import Link from "next/link";
import { IconBag, iconCircleClass } from "@/components/layout/icons";

export function CartButton({ user, count }) {
  return (
    <Link href="/cart" className={`relative ${iconCircleClass}`} aria-label="Sepet">
      <IconBag />
      {user && count > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 font-sans text-[10px] text-paper">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </Link>
  );
}
