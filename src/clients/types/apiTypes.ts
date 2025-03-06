export interface LoginState {
  crossDeviceTracking?: string;
  customerNumber?: string;
  customerId?: string;
  email?: string;
  emailHash?: string;
  firstName?: string;
  lastName?: string;
  state: ELoginState;
  sessionId?: string;
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

export interface GetWordResponse {
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

export interface FavoriteVideoResponse {
  favoriteVideoId: string;
  vid: string;
}

export interface GetFavoriteVideoResponse {
  favoriteVideo: FavoriteVideoResponse[];
}

export interface FavoriteWordResponse {
  id: string;
  word: string;
  source: "VIDEO" | "MANUAL";
  example: string;
  description: string;
  createdAt: Date;
  mastered: boolean;
}

export interface DictionaryResponse {
  entries: Entry[];
}

export interface Entry {
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | string; // Add other possible values
  language: "English" | "Spanish" | "Frensh" | string;
  definitions: Definition[];
}

export interface Definition {
  definition: string;
  examples: string[];
}

export interface GetFavoriteWordsResponse {
  favoriteWords: FavoriteWordResponse[];
}

export interface FavoriteWordRequest {
  id?: string;
  word: string;
  source: "VIDEO" | "MANUAL" | string;
  transcript_id?: string;
  description?: string;
  example?: string;
}
