import Link from "next/link";
import type { GeneratedApplication } from "@/lib/types";
import { CropMarks } from "@/components/ui/crop-marks";

const statusColors: Record<string, string> = {
  bookmarked: "bg-[#222] text-[#888]",
  applied: "bg-blue-500/10 text-blue-400",
  phone_screen: "bg-yellow-500/10 text-yellow-400",
  interview: "bg-purple-500/10 text-purple-400",
  offer: "bg-emerald-500/10 text-emerald-400",
  rejected: "bg-red-500/10 text-red-400",
  ghosted: "bg-[#222] text-[#555]",
  withdrawn: "bg-orange-500/10 text-orange-400",
};

export function RecentApplications({
  applications,
}: {
  applications: GeneratedApplication[];
}) {
  if (applications.length === 0) {
    return (
      <div className="group relative overflow-hidden bg-[#0a0a0a] p-12 text-center">
        <CropMarks />
        <p className="text-[14px] text-[#888]">No applications yet.</p>
        <Link
          href="/dashboard/new"
          className="mt-3 inline-block text-[14px] text-white underline underline-offset-4 hover:no-underline"
        >
          Create your first application
        </Link>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden bg-[#0a0a0a]">
      <CropMarks />
      <div className="border-b border-[#222] px-6 py-4">
        <h3 className="text-[14px] font-medium text-white">
          Recent Applications
        </h3>
      </div>
      <div className="divide-y divide-[#222]">
        {applications.map((app) => (
          <Link
            key={app.id}
            href={`/dashboard/applications/${app.id}`}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#111]"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-white">
                {app.job_title || "Untitled Position"}
              </p>
              <p className="text-[13px] text-[#555]">
                {app.company_name || "Unknown Company"} &middot;{" "}
                {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-medium tabular-nums text-[#888]">
                {app.match_score}%
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${statusColors[app.application_status] || statusColors.bookmarked}`}
              >
                {app.application_status.replace("_", " ")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
