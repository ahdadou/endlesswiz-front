import { create } from "zustand";

export interface Transcript {
  vid: string;
  paragraph: string;
  start_time: number;
  end_time: number;
  transcript_id: string;
}

export interface TranscriptStore {
  vid: string;
  currentTranscript: Transcript;
  transcript: Transcript[];
  setTranscript: (transcript: Transcript[]) => void;
  setCurrentTranscript: (currentTranscript: Transcript) => void;
  setVid: (vid: string) => void;
  clearTranscript: () => void;
}

const useTranscriptStore = create<TranscriptStore>((set) => ({
  vid: "",
  currentTranscript: {} as Transcript,
  transcript: [],
  setTranscript: (transcript) => set({ transcript }),
  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),
  setVid: (vid) => set({ vid }),
  clearTranscript: () =>
    set({ transcript: [], currentTranscript: {} as Transcript, vid: "" }),
}));

export default useTranscriptStore;
