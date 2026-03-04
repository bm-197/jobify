import Link from "next/link";
import { FilePlus } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight text-white">
          Overview
        </h2>
        <p className="text-[14px] text-[#888]">Your job application dashboard</p>
      </div>
      <Link
        href="/dashboard/new"
        className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[14px] font-medium text-black transition-colors hover:bg-[#ccc]"
      >
        <FilePlus className="h-4 w-4" />
        New Application
      </Link>
    </div>
  );
}
