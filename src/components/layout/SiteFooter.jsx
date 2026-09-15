import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ink/10 px-6 py-10 md:px-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="font-serif text-lg tracking-[0.25em]">CALDER</p>
        <p className="font-sans text-xs tracking-wide text-metal">Unisex deri. Az parça. İstanbul.</p>
      </div>
    </footer>
  );
}
