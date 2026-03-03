"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveProfileEdits } from "@/app/onboarding/actions";
import { useState } from "react";

export function StepReview({
  parsedData,
  onNext,
}: {
  parsedData: Record<string, unknown>;
  onNext: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const summary = (parsedData?.summary as string) || "";
  const skills = Array.isArray(parsedData?.skills)
    ? (parsedData.skills as string[]).join(", ")
    : "";
  const targetRole = (parsedData?.target_role as string) || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await saveProfileEdits(formData);
      onNext();
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-white">
        Review Your Profile
      </h2>
      <p className="mb-8 text-gray-400">
        Here&apos;s what our AI extracted. Feel free to edit anything.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-gray-300">
            Professional Summary
          </Label>
          <Textarea
            id="summary"
            name="summary"
            rows={4}
            defaultValue={summary}
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills" className="text-gray-300">
            Skills (comma-separated)
          </Label>
          <Textarea
            id="skills"
            name="skills"
            rows={3}
            defaultValue={skills}
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target_role" className="text-gray-300">
            Target Role
          </Label>
          <Input
            id="target_role"
            name="target_role"
            defaultValue={targetRole}
            placeholder="e.g. Senior Software Engineer"
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
