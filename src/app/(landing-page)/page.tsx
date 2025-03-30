"use client";

import Footer from "@/components/Footer";
import HeroSection from "./sections/HeroSection";
import FeatureSection from "./sections/FeatureSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CtaSection from "./sections/CtaSection";
import TranscriptSection from "./sections/TranscriptSection";
import { ZustandStoreProvider } from "@/provider/ZustandStoreProvider";
import Navbar from "@/components/navbar/Navbar";
import HowItWorksSection from "./sections/HowItWorks";
import FaqSection from "./sections/faq-section";

const Index = () => {
  return (
    <ZustandStoreProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <HeroSection />
        <TranscriptSection />
        <FeatureSection />
        {/* <HowItWorksSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <CtaSection /> */}
        {/* <FaqSection/> */}
        <Footer />
      </div>
    </ZustandStoreProvider>
  );
};

export default Index;
