"use server";

import { createClient } from "@/lib/supabase/server";
import { callOnboardUser } from "@/lib/n8n";
import { redirect } from "next/navigation";

export async function createInitialProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;

  // Check if profile exists, create or update
  const { data: existing } = await supabase
    .from("applicant_profiles")
    .select("id")
    .eq("email", user.email)
    .single();

  if (existing) {
    await supabase
      .from("applicant_profiles")
      .update({ full_name: fullName, phone, location })
      .eq("id", existing.id);
    return { profileId: existing.id };
  }

  const { data, error } = await supabase
    .from("applicant_profiles")
    .insert({
      full_name: fullName,
      email: user.email,
      phone,
      location,
    })
    .select("id")
    .single();

  if (error) throw error;
  return { profileId: data.id };
}

export async function processResumeAndLinkedIn(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("applicant_profiles")
    .select("id, full_name")
    .eq("email", user.email)
    .single();

  if (!profile) throw new Error("Profile not found");

  const resumeText = formData.get("resume_text") as string;
  const linkedinUrl = formData.get("linkedin_url") as string;

  // Call n8n onboard-user webhook
  const result = await callOnboardUser({
    user_id: profile.id,
    email: user.email,
    full_name: profile.full_name,
    linkedin_url: linkedinUrl || undefined,
    resume_text: resumeText,
  });

  return result;
}

export async function saveProfileEdits(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const summary = formData.get("summary") as string;
  const skills = (formData.get("skills") as string)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const targetRole = formData.get("target_role") as string;

  const { error } = await supabase
    .from("applicant_profiles")
    .update({ summary, skills, target_role: targetRole })
    .eq("email", user.email);

  if (error) throw error;
  return { success: true };
}

export async function completeOnboarding(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) throw new Error("Not authenticated");

  const tonePreference = formData.get("tone_preference") as string;

  const { error } = await supabase
    .from("applicant_profiles")
    .update({
      tone_preference: tonePreference,
      onboarding_completed: true,
    })
    .eq("email", user.email);

  if (error) throw error;

  redirect("/dashboard");
}
