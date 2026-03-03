"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { processResumeAndLinkedIn } from "@/app/onboarding/actions";
import { useState } from "react";

export function StepResume({
  onNext,
}: {
  onNext: (result: Record<string, unknown>) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      const resumeText = formData.get("resume_text") as string;
      if (!resumeText.trim()) {
        setError("Please paste your resume text");
        setLoading(false);
        return;
      }
      const result = await processResumeAndLinkedIn(formData);
      onNext(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-white">
        Your Experience
      </h2>
      <p className="mb-8 text-gray-400">
        Paste your resume and optionally add your LinkedIn URL. Our AI will
        parse and enrich your profile.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resume_text" className="text-gray-300">
            Resume Text
          </Label>
          <Textarea
            id="resume_text"
            name="resume_text"
            rows={10}
            placeholder="Paste your resume content here..."
            required
            className="border-[#1f1f1f] bg-[#111] text-white placeholder:text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-gray-300">
            LinkedIn Profile URL (optional)
          </Label>
          <Input
            id="linkedin_url"
            name="linkedin_url"
            placeholder="https://linkedin.com/in/yourprofile"
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Processing with AI..." : "Analyze Resume"}
        </Button>
        {loading && (
          <p className="text-center text-sm text-gray-500">
            This may take 30-60 seconds while our AI processes your profile...
          </p>
        )}
      </form>
    </div>
  );
}
