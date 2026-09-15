"use client";

import { useEffect, useRef, useState } from "react";
import { IconClose, IconFilter } from "@/components/layout/icons";
import { ProductFilters } from "@/components/shop/ProductFilters";

export function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("button, input")?.focus();

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-2 font-sans text-sm tracking-wide text-ink"
        onClick={() => setOpen(true)}
      >
        <IconFilter className="h-4 w-4 text-olive" />
        Filtrele
      </button>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}>
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Filtreleri kapat"
          onClick={() => setOpen(false)}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Filtreler"
          aria-hidden={!open}
          className={`absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col bg-paper px-6 pb-safe-b pt-safe-t transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-olive/20 py-3">
            <p className="font-serif text-lg tracking-wide text-ink">Filtreler</p>
            <button type="button" className="touch-target" aria-label="Kapat" onClick={() => setOpen(false)}>
              <IconClose />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-6">
            {open ? <ProductFilters onNavigate={() => setOpen(false)} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}
