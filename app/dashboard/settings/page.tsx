import { createClient } from "@/lib/supabase/server";
import { getApplicantProfile } from "@/lib/queries";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/settings/profile-form";
import { ResumeSection } from "@/components/settings/resume-section";
import { PreferencesSection } from "@/components/settings/preferences-section";

export default async function SettingsPage() {
  const supabase = await createClient();
  const profile = await getApplicantProfile(supabase);

  if (!profile) redirect("/onboarding");

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-400">Manage your profile and preferences</p>
      </div>
      <ProfileForm profile={profile} />
      <ResumeSection profile={profile} />
      <PreferencesSection profile={profile} />
    </div>
  );
}
