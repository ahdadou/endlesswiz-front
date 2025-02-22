"use client";
import api from "@/clients/api/api";
import { Button } from "@/components/Button";
import YouTubePlayerComponent from "@/components/YouTubePlayer";
import useVideosStore from "@/stores/useVideosStore";
import { useCallback, useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [wordSearch, setWordSearch] = useState<string>("");
  const { videos, setVideos, setHighlitedWord, setCurrentVideoPosition, setCurrentVideo } =
    useVideosStore();

  const fetchVideos = useCallback(async () => {
    const response = await api.searchVideosByWord(wordSearch);
    setHighlitedWord(wordSearch);
    setVideos(response);
    setCurrentVideoPosition(0)
  }, [wordSearch]);

  return (
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5">
      <div className="h-[70%] w-[100%] p-5 md:px-24 bg-yellow-200">
        <div className="flex h-[10%] w-full mb-0">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)}
          />
          <Button
            style="text-white h-full cursor-pointer"
            onClick={() => {
              fetchVideos();
            }}
          >
            Search
          </Button>
        </div>

        <div className="h-[86%] w-[100%] bg-red-700">
          {videos?.videosDetailResponse.length > 0 && (
            <YouTubePlayerComponent />
          )}
        </div>
      </div>
    </div>
  );
}
