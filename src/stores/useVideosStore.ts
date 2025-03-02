import { stat } from "fs";
import { create } from "zustand";

export interface VideosDetailResponse {
  videoId: string;
  vid: string;
  paragraph: string;
  start_time: number;
  duration: number;
  isFavorite: boolean;
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
  serCurrentVideoIsFavorite: (isFavorite: boolean) => void;
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
  serCurrentVideoIsFavorite: (isFavorite) =>
    set((state) => {
      if (state.currentVideo) {
        return {
          ...state,
          videos: {
            ...state.videos,
            videosDetailResponse: state.videos.videosDetailResponse.map(
              (item) => {
                if (item.videoId === state.currentVideo?.videoId) {
                  item.isFavorite = isFavorite;
                }
                return item;
              },
            ),
          },
          currentVideo: { ...state.currentVideo, isfavotite: isFavorite },
        };
      }
      return state;
    }),
  setCurrentVideoPosition: (currentVideoPosition) =>
    set((state) => {
      return {
        ...state,
        currentVideoPosition,
        currentVideo: state.videos.videosDetailResponse[currentVideoPosition],
      };
    }),
}));

export default useVideosStore;
