import { create } from "zustand";
import { Transcript } from "./useTranscriptStore";

export interface VideosDetailResponse {
  videoId: string;
  vid: string;
  transcriptResponse: Transcript;
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
  currentVideo: {
    video: VideosDetailResponse;
    position: number;
  };
  setVideos: (videos: Videos) => void;
  setCurrentVideo: (position: number, video?: VideosDetailResponse) => void;
  setHighlitedWord: (highlitedWord: string) => void;
  setCurrentVideoIsFavorite: (isFavorite: boolean) => void;
}

const defaultVideosState: Videos = {
  currentPage: 0,
  totalPages: 0,
  pageSize: 0,
  videosDetailResponse: [],
};

const useVideosStore = create<VideosStore>((set) => ({
  highlitedWord: "",
  videos: defaultVideosState,
  currentVideo: {
    video: {} as VideosDetailResponse,
    position: 0,
  },

  setVideos: (videos) =>
    set({
      videos,
      currentVideo: {
        video: videos.videosDetailResponse[0],
        position: 0,
      },
    }),

  setHighlitedWord: (highlitedWord) => set({ highlitedWord }),

  setCurrentVideo: (position, video) =>
    set((state) => ({
      currentVideo: {
        video: video || state.videos.videosDetailResponse[position],
        position,
      },
    })),

  setCurrentVideoIsFavorite: (isFavorite) =>
    set((state) => {
      if (!state.currentVideo.video) return state;

      // Find the existing video reference in the state to prevent unnecessary re-renders
      const videoIndex = state.videos.videosDetailResponse.findIndex(
        (v) => v.videoId === state.currentVideo.video!.videoId
      );

      if (videoIndex === -1) return state; // Video not found, return state as is

      // Avoid creating new object references when possible
      const updatedVideos = [...state.videos.videosDetailResponse];
      updatedVideos[videoIndex] = {
        ...updatedVideos[videoIndex],
        isFavorite,
      };

      // Mutate only the isFavorite property, keeping reference intact where possible
      state.currentVideo.video.isFavorite = isFavorite;

      return {
        videos: { ...state.videos, videosDetailResponse: updatedVideos },
        currentVideo: state.currentVideo, // Ensures reference remains unchanged
      };
    }),
}));

export default useVideosStore;
