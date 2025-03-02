"use client";
import api from "@/clients/api/api";
import ShinyText from "@/components/animations/ShinyText/ShinyText";
import { Button } from "@/components/Button";
import { SubTitleComponent } from "@/components/SubTitleComponent/SubTitleComponent";
import YouTubePlayerComponent from "@/components/YouTubePlayerComponent/YouTubePlayerComponent";
import useTranscriptStore from "@/stores/useTranscriptStore";
import useVideosStore from "@/stores/useVideosStore";
import { useCallback, useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [wordSearch, setWordSearch] = useState<string>("");
  const {
    videos,
    setVideos,
    setHighlitedWord,
    setCurrentVideoPosition,
    highlitedWord,
  } = useVideosStore();
  const { currentTranscript } = useTranscriptStore();

  const fetchVideos = useCallback(async () => {
    const response = await api.searchVideosByWord(wordSearch);
    setHighlitedWord(wordSearch);
    setVideos(response);
    setCurrentVideoPosition(0);
  }, [wordSearch]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 pt-32">
      <div className="w-full max-w-6xl h-[90vh] flex flex-col gap-4 backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-4">
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Search for keywords..."
            className="flex-1 px-6 py-4 rounded-lg bg-white/5 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 text-white placeholder-white/50 transition-all outline-none"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchVideos()}
          />
          <Button
            style="h-full px-8 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            onClick={fetchVideos}
          >
            <ShinyText
              text="Search"
              speed={3}
              className="text-lg font-semibold"
            />
          </Button>
        </div>

        <div className="relative flex-1 rounded-xl overflow-hidden shadow-xl">
          {videos?.videosDetailResponse.length > 0 ? (
            <YouTubePlayerComponent />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              <span className="text-white/50 text-lg">
                Enter a search term to begin
              </span>
            </div>
          )}
        </div>
        {/* <SubTitleComponent
          style="min-h-[100px] backdrop-blur-lg bg-black/30 border border-white/10 rounded-xl p-4 shadow-lg"
          transcript={currentTranscript}
          highlighted_word={highlitedWord}
        /> */}

        <SubTitleComponent
          transcript={currentTranscript}
          highlightedWord={wordSearch}
          onAddToFavorite={(word) => console.log("Add to favorite:", word)}
          isAuthenticated={true} // Replace with actual auth state
          favorites={new Set(["example"])} // Replace with actual favorites
        />
      </div>
    </div>
  );
}
