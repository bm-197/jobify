"use client";

import { changeApplicationStatus } from "@/app/dashboard/applications/[id]/actions";
import type { ApplicationStatus } from "@/lib/types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const statuses: { value: ApplicationStatus; label: string }[] = [
  { value: "bookmarked", label: "Bookmarked" },
  { value: "applied", label: "Applied" },
  { value: "phone_screen", label: "Phone Screen" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
  { value: "ghosted", label: "Ghosted" },
  { value: "withdrawn", label: "Withdrawn" },
];

export function StatusTracker({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: ApplicationStatus;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [open, setOpen] = useState(false);

  const handleChange = async (value: ApplicationStatus) => {
    setStatus(value);
    setOpen(false);
    await changeApplicationStatus(applicationId, value);
  };

  const currentLabel = statuses.find((s) => s.value === status)?.label || status;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-2 border border-[#222] bg-[#0a0a0a] px-3 text-[13px] font-medium text-white transition-colors hover:border-[#444]"
      >
        {currentLabel}
        <ChevronDown className="h-3.5 w-3.5 text-[#888]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-44 overflow-hidden border border-[#222] bg-[#0a0a0a] py-1 shadow-xl">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => handleChange(s.value)}
                className={`block w-full px-3 py-2 text-left text-[13px] transition-colors hover:bg-[#111] ${
                  s.value === status ? "text-white" : "text-[#888]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
