"use server";

import { createClient } from "@/lib/supabase/server";
import { callOnboardUser } from "@/lib/n8n";
import { getApplicantProfile } from "@/lib/queries";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;
  const summary = formData.get("summary") as string;
  const targetRole = formData.get("target_role") as string;
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("applicant_profiles")
    .update({
      full_name: fullName,
      phone,
      location,
      summary,
      target_role: targetRole,
      skills,
    })
    .eq("email", user.email);

  if (error) throw error;
  revalidatePath("/dashboard/settings");
}

export async function updatePreferences(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const tonePreference = formData.get("tone_preference") as string;

  const { error } = await supabase
    .from("applicant_profiles")
    .update({ tone_preference: tonePreference })
    .eq("email", user.email);

  if (error) throw error;
  revalidatePath("/dashboard/settings");
}

export async function reprocessResume(formData: FormData) {
  const supabase = await createClient();
  const profile = await getApplicantProfile(supabase);

  if (!profile) throw new Error("Profile not found");

  const resumeText = formData.get("resume_text") as string;
  const linkedinUrl = formData.get("linkedin_url") as string;

  await callOnboardUser({
    user_id: profile.id,
    email: profile.email,
    full_name: profile.full_name,
    linkedin_url: linkedinUrl || undefined,
    resume_text: resumeText,
  });

  revalidatePath("/dashboard/settings");
}
