"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createInitialProfile } from "@/app/onboarding/actions";
import { useState } from "react";

export function StepWelcome({
  defaultName,
  defaultEmail,
  onNext,
}: {
  defaultName: string;
  defaultEmail: string;
  onNext: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await createInitialProfile(formData);
      onNext();
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-white">
        Welcome to Jobify
      </h2>
      <p className="mb-8 text-gray-400">
        Let&apos;s set up your profile so our AI can tailor applications to your
        background.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-gray-300">
            Full Name
          </Label>
          <Input
            id="full_name"
            name="full_name"
            defaultValue={defaultName}
            required
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">
            Email
          </Label>
          <Input
            id="email"
            value={defaultEmail}
            disabled
            className="border-[#1f1f1f] bg-[#0a0a0a] text-gray-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-300">
            Phone (optional)
          </Label>
          <Input
            id="phone"
            name="phone"
            className="border-[#1f1f1f] bg-[#111] text-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-300">
            Location (optional)
          </Label>
          <Input
            id="location"
            name="location"
            placeholder="e.g. New York, NY"
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
