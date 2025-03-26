"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/clients/api/api";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { Spinner } from "@/Icons/SpinnerIcon";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";
import PronounciationTips from "@/components/pronunciationTips/PronunciationTips";
import { Search } from "lucide-react";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PronouncePage() {
  const { setVideosWithPosition, setHighlitedWord } = useZustandState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  const fetchVideos = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await api.getVideosByUser(query);
      setHighlitedWord(query);
      response && setVideosWithPosition(response);
    } catch {
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(searchQuery.trim());
  };

  return (
    <div className="flex flex-col lg:p-8 gap-7">
      <div>
        <h1 className="text-3xl font-bold">Pronunciation Practice</h1>
        <p className="text-muted-foreground">
          Watch videos and improve your pronunciation skills
        </p>
      </div>

      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for pronunciation videos..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest-100 transition-all duration-200 ease-in-out"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
        </div>
        <Button
          onClick={(e) => handleSearch(e)}
          className="bg-forest hover:bg-forest-700 text-cream w-20 text-center rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest-100 focus:ring-offset-2"
        >
          {isLoading ? (
            <Spinner className="w-5 h-5 text-cream animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-[100%]">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative bg-black rounded-md overflow-hidden h-[25vh] lg:h-[60vh] w-full lg:w-[65%]">
            <YouTubePlayerComponentV2 />
          </div>
          <div className="relative rounded-md aspect-video h-[50vh] lg:h-[60vh] w-full lg:w-[35%]">
            <SubTitleComponentV2
              isAuthenticated={true}
              showCurrentTranscriptInTheMiddle={!isMobile}
            />
          </div>
        </div>
      </div>

      <PronounciationTips />
    </div>
  );
}
