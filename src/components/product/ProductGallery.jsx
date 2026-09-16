"use client";

import { useEffect, useState } from "react";

export function ProductGallery({ images, name }) {
  const [index, setIndex] = useState(0);
  const list = images.filter(Boolean);
  const current = list[index] ?? list[0];
  const hasThumbs = list.length > 1;

  useEffect(() => {
    if (!hasThumbs) return undefined;

    function onKey(event) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((value) => (value + 1) % list.length);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((value) => (value - 1 + list.length) % list.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasThumbs, list.length]);

  function Thumb({ src, i, className }) {
    const selected = i === index;
    return (
      <button
        type="button"
        aria-label={`${name} görsel ${i + 1}`}
        aria-current={selected ? "true" : undefined}
        onClick={() => setIndex(i)}
        className={`gallery-thumb shrink-0 overflow-hidden rounded-lg border ${
          selected ? "border-olive ring-2 ring-olive/40" : "border-olive/15"
        } ${className}`}
      >
        <img src={src} alt="" className="h-full w-full object-cover" />
      </button>
    );
  }

  return (
    <div className="contents">
      <div className="order-1 min-w-0 overflow-hidden rounded-2xl bg-olive-soft/40 lg:order-2">
        {current ? (
          <img src={current} alt={name} className="h-[24rem] w-full object-cover lg:h-[34rem]" />
        ) : null}
      </div>
      {hasThumbs ? (
        <div className="order-2 flex snap-x snap-mandatory gap-2 overflow-x-auto lg:order-1 lg:max-h-[34rem] lg:snap-y lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto">
          {list.map((src, i) => (
            <Thumb key={src} src={src} i={i} className="h-[4.5rem] w-[4.5rem] snap-start lg:h-16 lg:w-16" />
          ))}
        </div>
      ) : (
        <div className="hidden lg:order-1 lg:block" aria-hidden="true" />
      )}
    </div>
  );
}
