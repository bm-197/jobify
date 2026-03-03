import { FileText, Target, Calendar, Users } from "lucide-react";
import type { DashboardStats } from "@/lib/types";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
    },
    {
      label: "Avg Match Score",
      value: `${stats.avgMatchScore}%`,
      icon: Target,
    },
    {
      label: "This Week",
      value: stats.thisWeek,
      icon: Calendar,
    },
    {
      label: "Interviews",
      value: stats.interviews,
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{card.label}</p>
            <card.icon className="h-4 w-4 text-gray-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
