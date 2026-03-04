"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FilePlus,
  Kanban,
  Settings,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "New Application", icon: FilePlus },
  { href: "/dashboard/tracker", label: "Job Tracker", icon: Kanban },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileSidebar({
  open,
  onOpenChange,
  userName,
  userEmail,
  userAvatar,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userEmail: string;
  userAvatar: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="flex w-64 flex-col border-[#222] bg-black p-0">
        <div className="flex h-16 items-center gap-2 border-b border-[#222] px-6">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect width="20" height="14" x="2" y="6" rx="2" fill="currentColor" />
          </svg>
          <span className="text-[15px] font-semibold text-white">Jobify</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {links.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                  isActive
                    ? "bg-[#222] text-white"
                    : "text-[#888] hover:bg-[#111] hover:text-white"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer with user popover */}
        <div className="relative border-t border-[#222]">
          {popoverOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-2 border border-[#222] bg-[#0a0a0a] shadow-xl">
              <div className="border-b border-[#222] px-4 py-3">
                <p className="truncate text-[13px] font-medium text-white">
                  {userName}
                </p>
                <p className="truncate text-[12px] text-[#555]">{userEmail}</p>
              </div>
              <div className="p-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2 text-[13px] text-[#888] transition-colors hover:bg-[#111] hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setPopoverOpen(!popoverOpen)}
            className="flex w-full items-center gap-3 p-3 transition-colors hover:bg-[#111]"
          >
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222] text-[11px] font-semibold text-white">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[13px] font-medium text-white">
                {userName}
              </p>
            </div>
            <ChevronsUpDown className="h-4 w-4 flex-shrink-0 text-[#555]" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
