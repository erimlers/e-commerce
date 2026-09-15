export function PageWidth({ children, className = "" }) {
  return <div className={`page-width max-w-7xl px-5 md:px-8 ${className}`.trim()}>{children}</div>;
}
