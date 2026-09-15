"use client";

import { Children, useRef, useState } from "react";

export function SnapSlider({ children, className = "", itemClassName = "" }) {
  const items = Children.toArray(children);
  const scrollerRef = useRef(null);
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(items.length / 2));

  function goTo(next) {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pageCount - 1, next));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    setPage(clamped);
  }

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (!width) return;
    setPage(Math.round(el.scrollLeft / width));
  }

  return (
    <div>
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className={`flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:pb-0 ${className}`.trim()}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={`w-[calc(50%-0.375rem)] shrink-0 snap-start md:w-auto md:min-w-0 md:max-w-none ${itemClassName}`.trim()}
          >
            {child}
          </div>
        ))}
      </div>
      {pageCount > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`promo-dot ${index === page ? "bg-olive" : "bg-olive/25"}`}
              aria-label={`${index + 1}. grup`}
              aria-current={index === page ? "true" : undefined}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
