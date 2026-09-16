export function PageWidth({ children, className = "" }) {
  return <div className={`page-width px-4 sm:px-6 lg:px-8 ${className}`.trim()}>{children}</div>;
}
