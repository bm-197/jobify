"use client";

import { KanbanCard } from "./kanban-card";
import { CropMarks } from "@/components/ui/crop-marks";
import type { GeneratedApplication, ApplicationStatus } from "@/lib/types";
import { useState } from "react";

export function KanbanColumn({
  status,
  label,
  applications,
  onDrop,
}: {
  status: ApplicationStatus;
  label: string;
  applications: GeneratedApplication[];
  onDrop: (appId: string, newStatus: ApplicationStatus) => void;
}) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const appId = e.dataTransfer.getData("text/plain");
    if (appId) onDrop(appId, status);
  };

  return (
    <div
      className={`group relative flex w-64 flex-shrink-0 flex-col overflow-hidden transition-colors ${
        dragOver ? "bg-[#111]" : "bg-[#0a0a0a]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <CropMarks />
      <div className="flex items-center justify-between border-b border-[#222] px-4 py-3">
        <span className="text-[13px] font-medium text-white">{label}</span>
        <span className="rounded-full bg-[#222] px-2 py-0.5 text-[11px] font-medium tabular-nums text-[#888]">
          {applications.length}
        </span>
      </div>
      <div className="flex-1 space-y-2 p-3">
        {applications.map((app) => (
          <KanbanCard key={app.id} application={app} />
        ))}
        {applications.length === 0 && (
          <p className="py-8 text-center text-[12px] text-[#555]">
            Drop here
          </p>
        )}
      </div>
    </div>
  );
}
