"use client";

import { motion } from "framer-motion";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";

const TranscriptSection = () => {
  return (
    <section id="search-section" className="min-h-screen px-2 lg:px-10 pt-28 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
          Search any word and see its usage in context
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-[50vh]">
          <div className="bg-black rounded-md overflow-hidden h-[25vh] lg:h-[60vh] w-full">
            <YouTubePlayerComponentV2 style="w-full h-[25vh] lg:h-[60vh]" isPublicPage={true} />
          </div>
          <div className="w-full h-[40vh] lg:h-[60vh] overflow-auto rounded-md">
            <SubTitleComponentV2 isAuthenticated={false} showCurrentTranscriptInTheMiddle={false} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TranscriptSection;