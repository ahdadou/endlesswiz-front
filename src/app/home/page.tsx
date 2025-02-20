"use client";
import api from "@/clients/api/api";
import YouTubePlayerComponent from "@/components/YouTubePlayer";
import { useCallback, useState } from "react";

export interface ParagraphsDetail {
    videoId: string;
    vid: string;
    paragraph: string;
    time: number;
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
  const [videos, setVideos] = useState<VideoSearchResponse | undefined>(undefined);

  const fetchVideos = useCallback(async () => {
    const videos = await api.searchVideosByWord(search);
    setVideos(videos);
  }, [search]);



  return (
    <div className="h-[100%] w-full flex justify-center items-center flex-col gap-5">
      <div className=" w-[800px] flex">
        <input
          type="text"
          placeholder="Search"
          className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg ml-2"
          onClick={() => {
            fetchVideos();
            console.log("### videos", videos);
          }}
        >
          Search
        </button>
      </div>

      <div className="bg-gray-200 h-[400px] w-[800px]">
        {videos && <YouTubePlayerComponent video={videos.paragraphsDetail[0]}/>}
      </div>
    </div>
  );
}
