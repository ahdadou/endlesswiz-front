import axios from "axios";

const api = {
  searchVideosByWord: async (word: string, page?: number) => {
    try {
      const response = await axios.get("http://localhost:8099/video/search", {
        params: {
          word: word,
          size: 10,
          page: page ?? 0
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },

  fetchVideosTranscript: async (videoId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8099/transcript/${videoId}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
};

export default api;
