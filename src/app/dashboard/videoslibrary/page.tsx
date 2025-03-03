// app/dashboard/videoslibrary/page.tsx
"use client";

import { useState } from "react";
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video, Clock, Star, Heart, List } from "lucide-react";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";

const VideoLibraryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentVideoId, setCurrentVideoId] = useState("dQw4w9WgXcQ");

  // Mock data
  const categories = [
    { id: "all", label: "All" },
    { id: "favorite", label: "Favorite" },
    { id: "technology", label: "Technology" },
    { id: "science", label: "Science" },
    { id: "others", label: "Others" },
  ];

  const videos = [
    {
      id: "dQw4w9WgXcQ",
      title: "Advanced Pronunciation",
      category: "favorite",
      duration: "12:45",
      channel: "English Mastery",
    },
    // Add more videos...
  ];

  const currentTranscript = {
    paragraph: "This is a sample transcript for the current video.",
    words: ["sample", "transcript", "video"],
  };

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6 bg-gray-50 h-screen overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-4">Video Library</h1>

          {/* Category Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Video List */}
          <div className="mb-4 flex-0">
            <h3 className="text-sm font-medium mb-2">Select a Video</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  className="w-48 flex-shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setCurrentVideoId(video.id)}
                >
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <YouTube
                      videoId={video.id}
                      opts={{ height: "100%", width: "100%" }}
                    />
                  </div>
                  <p className="text-xs font-medium mt-1 truncate">
                    {video.title}
                  </p>
                  <p className="text-xs text-gray-500">{video.duration}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden">
            {/* Video Player */}
            <div className="lg:w-[60%] bg-white rounded-xl shadow-sm h-full">
              <div className="aspect-video bg-gray-100">
                <YouTube
                  videoId={currentVideoId}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: { modestbranding: 1 },
                  }}
                />
              </div>
            </div>

            {/* Subtitles and Controls */}
            <div className="lg:w-[40%] flex flex-col gap-4 h-full">
              <div className="bg-white rounded-xl shadow-sm p-4 flex-1 overflow-auto">
                <SubTitleComponent
                  isAuthenticated={true}
                />
              </div>

              {/* Controls */}
              <div className="bg-white rounded-xl shadow-sm p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-red-500">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {playbackSpeed}x
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <List className="w-4 h-4 mr-1" />
                    Playlist
                  </Button>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoLibraryPage;
