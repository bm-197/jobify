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

  // Persist enriched profile to Supabase so generate-application can use it
  if (result && typeof result === "object") {
    const enriched = result as Record<string, unknown>;
    const updatePayload: Record<string, unknown> = {
      resume_raw_text: resumeText,
    };

    if (enriched.summary) updatePayload.summary = enriched.summary;
    if (enriched.target_role) updatePayload.target_role = enriched.target_role;
    if (enriched.linkedin_url) updatePayload.linkedin_url = enriched.linkedin_url;
    if (Array.isArray(enriched.skills) && enriched.skills.length > 0)
      updatePayload.skills = enriched.skills;
    if (Array.isArray(enriched.work_experience) && enriched.work_experience.length > 0)
      updatePayload.work_experience = enriched.work_experience;
    if (Array.isArray(enriched.education) && enriched.education.length > 0)
      updatePayload.education = enriched.education;
    if (Array.isArray(enriched.certifications) && enriched.certifications.length > 0)
      updatePayload.certifications = enriched.certifications;
    if (Array.isArray(enriched.projects) && enriched.projects.length > 0)
      updatePayload.projects = enriched.projects;
    if (enriched.linkedin_enriched)
      updatePayload.linkedin_enriched = enriched.linkedin_enriched;
    if (enriched.linkedin_data)
      updatePayload.linkedin_data = enriched.linkedin_data;

    await supabase
      .from("applicant_profiles")
      .update(updatePayload)
      .eq("id", profile.id);
  }

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
