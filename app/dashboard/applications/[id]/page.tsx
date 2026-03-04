import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getApplicationById } from "@/lib/queries";
import { MatchScoreGauge } from "@/components/application/match-score-gauge";
import { ContentTabs } from "@/components/application/content-tabs";
import { StatusTracker } from "@/components/application/status-tracker";
import { NotesEditor } from "@/components/application/notes-editor";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const application = await getApplicationById(supabase, id);

  if (!application) notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-white">
            {application.job_title || "Untitled Position"}
          </h2>
          <p className="text-[14px] text-[#888]">
            {application.company_name || "Unknown Company"} &middot;{" "}
            {new Date(application.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <MatchScoreGauge score={application.match_score} />
          <StatusTracker
            applicationId={application.id}
            currentStatus={application.application_status}
          />
        </div>
      </div>

      <ContentTabs application={application} />

      <NotesEditor
        applicationId={application.id}
        initialNotes={application.notes}
      />
    </div>
  );
}
