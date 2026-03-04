"use client";

import { useState } from "react";
import { KanbanColumn } from "./kanban-column";
import type { GeneratedApplication, ApplicationStatus } from "@/lib/types";
import { changeApplicationStatus } from "@/app/dashboard/applications/[id]/actions";

const columns: { status: ApplicationStatus; label: string }[] = [
  { status: "bookmarked", label: "Bookmarked" },
  { status: "applied", label: "Applied" },
  { status: "phone_screen", label: "Phone Screen" },
  { status: "interview", label: "Interview" },
  { status: "offer", label: "Offer" },
  { status: "rejected", label: "Rejected" },
];

export function KanbanBoard({
  applications: initialApps,
}: {
  applications: GeneratedApplication[];
}) {
  const [applications, setApplications] = useState(initialApps);

  const handleDrop = async (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, application_status: newStatus } : app
      )
    );
    await changeApplicationStatus(appId, newStatus);
  };

  return (
    <div className="scrollbar-fade flex gap-4 overflow-x-auto pb-6">
      {columns.map((col) => (
        <KanbanColumn
          key={col.status}
          status={col.status}
          label={col.label}
          applications={applications.filter(
            (app) => app.application_status === col.status
          )}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
}
