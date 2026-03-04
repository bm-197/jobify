"use client";

import { Copy, Download } from "lucide-react";
import { CropMarks } from "@/components/ui/crop-marks";
import ReactMarkdown from "react-markdown";

export function CoverLetterView({ content }: { content: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="group relative overflow-hidden bg-[#0a0a0a]">
      <CropMarks />
      <div className="flex items-center justify-between border-b border-[#222] px-6 py-3">
        <h3 className="text-[14px] font-medium text-white">Cover Letter</h3>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-[#888] transition-colors hover:bg-[#222] hover:text-white"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-[#888] transition-colors hover:bg-[#222] hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
        </div>
      </div>
      <div className="p-6">
        {content ? (
          <div className="prose-invert max-w-none text-[14px] leading-[1.7] text-[#ccc] [&_h1]:mb-2 [&_h1]:mt-0 [&_h1]:text-[20px] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-white [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-[#0070f3] [&_a]:no-underline hover:[&_a]:underline [&_p]:my-2 [&_p]:text-[#ccc] [&_strong]:font-semibold [&_strong]:text-white">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-[14px] text-[#555]">No cover letter generated.</p>
        )}
      </div>
    </div>
  );
}
