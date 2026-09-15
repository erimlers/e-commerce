"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconUser } from "@/components/layout/icons";

export function AccountMenu({ user, onLogout, onNavigate }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (user === undefined) {
    return <span className="touch-target text-metal" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className="hidden h-touch items-center rounded-full px-4 font-sans text-sm text-olive md:inline-flex"
      >
        Giriş
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <button
        type="button"
        className="touch-target text-ink"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Hesap"
        onClick={() => setOpen((value) => !value)}
      >
        <IconUser />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 rounded-2xl bg-paper p-2 shadow-soft"
        >
          <Link
            href="/account"
            role="menuitem"
            className="block rounded-xl px-4 py-3 font-sans text-sm"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            Hesabım
          </Link>
          <Link
            href="/account/orders"
            role="menuitem"
            className="block rounded-xl px-4 py-3 font-sans text-sm"
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            Siparişler
          </Link>
          {user.role === "admin" ? (
            <Link
              href="/admin"
              role="menuitem"
              className="block rounded-xl px-4 py-3 font-sans text-sm"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              Yönetim
            </Link>
          ) : null}
          <button
            type="button"
            role="menuitem"
            className="block w-full rounded-xl px-4 py-3 text-left font-sans text-sm"
            onClick={onLogout}
          >
            Çıkış
          </button>
        </div>
      ) : null}
    </div>
  );
}
