"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@/components/layout/icons";
import { PageWidth } from "@/components/layout/PageWidth";
import { promoSlides } from "@/lib/promo";

const INTERVAL_MS = 5500;

export function PromoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const last = promoSlides.length - 1;

  const go = useCallback(
    (next) => {
      setIndex((current) => {
        if (next < 0) return last;
        if (next > last) return 0;
        return next;
      });
    },
    [last],
  );

  useEffect(() => {
    if (paused) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const timer = window.setInterval(() => {
      setIndex((current) => (current === last ? 0 : current + 1));
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [last, paused]);

  const slide = promoSlides[index];

  return (
    <section
      className="relative overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Tanıtım"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        if (delta > 40) go(index - 1);
        if (delta < -40) go(index + 1);
      }}
    >
      <h1 className="sr-only">CALDER — unisex deri objeler</h1>
      <div
        className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {promoSlides.map((item, slideIndex) => (
          <article key={item.href} className="relative min-w-full" aria-hidden={slideIndex !== index}>
            <div className="relative h-[72vw] min-h-52 max-h-80 sm:h-[58vw] sm:max-h-[32rem] md:h-[42vw] md:min-h-80 md:max-h-[36rem]">
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-ink/5" />
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <PageWidth className="flex h-full flex-col justify-end pb-5 sm:pb-8 md:pb-10">
          <p className="font-sans text-[10px] tracking-[0.28em] text-paper/80 uppercase sm:text-[11px] sm:tracking-[0.32em]">
            {slide.eyebrow}
          </p>
          <h2 className="mt-2 max-w-lg font-serif text-[1.75rem] leading-[1.05] text-paper sm:mt-3 sm:text-4xl sm:leading-[0.95] md:text-6xl">
            {slide.title}
          </h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-6 text-paper/85 sm:mt-4 md:text-base">{slide.text}</p>
          <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
            <Link
              href={slide.href}
              className="inline-flex min-h-10 items-center rounded-full bg-paper px-4 font-sans text-sm text-ink sm:min-h-touch sm:px-6"
            >
              {slide.cta}
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink"
                aria-label="Önceki slayt"
                onClick={() => go(index - 1)}
              >
                <IconChevronLeft />
              </button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper/90 text-ink"
                aria-label="Sonraki slayt"
                onClick={() => go(index + 1)}
              >
                <IconChevronRight />
              </button>
            </div>
          </div>
          <div className="pointer-events-auto mt-3 flex w-fit items-center gap-2 rounded-full bg-ink/40 px-2.5 py-1.5 sm:mt-6">
            {promoSlides.map((item, slideIndex) => (
              <button
                key={item.href}
                type="button"
                className={`promo-dot ${slideIndex === index ? "bg-paper" : "bg-paper/35"}`}
                aria-label={`${item.eyebrow} slaytına geç`}
                aria-current={slideIndex === index ? "true" : undefined}
                onClick={() => go(slideIndex)}
              />
            ))}
          </div>
        </PageWidth>
      </div>
    </section>
  );
}
