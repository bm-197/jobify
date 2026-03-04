"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-[#333] bg-black/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect width="20" height="14" x="2" y="6" rx="2" fill="currentColor" />
          </svg>
          <span className="text-[15px] font-semibold text-white">Jobify</span>
        </Link>

        {/* Center nav */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#features"
            className="text-[14px] text-[#888] transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="text-[14px] text-[#888] transition-colors hover:text-white"
          >
            Showcase
          </a>
          <a
            href="#how-it-works"
            className="text-[14px] text-[#888] transition-colors hover:text-white"
          >
            How It Works
          </a>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden text-[14px] text-[#888] transition-colors hover:text-white sm:block"
          >
            Log In
          </Link>
          <Link
            href="/auth/login"
            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition-colors hover:bg-[#ccc]"
          >
            Start Applying
          </Link>
        </div>
      </nav>
    </header>
  );
}
