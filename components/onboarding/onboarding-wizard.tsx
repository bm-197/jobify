"use client";

import { useState } from "react";
import { ProgressIndicator } from "./progress-indicator";
import { CropMarks } from "@/components/ui/crop-marks";
import { StepWelcome } from "./step-welcome";
import { StepResume } from "./step-resume";
import { StepReview } from "./step-review";
import { StepPreferences } from "./step-preferences";

export function OnboardingWizard({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [step, setStep] = useState(0);
  const [parsedData, setParsedData] = useState<Record<string, unknown>>({});

  return (
    <div>
      <ProgressIndicator currentStep={step} />
      <div className="group relative overflow-hidden bg-[#111] p-8">
        <CropMarks />
        {step === 0 && (
          <StepWelcome
            defaultName={userName}
            defaultEmail={userEmail}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepResume
            onNext={(result) => {
              setParsedData(result);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <StepReview parsedData={parsedData} onNext={() => setStep(3)} />
        )}
        {step === 3 && <StepPreferences />}
      </div>
    </div>
  );
}
