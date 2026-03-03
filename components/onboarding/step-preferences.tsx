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
import { completeOnboarding } from "@/app/onboarding/actions";
import { useState } from "react";

const tones = [
  { value: "professional", label: "Professional", desc: "Polished and corporate" },
  { value: "conversational", label: "Conversational", desc: "Warm and personable" },
  { value: "technical", label: "Technical", desc: "Detail-oriented, metrics-driven" },
  { value: "creative", label: "Creative", desc: "Unique and engaging" },
  { value: "formal", label: "Formal", desc: "Traditional and structured" },
];

export function StepPreferences() {
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState("professional");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.set("tone_preference", tone);
    await completeOnboarding(formData);
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-white">
        Almost Done!
      </h2>
      <p className="mb-8 text-gray-400">
        Choose your preferred writing tone for generated documents.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-gray-300">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="border-[#1f1f1f] bg-[#111] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#1f1f1f] bg-[#111]">
              {tones.map((t) => (
                <SelectItem key={t.value} value={t.value} className="text-white">
                  <span className="font-medium">{t.label}</span>{" "}
                  <span className="text-gray-400">— {t.desc}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6">
          <p className="text-sm text-gray-400">
            You can change your tone preference anytime from the Settings page.
            Your profile is now ready to generate tailored applications!
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {loading ? "Finalizing..." : "Go to Dashboard"}
        </Button>
      </form>
    </div>
  );
}
