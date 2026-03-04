"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
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

type DateFilter = "all" | "7d" | "30d" | "90d";

const dateFilterOptions: { value: DateFilter; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

const scoreFilterOptions: { value: number; label: string }[] = [
  { value: 0, label: "Any score" },
  { value: 50, label: "50%+" },
  { value: 70, label: "70%+" },
  { value: 80, label: "80%+" },
  { value: 90, label: "90%+" },
];

function getDaysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export function KanbanBoard({
  applications: initialApps,
}: {
  applications: GeneratedApplication[];
}) {
  const [applications, setApplications] = useState(initialApps);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [minScore, setMinScore] = useState(0);

  const isFiltered = searchQuery !== "" || dateFilter !== "all" || minScore > 0;

  const filteredApplications = useMemo(() => {
    let result = applications;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (app) =>
          app.job_title.toLowerCase().includes(q) ||
          app.company_name.toLowerCase().includes(q)
      );
    }

    if (dateFilter !== "all") {
      const days = dateFilter === "7d" ? 7 : dateFilter === "30d" ? 30 : 90;
      const cutoff = getDaysAgo(days);
      result = result.filter((app) => new Date(app.created_at) >= cutoff);
    }

    if (minScore > 0) {
      result = result.filter((app) => app.match_score >= minScore);
    }

    return result;
  }, [applications, searchQuery, dateFilter, minScore]);

  const handleDrop = async (appId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId ? { ...app, application_status: newStatus } : app
      )
    );
    await changeApplicationStatus(appId, newStatus);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("all");
    setMinScore(0);
  };

  const selectStyles =
    "h-9 rounded-none border border-[#222] bg-black px-3 text-sm text-white outline-none focus:border-white/40";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-64 rounded-none border border-[#222] bg-black pl-9 pr-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/40"
          />
        </div>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          className={selectStyles}
        >
          {dateFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={minScore}
          onChange={(e) => setMinScore(Number(e.target.value))}
          className={selectStyles}
        >
          {scoreFilterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {isFiltered && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/50">
              {filteredApplications.length} of {applications.length}
            </span>
            <button
              onClick={clearFilters}
              className="flex h-9 items-center gap-1.5 rounded-none border border-[#222] bg-black px-3 text-sm text-white/60 hover:border-white/40 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="scrollbar-fade flex gap-4 overflow-x-auto pb-6">
        {columns.map((col) => (
          <KanbanColumn
            key={col.status}
            status={col.status}
            label={col.label}
            applications={filteredApplications.filter(
              (app) => app.application_status === col.status
            )}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}
