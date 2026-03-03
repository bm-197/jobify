"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6"
    >
      <h3 className="mb-6 text-lg font-semibold text-white">Profile</h3>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-gray-300">Full Name</Label>
            <Input
              name="full_name"
              defaultValue={profile.full_name}
              className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Phone</Label>
            <Input
              name="phone"
              defaultValue={profile.phone}
              className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-gray-300">Location</Label>
            <Input
              name="location"
              defaultValue={profile.location}
              className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-300">Target Role</Label>
            <Input
              name="target_role"
              defaultValue={profile.target_role}
              className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Summary</Label>
          <Textarea
            name="summary"
            rows={3}
            defaultValue={profile.summary}
            className="border-[#1f1f1f] bg-[#0a0a0a] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-gray-300">Skills (comma-separated)</Label>
          <Textarea
            name="skills"
            rows={2}
            defaultValue={profile.skills?.join(", ")}
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
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        {saved && <span className="text-sm text-green-400">Saved</span>}
      </div>
    </form>
  );
}
