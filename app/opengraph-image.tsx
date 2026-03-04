import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jobify — Generate and land with AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              "radial-gradient(circle, #888 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Radial fade */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 30%, #000 70%)",
          }}
        />

        {/* Briefcase icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              width="20"
              height="14"
              x="2"
              y="6"
              rx="2"
              fill="white"
            />
          </svg>
          <span
            style={{
              fontSize: "42px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            Jobify
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Generate and land with AI.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "22px",
            color: "#888",
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          Tailored cover letters, resumes, and match analysis in seconds.
        </div>

        {/* Spectrum line */}
        <div
          style={{
            marginTop: "40px",
            width: "300px",
            height: "2px",
            background:
              "linear-gradient(to right, transparent, #7928ca, transparent)",
            opacity: 0.5,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
