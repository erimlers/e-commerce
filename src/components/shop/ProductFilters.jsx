"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconChevronRight } from "@/components/layout/icons";
import { parseCategories } from "@/lib/catalog";
import { categoryNav } from "@/lib/nav";
import { listingHref } from "@/lib/shop";

const categoryOptions = categoryNav.filter((item) => item.category);
const PRICE_STEP = 100;

function nudgePrice(value, direction) {
  const amount = Number(String(value).trim());
  const base = Number.isFinite(amount) && amount > 0 ? amount : 0;
  const next = Math.max(0, base + direction * PRICE_STEP);
  return String(next);
}

function PriceField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex min-w-0 flex-1 items-stretch">
      <button
        type="button"
        aria-label={`${label} azalt`}
        onClick={() => onChange(nudgePrice(value, -1))}
        className="price-nudge font-sans text-sm text-olive"
      >
        −
      </button>
      <label className="min-w-0 flex-1">
        <span className="sr-only">{label}</span>
        <input
          type="number"
          min="0"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="price-step w-full border-0 bg-transparent px-0.5 text-center font-sans text-sm text-ink outline-none placeholder:text-metal/70"
        />
      </label>
      <button
        type="button"
        aria-label={`${label} artır`}
        onClick={() => onChange(nudgePrice(value, 1))}
        className="price-nudge font-sans text-sm text-olive"
      >
        +
      </button>
    </div>
  );
}

export function ProductFilters({ onNavigate, boxed = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = parseCategories(searchParams.get("category"));
  const [open, setOpen] = useState(true);
  const [min, setMin] = useState(searchParams.get("min") ?? "");
  const [max, setMax] = useState(searchParams.get("max") ?? "");

  useEffect(() => {
    setMin(searchParams.get("min") ?? "");
    setMax(searchParams.get("max") ?? "");
  }, [searchParams]);

  function go(patch, close = false) {
    if (close) onNavigate?.();
    router.push(listingHref(searchParams, patch));
  }

  function toggleCategory(id) {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
    go({ category: next });
  }

  function applyPrice(event) {
    event.preventDefault();
    let minTl = min.trim();
    let maxTl = max.trim();
    const minN = Number(minTl);
    const maxN = Number(maxTl);
    if (minTl && maxTl && Number.isFinite(minN) && Number.isFinite(maxN) && minN > maxN) {
      [minTl, maxTl] = [maxTl, minTl];
    }
    go({ min: minTl, max: maxTl }, true);
  }

  const hasFilters = Boolean(selected.length || searchParams.get("min") || searchParams.get("max"));

  const body = (
    <div className="space-y-5">
      <section>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-10 w-full items-center justify-between gap-3 font-serif text-base text-ink"
        >
          Kategori
          <IconChevronRight className={`h-4 w-4 shrink-0 text-olive transition-transform ${open ? "rotate-90" : ""}`} />
        </button>
        {open ? (
          <ul className="mt-1 overflow-hidden rounded-xl border border-olive/10 bg-white">
            {categoryOptions.map((item) => {
              const checked = selected.includes(item.category);
              return (
                <li key={item.category} className="border-b border-olive/10 last:border-b-0">
                  <label
                    className={`flex min-h-11 cursor-pointer items-center gap-3 px-3 font-sans text-sm ${
                      checked ? "bg-olive-soft text-olive" : "bg-white text-ink"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(item.category)}
                      className="filter-check accent-olive"
                    />
                    {item.label}
                  </label>
                </li>
              );
            })}
          </ul>
        ) : null}
      </section>

      <section>
        <p className="font-serif text-base text-ink">Fiyat</p>
        <form onSubmit={applyPrice} className="mt-2.5 space-y-2.5">
          <div className="flex overflow-hidden rounded-xl bg-ink/[0.03]">
            <PriceField label="En düşük fiyat" value={min} onChange={setMin} placeholder="Min ₺" />
            <span className="self-center px-1 font-sans text-sm text-metal" aria-hidden="true">
              -
            </span>
            <PriceField label="En yüksek fiyat" value={max} onChange={setMax} placeholder="Max ₺" />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-olive font-sans text-sm text-paper"
          >
            Uygula
          </button>
        </form>
      </section>

      {hasFilters ? (
        <button
          type="button"
          onClick={() => go({ category: "", min: "", max: "" })}
          className="font-sans text-sm text-olive underline-offset-4 hover:underline"
        >
          Temizle
        </button>
      ) : null}
    </div>
  );

  if (!boxed) return body;

  return (
    <div className="rounded-2xl border border-olive/10 bg-white p-4 shadow-[0_8px_24px_rgb(31_36_28/0.05)]">
      <h2 className="font-serif text-lg tracking-wide text-ink">Filtreler</h2>
      <div className="mt-7">{body}</div>
    </div>
  );
}
