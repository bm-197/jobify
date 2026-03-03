import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <p className="text-sm text-gray-400">Your job application dashboard</p>
      </div>
      <Button
        asChild
        className="bg-white text-black hover:bg-gray-200"
      >
        <Link href="/dashboard/new">
          <FilePlus className="mr-2 h-4 w-4" />
          New Application
        </Link>
      </Button>
    </div>
  );
}
