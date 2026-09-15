import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageWidth } from "@/components/layout/PageWidth";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export function StorefrontShell({ banner, children }) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <AnnouncementBar />
      <SiteHeader />
      {banner}
      <div className="flex-1">
        <PageWidth>{children}</PageWidth>
      </div>
      <SiteFooter />
    </div>
  );
}
