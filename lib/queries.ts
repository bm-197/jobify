import { SupabaseClient } from "@supabase/supabase-js";
import type {
  ApplicantProfile,
  GeneratedApplication,
  ApplicationStatus,
  DashboardStats,
} from "./types";

export async function getApplicantProfile(
  supabase: SupabaseClient
): Promise<ApplicantProfile | null> {
  let user;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    user = data.user;
  } catch (err) {
    throw new Error(
      `Failed to fetch user session: ${err instanceof Error ? err.message : "Network error"}`
    );
  }

  if (!user?.email) return null;

  const { data, error } = await supabase
    .from("applicant_profiles")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error) {
    // PGRST116 = "no rows found" — that's a legitimate null
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }

  return data as ApplicantProfile;
}

export async function getApplications(
  supabase: SupabaseClient,
  limit = 50
): Promise<GeneratedApplication[]> {
  const profile = await getApplicantProfile(supabase);
  if (!profile) return [];

  const { data, error } = await supabase
    .from("generated_applications")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }

  return (data ?? []) as GeneratedApplication[];
}

export async function getApplicationById(
  supabase: SupabaseClient,
  id: string
): Promise<GeneratedApplication | null> {
  const profile = await getApplicantProfile(supabase);
  if (!profile) return null;

  const { data, error } = await supabase
    .from("generated_applications")
    .select("*")
    .eq("id", id)
    .eq("user_id", profile.id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch application: ${error.message}`);
  }

  return data as GeneratedApplication;
}

export async function updateApplicationStatus(
  supabase: SupabaseClient,
  id: string,
  status: ApplicationStatus
) {
  const updateData: Record<string, unknown> = { application_status: status };
  if (status === "applied") {
    updateData.applied_date = new Date().toISOString();
  }

  const { error } = await supabase
    .from("generated_applications")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;
}

export async function updateApplicationNotes(
  supabase: SupabaseClient,
  id: string,
  notes: string
) {
  const { error } = await supabase
    .from("generated_applications")
    .update({ notes })
    .eq("id", id);

  if (error) throw error;
}

export async function getDashboardStats(
  supabase: SupabaseClient
): Promise<DashboardStats> {
  const empty: DashboardStats = {
    totalApplications: 0,
    avgMatchScore: 0,
    thisWeek: 0,
    interviews: 0,
    weeklyApps: [0, 0, 0, 0, 0, 0, 0],
    weeklyScores: [0, 0, 0, 0, 0, 0, 0],
    weeklyInterviews: [0, 0, 0, 0, 0, 0, 0],
  };

  const profile = await getApplicantProfile(supabase);
  if (!profile) return empty;

  const { data: apps } = await supabase
    .from("generated_applications")
    .select("match_score, created_at, application_status")
    .eq("user_id", profile.id);

  if (!apps || apps.length === 0) return empty;

  const totalApplications = apps.length;
  const avgMatchScore = Math.round(
    apps.reduce((sum, a) => sum + (a.match_score || 0), 0) / totalApplications
  );

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeek = apps.filter(
    (a) => new Date(a.created_at) >= oneWeekAgo
  ).length;

  const interviews = apps.filter(
    (a) => a.application_status === "interview"
  ).length;

  // Build 7-day sparkline data from real applications
  const weeklyApps: number[] = [];
  const weeklyScores: number[] = [];
  const weeklyInterviews: number[] = [];

  for (let i = 6; i >= 0; i--) {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - i);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    const dayApps = apps.filter((a) => {
      const d = new Date(a.created_at);
      return d >= dayStart && d < dayEnd;
    });

    weeklyApps.push(dayApps.length);
    weeklyScores.push(
      dayApps.length > 0
        ? Math.round(
            dayApps.reduce((s, a) => s + (a.match_score || 0), 0) /
              dayApps.length
          )
        : 0
    );
    weeklyInterviews.push(
      dayApps.filter((a) => a.application_status === "interview").length
    );
  }

  return {
    totalApplications,
    avgMatchScore,
    thisWeek,
    interviews,
    weeklyApps,
    weeklyScores,
    weeklyInterviews,
  };
}
