"use client";

import { useState } from "react";
import { CoverLetterView } from "./cover-letter-view";
import { ResumeView } from "./resume-view";
import { CropMarks } from "@/components/ui/crop-marks";
import type { GeneratedApplication, JDAnalysis, MatchAnalysis } from "@/lib/types";

const tabs = [
  { id: "cover-letter", label: "Cover Letter" },
  { id: "resume", label: "Resume" },
  { id: "jd-analysis", label: "JD Analysis" },
  { id: "match", label: "Match Analysis" },
];

function safeParse<T>(data: unknown): T | null {
  if (!data) return null;
  if (typeof data === "object") return data as T;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

export function ContentTabs({
  application,
}: {
  application: GeneratedApplication;
}) {
  const [active, setActive] = useState("cover-letter");
  const jd = safeParse<JDAnalysis>(application.jd_analysis);
  const match = safeParse<MatchAnalysis>(application.match_analysis);

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-6 flex gap-1 border border-[#222] bg-[#0a0a0a] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex-1 px-3 py-2 text-[13px] font-medium transition-colors ${
              active === tab.id
                ? "bg-[#222] text-white"
                : "text-[#888] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "cover-letter" && (
        <CoverLetterView content={application.cover_letter_text} />
      )}

      {active === "resume" && (
        <ResumeView content={application.tailored_resume_text} />
      )}

      {active === "jd-analysis" && (
        <div className="group relative overflow-hidden bg-[#0a0a0a] p-6">
          <CropMarks />
          <h3 className="mb-6 text-[16px] font-semibold text-white">
            Job Description Analysis
          </h3>
          {jd ? (
            <div className="space-y-6">
              {/* Position & Company */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Position" value={jd.job_title} />
                <Field label="Company" value={jd.company_name} />
                <Field label="Location" value={jd.location} />
                <Field label="Seniority" value={jd.seniority_level} />
                <Field label="Industry" value={jd.industry} />
                <Field label="Experience Required" value={jd.years_experience_required} />
                <Field label="Salary Range" value={jd.salary_range} />
                <Field label="Posting Tone" value={jd.posting_tone} />
              </div>

              <SkillBadges label="Required Skills" items={jd.required_skills} color="white" />
              <SkillBadges label="Preferred Skills" items={jd.preferred_skills} color="blue" />
              <SkillBadges label="Tools & Technologies" items={jd.tools_technologies as string[]} color="purple" />

              {jd.key_responsibilities && jd.key_responsibilities.length > 0 && (
                <div>
                  <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-[#555]">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-2">
                    {jd.key_responsibilities.map((r: string, i: number) => (
                      <li key={i} className="flex gap-3 text-[14px] text-[#888]">
                        <span className="mt-1 text-[#555]">&bull;</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jd.application_instructions && jd.application_instructions !== "not specified" && (
                <Field label="Application Instructions" value={jd.application_instructions} />
              )}
            </div>
          ) : (
            <p className="text-[14px] text-[#555]">No analysis data available.</p>
          )}
        </div>
      )}

      {active === "match" && (
        <div className="group relative overflow-hidden bg-[#0a0a0a] p-6">
          <CropMarks />
          <h3 className="mb-6 text-[16px] font-semibold text-white">
            Match Analysis
          </h3>
          {match ? (
            <div className="space-y-6">
              {/* Score */}
              {match.match_score != null && (
                <div>
                  <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-[#555]">
                    Match Score
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 bg-[#222]">
                      <div
                        className="h-full bg-emerald-500 transition-all"
                        style={{ width: `${match.match_score}%` }}
                      />
                    </div>
                    <span className="text-[16px] font-bold tabular-nums text-white">
                      {match.match_score}%
                    </span>
                  </div>
                </div>
              )}

              <SkillBadges label="Matched Skills" items={match.matched_skills} color="green" />
              <SkillBadges label="Missing Skills" items={match.missing_skills} color="red" />
              <SkillBadges label="Transferable Skills" items={match.transferable_skills as string[]} color="yellow" />
              <SkillBadges label="ATS Keywords" items={match.keywords_to_include} color="blue" />

              {match.positioning_strategy && (
                <div>
                  <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-[#555]">
                    Positioning Strategy
                  </p>
                  <p className="text-[14px] leading-[1.7] text-[#ccc]">
                    {match.positioning_strategy as string}
                  </p>
                </div>
              )}

              <BulletList label="Talking Points" items={match.talking_points} />
              <BulletList label="Experience Highlights" items={match.experience_highlights as unknown[]} />
              <BulletList label="Resume Adjustments" items={match.resume_adjustments as unknown[]} />

              {match.tone_recommendation && (
                <Field label="Tone Recommendation" value={match.tone_recommendation as string} />
              )}
            </div>
          ) : (
            <p className="text-[14px] text-[#555]">No match data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value?: unknown }) {
  if (!value || value === "not specified") return null;
  return (
    <div>
      <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-[#555]">
        {label}
      </p>
      <p className="text-[14px] text-white">{String(value)}</p>
    </div>
  );
}

const badgeColors: Record<string, string> = {
  white: "border-[#222] bg-[#111] text-[#888]",
  green: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
  red: "border-red-500/20 bg-red-500/5 text-red-400",
  blue: "border-blue-500/20 bg-blue-500/5 text-blue-400",
  yellow: "border-yellow-500/20 bg-yellow-500/5 text-yellow-400",
  purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
};

function SkillBadges({
  label,
  items,
  color = "white",
}: {
  label: string;
  items?: string[];
  color?: string;
}) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-[#555]">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={`border px-3 py-1 text-[12px] ${badgeColors[color] || badgeColors.white}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function formatItem(item: unknown): string {
  if (typeof item === "string") return item;
  if (typeof item === "object" && item !== null) {
    const obj = item as Record<string, unknown>;
    // Handle { company, achievements } shape
    if (obj.company && obj.achievements) {
      return `${obj.company} — ${obj.achievements}`;
    }
    // Handle any object by joining its values
    return Object.values(obj).filter(Boolean).join(" — ");
  }
  return String(item);
}

function BulletList({ label, items }: { label: string; items?: unknown[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-[#555]">
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 text-[14px] text-[#888]">
            <span className="mt-0.5 text-[#555]">&bull;</span>
            <span>{formatItem(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
