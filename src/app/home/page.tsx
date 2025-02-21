"use client";
import api from "@/clients/api/api";
import YouTubePlayerComponent from "@/components/YouTubePlayer";
import { useCallback, useState } from "react";

export interface ParagraphsDetail {
  videoId: string;
  vid: string;
  paragraph: string;
  start_time: number;
}

interface VideoSearchResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  paragraphsDetail: ParagraphsDetail[];
}

type Props = {};

export default function Home({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [videos, setVideos] = useState<VideoSearchResponse>({
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    paragraphsDetail: [],
  });

  const fetchVideos = useCallback(async () => {
    const videos = await api.searchVideosByWord(search);
    setVideos(videos);
  }, [search]);

  return (
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5">
      <div className="h-[71%] w-[60%] bg-yellow-200">
        <div className="flex h-[15%] w-[100%]">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white p-2 rounded-lg ml-2"
            onClick={() => {
              fetchVideos();
              console.log("### videos", videos);
            }}
          >
            Search
          </button>
        </div>

        <div className="h-[86%] w-[100%] bg-red-400">
          {videos?.paragraphsDetail.length > 0 && (
            <YouTubePlayerComponent
              video={videos.paragraphsDetail[0]}
              search={search}
            />
          )}
        </div>
      </div>
    </div>
  );
}
