"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateApplication } from "@/app/dashboard/new/actions";
import { GenerationProgress } from "./generation-progress";

export function NewApplicationForm() {
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
      await generateApplication(formData);
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
      <h2 className="mb-2 text-2xl font-bold text-white">
        New Application
      </h2>
      <p className="mb-8 text-gray-400">
        Paste a job description and we&apos;ll generate a tailored cover letter and
        resume.
      </p>

      <form onSubmit={handleSubmit}>
        <Tabs value={inputType} onValueChange={(v) => setInputType(v as "url" | "text")}>
          <TabsList className="mb-6 border border-[#1f1f1f] bg-[#111]">
            <TabsTrigger value="text" className="data-[state=active]:bg-[#1f1f1f]">
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="url" className="data-[state=active]:bg-[#1f1f1f]">
              Job URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jd-text" className="text-gray-300">
                Job Description
              </Label>
              <Textarea
                id="jd-text"
                name="job_description"
                rows={12}
                placeholder="Paste the full job description here..."
                required
                className="border-[#1f1f1f] bg-[#111] text-white placeholder:text-gray-600"
              />
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jd-url" className="text-gray-300">
                Job Posting URL
              </Label>
              <Input
                id="jd-url"
                name="job_description"
                placeholder="https://example.com/job/..."
                required
                className="border-[#1f1f1f] bg-[#111] text-white"
              />
            </div>
          </TabsContent>
        </Tabs>

        {error && (
          <p className="mt-4 text-sm text-red-400">{error}</p>
        )}

        <Button
          type="submit"
          className="mt-6 w-full bg-white text-black hover:bg-gray-200"
        >
          Generate Application
        </Button>
      </form>
    </div>
  );
}
