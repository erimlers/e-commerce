import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageWidth } from "@/components/layout/PageWidth";

export function StorefrontShell({ children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <SiteHeader />
      <div className="flex-1">
        <PageWidth>{children}</PageWidth>
      </div>
      <SiteFooter />
    </div>
  );
}
