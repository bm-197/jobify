"use client";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { ReactNode } from "react";

const colorVariants = {
  stone: {
    stroke: "#546b4c",
    stopColor: "#546b4c",
    bgIcon: "bg-[#546b4c]/10",
    textIcon: "text-[#546b4c]",
    cropHover: "group-hover:border-[#546b4c]",
  },
  orange: {
    stroke: "#d97706",
    stopColor: "#d97706",
    bgIcon: "bg-orange-500/10",
    textIcon: "text-orange-400",
    cropHover: "group-hover:border-orange-500",
  },
  teal: {
    stroke: "#0d9488",
    stopColor: "#0d9488",
    bgIcon: "bg-teal-500/10",
    textIcon: "text-teal-400",
    cropHover: "group-hover:border-teal-500",
  },
  blue: {
    stroke: "#2563eb",
    stopColor: "#2563eb",
    bgIcon: "bg-blue-500/10",
    textIcon: "text-blue-400",
    cropHover: "group-hover:border-blue-500",
  },
} as const;

type ColorVariant = keyof typeof colorVariants;

interface KPICardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color: ColorVariant;
  trend?: { value: string; up: boolean };
  sparklineData?: number[];
  warning?: boolean;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-[#333] bg-[#111] px-2 py-1 text-[11px] text-white shadow-xl">
      {payload[0].value}
    </div>
  );
}

export function KPICard({
  label,
  value,
  icon,
  color,
  trend,
  sparklineData,
  warning = false,
}: KPICardProps) {
  const variant = colorVariants[color];
  const gradientId = `gradient-${color}-${label.replace(/\s/g, "")}`;

  const chartData = (sparklineData || [12, 18, 14, 22, 19, 25, 20, 28]).map(
    (v, i) => ({ name: `Day ${i + 1}`, value: v })
  );

  return (
    <div className="group relative flex min-h-[160px] flex-col justify-between overflow-hidden border border-[#222] bg-[#0a0a0a] shadow-sm transition-colors hover:border-[#333]">
      {/* Corner Crop Marks */}
      <div
        className={`absolute left-0 top-0 z-20 h-3 w-3 border-l-2 border-t-2 border-[#333] transition-colors ${variant.cropHover}`}
      />
      <div
        className={`absolute right-0 top-0 z-20 h-3 w-3 border-r-2 border-t-2 border-[#333] transition-colors ${variant.cropHover}`}
      />
      <div
        className={`absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2 border-[#333] transition-colors ${variant.cropHover}`}
      />
      <div
        className={`absolute bottom-0 right-0 z-20 h-3 w-3 border-b-2 border-r-2 border-[#333] transition-colors ${variant.cropHover}`}
      />

      {/* Top section */}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[12px] font-medium uppercase tracking-wider text-[#888]">
              {label}
            </p>
            <p
              className={`mt-2 text-[26px] font-bold leading-none tracking-tight ${
                warning ? "text-orange-400" : "text-white"
              }`}
            >
              {value}
            </p>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className={trend.up ? "text-emerald-400" : "rotate-180 text-red-400"}
                >
                  <path
                    d="M5 2L8 6H2L5 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span
                  className={`font-mono text-[10px] ${
                    trend.up ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {trend.value}
                </span>
              </div>
            )}
          </div>

          {/* Icon badge */}
          <div
            className={`flex h-8 w-8 items-center justify-center rounded ${variant.bgIcon}`}
          >
            <span className={variant.textIcon}>{icon}</span>
          </div>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="-mb-1 -ml-1 -mr-1 h-[80px]">
        <ResponsiveContainer width="102%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={variant.stopColor}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={variant.stopColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={variant.stroke}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
