"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { IconClose } from "@/components/layout/icons";

export function MobileNav({ open, onClose, user, onLogout }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a, button")?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const linkClass = "block rounded-2xl px-4 py-3 font-sans text-base";

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-ink/30"
        aria-label="Menüyü kapat"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        className="absolute inset-x-0 bottom-0 rounded-t-4xl bg-paper px-6 pb-safe-b pt-4 shadow-sheet"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/15" />
        <div className="mb-2 flex items-center justify-between">
          <p className="font-serif text-lg tracking-[0.2em]">CALDER</p>
          <button type="button" className="touch-target" aria-label="Kapat" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <nav className="flex flex-col gap-1 pb-8">
          <Link href="/products" className={linkClass} onClick={onClose}>
            Koleksiyon
          </Link>
          {user ? (
            <>
              <Link href="/account" className={linkClass} onClick={onClose}>
                Hesabım
              </Link>
              <Link href="/account/orders" className={linkClass} onClick={onClose}>
                Siparişler
              </Link>
              {user.role === "admin" ? (
                <Link href="/admin" className={linkClass} onClick={onClose}>
                  Yönetim
                </Link>
              ) : null}
              <button type="button" className={`${linkClass} w-full text-left`} onClick={onLogout}>
                Çıkış
              </button>
            </>
          ) : (
            <Link href="/login" className={linkClass} onClick={onClose}>
              Giriş
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
