"use server";

import { createClient } from "@/lib/supabase/server";
import { callGenerateApplication } from "@/lib/n8n";
import { getApplicantProfile } from "@/lib/queries";

export async function generateApplication(formData: FormData): Promise<{ applicationId: string | null }> {
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

  // n8n returns { status, data: { record_id } }
  const data = result?.data || result;
  const applicationId =
    data?.record_id || data?.id || data?.application_id || result?.record_id;

  if (applicationId && applicationId !== "unknown") {
    return { applicationId };
  }

  return { applicationId: null };
}
