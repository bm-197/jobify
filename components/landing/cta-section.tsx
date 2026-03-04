import Link from "next/link";
import { CropMarks } from "@/components/ui/crop-marks";

export function CTASection() {
  return (
    <section className="border-t border-[#222] px-6 py-24">
      <div className="group relative mx-auto max-w-[1200px] overflow-hidden bg-[#0a0a0a] px-8 py-20 text-center">
        <CropMarks />
        {/* Subtle gradient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,100,255,0.05),transparent_70%)]" />

        <h2 className="relative text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-white">
          Ready to land your next role?
        </h2>
        <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] text-[#888]">
          Join job seekers who stopped sending generic applications and started
          getting interviews.
        </p>
        <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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
            className="inline-flex h-11 items-center rounded-full border border-[#333] px-6 text-[15px] text-[#888] transition-colors hover:border-[#555] hover:text-white"
          >
            See How It Works
          </a>
        </div>
        <p className="relative mt-6 text-[13px] text-[#555]">
          Free to use. No credit card required.
        </p>
      </div>
    </section>
  );
}
