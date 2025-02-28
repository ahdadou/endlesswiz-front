"use client";

import { motion } from "framer-motion";
import {
  Captions,
  ChevronLeft,
  ChevronRight,
  Clock,
  Settings,
} from "lucide-react";
import YouTube from "react-youtube";

const TranscriptSection = () => {
  return (
    <section
      id="search-section"
      className="min-h-screen py-12 px-4 bg-white pt-24"
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
            Enter any English word or phrase below and get instant video examples
            from real speakers
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Enter a word to pronounce..."
              className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-black focus:outline-none text-lg shadow-sm"
            />
            <button className="absolute right-2 top-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300">
              Search
            </button>
          </div>
        </div>

        {/* Split Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Video Section */}
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6">
            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <YouTube
                videoId="dQw4w9WgXcQ"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: { modestbranding: 1, rel: 0 },
                }}
                className="w-full h-full"
              />
            </div>

            {/* Video Controls */}
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="text-gray-700 w-6 h-6" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="text-gray-700 w-6 h-6" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span>Speed: 1x</span>
                  </button>
                </div>

                <div className="flex gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Captions className="w-6 h-6" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtitles Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-6 h-fit sticky top-4">
            <div className="flex gap-3 items-center mb-4">
              <Captions className="w-6 h-6 text-gray-900" />
              <h3 className="text-xl font-semibold text-gray-900">Live Subtitles</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700">
                  [00:00] "Serendipity" - The occurrence of events by chance in a
                  happy way
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-gray-700">
                  Phonetic pronunciation: /ˌser.ənˈdɪp.ə.ti/
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TranscriptSection;