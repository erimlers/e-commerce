export function PageWidth({ children, className = "" }) {
  return <div className={`page-width px-6 md:px-10 lg:px-14 ${className}`.trim()}>{children}</div>;
}
