"use client";
import api from "@/clients/api/api";
import ShinyText from "@/components/animations/ShinyText/ShinyText";
import { Button } from "@/components/Button";
import { SubTitleComponent } from "@/components/SubTitleComponent";
import YouTubePlayerComponent from "@/components/YoutubePlayer/YouTubePlayer";
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
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5 bg-gradient-to-br bg-white p-6 relative z-10">
      <div className="z-[100] h-[60%] md:h-[80%] w-[100%] md:w-[80%] md:p-5 md:px-24 flex justify-center flex-col  backdrop-blur-md rounded-xl shadow-xl border border-white/20">
        <div className="flex h-[10%] w-full mb-0 bg-white/10 border border-white/30 rounded-lg overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search for..."
            className="flex-1 p-3 text-black placeholder-gray-600 focus:outline-none"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)}
          />
          <Button
            style="text-white h-full cursor-pointer rounded-none"
            onClick={() => {
              fetchVideos();
            }}
          >
            <ShinyText
              text="Search!"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </Button>
        </div>
        <div className="w-[100%] h-[100%] md:h-[80%] overflow-hidden shadow-lg">
          {videos?.videosDetailResponse.length > 0 ? (
            <YouTubePlayerComponent />
          ) : (
            <div className="bg-black h-full w-full"></div>
          )}
        </div>
        <SubTitleComponent
          style="h-[100px] bg-black/50 text-white p-4 rounded-none shadow-md"
          transcript={currentTranscript}
          highlighted_word={highlitedWord}
        />
      </div>
    </div>
  );
}
