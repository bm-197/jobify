const metrics = [
  {
    stat: "87%",
    label: "average match score across applications",
    company: "Software Engineers",
    icon: "S",
  },
  {
    stat: "40s",
    label: "to generate a tailored cover letter & resume",
    company: "Career Changers",
    icon: "C",
  },
  {
    stat: "3x",
    label: "more interview callbacks reported",
    company: "Recent Graduates",
    icon: "R",
  },
];

export function SocialProof() {
  return (
    <section className="border-t border-[#222] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-12 text-center text-[14px] text-[#666]">
          Trusted by job seekers breaking into top companies
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.company}
              className="group relative overflow-hidden bg-[#0a0a0a] p-8 transition-colors"
            >
              {/* Corner Crop Marks */}
              <div className="absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute right-0 top-0 z-10 h-3 w-3 border-r-2 border-t-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b-2 border-l-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b-2 border-r-2 border-[#333] transition-colors group-hover:border-white" />

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222] text-[12px] font-semibold text-white">
                  {m.icon}
                </div>
                <span className="text-[14px] font-medium text-white">
                  {m.company}
                </span>
              </div>
              <p className="mb-2 text-[40px] font-bold leading-none tracking-tight text-white">
                {m.stat}
              </p>
              <p className="text-[14px] leading-relaxed text-[#888]">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
