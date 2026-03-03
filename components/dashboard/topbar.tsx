"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "./mobile-sidebar";
import { useState } from "react";

const breadcrumbMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/new": "New Application",
  "/dashboard/tracker": "Job Tracker",
  "/dashboard/settings": "Settings",
};

export function Topbar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  let breadcrumb = breadcrumbMap[pathname] || "Dashboard";
  if (pathname.startsWith("/dashboard/applications/")) {
    breadcrumb = "Application Detail";
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-[#1f1f1f] bg-[#0a0a0a] px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-white">{breadcrumb}</h1>
        </div>
      </header>
      <MobileSidebar
        open={mobileOpen}
        onOpenChange={setMobileOpen}
        userName={userName}
        userEmail={userEmail}
      />
    </>
  );
}
