"use client";
import api from "@/clients/api/api";
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
    // setCurrentVideo(response.videosDetailResponse[0]);
    setCurrentVideoPosition(0)
  }, [wordSearch]);

  return (
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5">
      <div className="h-[71%] w-[60%] bg-yellow-200">
        <div className="flex h-[15%] w-[100%]">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
            value={wordSearch}
            onChange={(e) => setWordSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-lg ml-2"
            onClick={() => {
              fetchVideos();
            }}
          >
            Search
          </button>
        </div>

        <div className="h-[86%] w-[100%] bg-red-400">
          {videos?.videosDetailResponse.length > 0 && (
            <YouTubePlayerComponent />
          )}
        </div>
      </div>
    </div>
  );
}
