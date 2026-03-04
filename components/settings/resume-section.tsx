"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CropMarks } from "@/components/ui/crop-marks";
import { reprocessResume } from "@/app/dashboard/settings/actions";
import type { ApplicantProfile } from "@/lib/types";
import { useState } from "react";

export function ResumeSection({ profile }: { profile: ApplicantProfile }) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await reprocessResume(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative overflow-hidden bg-[#0a0a0a] p-6"
    >
      <CropMarks />
      <h3 className="mb-1 text-[16px] font-semibold text-white">
        Resume & LinkedIn
      </h3>
      <p className="mb-6 text-[13px] text-[#888]">
        Re-upload your resume or update your LinkedIn URL to refresh your
        profile data.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[13px] text-[#888]">Resume Text</Label>
          <Textarea
            name="resume_text"
            rows={8}
            defaultValue={profile.resume_raw_text || ""}
            placeholder="Paste updated resume text..."
            required
            className="border-[#222] bg-black text-[14px] text-white placeholder:text-[#555] focus:border-[#444]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] text-[#888]">LinkedIn URL</Label>
          <Input
            name="linkedin_url"
            defaultValue={profile.linkedin_url}
            placeholder="https://linkedin.com/in/yourprofile"
            className="border-[#222] bg-black text-[14px] text-white placeholder:text-[#555] focus:border-[#444]"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 items-center rounded-full bg-white px-5 text-[14px] font-medium text-black transition-colors hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Processing..." : "Re-process Profile"}
        </button>
        {saved && (
          <span className="text-[12px] text-emerald-400">Profile updated</span>
        )}
      </div>
      {loading && (
        <p className="mt-3 text-[13px] text-[#555]">
          This may take 30-60 seconds while our AI re-processes your profile...
        </p>
      )}
    </form>
  );
}
