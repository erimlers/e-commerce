"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { IconClose } from "@/components/layout/icons";
import { shopNav } from "@/lib/nav";

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

  const linkClass = "block px-1 py-3 font-sans text-base text-ink";

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
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
        className={`absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col bg-paper px-6 pb-safe-b pt-safe-t transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-olive/20 py-3">
          <p className="font-serif text-lg tracking-[0.2em] text-olive">CALDER</p>
          <button type="button" className="touch-target" aria-label="Kapat" onClick={onClose}>
            <IconClose />
          </button>
        </div>
        <nav className="flex flex-1 flex-col pt-2" aria-label="Mağaza">
          {shopNav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <div className="my-3 border-t border-olive/20" />
          {user ? (
            <>
              <Link href="/account" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
                Hesabım
              </Link>
              <Link href="/account/orders" className={linkClass} onClick={onClose} tabIndex={open ? 0 : -1}>
                Siparişlerim
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
