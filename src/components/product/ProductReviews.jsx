import Link from "next/link";
import { ReviewCard } from "@/components/product/ReviewCard";
import { StarIcon, StarRating } from "@/components/product/StarIcon";

function barsFromReviews(reviews, count) {
  const totals = [5, 4, 3, 2, 1].map((star) => reviews.filter((item) => item.rating === star).length);
  const max = Math.max(count, reviews.length, 1);
  return [5, 4, 3, 2, 1].map((star, index) => ({
    star,
    share: reviews.length ? totals[index] / max : star === 5 ? 0.8 : star === 4 ? 0.2 : 0,
  }));
}

export function ProductReviews({ slug, rating, count, reviews, preview = false }) {
  const ratingLabel = count ? rating.toFixed(1).replace(".", ",") : "0";
  const bars = barsFromReviews(reviews, count);
  const visible = preview ? reviews.slice(0, 3) : reviews;

  return (
    <section id="yorumlar" className="scroll-mt-28">
      <h2 className="font-serif text-2xl tracking-wide text-ink md:text-3xl">
        {preview ? "Değerlendirmeler" : "Tüm değerlendirmeler"}
      </h2>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-8">
        <aside className="rounded-2xl border border-olive/10 bg-white p-5">
          <p className="font-serif text-5xl leading-none text-ink">{ratingLabel}</p>
          <p className="mt-3">
            <StarRating value={rating} className="h-5 w-5" />
          </p>
          <p className="mt-2 font-sans text-sm text-metal">{count} değerlendirme</p>
          <ul className="mt-5 space-y-2">
            {bars.map((bar) => (
              <li key={bar.star} className="flex items-center gap-2 font-sans text-sm text-metal">
                <span className="w-3 tabular-nums">{bar.star}</span>
                <StarIcon className="h-3.5 w-3.5" />
                <span className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-olive-soft">
                  <span className="block h-full rounded-full bg-star" style={{ width: `${Math.round(bar.share * 100)}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0">
          {visible.length ? (
            <div className={`grid gap-3 ${preview ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {visible.map((review) => (
                <ReviewCard key={`${review.name}-${review.date}`} review={review} compact={preview} />
              ))}
            </div>
          ) : (
            <p className="font-sans text-base text-metal">Henüz değerlendirme yok.</p>
          )}
        </div>
      </div>
      {preview && reviews.length > 0 ? (
        <Link
          href={`/products/${slug}/yorumlar`}
          className="mt-6 inline-flex min-h-12 items-center rounded-md border border-olive/20 bg-white px-5 font-sans text-base text-ink hover:border-olive/45"
        >
          Tüm yorumları görüntüle
        </Link>
      ) : null}
    </section>
  );
}
