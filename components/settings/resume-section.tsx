"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6"
    >
      <h3 className="mb-2 text-lg font-semibold text-white">Resume & LinkedIn</h3>
      <p className="mb-6 text-sm text-gray-400">
        Re-upload your resume or update your LinkedIn URL to refresh your profile data.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Resume Text</Label>
          <Textarea
            name="resume_text"
            rows={8}
            defaultValue={profile.resume_raw_text || ""}
            placeholder="Paste updated resume text..."
            required
            className="border-[#1f1f1f] bg-[#0a0a0a] text-white placeholder:text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">LinkedIn URL</Label>
          <Input
            name="linkedin_url"
            defaultValue={profile.linkedin_url}
            placeholder="https://linkedin.com/in/yourprofile"
            className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Processing..." : "Re-process Profile"}
        </Button>
        {saved && <span className="text-sm text-green-400">Profile updated</span>}
      </div>
      {loading && (
        <p className="mt-3 text-sm text-gray-500">
          This may take 30-60 seconds while our AI re-processes your profile...
        </p>
      )}
    </form>
  );
}
