import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Dot grid background */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0" />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulse-glow absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px]" />
        <div className="animate-pulse-glow absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[100px] [animation-delay:2s]" />
        <div className="animate-pulse-glow absolute bottom-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-cyan-600/[0.04] blur-[100px] [animation-delay:4s]" />
      </div>

      {/* Radial fade at edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Shimmer badge */}
        <div className="animate-fade-in-up mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="shimmer-badge text-[13px] text-white/60">
            AI-powered job applications
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 mb-6 text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
          Stop applying.
          <br />
          <span className="bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent">
            Start landing.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 mx-auto mb-12 max-w-lg text-[17px] leading-relaxed text-white/40">
          Paste a job description. Get an AI-tailored cover letter and resume in
          seconds — matched to your exact experience.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-300 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/auth/login"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-[15px] font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
          >
            <span className="relative z-10">Get started free</span>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-12 items-center gap-2 px-6 text-[15px] text-white/50 transition-colors hover:text-white"
          >
            See how it works
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up delay-500 mt-16 flex flex-col items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "bg-gradient-to-br from-blue-400 to-blue-600",
              "bg-gradient-to-br from-violet-400 to-violet-600",
              "bg-gradient-to-br from-emerald-400 to-emerald-600",
              "bg-gradient-to-br from-amber-400 to-amber-600",
              "bg-gradient-to-br from-rose-400 to-rose-600",
            ].map((gradient, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a0a] text-[11px] font-semibold text-white ${gradient}`}
              >
                {["A", "M", "K", "R", "S"][i]}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-white/30">
            Trusted by job seekers at top companies
          </p>
        </div>
      </div>
    </section>
  );
}
