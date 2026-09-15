"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconBag } from "@/components/layout/icons";

export function CartButton({ user, count, onNavigate }) {
  const router = useRouter();

  function go() {
    onNavigate?.();
    if (!user) {
      router.push("/login");
      return;
    }
    router.push("/cart");
  }

  return (
    <button type="button" className="touch-target relative text-ink" aria-label="Sepet" onClick={go}>
      <IconBag />
      {user && count > 0 ? (
        <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 font-sans text-[10px] text-paper">
          {count > 9 ? "9+" : count}
        </span>
      ) : null}
    </button>
  );
}
