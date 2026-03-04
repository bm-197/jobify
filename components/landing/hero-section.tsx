import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-40">
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #555 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Radial fade so dots disappear at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#000_70%)]" />
        {/* Top center glow */}
        <div className="absolute left-1/2 top-[20%] h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(120,40,202,0.12),transparent_70%)]" />
      </div>

      {/* Spectrum line */}
      <div className="pointer-events-none absolute left-1/2 top-[52%] z-0 -translate-x-1/2">
        <div className="h-[1px] w-[340px] bg-gradient-to-r from-transparent via-[#7928ca] to-transparent opacity-30" />
        <div className="mt-[-1px] h-[8px] w-[340px] bg-gradient-to-r from-transparent via-[#7928ca] to-transparent opacity-10 blur-[12px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[700px] text-center">
        {/* Headline */}
        <h1 className="animate-fade-in-up text-[clamp(36px,6vw,64px)] font-bold leading-[1.1] tracking-[-0.04em] text-white">
          Generate and land
          <br />
          with AI.
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-100 mx-auto mt-6 max-w-[500px] text-[16px] leading-[1.6] text-[#888]">
          Jobify gives job seekers the AI tools and automation to craft
          tailored cover letters, resumes, and applications — for a faster path
          to interviews.
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-200 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/auth/login"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-black transition-colors hover:bg-[#ccc]"
          >
            Start Applying
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-black"
            >
              <path
                d="M6.5 3.5L11 8L6.5 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#333] px-6 text-[15px] text-[#888] transition-colors hover:border-[#555] hover:text-white"
          >
            See How It Works
          </a>
        </div>
      </div>
    </section>
  );
}
