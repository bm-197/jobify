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
      className="cursor-grab rounded-lg border border-[#1f1f1f] bg-[#111] p-3 active:cursor-grabbing"
    >
      <Link href={`/dashboard/applications/${application.id}`}>
        <p className="text-sm font-medium text-white truncate">
          {application.job_title || "Untitled"}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {application.company_name || "Unknown"}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {new Date(application.created_at).toLocaleDateString()}
          </span>
          <span className="text-xs font-medium text-blue-400">
            {application.match_score}%
          </span>
        </div>
      </Link>
    </div>
  );
}
