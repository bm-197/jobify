"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeApplicationStatus } from "@/app/dashboard/applications/[id]/actions";
import type { ApplicationStatus } from "@/lib/types";
import { useState } from "react";

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

  const handleChange = async (value: string) => {
    const newStatus = value as ApplicationStatus;
    setStatus(newStatus);
    await changeApplicationStatus(applicationId, newStatus);
  };

  return (
    <Select value={status} onValueChange={handleChange}>
      <SelectTrigger className="w-40 border-[#1f1f1f] bg-[#111] text-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-[#1f1f1f] bg-[#111]">
        {statuses.map((s) => (
          <SelectItem key={s.value} value={s.value} className="text-white">
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
