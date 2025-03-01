import axios from "axios";
import Cookies from "js-cookie";

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
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:8099/api/v1/user_func/favorite_word",
        { word, transcript_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  register: async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/auth/register",
        data,
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  validateToken: async (token: string | undefined) => {
    if (!token) return false;
    try {
      const response = await axios.get(
        `http://localhost:8099/api/v1/users/validate_token`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // Ensures cookies are sent if needed
        },
      );

      return response.status === 200;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  },
};

export default api;
