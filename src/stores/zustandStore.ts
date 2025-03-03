import { createStore } from "zustand/vanilla";
import { createVideoSlice } from "./useVideosStore";
import { createTranscriptSlice } from "./useTranscriptStore";
import { createUserDataSlice } from "./useUserDataStore";

type TranscriptStore = ReturnType<typeof createTranscriptSlice>;
type VideoSlice = ReturnType<typeof createVideoSlice>;

export type VideoPlayerStoreState = TranscriptStore & VideoSlice;

export const createVideoPlayerZustandStore = () =>
  createStore<VideoPlayerStoreState>()((set) => ({
    ...createTranscriptSlice(set),
    ...createVideoSlice(set),
  }));

type UserDataSlice = ReturnType<typeof createUserDataSlice>;
export type UserDataStoreState = UserDataSlice;

export const createUserDataZustandStore = () =>
  createStore<UserDataStoreState>()((set) => ({
    ...createUserDataSlice(set),
  }));
