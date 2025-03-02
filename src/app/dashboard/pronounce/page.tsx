// app/pronounce/page.tsx
"use client";

import { useCallback, useState } from "react";
import YouTube from "react-youtube";
import SearchBar from "@/components/SearchBar";
import api from "@/clients/api/api";
import useVideosStore from "@/stores/useVideosStore";
import YouTubePlayerComponent from "@/components/YouTubePlayerComponent/YouTubePlayerComponent";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";

export default function PronounceWordPage() {
  const { currentVideo, setVideos, setHighlitedWord } = useVideosStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [wordSearch, setWordSearch] = useState<string>("");

  const [error, setError] = useState("");

  const fetchVideos = useCallback(
    async (wordSearch: string) => {
      try {
        setIsLoading(true);
        const response = await api.searchVideosByWordAndUser(wordSearch);
        setHighlitedWord(wordSearch);
        setVideos(response);
      } catch (err) {
        setError("Failed to connect to the server");
      } finally {
        setIsLoading(false);
      }
    },
    [wordSearch],
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());
    fetchVideos(query.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
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

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 h-[60vh]">
          <div className="bg-gray-50 rounded-2xl shadow-lg p-6 h-full">
            {currentVideo.video?.vid ? (
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
          <SubTitleComponent
            onAddToFavorite={(word) => console.log("Add to favorite:", word)}
            isAuthenticated={true} // Replace with actual auth state
            favorites={new Set(["example"])} // Replace with actual favorites
          />
        </div>
      </div>
    </div>
  );
}
