"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatePreferences } from "@/app/dashboard/settings/actions";
import type { ApplicantProfile } from "@/lib/types";
import { useState } from "react";

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
  const [tone, setTone] = useState<string>(profile.tone_preference || "professional");

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

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Preferences</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="border-[#1f1f1f] bg-[#0a0a0a] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#1f1f1f] bg-[#111]">
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value} className="text-white">
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Saving..." : "Save Preferences"}
        </Button>
        {saved && <span className="text-sm text-green-400">Saved</span>}
      </div>
    </form>
  );
}
