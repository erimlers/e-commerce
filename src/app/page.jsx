import { api } from "@/lib/api";

export default async function HomePage() {
  let health = null;
  try {
    health = await api("/health");
  } catch {
    health = null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <p className="font-sans text-xs tracking-[0.35em] text-metal uppercase">Atelier</p>
      <h1 className="mt-4 font-serif text-6xl font-medium tracking-wide md:text-8xl">CALDER</h1>
      <p className="mt-6 max-w-md text-center font-sans text-sm text-metal">
        Unisex deri objeler. Katalog yakında.
      </p>
      <p className="mt-10 font-sans text-xs text-metal">
        API: {health?.ok ? "bağlı" : "beklemede"}
      </p>
    </main>
  );
}
