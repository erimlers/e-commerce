const items = ["Kargo 3–5 iş günü", "14 gün iade", "Sahte ödeme yok"];

export function AnnouncementBar() {
  return (
    <div className="bg-olive px-4 py-1.5 text-paper">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-1 md:gap-x-16">
        {items.map((item) => (
          <span key={item} className="font-sans text-[9px] tracking-[0.22em] uppercase">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
