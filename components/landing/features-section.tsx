import { FileText, Target, BarChart3 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AI-Tailored Documents",
    description:
      "Gemini analyzes the job description against your profile — then writes a cover letter and resume that highlight exactly what the employer wants to see.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    glowColor: "group-hover:shadow-blue-500/10",
  },
  {
    icon: Target,
    title: "Smart Match Scoring",
    description:
      "See your match percentage, identified skill gaps, and talking points. Know exactly where you stand before you apply.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    glowColor: "group-hover:shadow-violet-500/10",
  },
  {
    icon: BarChart3,
    title: "Application Tracker",
    description:
      "Drag-and-drop kanban board tracks every application from bookmarked to offer. Never lose track of where you stand.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    glowColor: "group-hover:shadow-emerald-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.04),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-white/30">
            Features
          </p>
          <h2 className="mx-auto max-w-lg text-3xl font-bold tracking-tight text-white md:text-4xl">
            Everything you need to
            <br />
            <span className="text-white/50">apply smarter</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`glow-card group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/[0.1] hover:bg-white/[0.03] ${feature.glowColor} hover:shadow-2xl`}
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>

              <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-white/40">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
