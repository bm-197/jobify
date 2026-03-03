import Link from "next/link";
import type { GeneratedApplication } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, string> = {
  bookmarked: "bg-gray-500/20 text-gray-300",
  applied: "bg-blue-500/20 text-blue-300",
  phone_screen: "bg-yellow-500/20 text-yellow-300",
  interview: "bg-purple-500/20 text-purple-300",
  offer: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-300",
  ghosted: "bg-gray-500/20 text-gray-500",
  withdrawn: "bg-orange-500/20 text-orange-300",
};

export function RecentApplications({
  applications,
}: {
  applications: GeneratedApplication[];
}) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-[#1f1f1f] bg-[#111] p-8 text-center">
        <p className="text-gray-400">No applications yet.</p>
        <Link
          href="/dashboard/new"
          className="mt-2 inline-block text-sm text-blue-400 hover:underline"
        >
          Create your first application
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111]">
      <div className="border-b border-[#1f1f1f] px-6 py-4">
        <h3 className="font-semibold text-white">Recent Applications</h3>
      </div>
      <div className="divide-y divide-[#1f1f1f]">
        {applications.map((app) => (
          <Link
            key={app.id}
            href={`/dashboard/applications/${app.id}`}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#1a1a1a]"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">
                {app.job_title || "Untitled Position"}
              </p>
              <p className="text-sm text-gray-500">
                {app.company_name || "Unknown Company"} &middot;{" "}
                {new Date(app.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-400">
                {app.match_score}%
              </span>
              <Badge
                className={`border-0 ${statusColors[app.application_status] || statusColors.bookmarked}`}
              >
                {app.application_status.replace("_", " ")}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
