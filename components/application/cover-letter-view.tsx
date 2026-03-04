"use client";

import { Copy, Check, Download, FileText } from "lucide-react";
import { CropMarks } from "@/components/ui/crop-marks";
import ReactMarkdown from "react-markdown";
import { useRef, useState } from "react";

export function CoverLetterView({ content }: { content: string }) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!letterRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const clone = letterRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = [
      "background:#fff",
      "color:#1a1a1a",
      "padding:48px 56px",
      'font-family:Georgia,"Times New Roman",Times,serif',
      "font-size:12.5px",
      "line-height:1.7",
      "max-width:700px",
    ].join(";");

    clone.querySelectorAll("h1").forEach((el) => {
      (el as HTMLElement).style.cssText =
        'font-family:Georgia,"Times New Roman",Times,serif;font-size:20px;font-weight:700;color:#111;margin:0 0 4px;';
    });
    clone.querySelectorAll("h2").forEach((el) => {
      (el as HTMLElement).style.cssText =
        'font-family:Georgia,"Times New Roman",Times,serif;font-size:14px;font-weight:700;color:#111;margin:16px 0 6px;';
    });
    clone.querySelectorAll("h3").forEach((el) => {
      (el as HTMLElement).style.cssText =
        'font-family:Georgia,"Times New Roman",Times,serif;font-size:12.5px;font-weight:700;color:#222;margin:12px 0 2px;';
    });
    clone.querySelectorAll("p").forEach((el) => {
      (el as HTMLElement).style.cssText =
        "color:#1a1a1a;margin:8px 0;font-size:12.5px;line-height:1.7;";
    });
    clone.querySelectorAll("strong").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#111;font-weight:700;";
    });
    clone.querySelectorAll("a").forEach((el) => {
      (el as HTMLElement).style.cssText =
        "color:#1a1a1a;text-decoration:none;";
    });
    clone.querySelectorAll("em").forEach((el) => {
      (el as HTMLElement).style.cssText = "color:#444;font-style:italic;";
    });

    const container = document.createElement("div");
    container.appendChild(clone);
    document.body.appendChild(container);

    await html2pdf()
      .set({
        margin: [16, 16, 16, 16],
        filename: "cover-letter.pdf",
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
        <h3 className="text-[14px] font-medium text-white">Cover Letter</h3>
        <div className="flex gap-1">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] transition-colors ${copied ? "text-emerald-400" : "text-[#888] hover:bg-[#222] hover:text-white"}`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
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
            ref={letterRef}
            className="prose-invert max-w-none text-[14px] leading-[1.7] text-[#ccc] [&_h1]:mb-2 [&_h1]:mt-0 [&_h1]:text-[20px] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-white [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-[16px] [&_h2]:font-semibold [&_h2]:text-white [&_h3]:mb-1 [&_h3]:mt-4 [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-white [&_a]:text-[#0070f3] [&_a]:no-underline hover:[&_a]:underline [&_p]:my-2 [&_p]:text-[#ccc] [&_strong]:font-semibold [&_strong]:text-white"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-[14px] text-[#555]">No cover letter generated.</p>
        )}
      </div>
    </div>
  );
}
