"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CropMarks } from "@/components/ui/crop-marks";
import { updateProfile } from "@/app/dashboard/settings/actions";
import type { ApplicantProfile } from "@/lib/types";
import { useState } from "react";

export function ProfileForm({ profile }: { profile: ApplicantProfile }) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateProfile(formData);
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
      <h3 className="mb-6 text-[16px] font-semibold text-white">Profile</h3>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[13px] text-[#888]">Full Name</Label>
            <Input
              name="full_name"
              defaultValue={profile.full_name}
              className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-[#888]">Phone</Label>
            <Input
              name="phone"
              defaultValue={profile.phone}
              className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[13px] text-[#888]">Location</Label>
            <Input
              name="location"
              defaultValue={profile.location}
              className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-[#888]">Target Role</Label>
            <Input
              name="target_role"
              defaultValue={profile.target_role}
              className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] text-[#888]">Summary</Label>
          <Textarea
            name="summary"
            rows={3}
            defaultValue={profile.summary}
            className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[13px] text-[#888]">Skills (comma-separated)</Label>
          <Textarea
            name="skills"
            rows={2}
            defaultValue={profile.skills?.join(", ")}
            className="border-[#222] bg-black text-[14px] text-white focus:border-[#444]"
          />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-9 items-center rounded-full bg-white px-5 text-[14px] font-medium text-black transition-colors hover:bg-[#ccc] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        {saved && <span className="text-[12px] text-emerald-400">Saved</span>}
      </div>
    </form>
  );
}
