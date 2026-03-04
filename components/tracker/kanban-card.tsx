"use client";

import Link from "next/link";
import type { GeneratedApplication } from "@/lib/types";

export function KanbanCard({
  application,
}: {
  application: GeneratedApplication;
}) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", application.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="cursor-grab border border-[#222] bg-black p-3 transition-colors hover:border-[#333] active:cursor-grabbing"
    >
      <Link href={`/dashboard/applications/${application.id}`}>
        <p className="truncate text-[13px] font-medium text-white">
          {application.job_title || "Untitled"}
        </p>
        <p className="truncate text-[12px] text-[#555]">
          {application.company_name || "Unknown"}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-[#555]">
            {new Date(application.created_at).toLocaleDateString()}
          </span>
          <span className="text-[12px] font-medium tabular-nums text-white">
            {application.match_score}%
          </span>
        </div>
      </Link>
    </div>
  );
}
