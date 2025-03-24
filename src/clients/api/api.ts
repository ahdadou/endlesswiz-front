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
  GetWordResponse,
  TranscriptResponse,
  PracticeSetRequest,
  PracticeWordRequest,
  PracticeSetResponse,
  PracticeWordResponse,
  GetPracticeSetDetailsResponse,
  PutPracticeSetDetailsRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  UpdateUserSettingsRequest,
  LemonSqueezyCheckoutRequest,
  LemonSqueezyCheckoutResponse,
  LoginState,
  ELoginState,
} from "../types/apiTypes";

const api = {
  searchVideosByWord: async (word: string, page?: number) => {
    try {
      const response = await axiosClient.get<GetWordResponse>(
        `${getBaseUrl()}/video/search`,
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

  // USER
  register: async (req: RegisterRequest) => {
    try {
      const response = await axios.post(`${getBaseUrl()}/auth/register`, req);
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  loginState: async () => {
    try {
      const response = await axiosClient.get<LoginState>(
        `${getBaseUrl()}/users/login-state`
      );
      return {
        ...response,
        state: ELoginState.LOGGED_IN,
      };
    } catch (error) {
      console.log("----loginState error :", error);
      return {
        state: ELoginState.NOT_LOGGED_IN,
      };
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
        }
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
        }
      );
      return response;
    } catch (error) {
      console.error("resent Token By Email:", error);
      return false;
    }
  },
  uploadUserImage: async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosClient.patch<string>(
        `${getBaseUrl()}/users/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("upload user image failed:", error);
      throw error; // Re-throw the error after logging it
    }
  },
  updateUserProfile: async (req: UpdateUserRequest) => {
    try {
      const response = await axiosClient.put<string>(
        `${getBaseUrl()}/users`,
        req
      );
      return response;
    } catch (error) {
      console.error("update user profile failed:", error);
      throw error; // Re-throw the error after logging it
    }
  },
  updateUserSettings: async (req: UpdateUserSettingsRequest) => {
    try {
      const response = await axiosClient.post<string>(
        `${getBaseUrl()}/settings`,
        req
      );
      return response;
    } catch (error) {
      console.error("update user settings failed:", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deleteUserProfile: async () => {
    try {
      const response = await axiosClient.delete<string>(
        `${getBaseUrl()}/users/upload-image`
      );
      return response;
    } catch (error) {
      console.error("delete user profile failed:", error);
      throw error; // Re-throw the error after logging it
    }
  },
  changePassword: async (req: ChangePasswordRequest) => {
    try {
      const response = await axiosClient.patch<string>(
        `${getBaseUrl()}/users/change-password`,
        req
      );
      return response;
    } catch (error) {
      console.error("change password failed:", error);
      throw error; // Re-throw the error after logging it
    }
  },
  // VIDEO
  getVideosByUser: async (
    word?: string,
    page?: number,
    category?: string,
    favorites?: boolean
  ) => {
    try {
      const response = await axiosClient.get<GetWordResponse>(
        `${getBaseUrl()}/video`,
        {
          params: {
            word: word,
            size: 10,
            page: page ?? 0,
            category: category?.toUpperCase(),
            isFavorite: favorites,
          },
        }
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
    }
  },
  getFavoriteVideos: async () => {
    try {
      const response = await axiosClient.get<GetFavoriteVideoResponse>(
        `${getBaseUrl()}/favorite_video`
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
        { video_id: videoId }
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
        `${getBaseUrl()}/favorite_video/${videoId}`
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
          example: req.example,
          description: req.description,
        }
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
          description: req.description,
          source: req.source,
        }
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
        `${getBaseUrl()}/favorite_word/${word_id}`
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
        `${getBaseUrl()}/favorite_word`
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
        `${getBaseUrl()}/transcript/dictionary/${word}`
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  fetchPracticeSets: async () => {
    try {
      const response = await axiosClient.get<PracticeSetResponse[]>(
        `${getBaseUrl()}/practice_set`
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  // Practice set
  fetchPracticeSetDetailsById: async (setId: string) => {
    try {
      const response = await axiosClient.get<GetPracticeSetDetailsResponse>(
        `${getBaseUrl()}/practice_set/${setId}`
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deletePracticeSet: async (id: string) => {
    try {
      const response = await axiosClient.delete<boolean>(
        `${getBaseUrl()}/practice_set/${id}`
      );

      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error;
    }
  },
  addPracticeSet: async (req: PracticeSetRequest) => {
    try {
      const response = await axiosClient.post<PracticeSetResponse>(
        `${getBaseUrl()}/practice_set`,
        req
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  updatePracticeSetDetails: async (
    setId: string,
    req: PutPracticeSetDetailsRequest
  ) => {
    try {
      const response = await axiosClient.put<PracticeSetResponse>(
        `${getBaseUrl()}/practice_set/${setId}`,
        req
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  // Practice word
  fetchPracticeWords: async (setId: string) => {
    try {
      const response = await axiosClient.get<PracticeWordResponse[]>(
        `${getBaseUrl()}/practice_word/${setId}`
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  deletePracticeWord: async (id: string) => {
    try {
      const response = await axiosClient.delete<boolean>(
        `${getBaseUrl()}/practice_word/${id}`
      );

      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error;
    }
  },
  addPracticeWord: async (req: PracticeWordRequest) => {
    try {
      const response = await axiosClient.post<PracticeWordResponse>(
        `${getBaseUrl()}/practice_word`,
        req
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
  updatePracticeWord: async (req: PracticeWordRequest) => {
    try {
      const response = await axiosClient.put<PracticeWordResponse>(
        `${getBaseUrl()}/practice_word`,
        req
      );
      return response;
    } catch (error: unknown) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },

  // Payment
  lemonSqueezyCheckout: async (req: LemonSqueezyCheckoutRequest) => {
    try {
      console.log("Starting checkout...", req);

      const response = await axiosClient.post<LemonSqueezyCheckoutResponse>(
        `${getBaseUrl()}/payment/checkout`,
        req
      );
      return response;
    } catch (error) {
      console.error("### Error", error);
      throw error; // Re-throw the error after logging it
    }
  },
};

export default api;
