import { StarRating } from "@/components/product/StarIcon";

export function ReviewCard({ review, compact = false }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-olive/10 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 font-sans text-sm text-ink sm:text-base">
        <span className="font-medium">{review.name}</span>
        <span className="rounded-full bg-olive-soft px-2 py-0.5 text-[10px] tracking-wide text-olive uppercase">
          Doğrulanmış
        </span>
      </div>
      <p className="mt-1 font-sans text-xs text-metal sm:text-sm">{review.date}</p>
      <p className="mt-2" aria-label={`${review.rating} yıldız`}>
        <StarRating value={review.rating} className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" />
      </p>
      <p className={`mt-3 font-sans text-sm leading-6 text-metal sm:text-[15px] sm:leading-7 ${compact ? "line-clamp-4" : ""}`}>
        {review.text}
      </p>
    </article>
  );
}
