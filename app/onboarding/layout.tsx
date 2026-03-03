import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getApplicantProfile } from "@/lib/queries";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const profile = await getApplicantProfile(supabase);
  if (profile?.onboarding_completed) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4">
      <div className="w-full max-w-2xl">{children}</div>
    </div>
  );
}
