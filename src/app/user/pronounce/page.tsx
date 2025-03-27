"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/clients/api/api";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { Spinner } from "@/Icons/SpinnerIcon";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";
import PronounciationTips from "@/components/pronunciationTips/PronunciationTips";
import { AlignVerticalSpaceAround, Layout, Search } from "lucide-react";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function PronouncePage() {
  const { setVideosWithPosition, setHighlitedWord } = useZustandState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();

  // State for layout mode (web only), default to 'side'
  const [layoutMode, setLayoutMode] = useState(() => {
    const saved = localStorage.getItem("layoutMode");
    return saved ? saved : "side";
  });

  // State for player height percentage, default to '50'
  const [playerHeight, setPlayerHeight] = useState<string>(() => {
    const saved = localStorage.getItem("playerHeight");
    return saved ? saved : "50";
  });

  // Save layoutMode to local storage (web only)
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("layoutMode", layoutMode);
    }
  }, [layoutMode, isMobile]);

  // Save playerHeight to local storage
  useEffect(() => {
    localStorage.setItem("playerHeight", playerHeight);
  }, [playerHeight]);

  // Map percentage to height, with 100% as h-[25vh] lg:h-[60vh]
  const heightMap = {
    "25": "h-[6.25vh] lg:h-[15vh]",  // 25% of 25vh/60vh
    "50": "h-[12.5vh] lg:h-[30vh]",  // 50% of 25vh/60vh
    "75": "h-[18.75vh] lg:h-[45vh]", // 75% of 25vh/60vh
    "100": "h-[25vh] lg:h-[60vh]",   // 100% matches normal version
  };

  const fetchVideos = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      setIsLoading(true);
      setError("");
      try {
        const response = await api.getVideosByUser(query);
        setHighlitedWord(query);
        if (response) {
          setVideosWithPosition(response); // Update state for video player
        }
      } catch {
        setError("Failed to connect to the server");
      } finally {
        setIsLoading(false);
      }
    },
    [setHighlitedWord, setVideosWithPosition]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideos(searchQuery.trim());
  };

  return (
    <div className="flex flex-col lg:p-8 gap-7">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Pronunciation Practice</h1>
        <p className="text-muted-foreground">
          Watch videos and improve your pronunciation skills
        </p>
      </div>

      {/* Search Bar and Controls */}
      <div className="flex flex-row gap-2 items-center w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for pronunciation videos..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest-100 transition-all duration-200 ease-in-out"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e);
            }}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-forest hover:bg-forest-700 text-cream w-20 text-center rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest-100 focus:ring-offset-2 flex-shrink-0"
        >
          {isLoading ? (
            <Spinner className="w-5 h-5 text-cream animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
        {/* Layout Dropdown (Web Only) */}
        {!isMobile && (
          <Select value={layoutMode} onValueChange={setLayoutMode}>
            <SelectTrigger className="w-15 h-9 flex-shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="side">
                <Layout className="h-4 w-4" />
              </SelectItem>
              <SelectItem value="bottom">
                <AlignVerticalSpaceAround className="h-4 w-4" />
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        {/* Height Dropdown (Mobile Always, Web only in 'bottom' mode) */}
        {(isMobile || layoutMode === "bottom") && (
          <Select value={playerHeight} onValueChange={setPlayerHeight}>
            <SelectTrigger className="w-15 h-9 text-sm flex-shrink-0">
              <SelectValue placeholder="Height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25%</SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Video and Subtitle Section */}
      <div className="flex flex-col gap-4 w-full">
        <div
          className={
            isMobile || layoutMode === "bottom"
              ? "flex flex-col gap-4 items-center"
              : "flex flex-col lg:flex-row gap-4"
          }
        >
          {/* Video Player Container */}
          <div
            className={
              isMobile
              ? `w-full ${heightMap[playerHeight as keyof typeof heightMap]} bg-black rounded-md overflow-hidden`
              : layoutMode === "side"
              ? "w-full lg:w-[65%] h-[60vh] bg-black rounded-md overflow-hidden"
              : `w-full max-w-[1280px] ${heightMap[playerHeight as keyof typeof heightMap]} bg-black rounded-md overflow-hidden`
            }
          >
            <YouTubePlayerComponentV2 style={`w-full ${heightMap[playerHeight as keyof typeof heightMap]}`}/>
          </div>

          {/* Subtitle Container */}
          <div
            className={
              isMobile
                ? "w-full h-[50vh] overflow-auto rounded-md"
                : layoutMode === "side"
                ? "w-full lg:w-[35%] h-[60vh] overflow-auto rounded-md"
                : "w-full max-w-[1280px] h-[60vh] overflow-auto rounded-md"
            }
          >
            <SubTitleComponentV2
              isAuthenticated={true}
              showCurrentTranscriptInTheMiddle={layoutMode !== "bottom" && !isMobile}
            />
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <PronounciationTips />
    </div>
  );
}