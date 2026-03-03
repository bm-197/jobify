import { createClient } from "@/lib/supabase/server";
import { getDashboardStats, getApplications } from "@/lib/queries";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentApplications } from "@/components/dashboard/recent-applications";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default async function DashboardPage() {
  const supabase = await createClient();
  const [stats, applications] = await Promise.all([
    getDashboardStats(supabase),
    getApplications(supabase, 5),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <QuickActions />
      <StatsCards stats={stats} />
      <RecentApplications applications={applications} />
    </div>
  );
}
