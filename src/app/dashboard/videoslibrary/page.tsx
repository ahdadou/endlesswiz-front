// app/videos/page.tsx - Video Library
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Video, Clock, Star, Search, Eye, Plus } from "lucide-react";

export default function VideosPage() {
  const videos = [
    {
      title: "Mastering Vowel Sounds",
      duration: "12:45",
      views: "15.2K",
      difficulty: "Intermediate",
      thumbnail: "/vowel-thumbnail.jpg",
    },
    // Add more videos...
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex">
      {/* Shared Sidebar */}

      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Video Library</h1>
          <div className="flex gap-4">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Upload Video
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">{video.title}</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    <Eye className="w-4 h-4 mr-1 inline" />
                    {video.views}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {video.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
