import Link from "next/link";

export function CategoryCard({ category }) {
  return (
    <Link href={category.href} className="group relative block overflow-hidden rounded-xl">
      <div className="aspect-[5/4] overflow-hidden bg-olive-soft/30">
        <img
          src={category.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="font-serif text-xl text-paper">{category.name}</h3>
        <p className="mt-0.5 font-sans text-xs text-paper/80">{category.count} ürün</p>
      </div>
    </Link>
  );
}
