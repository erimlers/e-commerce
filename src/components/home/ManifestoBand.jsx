const notes = [
  { title: "Az parça", text: "Altı obje. İki renk. Fazlası yok." },
  { title: "Aynı dil", text: "Her dikiş aynı elden, unisex." },
  { title: "Zaman", text: "Deri koyulaşır. Kenar elde boyanır." },
];

const colors = [
  { name: "Mürekkep", swatch: "#1f241c" },
  { name: "Toprak", swatch: "#8a6a4f" },
];

export function ManifestoBand() {
  return (
    <section className="border-y border-olive/10 py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[11px] tracking-[0.28em] text-olive uppercase">CALDER</p>
        <p className="mt-4 font-serif text-2xl leading-snug tracking-wide md:text-3xl">
          Az parça. Aynı dikiş dili. Her gün cebe ve bele.
        </p>
        <p className="mt-3 font-sans text-sm text-metal">Unisex. Uzun ömür.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-8 border-t border-olive/10 pt-10 sm:grid-cols-3 sm:gap-6">
        {notes.map((note) => (
          <div key={note.title} className="text-center sm:text-left">
            <p className="font-serif text-xl text-ink">{note.title}</p>
            <p className="mt-2 font-sans text-sm leading-6 text-metal">{note.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-center gap-8 sm:justify-start">
        {colors.map((color) => (
          <div key={color.name} className="flex items-center gap-2.5">
            <span
              className="h-7 w-7 rounded-full border border-olive/15"
              style={{ backgroundColor: color.swatch }}
              aria-hidden="true"
            />
            <span className="font-sans text-sm text-ink/80">{color.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
