import {
  GetWordResponse,
  VideosDetailResponse,
} from "@/clients/types/apiTypes";

const defaultVideosState: GetWordResponse = {
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

  setVideosWithPosition: (videos: GetWordResponse, position?: number) =>
    set({
      videos,
      currentVideo: {
        video: videos.videosDetailResponse[position || 0],
        position: position || 0,
      },
    }),

  setVideos: (videos: GetWordResponse) =>
    set({
      videos,
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

      const videoId = state.currentVideo.video.videoId;

      // Update all videos that share the same videoId
      const updatedVideos = state.videos.videosDetailResponse.map(
        (v: VideosDetailResponse) =>
          v.videoId === videoId ? { ...v, isFavorite } : v,
      );

      // Ensure the current video is also updated
      state.currentVideo.video.isFavorite = isFavorite;

      return {
        videos: { ...state.videos, videosDetailResponse: updatedVideos },
        currentVideo: state.currentVideo,
      };
    }),
});
