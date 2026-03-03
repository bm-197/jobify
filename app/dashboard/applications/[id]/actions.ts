"use server";

import { createClient } from "@/lib/supabase/server";
import {
  updateApplicationStatus,
  updateApplicationNotes,
} from "@/lib/queries";
import type { ApplicationStatus } from "@/lib/types";

export async function changeApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  const supabase = await createClient();
  await updateApplicationStatus(supabase, applicationId, status);
}

export async function saveApplicationNotes(
  applicationId: string,
  notes: string
) {
  const supabase = await createClient();
  await updateApplicationNotes(supabase, applicationId, notes);
}
