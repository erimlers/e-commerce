const STAR_FILL = "#e8b423";

export function StarIcon({ className = "h-4 w-4", dimmed = false }) {
  return (
    <svg viewBox="0 0 20 20" className={`shrink-0 ${className}`} aria-hidden="true">
      <path
        d="M10 1.8 12.4 7l5.6.5-4.2 3.7 1.3 5.5L10 13.8 4.9 16.7l1.3-5.5L2 7.5 7.6 7 10 1.8Z"
        fill={STAR_FILL}
        opacity={dimmed ? 0.28 : 1}
      />
    </svg>
  );
}

export function StarRating({ value = 0, className = "h-4 w-4" }) {
  const filled = Math.round(Number(value) || 0);
  return (
    <span className="inline-flex items-center gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={className} dimmed={i >= filled} />
      ))}
    </span>
  );
}
