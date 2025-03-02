import { create } from "zustand";

export interface Transcript {
  vid: string;
  paragraph: string;
  start_time: number;
  end_time: number;
  transcript_id: string;
}

export const createTranscriptSlice = (set: any) => ({
  vid: "",
  currentTranscript: {} as Transcript,
  transcript: [],
  setTranscript: (transcript: Transcript) => set({ transcript }),
  setCurrentTranscript: (currentTranscript: Transcript) =>
    set({ currentTranscript }),
  setVid: (vid: string) => set({ vid }),
  clearTranscript: () =>
    set({ transcript: [], currentTranscript: {} as Transcript, vid: "" }),
});
