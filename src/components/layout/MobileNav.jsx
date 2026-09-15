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

  const linkClass = "block rounded-2xl px-4 py-3 font-sans text-base";

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Menüyü kapat"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        aria-hidden={!open}
        className={`absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col rounded-r-4xl bg-paper px-6 pb-safe-b pt-safe-t shadow-soft transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between py-3">
          <p className="font-serif text-lg tracking-[0.2em]">CALDER</p>
          <button type="button" className="touch-target" aria-label="Kapat" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 pt-4">
          <Link href="/products" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
            Koleksiyon
          </Link>
          {user ? (
            <>
              <Link href="/account" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
                Hesabım
              </Link>
              <Link href="/account/orders" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
                Siparişler
              </Link>
              {user.role === "admin" ? (
                <Link href="/admin" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
                  Yönetim
                </Link>
              ) : null}
              <button
                type="button"
                className={`${linkClass} w-full text-left`}
                onClick={onLogout}
                tabIndex={open ? 0 : -1}
              >
                Çıkış
              </button>
            </>
          ) : (
            <Link href="/login" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
              Giriş
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
