const steps = [
  {
    number: "01",
    title: "Paste a job description",
    description:
      "Drop in a URL or paste the job posting text. Our AI extracts every requirement, skill, and qualification.",
  },
  {
    number: "02",
    title: "AI matches & generates",
    description:
      "Gemini compares the JD against your profile, identifies gaps, and crafts perfectly tailored documents.",
  },
  {
    number: "03",
    title: "Review & apply",
    description:
      "Get your personalized cover letter, resume, and match analysis. Copy, download, and submit with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32">
      <div className="relative mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-white/30">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Three steps to a
            <br />
            <span className="text-white/50">perfect application</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="absolute left-[39px] top-0 hidden h-full w-px bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent md:block" />

          <div className="space-y-16 md:space-y-20">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex gap-8 md:gap-12">
                {/* Step number */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0a0a0a]">
                    <span className="text-2xl font-bold tabular-nums text-white/20">
                      {step.number}
                    </span>
                  </div>
                  {/* Pulse dot */}
                  {i === 0 && (
                    <div className="absolute -right-1 -top-1 h-3 w-3">
                      <div className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
                      <div className="absolute inset-0.5 rounded-full bg-emerald-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-3">
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-[15px] leading-relaxed text-white/40">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
