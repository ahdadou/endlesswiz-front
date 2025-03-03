"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./sections/HeroSection";
import FeatureSection from "./sections/FeatureSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CtaSection from "./sections/CtaSection";
import HowItWorks from "./sections/HowItWorks";
import TranscriptSection from "./sections/TranscriptSection";
import { ZustandStoreProvider } from "@/provider/ZustandStoreProvider";

const Index = () => {
  return (
    <ZustandStoreProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroSection />
        {/* <HowItWorks /> */}
        <TranscriptSection />
        <FeatureSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </div>
    </ZustandStoreProvider>
  );
};

export default Index;
