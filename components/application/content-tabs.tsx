"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoverLetterView } from "./cover-letter-view";
import { ResumeView } from "./resume-view";
import type { GeneratedApplication } from "@/lib/types";

export function ContentTabs({
  application,
}: {
  application: GeneratedApplication;
}) {
  const jdAnalysis = application.jd_analysis;
  const matchAnalysis = application.match_analysis;

  return (
    <Tabs defaultValue="cover-letter">
      <TabsList className="border border-[#1f1f1f] bg-[#111]">
        <TabsTrigger value="cover-letter" className="data-[state=active]:bg-[#1f1f1f]">
          Cover Letter
        </TabsTrigger>
        <TabsTrigger value="resume" className="data-[state=active]:bg-[#1f1f1f]">
          Resume
        </TabsTrigger>
        <TabsTrigger value="jd-analysis" className="data-[state=active]:bg-[#1f1f1f]">
          JD Analysis
        </TabsTrigger>
        <TabsTrigger value="match" className="data-[state=active]:bg-[#1f1f1f]">
          Match Analysis
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cover-letter">
        <CoverLetterView content={application.cover_letter_text} />
      </TabsContent>

      <TabsContent value="resume">
        <ResumeView content={application.tailored_resume_text} />
      </TabsContent>

      <TabsContent value="jd-analysis">
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Job Description Analysis
          </h3>
          {jdAnalysis && typeof jdAnalysis === "object" ? (
            <div className="space-y-4">
              {jdAnalysis.job_title && (
                <div>
                  <p className="text-sm text-gray-400">Position</p>
                  <p className="text-white">{jdAnalysis.job_title}</p>
                </div>
              )}
              {jdAnalysis.required_skills && jdAnalysis.required_skills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-400">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {jdAnalysis.required_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {jdAnalysis.preferred_skills && jdAnalysis.preferred_skills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-400">Preferred Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {jdAnalysis.preferred_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">No analysis data available.</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="match">
        <div className="rounded-xl border border-[#1f1f1f] bg-[#111] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Match Analysis
          </h3>
          {matchAnalysis && typeof matchAnalysis === "object" ? (
            <div className="space-y-4">
              {matchAnalysis.matched_skills && matchAnalysis.matched_skills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-400">Matched Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {matchAnalysis.matched_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {matchAnalysis.missing_skills && matchAnalysis.missing_skills.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-400">Missing Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {matchAnalysis.missing_skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {matchAnalysis.talking_points && matchAnalysis.talking_points.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-gray-400">Talking Points</p>
                  <ul className="space-y-1">
                    {matchAnalysis.talking_points.map((point: string, i: number) => (
                      <li key={i} className="text-sm text-gray-300">
                        &bull; {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-400">No match data available.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
