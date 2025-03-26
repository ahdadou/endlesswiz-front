"use client";

import { motion } from "framer-motion";
import YouTube from "react-youtube";
import api from "@/clients/api/api";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";
import YouTubePlayerComponent from "@/components/YouTubePlayerComponent/YouTubePlayerComponent";
import { useCallback, useState } from "react";
import { useZustandState } from "@/provider/ZustandStoreProvider";

const TranscriptSection = () => {
  const [wordSearch, setWordSearch] = useState<string>("");
  const { videos, setVideosWithPosition, setHighlitedWord, currentTranscript } =
    useZustandState();

  const fetchVideos = useCallback(async () => {
    const response = await api.searchVideosByWord(wordSearch);
    setHighlitedWord(wordSearch);
    response && setVideosWithPosition(response);
  }, [wordSearch]);

  return (
    <section
      id="search-section"
      className="min-h-screen py-12 px-4 pt-32 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Perfect Pronunciation
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Enter any English word or phrase below and get instant video
            examples from real speakers
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              value={wordSearch}
              onChange={(e) => setWordSearch(e.target.value)}
              type="text"
              placeholder="Enter a word to pronounce..."
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-black focus:outline-none text-lg shadow-sm"
            />
            <button
              onClick={fetchVideos}
              className="absolute right-2 top-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Split Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-[50vh]">
          {/* Video Section */}
          <div className="rounded-2xl shadow-lg p-6 h-full">
            {videos?.videosDetailResponse.length > 0 ? (
              <YouTubePlayerComponent />
            ) : (
              <YouTube
                videoId="dQw4w9WgXcQ"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: { modestbranding: 1, rel: 0 },
                }}
                className="w-full h-full"
              />
            )}
          </div>
          {/* Subtitles Section with favorite button */}
          <SubTitleComponent isAuthenticated={true} />
        </div>
      </motion.div>
    </section>
  );
};

export default TranscriptSection;
