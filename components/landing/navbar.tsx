"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <span className="text-sm font-black text-black">J</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Jobify
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-[13px] text-white/50 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-[13px] text-white/50 transition-colors hover:text-white"
          >
            How it works
          </a>
        </div>

        <Link
          href="/auth/login"
          className="inline-flex h-9 items-center rounded-lg bg-white px-4 text-[13px] font-medium text-black transition-all hover:bg-white/90 active:scale-[0.98]"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
