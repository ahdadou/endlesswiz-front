import {
  SearchWordResponse,
  VideosDetailResponse,
} from "@/clients/types/apiTypes";

const defaultVideosState: SearchWordResponse = {
  currentPage: 0,
  totalPages: 0,
  pageSize: 0,
  videosDetailResponse: [],
};

export const createVideoSlice = (set: any) => ({
  highlitedWord: "",
  videos: defaultVideosState,
  currentVideo: {
    video: {} as VideosDetailResponse,
    position: 0,
  },

  setVideos: (videos: SearchWordResponse) =>
    set({
      videos,
      currentVideo: {
        video: videos.videosDetailResponse[0],
        position: 0,
      },
    }),

  setHighlitedWord: (highlitedWord: string) => set({ highlitedWord }),

  setCurrentVideo: (position: number, video?: VideosDetailResponse) =>
    set((state: any) => ({
      currentVideo: {
        video: video || state.videos.videosDetailResponse[position],
        position,
      },
    })),

  setCurrentVideoIsFavorite: (isFavorite: boolean) =>
    set((state: any) => {
      if (!state.currentVideo.video) return state;

      // Find the existing video reference in the state to prevent unnecessary re-renders
      const videoIndex = state.videos.videosDetailResponse.findIndex(
        (v: VideosDetailResponse) =>
          v.videoId === state.currentVideo.video!.videoId
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
});
