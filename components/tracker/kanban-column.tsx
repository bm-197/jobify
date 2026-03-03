"use client";

import { KanbanCard } from "./kanban-card";
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
      className={`flex w-64 flex-shrink-0 flex-col rounded-xl border bg-[#0a0a0a] ${
        dragOver ? "border-blue-500/50" : "border-[#1f1f1f]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between border-b border-[#1f1f1f] px-4 py-3">
        <span className="text-sm font-medium text-white">{label}</span>
        <span className="rounded-full bg-[#1f1f1f] px-2 py-0.5 text-xs text-gray-400">
          {applications.length}
        </span>
      </div>
      <div className="flex-1 space-y-2 p-3">
        {applications.map((app) => (
          <KanbanCard key={app.id} application={app} />
        ))}
        {applications.length === 0 && (
          <p className="py-8 text-center text-xs text-gray-600">
            Drop here
          </p>
        )}
      </div>
    </div>
  );
}
