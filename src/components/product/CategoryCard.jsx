import Link from "next/link";

export function CategoryCard({ category }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-soft">
      <Link href={category.href} className="group block">
        <div className="aspect-[4/5] overflow-hidden bg-olive-soft/40">
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="px-4 py-4">
          <h3 className="font-serif text-xl tracking-wide">{category.name}</h3>
          <p className="mt-1 font-sans text-sm text-metal">{category.count} ürün</p>
        </div>
      </Link>
    </article>
  );
}
