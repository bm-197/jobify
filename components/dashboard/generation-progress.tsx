"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const steps = [
  "Parsing job description...",
  "Analyzing requirements...",
  "Matching your profile...",
  "Generating cover letter...",
  "Tailoring resume...",
  "Finalizing documents...",
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
    <div className="mx-auto max-w-md py-16 text-center">
      <Loader2 className="mx-auto mb-6 h-10 w-10 animate-spin text-blue-400" />
      <h3 className="mb-2 text-xl font-semibold text-white">
        Generating Your Application
      </h3>
      <p className="mb-8 text-gray-400">
        This usually takes 30-60 seconds.
      </p>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`text-sm transition-colors ${
              i < currentStep
                ? "text-green-400"
                : i === currentStep
                  ? "text-blue-400"
                  : "text-gray-600"
            }`}
          >
            {i < currentStep ? "\u2713 " : i === currentStep ? "... " : ""}
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
