import axios from "axios";

const api = {
  searchVideosByWord: async (word: string, page?: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8099/api/v1/video/search",
        {
          params: {
            word: word,
            size: 10,
            page: page ?? 0,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },

  fetchVideosTranscript: async (videoId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8099/api/v1/transcript/${videoId}`,
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },

  addWordIntoFavorite: async (word: string, transcript_id: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/user_func/favorite_word",
        { word, transcript_id },
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
};

export default api;
