import { TOKEN } from "@/middleware";
import getBaseUrl from "@/utils/getBaseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";
import axiosClient from "./axiosClient";
import {
  RegisterRequest,
  SearchWordResponse,
  TranscriptResponse,
} from "../types/apiTypes";

const api = {
  searchVideosByWord: async (word: string, page?: number) => {
    try {
      const response = await axios.get(`${getBaseUrl()}/video/search`, {
        params: {
          word: word,
          size: 10,
          page: page ?? 0,
        },
      });
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  fetchVideosTranscript: async (videoId: string) => {
    try {
      const response = await axiosClient.get<TranscriptResponse[]>(
        `${getBaseUrl()}/transcript/${videoId}`
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
      const response = await axios.get(
        `http://localhost:8099/api/v1/users/login-state`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          withCredentials: true, // Ensures cookies are sent if needed
        }
      );

      return response.data;
    } catch (error) {
      console.error("Token validation failed:", error);
      return false;
    }
  },
  registrationConfirmation: async (token: string | undefined) => {
    if (!token) return false;
    try {
      const response = await axios.get(
        `http://localhost:8099/api/v1/auth/registrationConfirmation`,
        {
          params: {
            token,
          },
          withCredentials: true, // Ensures cookies are sent if needed
        }
      );

      return response.status === 200;
    } catch (error) {
      console.error("registration confirmation failed:", error);
      return false;
    }
  },
  resentTokenByEmail: async (email: string | undefined) => {
    if (!email) return false;
    try {
      const response = await axios.get(
        `http://localhost:8099/api/v1/auth/resentTokenByEmail`,
        {
          params: {
            email,
          },
          withCredentials: true,
        }
      );

      return response.status === 200;
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
        }
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  getFavoriteVideos: async (videoId: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8099/api/v1/favorite_video",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  addVideoIntoFavorite: async (videoId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/favorite_video",
        { video_id: videoId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deleteVideoIntoFavorite: async (videoId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8099/api/v1/favorite_video/${videoId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  addWordIntoFavorite: async (word: string, transcript_id: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8099/api/v1/favorite_word",
        { word, transcript_id },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deleteWordIntoFavorite: async (word_id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8099/api/v1/favorite_word/${word_id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
};

export default api;
