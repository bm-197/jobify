import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex min-h-svh w-full flex-col bg-black">
      {/* Background grid + glow — matching hero */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #555 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_70%)]" />
        <div className="absolute left-1/2 top-[30%] h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(120,40,202,0.1),transparent_70%)]" />
      </div>

      {/* Top nav */}
      <header className="relative z-10 flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect width="20" height="14" x="2" y="6" rx="2" fill="currentColor" />
          </svg>
          <span className="text-[15px] font-semibold text-white">Jobify</span>
        </Link>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-[380px]">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-[28px] font-bold tracking-[-0.03em] text-white">
              Welcome back
            </h1>
            <p className="mt-2 text-[14px] text-[#888]">
              Sign in to continue crafting tailored applications
            </p>
          </div>

          {/* Login card */}
          <LoginForm />

          {/* Bottom text */}
          <p className="mt-8 text-center text-[12px] text-[#555]">
            By signing in, you agree to our Terms of Service.
            <br />
            We only use Google for authentication — no spam, ever.
          </p>
        </div>
      </div>

      {/* Bottom spectrum line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="h-[1px] w-[300px] bg-gradient-to-r from-transparent via-[#7928ca] to-transparent opacity-20" />
      </div>
    </div>
  );
}
