"use client";

import { useState } from "react";
import { CropMarks } from "@/components/ui/crop-marks";

const tabs = [
  { id: "cover-letter", label: "Cover Letter" },
  { id: "resume", label: "Resume" },
  { id: "match-analysis", label: "Match Analysis" },
  { id: "gap-report", label: "Gap Report" },
];

const filenames: Record<string, string> = {
  "cover-letter": "cover-letter-output.md",
  resume: "tailored-resume.md",
  "match-analysis": "match-analysis.md",
  "gap-report": "gap-report.md",
};

export function ShowcaseSection() {
  const [active, setActive] = useState("cover-letter");

  return (
    <section id="showcase" className="border-t border-[#222] px-6 py-24">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-0.03em] text-white">
            One input. Complete output.
          </h2>
          <p className="mx-auto mt-4 max-w-[500px] text-[16px] text-[#888]">
            Paste a job description and Jobify generates everything you need to
            apply — tailored to your exact profile.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                active === tab.id
                  ? "bg-white text-black"
                  : "text-[#666] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview window */}
        <div className="group relative overflow-hidden bg-[#0a0a0a]">
          <CropMarks />
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-[#222] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-[#333]" />
            <div className="h-3 w-3 rounded-full bg-[#333]" />
            <div className="h-3 w-3 rounded-full bg-[#333]" />
            <span className="ml-4 text-[12px] text-[#555]">
              {filenames[active]}
            </span>
          </div>
          {/* Content */}
          <div className="p-8 font-mono text-[13px] leading-[1.8] text-[#999]">
            {active === "cover-letter" && <CoverLetterContent />}
            {active === "resume" && <ResumeContent />}
            {active === "match-analysis" && <MatchAnalysisContent />}
            {active === "gap-report" && <GapReportContent />}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverLetterContent() {
  return (
    <>
      <p className="text-[#666]">{"// AI-generated cover letter"}</p>
      <p className="mt-4 text-white">Dear Hiring Manager,</p>
      <p className="mt-4">
        I am writing to express my strong interest in the{" "}
        <span className="text-[#0070f3]">Senior Frontend Engineer</span>{" "}
        position at{" "}
        <span className="text-[#0070f3]">Vercel</span>. With over 5 years
        of experience building performant React applications and a deep
        understanding of Next.js architecture, I am confident I can
        contribute meaningfully to your team.
      </p>
      <p className="mt-4">
        In my current role at Acme Corp, I led the migration of our
        customer-facing dashboard from a legacy jQuery codebase to{" "}
        <span className="text-white">Next.js 14 with App Router</span>,
        resulting in a{" "}
        <span className="text-white">62% improvement in LCP</span> and a{" "}
        <span className="text-white">3x reduction in bundle size</span>.
        This experience directly aligns with your requirement for
        engineers who can &ldquo;ship beautiful interfaces that don&rsquo;t
        compromise speed or functionality.&rdquo;
      </p>
      <p className="mt-4 text-[#555]">
        {"// ... matched to 12 key requirements from the JD"}
      </p>
    </>
  );
}

function ResumeContent() {
  return (
    <>
      <p className="text-[#666]">{"// AI-tailored resume"}</p>
      <p className="mt-4 text-white font-bold text-[15px]">JOHN DOE</p>
      <p className="text-[#888]">Senior Frontend Engineer | React, Next.js, TypeScript</p>
      <p className="mt-1 text-[#555]">San Francisco, CA | john@email.com | linkedin.com/in/johndoe</p>

      <p className="mt-6 text-white font-semibold">SUMMARY</p>
      <p className="mt-2">
        Frontend engineer with <span className="text-white">5+ years</span> building
        high-performance web applications. Specialized in{" "}
        <span className="text-[#0070f3]">React</span>,{" "}
        <span className="text-[#0070f3]">Next.js</span>, and{" "}
        <span className="text-[#0070f3]">TypeScript</span> with proven
        track record of improving Core Web Vitals and reducing bundle sizes.
      </p>

      <p className="mt-6 text-white font-semibold">EXPERIENCE</p>
      <p className="mt-2 text-white">Senior Frontend Engineer — Acme Corp</p>
      <p className="text-[#555]">Jan 2021 – Present</p>
      <p className="mt-1">
        • Led migration to <span className="text-white">Next.js 14 App Router</span>,
        achieving <span className="text-white">62% LCP improvement</span>
      </p>
      <p>• Reduced bundle size by <span className="text-white">3x</span> through code splitting and lazy loading</p>
      <p>• Mentored team of 4 junior engineers on React best practices</p>

      <p className="mt-4 text-[#555]">{"// ... restructured to match 14/16 JD keywords"}</p>
    </>
  );
}

function MatchAnalysisContent() {
  return (
    <>
      <p className="text-[#666]">{"// Match analysis results"}</p>

      {/* Match Score */}
      <div className="mt-5">
        <p className="text-[12px] font-medium uppercase tracking-wider text-[#555]">
          Match Score
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 flex-1 bg-[#222]">
            <div className="h-full w-[87%] bg-emerald-500" />
          </div>
          <span className="text-[16px] font-bold tabular-nums text-white font-sans">
            87%
          </span>
        </div>
      </div>

      {/* Matched Skills */}
      <div className="mt-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-[#555]">
          Matched Skills
        </p>
        <div className="mt-2 flex flex-wrap gap-2 font-sans">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "CI/CD", "Performance Optimization", "Team Leadership", "Agile/Scrum", "Code Review"].map((skill) => (
            <span key={skill} className="border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[12px] text-emerald-400">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="mt-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-[#555]">
          Missing Skills
        </p>
        <div className="mt-2 flex flex-wrap gap-2 font-sans">
          {["GraphQL", "AWS Lambda"].map((skill) => (
            <span key={skill} className="border border-red-500/20 bg-red-500/5 px-3 py-1 text-[12px] text-red-400">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Talking Points */}
      <div className="mt-6">
        <p className="text-[12px] font-medium uppercase tracking-wider text-[#555]">
          Talking Points
        </p>
        <ul className="mt-2 space-y-2 font-sans">
          {[
            "Led Next.js 14 migration — directly relevant",
            "62% LCP improvement demonstrates perf expertise",
            "Team mentorship aligns with senior role expectations",
          ].map((point, i) => (
            <li key={i} className="flex gap-3 text-[14px] text-[#ccc]">
              <span className="mt-0.5 text-[#555]">&bull;</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function GapReportContent() {
  return (
    <>
      <p className="text-[#666]">{"// Gap analysis & recommendations"}</p>

      <p className="mt-4 text-white font-semibold">SKILL GAPS IDENTIFIED</p>

      <p className="mt-3">
        <span className="text-red-400">&#x2717;</span>{" "}
        <span className="text-white">GraphQL</span>{" "}
        — Required in JD, not found in profile
      </p>
      <p className="ml-5 mt-1 text-[#888]">
        Recommendation: Your REST API experience is transferable.
        Mention willingness to learn and any exposure to graph-based queries.
      </p>

      <p className="mt-3">
        <span className="text-red-400">&#x2717;</span>{" "}
        <span className="text-white">AWS Lambda</span>{" "}
        — Preferred skill, not listed
      </p>
      <p className="ml-5 mt-1 text-[#888]">
        Recommendation: Highlight your serverless experience with Vercel
        Edge Functions as a comparable skill.
      </p>

      <p className="mt-6 text-white font-semibold">STRENGTHS TO EMPHASIZE</p>

      <p className="mt-3">
        <span className="text-emerald-400">&#x2713;</span>{" "}
        <span className="text-white">Next.js App Router</span>{" "}
        — Direct match, production experience
      </p>
      <p className="mt-2">
        <span className="text-emerald-400">&#x2713;</span>{" "}
        <span className="text-white">Performance Optimization</span>{" "}
        — Quantified results (62% LCP, 3x bundle)
      </p>
      <p className="mt-2">
        <span className="text-emerald-400">&#x2713;</span>{" "}
        <span className="text-white">Team Leadership</span>{" "}
        — Mentored 4 engineers, aligns with senior expectations
      </p>

      <p className="mt-6 text-[#555]">
        {"// Overall: Strong candidate. 2 minor gaps, 10 direct matches."}
      </p>
    </>
  );
}
