"use client";

import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";

export function ResumeView({ content }: { content: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailored-resume.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111]">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] px-6 py-3">
        <h3 className="font-semibold text-white">Tailored Resume</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-gray-400 hover:text-white"
          >
            <Copy className="mr-1 h-4 w-4" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-gray-400 hover:text-white"
          >
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
          {content || "No resume generated."}
        </div>
      </div>
    </div>
  );
}
