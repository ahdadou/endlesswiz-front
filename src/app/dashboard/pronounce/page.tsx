"use client";

import { useCallback, useState } from "react";
import YouTube from "react-youtube";
import SearchBar from "@/components/SearchBar";
import api from "@/clients/api/api";
import YouTubePlayerComponent from "@/components/YouTubePlayerComponent/YouTubePlayerComponent";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { Spinner } from "@/Icons/SpinnerIcon";

export default function PronounceWordPage() {
  const { currentVideo, setVideos, setHighlitedWord } = useZustandState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await api.searchVideosByWordAndUser(query);
      setHighlitedWord(query);
      response && setVideos(response);
    } catch {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
    fetchVideos(query.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 flex flex-col items-center px-4">
      {/* Header Section */}
      <div className="w-full max-w-6xl mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 bg-clip-text min-w-[300px]">
            Word Pronunciation
            <span className="text-blue-600 ml-2">🔊</span>
          </h1>
          <div className="relative w-full md:max-w-2xl">
            <SearchBar
              placeholder="Search for a word..."
              onSearch={handleSearch}
            />
            {isLoading && (
              <div className="absolute right-3 top-3.5">
                <Spinner className="w-5 h-5 text-blue-600" />
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Video Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300">
          {isLoading ? (
            <div className="h-[400px] bg-gray-100 p-4">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          ) : (
            <div className="h-[500px] bg-gray-900 flex justify-center items-center">
              {currentVideo.video?.vid ? (
                <div className="w-full h-full">
                  <YouTubePlayerComponent />
                </div>
              ) : (
                <div className="w-full max-w-4xl h-full">
                  <YouTube
                    videoId="dQw4w9WgXcQ"
                    opts={{
                      height: "100%",
                      width: "100%",
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        autoplay: 0,
                      },
                    }}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          )}

          {/* Subtitles Section */}
          <div className="p-6 border-t border-gray-100 max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
                <Skeleton className="h-4 w-2/3 bg-gray-200" />
                <Skeleton className="h-4 w-1/3 bg-gray-200" />
              </div>
            ) : (
              <SubTitleComponent isAuthenticated={true} />
            )}
          </div>
        </div>

        {/* Helper Text */}
        {!searchQuery && !isLoading && (
          <div className="mt-6 text-center text-gray-500">
            <p>Enter a word above to find pronunciation examples</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded-md ${className}`}
      aria-label="Loading..."
    />
  );
}
