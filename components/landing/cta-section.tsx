import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* Gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Ready to land your
          <br />
          next role?
        </h2>
        <p className="mx-auto mb-10 max-w-md text-[17px] leading-relaxed text-white/40">
          Join job seekers who stopped sending generic applications and started
          getting interviews.
        </p>
        <Link
          href="/auth/login"
          className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-white px-8 text-[15px] font-medium text-black transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.98]"
        >
          Get started free
        </Link>
        <p className="mt-4 text-[13px] text-white/20">
          No credit card required
        </p>
      </div>
    </section>
  );
}
