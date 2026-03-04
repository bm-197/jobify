"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateApplication } from "@/app/dashboard/new/actions";
import { GenerationProgress } from "./generation-progress";

export function NewApplicationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputType, setInputType] = useState<"url" | "text">("text");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("input_type", inputType);
      const { applicationId } = await generateApplication(formData);
      if (applicationId) {
        router.push(`/dashboard/applications/${applicationId}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
      setLoading(false);
    }
  };

  if (loading) {
    return <GenerationProgress />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-1 text-[22px] font-semibold tracking-tight text-white">
        New Application
      </h2>
      <p className="mb-8 text-[14px] text-[#888]">
        Paste a job description and we&apos;ll generate a tailored cover letter and
        resume.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Tab switcher */}
        <div className="mb-6 flex gap-1 border border-[#222] bg-[#0a0a0a] p-1">
          <button
            type="button"
            onClick={() => setInputType("text")}
            className={`flex-1 px-4 py-2 text-[13px] font-medium transition-colors ${
              inputType === "text"
                ? "bg-[#222] text-white"
                : "text-[#888] hover:text-white"
            }`}
          >
            Paste Text
          </button>
          <button
            type="button"
            onClick={() => setInputType("url")}
            className={`flex-1 px-4 py-2 text-[13px] font-medium transition-colors ${
              inputType === "url"
                ? "bg-[#222] text-white"
                : "text-[#888] hover:text-white"
            }`}
          >
            Job URL
          </button>
        </div>

        <div className="space-y-4">
          {inputType === "text" ? (
            <div className="space-y-2">
              <Label htmlFor="jd-text" className="text-[13px] text-[#888]">
                Job Description
              </Label>
              <Textarea
                id="jd-text"
                name="job_description"
                rows={14}
                placeholder="Paste the full job description here..."
                required
                className="border-[#222] bg-[#0a0a0a] text-[14px] text-white placeholder:text-[#555] focus:border-[#444]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="jd-url" className="text-[13px] text-[#888]">
                Job Posting URL
              </Label>
              <Input
                id="jd-url"
                name="job_description"
                placeholder="https://example.com/job/..."
                required
                className="border-[#222] bg-[#0a0a0a] text-[14px] text-white placeholder:text-[#555] focus:border-[#444]"
              />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-4 text-[13px] text-red-400">{error}</p>
        )}

        <button
          type="submit"
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-[15px] font-medium text-black transition-colors hover:bg-[#ccc]"
        >
          Generate Application
        </button>
      </form>
    </div>
  );
}
