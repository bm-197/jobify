"use client";

import { Textarea } from "@/components/ui/textarea";
import { CropMarks } from "@/components/ui/crop-marks";
import { saveApplicationNotes } from "@/app/dashboard/applications/[id]/actions";
import { useState, useRef, useCallback } from "react";

export function NotesEditor({
  applicationId,
  initialNotes,
}: {
  applicationId: string;
  initialNotes: string;
}) {
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const debouncedSave = useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        await saveApplicationNotes(applicationId, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }, 1000);
    },
    [applicationId]
  );

  return (
    <div className="group relative overflow-hidden bg-[#0a0a0a] p-6">
      <CropMarks />
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[14px] font-medium text-white">Notes</h3>
        {saved && (
          <span className="text-[12px] text-emerald-400">Saved</span>
        )}
      </div>
      <Textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          debouncedSave(e.target.value);
        }}
        rows={4}
        placeholder="Add notes about this application..."
        className="border-[#222] bg-black text-[14px] text-white placeholder:text-[#555] focus:border-[#444]"
      />
    </div>
  );
}
