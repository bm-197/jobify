import { CropMarks } from "@/components/ui/crop-marks";

const steps = [
  {
    number: "01",
    title: "Paste a job description",
    description:
      "Drop in the job posting text or URL. Our AI extracts every requirement, skill, and qualification instantly.",
  },
  {
    number: "02",
    title: "AI matches & generates",
    description:
      "Our AI compares the JD against your profile, identifies gaps, and crafts a tailored cover letter and resume.",
  },
  {
    number: "03",
    title: "Review, export & apply",
    description:
      "Get your match score, download your documents, and submit with confidence. Track it all on your kanban board.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#222] px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-white">
            Three steps to a perfect application.
          </h2>
          <p className="mx-auto mt-4 max-w-[460px] text-[16px] text-[#888]">
            From job posting to tailored application in under a minute.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="group relative overflow-hidden bg-[#0a0a0a] p-6">
              <CropMarks />
              {/* Number */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#333] bg-[#111] text-[18px] font-bold tabular-nums text-[#555]">
                {step.number}
              </div>
              <h3 className="mb-3 text-[18px] font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#888]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
