import { create } from "zustand";

export interface Transcript {
  vid: string;
  paragraph: string;
  start_time: number;
  end_time: number;
}

export interface TranscriptStore {
  vid: string;
  currentTranscript: string;
  transcript: Transcript[];
  setTranscript: (transcript: Transcript[]) => void;
  setCurrentTranscript: (currentTranscript: string) => void;
  setVid: (vid: string) => void;
  clearTranscript: () => void;
}

const useTranscriptStore = create<TranscriptStore>((set) => ({
  vid: "",
  currentTranscript: "",
  transcript: [],
  setTranscript: (transcript) => set({ transcript }),
  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),
  setVid: (vid) => set({ vid }),
  clearTranscript: () =>
    set({ transcript: [], currentTranscript: "", vid: "" }),
}));

export default useTranscriptStore;
