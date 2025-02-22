import { stat } from "fs";
import { create } from "zustand";

export interface VideosDetailResponse {
  videoId: string;
  vid: string;
  paragraph: string;
  start_time: number;
  duration: number;
}

export interface Videos {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  videosDetailResponse: VideosDetailResponse[];
}

interface VideosStore {
  highlitedWord: string;
  videos: Videos;
  currentVideo: VideosDetailResponse | null;
  currentVideoPosition: number;
  setVideos: (videos: Videos) => void;
  setCurrentVideo: (currentVideo: VideosDetailResponse | null) => void;
  setHighlitedWord: (highlitedWord: string) => void;
  setCurrentVideoPosition: (currentVideoPosition: number) => void;
}

const useVideosStore = create<VideosStore>((set) => ({
  highlitedWord: "",
  videos: {
    currentPage: 0,
    totalPages: 0,
    pageSize: 0,
    videosDetailResponse: [],
  },
  currentVideo: null,
  currentVideoPosition: 0,
  setVideos: (videos) => set({ videos }),
  setHighlitedWord: (highlitedWord) => set({ highlitedWord }),
  setCurrentVideo: (currentVideo) => set({ currentVideo }),
  setCurrentVideoPosition: (currentVideoPosition) =>
    set((state) => {
      console.log('### state :', state)
      return {
        ...state,
        currentVideoPosition,
        currentVideo: state.videos.videosDetailResponse[currentVideoPosition],
      };
    }),
}));

export default useVideosStore;
