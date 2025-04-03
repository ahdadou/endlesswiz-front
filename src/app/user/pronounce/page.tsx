"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/clients/api/api";
import { useZustandState } from "@/provider/ZustandStoreProvider";
import { Spinner } from "@/Icons/SpinnerIcon";
import { SubTitleComponentV2 } from "@/components/SubTitleComponent/SubTitleComponentV2";
import PronounciationTips from "@/components/pronunciationTips/PronunciationTips";
import {
  AlignVerticalSpaceAround,
  Layout,
  Search,
  Maximize,
  Minimize,
} from "lucide-react";
import YouTubePlayerComponentV2 from "@/components/YouTubePlayerComponent/YouTubePlayerComponentV2";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HEIGHT_MAP = {
  "25": "h-[6.25vh] lg:h-[15vh]",
  "50": "h-[12.5vh] lg:h-[30vh]",
  "75": "h-[18.75vh] lg:h-[45vh]",
  "100": "h-[25vh] lg:h-[60vh]",
};

const useLocalStorage = (
  key: string,
  initialValue: string,
  validator?: (value: string) => boolean
) => {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = localStorage.getItem(key);
    return stored && (!validator || validator(stored)) ? stored : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};

export default function PronouncePage() {
  const { setVideosWithPosition, setHighlitedWord } = useZustandState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();
  const [isZoomed, setIsZoomed] = useState(false);

  const [layoutMode, setLayoutMode] = useLocalStorage(
    "layoutMode",
    "side",
    (v) => ["side", "bottom"].includes(v)
  );
  const [playerHeight, setPlayerHeight] = useLocalStorage(
    "playerHeight",
    "100"
  );

  const fetchVideos = useCallback(
    async (query: string) => {
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
    },
    [setHighlitedWord, setVideosWithPosition]
  );

  const handleZoomToggle = () => setIsZoomed((prev) => !prev);

  useEffect(() => {
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
        player: "w-full h-[70vh] bg-black overflow-hidden relative",
        subtitles:
          "w-full h-[50vh] overflow-auto bg-gray-900 text-white relative",
      };
    if (isMobile || layoutMode === "bottom")
      return {
        container: "flex flex-col gap-4 items-center",
        player: `w-full ${
          HEIGHT_MAP[playerHeight as keyof typeof HEIGHT_MAP]
        } bg-black rounded-[5px] overflow-hidden`,
        subtitles: "w-full h-[50vh] overflow-auto rounded-[5px] relative",
      };

    return layoutMode === "side"
      ? {
          container: "flex flex-col lg:flex-row gap-4",
          player:
            "w-full lg:w-[65%] h-[60vh] bg-black rounded-[5px] overflow-hidden",
          subtitles:
            "w-full lg:w-[35%] h-[60vh] overflow-auto rounded-[5px] relative",
        }
      : {
          container: "flex flex-col gap-4",
          player: `w-full max-w-[1280px] ${
            HEIGHT_MAP[playerHeight as keyof typeof HEIGHT_MAP]
          } bg-black rounded-[5px] overflow-hidden`,
          subtitles:
            "w-full max-w-[1280px] h-[60vh] overflow-auto rounded-[5px] relative",
        };
  };

  const { container, player, subtitles } = getLayoutClasses();

  return (
    <div className="flex flex-col lg:p-8 gap-7">
      <div>
        <h1 className="text-3xl font-bold">Pronunciation Practice</h1>
        <p className="text-muted-foreground">
          Watch videos and improve your pronunciation skills
        </p>
      </div>

      <div className="flex flex-row gap-2 items-center w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for pronunciation videos..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest-100 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && fetchVideos(searchQuery.trim())
            }
          />
        </div>

        <Button
          onClick={() => fetchVideos(searchQuery.trim())}
          className="bg-forest hover:bg-forest-700 text-cream w-20 rounded-lg transition-all hover:scale-105 focus:ring-2 focus:ring-forest-100"
          disabled={isLoading}
        >
          {isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Search"}
        </Button>

        {!isMobile && (
          <Select value={layoutMode} onValueChange={setLayoutMode}>
            <SelectTrigger className="w-15 h-9">
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

        {(isMobile || layoutMode === "bottom") && (
          <Select value={playerHeight} onValueChange={setPlayerHeight}>
            <SelectTrigger className="w-15 h-9 text-sm">
              <SelectValue placeholder="Height" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(HEIGHT_MAP).map((height) => (
                <SelectItem key={height} value={height}>
                  {height}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className={container}>
        <div className={player}>
          <YouTubePlayerComponentV2
            style={`w-full ${
              isZoomed
                ? "h-[50vh]"
                : HEIGHT_MAP[
                    (layoutMode === "bottom"
                      ? playerHeight
                      : "100") as keyof typeof HEIGHT_MAP
                  ]
            }`}
          />
        </div>

        <div className={subtitles}>
          <SubTitleComponentV2
            isAuthenticated
            showCurrentTranscriptInTheMiddle={
              layoutMode !== "bottom" && !isMobile
            }
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

      {error && <p className="text-red-500">{error}</p>}
      <PronounciationTips />
    </div>
  );
}
