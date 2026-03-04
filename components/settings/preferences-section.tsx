"use client";

import { Label } from "@/components/ui/label";
import { CropMarks } from "@/components/ui/crop-marks";
import { updatePreferences } from "@/app/dashboard/settings/actions";
import type { ApplicantProfile } from "@/lib/types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const tones = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Conversational" },
  { value: "technical", label: "Technical" },
  { value: "creative", label: "Creative" },
  { value: "formal", label: "Formal" },
];

export function PreferencesSection({
  profile,
}: {
  profile: ApplicantProfile;
}) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tone, setTone] = useState<string>(
    profile.tone_preference || "professional"
  );
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("tone_preference", tone);
      await updatePreferences(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const currentLabel = tones.find((t) => t.value === tone)?.label || tone;

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative overflow-visible bg-[#0a0a0a] p-6"
    >
      <CropMarks />
      <h3 className="mb-6 text-[16px] font-semibold text-white">Preferences</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[13px] text-[#888]">Writing Tone</Label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-full items-center justify-between border border-[#222] bg-black px-3 text-[14px] text-white transition-colors hover:border-[#444]"
            >
              {currentLabel}
              <ChevronDown className="h-4 w-4 text-[#888]" />
            </button>
            {open && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpen(false)}
                />
                <div className="absolute bottom-full z-50 mb-1 w-full overflow-hidden border border-[#222] bg-[#0a0a0a] py-1 shadow-xl">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => {
                        setTone(t.value);
                        setOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-[13px] transition-colors hover:bg-[#111] ${
                        t.value === tone ? "text-white" : "text-[#888]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 items-center rounded-full bg-white px-5 text-[14px] font-medium text-black transition-colors hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Preferences"}
        </button>
        {saved && <span className="text-[12px] text-emerald-400">Saved</span>}
      </div>
    </form>
  );
}
