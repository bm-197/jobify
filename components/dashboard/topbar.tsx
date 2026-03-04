"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { useState } from "react";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/new": "New Application",
  "/dashboard/tracker": "Job Tracker",
  "/dashboard/settings": "Settings",
};

export function Topbar({
  userName,
  userEmail,
  userAvatar,
}: {
  userName: string;
  userEmail: string;
  userAvatar: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  let breadcrumb = breadcrumbMap[pathname] || "Dashboard";
  if (pathname.startsWith("/dashboard/applications/")) {
    breadcrumb = "Application Detail";
  }

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-[#222] bg-black px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#888] hover:text-white md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-[14px] font-medium text-white">{breadcrumb}</h1>
        </div>
      </header>
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />
    </>
  );
}
