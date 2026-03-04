import { createClient } from "@/lib/supabase/server";
import { getApplications } from "@/lib/queries";
import { KanbanBoard } from "@/components/tracker/kanban-board";

export default async function TrackerPage() {
  const supabase = await createClient();
  const applications = await getApplications(supabase);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight text-white">
          Job Tracker
        </h2>
        <p className="text-[14px] text-[#888]">
          Drag applications between columns to update their status.
        </p>
      </div>
      <KanbanBoard applications={applications} />
    </div>
  );
}
