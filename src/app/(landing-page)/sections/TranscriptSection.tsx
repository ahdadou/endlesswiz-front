"use client";

import { motion } from "framer-motion";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";

const TranscriptSection = () => {
  return (
    <section 
      id="search-section" 
      className="min-h-screen px-2 lg:px-10 pt-28 relative bg-gradient-to-b from-background to-forest-50/30"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto"
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-forest-800 mb-4 tracking-tight">
            Search Any Word and See Its Usage in Context
          </h2>
          <p className="text-sm text-forest-600 max-w-2xl mx-auto">
            Explore real-world usage through video examples and interactive transcripts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-[50vh]">
          <div className="bg-forest-800 rounded-xl overflow-hidden h-[25vh] lg:h-[60vh] w-full shadow-xl">
            <YouTubePlayerComponentV2 
              style="w-full h-[25vh] lg:h-[60vh] rounded-xl" 
              isPublicPage={true} 
            />
          </div>
          <div className="w-full h-[40vh] lg:h-[60vh] overflow-auto rounded-xl border border-forest-100 bg-white shadow-xl">
            <SubTitleComponentV2 
              isAuthenticated={false} 
              showCurrentTranscriptInTheMiddle={false} 
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TranscriptSection;