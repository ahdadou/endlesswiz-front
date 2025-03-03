export interface LoginState {
  crossDeviceTracking?: string;
  customerNumber?: string;
  customerId?: string;
  email?: string;
  emailHash?: string;
  firstName?: string;
  lastName?: string;
  state: ELoginState;
}

export enum ELoginState {
  LOGGED_IN = "LOGGED_IN",
  NOT_LOGGED_IN = "NOT_LOGGED_IN",
  ANONYMOUS_USER = "ANONYMOUS_USER",
}

export interface TranscriptResponse {
  transcriptId: string;
  paragraph: string;
  startTime: number;
  endTime: number;
}

export interface SearchWordResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  videosDetailResponse: VideosDetailResponse[];
}

export interface VideosDetailResponse {
  videoId: string;
  vid: string;
  transcriptResponse: TranscriptResponse;
  duration: number;
  isFavorite: boolean;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
