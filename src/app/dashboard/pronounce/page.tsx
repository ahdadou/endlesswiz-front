// app/pronounce/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Search } from "lucide-react";
import YouTube from "react-youtube";
import SearchBar from "@/components/SearchBar";

export default function PronounceWordPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPronunciationVideos = async (word: string) => {
    try {
      setIsLoading(true);
      setError("");

      // Replace with your actual API endpoint
      const response = await fetch(
        `/api/search-videos?word=${encodeURIComponent(word)}`,
      );
      const data = await response.json();

      if (response.ok) {
        setVideos(data.videos);
      } else {
        setError(data.error || "Failed to fetch videos");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    if (searchQuery.trim()) {
      fetchPronunciationVideos(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-8 text-center">
          <div className="inline-block p-4 bg-blue-500 rounded-full mb-4">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Word Pronunciation</h1>
          <p className="text-gray-600">
            Enter a word to find pronunciation videos
          </p>
        </div>

        <SearchBar
          placeholder="Enter a word to pronounce..."
          onSearch={handleSearch}
          className="mb-6"
        />

        {/* Search Form */}
        {/* <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a word to pronounce..."
              className="w-full pl-10 pr-24 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1.5 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form> */}

        {/* Results Section */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <YouTube
                videoId={video.id}
                opts={{
                  height: "200",
                  width: "100%",
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                  },
                }}
                className="rounded-lg overflow-hidden mb-3"
              />
              <h3 className="font-medium text-gray-900">{video.title}</h3>
              <p className="text-sm text-gray-500">{video.channel}</p>
            </div>
          ))}

          {!isLoading && videos.length === 0 && searchQuery && (
            <div className="col-span-full text-center text-gray-500">
              No videos found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
