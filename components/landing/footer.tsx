import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white">
            <span className="text-xs font-black text-black">J</span>
          </div>
          <span className="text-[14px] font-medium text-white/60">Jobify</span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/auth/login"
            className="text-[13px] text-white/30 transition-colors hover:text-white/60"
          >
            Sign in
          </Link>
          <a
            href="#features"
            className="text-[13px] text-white/30 transition-colors hover:text-white/60"
          >
            Features
          </a>
        </div>

        <p className="text-[13px] text-white/20">
          &copy; {new Date().getFullYear()} Jobify
        </p>
      </div>
    </footer>
  );
}
