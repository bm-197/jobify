import { cn } from "@/lib/utils";

const steps = ["Welcome", "Resume", "Review", "Preferences"];

export function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                i < currentStep
                  ? "bg-blue-500 text-white"
                  : i === currentStep
                    ? "border-2 border-blue-500 text-blue-400"
                    : "border border-[#1f1f1f] text-gray-500"
              )}
            >
              {i < currentStep ? "\u2713" : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-sm sm:inline",
                i <= currentStep ? "text-white" : "text-gray-500"
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-8",
                i < currentStep ? "bg-blue-500" : "bg-[#1f1f1f]"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
