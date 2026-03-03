"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FilePlus,
  Kanban,
  Settings,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "New Application", icon: FilePlus },
  { href: "/dashboard/tracker", label: "Job Tracker", icon: Kanban },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="flex h-16 items-center border-b border-[#1f1f1f] px-6">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          Jobify
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#1f1f1f] text-white"
                  : "text-gray-400 hover:bg-[#111] hover:text-white"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1f1f1f] p-4">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-gray-500 truncate">{userEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-[#111] hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
