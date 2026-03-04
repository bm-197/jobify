"use client";

import { Copy, Download, FileText } from "lucide-react";
import { CropMarks } from "@/components/ui/crop-marks";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";

export function ResumeView({ content }: { content: string }) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailored-resume.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!resumeRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    // Create a clone styled for PDF (white bg, black text)
    const clone = resumeRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText =
      "background:#fff;color:#111;padding:40px 48px;font-family:Georgia,serif;font-size:13px;line-height:1.7;max-width:720px;";

    // Style all elements for print
    clone.querySelectorAll("h1").forEach((el) => {
      (el as HTMLElement).style.cssText =
        "font-size:22px;font-weight:700;color:#111;margin:0 0 4px;border-bottom:2px solid #222;padding-bottom:6px;";
    });
    clone.querySelectorAll("h2").forEach((el) => {
      (el as HTMLElement).style.cssText =
        "font-size:15px;font-weight:600;color:#111;margin:18px 0 6px;border-bottom:1px solid #ccc;padding-bottom:3px;";
    });
    clone.querySelectorAll("h3").forEach((el) => {
      (el as HTMLElement).style.cssText =
        "font-size:13px;font-weight:600;color:#222;margin:12px 0 2px;";
    });
    clone.querySelectorAll("p").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#333;margin:4px 0;";
    });
    clone.querySelectorAll("li").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#333;margin:2px 0 2px 16px;";
    });
    clone.querySelectorAll("strong").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#111;font-weight:600;";
    });
    clone.querySelectorAll("a").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#0070f3;text-decoration:none;";
    });
    clone.querySelectorAll("hr").forEach((el) => {
      (el as HTMLElement).style.cssText = "border:none;border-top:1px solid #ddd;margin:12px 0;";
    });

    const container = document.createElement("div");
    container.appendChild(clone);
    document.body.appendChild(container);

    await html2pdf()
      .set({
        margin: [10, 10, 10, 10],
        filename: "tailored-resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(clone)
      .save();

    document.body.removeChild(container);
  };

  return (
    <div className="group relative overflow-hidden bg-[#0a0a0a]">
      <CropMarks />
      <div className="flex items-center justify-between border-b border-[#222] px-6 py-3">
        <h3 className="text-[14px] font-medium text-white">Tailored Resume</h3>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-[#888] transition-colors hover:bg-[#222] hover:text-white"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
          <button
            onClick={handleDownloadMd}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-[#888] transition-colors hover:bg-[#222] hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
            Markdown
          </button>
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] text-[#888] transition-colors hover:bg-[#222] hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" />
            PDF
          </button>
        </div>
      </div>
      <div className="p-6">
        {content ? (
          <div
            ref={resumeRef}
            className="prose-invert max-w-none text-[14px] leading-[1.7] text-[#ccc] [&_h1]:mb-2 [&_h1]:mt-0 [&_h1]:text-[20px] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-white [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:border-b [&_h2]:border-[#222] [&_h2]:pb-1 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-[#0070f3] [&_a]:no-underline hover:[&_a]:underline [&_hr]:my-4 [&_hr]:border-[#222] [&_li]:ml-4 [&_li]:text-[#ccc] [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:my-2 [&_p]:text-[#ccc] [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-4"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-[14px] text-[#555]">No resume generated.</p>
        )}
      </div>
    </div>
  );
}
