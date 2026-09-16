import Link from "next/link";

export function CategoryCard({ category }) {
  return (
    <Link href={category.href} className="group mx-auto flex w-full max-w-[10.5rem] flex-col items-center gap-2.5 md:max-w-[8rem]">
      <span className="aspect-square w-full overflow-hidden rounded-full bg-olive-soft/30">
        <img
          src={category.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
        />
      </span>
      <span className="text-center">
        <h3 className="font-serif text-base leading-tight text-ink md:text-lg">{category.name}</h3>
        <p className="mt-0.5 font-sans text-[11px] text-metal">{category.count} ürün</p>
      </span>
    </Link>
  );
}
