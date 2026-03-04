import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getApplicantProfile } from "@/lib/queries";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
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
  if (!profile?.onboarding_completed) redirect("/onboarding");

  const userName = profile.full_name || user.user_metadata?.full_name || "User";
  const userEmail = user.email || "";
  const userAvatar = user.user_metadata?.avatar_url || "";

  return (
    <div className="flex h-screen bg-black">
      <div className="hidden md:block">
        <Sidebar userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
