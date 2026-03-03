"use server";

import { createClient } from "@/lib/supabase/server";
import { callGenerateApplication } from "@/lib/n8n";
import { getApplicantProfile } from "@/lib/queries";
import { redirect } from "next/navigation";

export async function generateApplication(formData: FormData) {
  const supabase = await createClient();
  const profile = await getApplicantProfile(supabase);

  if (!profile) throw new Error("Profile not found");

  const inputType = formData.get("input_type") as "url" | "text";
  const jobDescription = formData.get("job_description") as string;

  if (!jobDescription.trim()) {
    throw new Error("Job description is required");
  }

  const result = await callGenerateApplication({
    email: profile.email,
    user_id: profile.id,
    input_type: inputType,
    job_description: jobDescription,
    output_format: "markdown",
  });

  // The n8n webhook should return the generated application ID
  const applicationId = result?.id || result?.application_id;

  if (applicationId) {
    redirect(`/dashboard/applications/${applicationId}`);
  }

  redirect("/dashboard");
}
