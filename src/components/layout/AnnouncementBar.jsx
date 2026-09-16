const items = ["Kargo 3–5 iş günü", "14 gün iade", "Sahte ödeme yok"];

function Item({ children }) {
  return (
    <span className="shrink-0 font-sans text-[8px] tracking-[0.2em] text-paper uppercase sm:text-[9px] sm:tracking-[0.22em]">
      {children}
    </span>
  );
}

function Track() {
  return (
    <div className="flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-14 sm:pr-14 md:gap-x-16 md:pr-16">
      {items.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-olive py-1.5">
      <div className="hidden items-center justify-center gap-x-10 px-4 motion-reduce:flex sm:gap-x-16">
        {items.map((item) => (
          <Item key={item}>{item}</Item>
        ))}
      </div>
      <div className="announce-marquee flex w-max motion-reduce:hidden">
        <Track />
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
}
