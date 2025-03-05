import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import axiosClient from "./axiosClient";
import {
  DictionaryResponse,
  FavoriteVideoResponse,
  FavoriteWordRequest,
  FavoriteWordResponse,
  GetFavoriteVideoResponse,
  GetFavoriteWordsResponse,
  RegisterRequest,
  SearchWordResponse,
  TranscriptResponse,
} from "../types/apiTypes";

const api = {
  searchVideosByWord: async (word: string, page?: number) => {
    try {
      const response = await axiosClient.get<SearchWordResponse>(
        `${getBaseUrl()}/video/search`,
        {
          params: {
            word: word,
            size: 10,
            page: page ?? 0,
          },
        },
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  fetchVideosTranscript: async (videoId: string) => {
    try {
      const response = await axiosClient.get<TranscriptResponse[]>(
        `${getBaseUrl()}/transcript/${videoId}`,
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  register: async (req: RegisterRequest) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/auth/register`, req);
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  loginState: async (token?: string | undefined) => {
    try {
      const response = await axiosClient.get<SearchWordResponse>(
        `${getBaseUrl()}/users/login-state`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
      );
      return response;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  },
  registrationConfirmation: async (token: string | undefined) => {
    if (!token) return false;
    try {
      const response = await axiosClient.get<string>(
        `${getBaseUrl()}/auth/registrationConfirmation`,
        {
          params: {
            token,
          },
        },
      );
      return response;
    } catch (error) {
      console.error("registration confirmation failed:", error);
      return false;
    }
  },
  resentTokenByEmail: async (email: string | undefined) => {
    if (!email) return false;
    try {
      const response = await axiosClient.get<string>(
        `${getBaseUrl()}/auth/resentTokenByEmail`,
        {
          params: {
            email,
          },
        },
      );
      return response;
    } catch (error) {
      console.error("resent Token By Email:", error);
      return false;
    }
  },
  searchVideosByWordAndUser: async (word: string, page?: number) => {
    try {
      const response = await axiosClient.get<SearchWordResponse>(
        `${getBaseUrl()}/user_func/search`,
        {
          params: {
            word: word,
            size: 10,
            page: page ?? 0,
          },
        },
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  getFavoriteVideos: async () => {
    try {
      const response = await axiosClient.get<GetFavoriteVideoResponse>(
        `${getBaseUrl()}/favorite_video`,
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  addVideoIntoFavorite: async (videoId: string) => {
    try {
      const response = await axiosClient.post<FavoriteVideoResponse>(
        `${getBaseUrl()}/favorite_video`,
        { video_id: videoId },
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deleteVideoIntoFavorite: async (videoId: string) => {
    try {
      const response = await axiosClient.delete<boolean>(
        `${getBaseUrl()}/favorite_video/${videoId}`,
      );

      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  addWordIntoFavorite: async (req: FavoriteWordRequest) => {
    try {
      const response = await axiosClient.post<FavoriteWordResponse>(
        `${getBaseUrl()}/favorite_word`,
        {
          word: req.word,
          transcript_id: req.transcript_id,
          source: req.source,
        },
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  updateWordIntoFavorite: async (req: FavoriteWordRequest) => {
    try {
      const response = await axiosClient.put<FavoriteWordResponse>(
        `${getBaseUrl()}/favorite_word`,
        {
          id: req.id,
          word: req.word,
          example: req.example,
          source: req.source,
        },
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deleteWordIntoFavorite: async (word_id: string) => {
    try {
      const response = await axiosClient.delete<boolean>(
        `${getBaseUrl()}/favorite_word/${word_id}`,
      );

      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  fetchFavoriteWord: async () => {
    try {
      const response = await axiosClient.get<GetFavoriteWordsResponse>(
        `${getBaseUrl()}/favorite_word`,
      );

      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  fetchWordDictionary: async (word: string) => {
    try {
      const response = await axiosClient.get<DictionaryResponse>(
        `${getBaseUrl()}/transcript/dictionary/${word}`,
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
};

export default api;
