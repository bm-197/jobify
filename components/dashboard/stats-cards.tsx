"use client";

import { FileText, Target, CalendarDots, Users } from "@phosphor-icons/react";
import { KPICard } from "@/components/ui/kpi-card";
import type { DashboardStats } from "@/lib/types";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <KPICard
        label="Total Applications"
        value={stats.totalApplications}
        icon={<FileText size={18} weight="duotone" />}
        color="stone"
        sparklineData={stats.weeklyApps}
        trend={
          stats.thisWeek > 0
            ? { value: `${stats.thisWeek} this week`, up: true }
            : undefined
        }
      />
      <KPICard
        label="Avg Match Score"
        value={`${stats.avgMatchScore}%`}
        icon={<Target size={18} weight="duotone" />}
        color="teal"
        sparklineData={stats.weeklyScores}
        warning={stats.avgMatchScore > 0 && stats.avgMatchScore < 60}
      />
      <KPICard
        label="This Week"
        value={stats.thisWeek}
        icon={<CalendarDots size={18} weight="duotone" />}
        color="blue"
        sparklineData={stats.weeklyApps}
      />
      <KPICard
        label="Interviews"
        value={stats.interviews}
        icon={<Users size={18} weight="duotone" />}
        color="orange"
        sparklineData={stats.weeklyInterviews}
        trend={
          stats.interviews > 0
            ? { value: `${stats.interviews} active`, up: true }
            : undefined
        }
      />
    </div>
  );
}
