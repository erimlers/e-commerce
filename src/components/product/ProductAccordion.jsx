"use client";

import { useState } from "react";
import { IconChevronRight } from "@/components/layout/icons";

export function ProductAccordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl border border-olive/10 bg-white">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.title} className="border-b border-olive/10 last:border-b-0">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="accordion-trigger flex w-full items-center justify-between gap-4 px-5 text-left font-serif text-lg text-ink sm:px-6"
            >
              {item.title}
              <IconChevronRight
                className={`h-4 w-4 shrink-0 text-olive transition-transform ${expanded ? "rotate-90" : ""}`}
              />
            </button>
            {expanded ? (
              <div className="px-5 pb-5 font-sans text-base leading-8 text-metal sm:px-6">{item.body}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
