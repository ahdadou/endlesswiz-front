"use client";

import { motion } from "framer-motion";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";
import { useEffect, useState } from "react";
import { Maximize, Minimize } from "lucide-react";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { VideosDetailResponse } from "@/clients/types/apiTypes";

const TranscriptSection = () => {
  const { setCurrentVideo } = useZustandState();
  const [isZoomed, setIsZoomed] = useState(false);
  const handleZoomToggle = () => setIsZoomed((prev) => !prev);

  useEffect(() => {
    setCurrentVideo(0, { videoId: "9dc67f5e-30e8-4814-a994-1e64957d9b0a" ,vid: "VEDbS50xW38" } as VideosDetailResponse);
    const handleEscape = (event: KeyboardEvent) => {
      event.key === "Escape" && setIsZoomed(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const getLayoutClasses = () => {
    if (isZoomed)
      return {
        container: "fixed inset-0 flex flex-col w-full h-full bg-black z-50",
        player:
          "w-full h-[40vh] md:[50vh] lg:h-[70vh] bg-black overflow-hidden relative",
        subtitles:
          "w-full h-full lg:h-[50vh] overflow-auto bg-gray-900 text-white relative",
      };

    return {
      container: "grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[50vh]",
      player: `bg-forest-800 rounded-[5px] overflow-hidden h-[25vh] lg:h-[60vh] w-full shadow-xl`,
      subtitles: `relative w-full h-[40vh] lg:h-[60vh] overflow-auto rounded-[5px] border border-forest-100 bg-white shadow-xl`,
    };
  };

  const { container, player, subtitles } = getLayoutClasses();

  return (
    <section
      id="search-section"
      className="h-[100vh] lg:px-10 py-14 relative bg-gradient-to-b from-background to-forest-50/30"
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
            Explore real-world usage through video examples and interactive
            transcripts
          </p>
        </div>

        <div className={container}>
          <div className={player}>
            <YouTubePlayerComponentV2
              style="w-full h-[25vh] lg:h-[60vh] rounded-[5px]"
              isPublicPage={true}
              playByDefault={false}
            />
          </div>
          <div className={subtitles}>
            <SubTitleComponentV2
              isAuthenticated={false}
              showCurrentTranscriptInTheMiddle={false}
              isPublicPage={true}
            />

            <button
              onClick={handleZoomToggle}
              className="absolute top-[-3px] right-6 p-4 text-black rounded-md  transition-opacity"
              aria-label={isZoomed ? "Minimize" : "Maximize"}
            >
              {isZoomed ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TranscriptSection;
