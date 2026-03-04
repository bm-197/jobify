import {
  FileText,
  Target,
  BarChart3,
  Zap,
  Download,
  Settings2,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI Cover Letters",
    description:
      "Our AI writes a cover letter matched to the exact job description — highlighting your most relevant experience.",
  },
  {
    icon: Target,
    title: "Resume Tailoring",
    description:
      "Your resume is restructured and reworded to pass ATS filters and speak directly to the hiring manager.",
  },
  {
    icon: BarChart3,
    title: "Match Scoring",
    description:
      "Get a percentage match score, gap analysis, and strategic talking points before you apply.",
  },
  {
    icon: Zap,
    title: "40-Second Generation",
    description:
      "Paste a job description and get a complete application package in under a minute. No templates.",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description:
      "Copy or download your cover letter and resume. Ready to submit on any job board or company portal.",
  },
  {
    icon: Settings2,
    title: "Application Tracker",
    description:
      "Kanban board to track every application from bookmarked to offer. Drag, drop, never lose track.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="border-t border-[#222] px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-white">
            Everything you need to land the role.
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[16px] text-[#888]">
            AI-powered tools that turn any job posting into a perfectly tailored
            application — in seconds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden bg-[#0a0a0a] p-8 transition-colors"
            >
              {/* Corner Crop Marks */}
              <div className="absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute right-0 top-0 z-10 h-3 w-3 border-r-2 border-t-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b-2 border-l-2 border-[#333] transition-colors group-hover:border-white" />
              <div className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b-2 border-r-2 border-[#333] transition-colors group-hover:border-white" />

              <div className="mb-5 flex h-10 w-10 items-center justify-center border border-[#333] bg-[#111]">
                <f.icon className="h-[18px] w-[18px] text-[#888] transition-colors group-hover:text-white" />
              </div>
              <h3 className="mb-2 text-[16px] font-semibold text-white">
                {f.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-[#888]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
