"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { CropMarks } from "@/components/ui/crop-marks";
import { useState } from "react";
import Image from "next/image";
import { GoogleLogo } from "@/assets";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("group relative overflow-hidden bg-[#0a0a0a] p-8", className)} {...props}>
      <CropMarks />

      {error && (
        <div className="mb-4 border border-red-500/20 bg-red-500/5 px-4 py-3 text-[13px] text-red-400">
          {error}
        </div>
      )}

      <button
        type="button"
        disabled={isLoading}
        onClick={handleGoogleLogin}
        className="flex h-11 w-full items-center justify-center gap-3 border border-[#222] bg-black text-[14px] font-medium text-white transition-colors hover:border-[#444] hover:bg-[#111] disabled:opacity-50"
      >
        <Image src={GoogleLogo} alt="Google" width={18} height={18} />
        {isLoading ? "Redirecting..." : "Continue with Google"}
      </button>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-[1px] flex-1 bg-[#222]" />
        <span className="text-[11px] uppercase tracking-widest text-[#555]">or</span>
        <div className="h-[1px] flex-1 bg-[#222]" />
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <label className="mb-1.5 block text-[12px] uppercase tracking-wider text-[#555]">
            Email
          </label>
          <input
            type="email"
            disabled
            placeholder="coming soon"
            className="h-10 w-full border border-[#222] bg-black px-3 text-[14px] text-[#555] placeholder:text-[#333] disabled:cursor-not-allowed"
          />
        </div>
        <button
          disabled
          className="flex h-10 w-full items-center justify-center border border-[#222] bg-[#111] text-[13px] font-medium text-[#555] disabled:cursor-not-allowed"
        >
          Email login coming soon
        </button>
      </div>
    </div>
  );
}
