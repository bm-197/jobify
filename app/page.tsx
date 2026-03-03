import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="bg-noise min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
