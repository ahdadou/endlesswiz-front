"use client";
import api from "@/clients/api/api";
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
  const {
    transcript,
    setTranscript,
    setCurrentTranscript,
    currentTranscript,
    setVid,
    vid,
  } = useTranscriptStore();

  const fetchVideos = useCallback(async () => {
    const response = await api.searchVideosByWord(wordSearch);
    setHighlitedWord(wordSearch);
    setVideos(response);
    setCurrentVideoPosition(0);
  }, [wordSearch]);

  return (
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5">
      <div className="h-[60%] md:h-[80%] w-[100%] md:w-[80%] p-5 md:px-24 flex justify-center flex-col bg-amber-300">
        <div className="flex h-[10%] w-full mb-0">
          <input
            type="text"
            placeholder="Search for..."
            className="border-2 border-gray-300 p-2 w-full text-black rounded-none"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)}
          />
          <Button
            style="text-white h-full cursor-pointer rounded-none "
            onClick={() => {
              fetchVideos();
            }}
          >
            Search
          </Button>
        </div>
        <div className="w-[100%] h-[100%] md:h-[80%]">
          {videos?.videosDetailResponse.length > 0 && (
            <YouTubePlayerComponent />
          )}
        </div>
        <SubTitleComponent
          style="h-[100px] bg-blue-900"
          paragraph={currentTranscript}
          highlighted_word={highlitedWord}
        />
      </div>
    </div>
  );
}
