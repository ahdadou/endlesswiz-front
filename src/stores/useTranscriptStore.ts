import { TranscriptResponse } from "@/clients/types/apiTypes";

export const createTranscriptSlice = (set: any) => ({
  vid: "",
  currentTranscript: {} as TranscriptResponse,
  transcript: [],
  setTranscript: (transcript: TranscriptResponse[]) => set({ transcript }),
  setCurrentTranscript: (currentTranscript: TranscriptResponse) =>
    set({ currentTranscript }),
  setVid: (vid: string) => set({ vid }),
  clearTranscript: () =>
    set({
      transcript: [],
      currentTranscript: {} as TranscriptResponse,
      vid: "",
    }),
});
