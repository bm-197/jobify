import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Jobify — AI-Powered Cover Letters & Resumes",
    template: "%s | Jobify",
  },
  description:
    "Paste a job description, get a tailored cover letter, resume, and match analysis in seconds. Land more interviews with AI.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Jobify — AI-Powered Cover Letters & Resumes",
    description:
      "Paste a job description, get a tailored cover letter, resume, and match analysis in seconds. Land more interviews with AI.",
    url: defaultUrl,
    siteName: "Jobify",
    images: ["/opengraph-image"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobify — AI-Powered Cover Letters & Resumes",
    description:
      "Paste a job description, get a tailored cover letter, resume, and match analysis in seconds.",
    images: ["/opengraph-image"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
