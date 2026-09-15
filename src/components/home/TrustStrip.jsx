const notes = [
  { title: "3–5 iş günü", text: "Kargo" },
  { title: "14 gün", text: "İade hakkı" },
  { title: "Bitkisel tabaklama", text: "Dana derisi" },
  { title: "Balıkesir", text: "Atölye üretimi" },
];

export function TrustStrip() {
  return (
    <section className="grid grid-cols-2 border-y border-olive/10 md:grid-cols-4">
      {notes.map((note) => (
        <div key={note.title} className="border-olive/10 px-4 py-5 md:border-l md:first:border-l-0 md:px-6 md:py-6">
          <p className="font-sans text-[11px] tracking-[0.18em] text-olive uppercase">{note.text}</p>
          <p className="mt-1 font-serif text-xl">{note.title}</p>
        </div>
      ))}
    </section>
  );
}
