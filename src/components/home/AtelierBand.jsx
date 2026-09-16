import Link from "next/link";

const notes = ["Bitkisel tabaklama", "Unisex dikiş dili", "Az parça, uzun ömür"];

export function AtelierBand() {
  return (
    <section className="-mx-4 bg-olive-soft/45 sm:-mx-6 lg:-mx-8">
      <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-16 md:px-10 md:py-16">
        <div className="overflow-hidden rounded-2xl bg-olive/10">
          <div className="aspect-[4/5] sm:aspect-[5/6]">
            <img
              src="https://images.pexels.com/photos/6044266/pexels-photo-6044266.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Elde üretilmiş deri çanta"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="mx-auto max-w-md text-center md:mx-0 md:text-left">
          <p className="font-sans text-[11px] tracking-[0.22em] text-olive uppercase sm:text-xs sm:tracking-[0.28em]">
            Atölye
          </p>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl md:text-4xl">Balıkesir’den, elde</h2>
          <p className="mt-4 font-sans text-sm leading-7 text-metal md:text-[15px]">
            Her gün cebe ve bele alınan az sayıda deri obje. Kenarlar elde boyanır; deri zamanla koyulaşır.
          </p>
          <ul className="mt-6 space-y-2.5">
            {notes.map((note) => (
              <li
                key={note}
                className="font-sans text-sm tracking-wide text-ink/80 md:border-l md:border-olive/30 md:pl-4"
              >
                {note}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-touch items-center rounded-full bg-olive px-6 font-sans text-sm text-paper"
          >
            Hakkımızda
          </Link>
        </div>
      </div>
    </section>
  );
}
