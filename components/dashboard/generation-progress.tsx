"use client";

import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";

const steps = [
  "Parsing job description",
  "Analyzing requirements",
  "Matching your profile",
  "Generating cover letter",
  "Tailoring resume",
  "Finalizing documents",
];

export function GenerationProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-sm py-20 text-center">
      <Loader2 className="mx-auto mb-6 h-8 w-8 animate-spin text-white" />
      <h3 className="mb-1 text-[18px] font-semibold text-white">
        Generating Your Application
      </h3>
      <p className="mb-10 text-[14px] text-[#888]">
        This usually takes 30-60 seconds.
      </p>
      <div className="space-y-3 text-left">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[14px]"
          >
            {i < currentStep ? (
              <Check className="h-4 w-4 flex-shrink-0 text-emerald-400" />
            ) : i === currentStep ? (
              <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-white" />
            ) : (
              <div className="h-4 w-4 flex-shrink-0 rounded-full border border-[#333]" />
            )}
            <span
              className={
                i < currentStep
                  ? "text-[#555]"
                  : i === currentStep
                    ? "text-white"
                    : "text-[#333]"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
