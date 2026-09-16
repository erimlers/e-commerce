"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconChevronRight, IconSort } from "@/components/layout/icons";
import { parseSort } from "@/lib/catalog";
import { listingHref } from "@/lib/shop";

const options = [
  { value: "newest", label: "En yeni" },
  { value: "oldest", label: "En eski" },
  { value: "price-desc", label: "En pahalı" },
  { value: "price-asc", label: "En ucuz" },
];

export function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = parseSort(searchParams.get("sort"));
  const current = options.find((item) => item.value === sort) ?? options[0];
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(value) {
    setOpen(false);
    router.push(listingHref(searchParams, { sort: value === "newest" ? "" : value }));
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Sıralama"
        onClick={() => setOpen((value) => !value)}
        className="sort-trigger inline-flex items-center gap-2 border border-olive/15 bg-white px-3.5 font-sans text-sm text-ink"
      >
        <IconSort className="h-3.5 w-3.5 shrink-0 text-olive" />
        {current.label}
        <IconChevronRight
          className={`h-3.5 w-3.5 shrink-0 text-olive transition-transform ${open ? "-rotate-90" : "rotate-90"}`}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 z-40 mt-1.5 w-40 overflow-hidden rounded-xl border border-olive/10 bg-white py-1 shadow-[0_12px_32px_rgb(31_36_28/0.12)]"
        >
          {options.map((option) => {
            const active = option.value === sort;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => choose(option.value)}
                  className={`sort-option flex w-full items-center px-3.5 text-left font-sans text-sm ${
                    active ? "bg-olive-soft text-olive" : "bg-white text-ink hover:bg-olive-soft/70"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
