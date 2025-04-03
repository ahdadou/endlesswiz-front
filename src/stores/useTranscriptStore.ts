import { TranscriptResponse } from "@/clients/types/apiTypes";

type TranscriptSlice = {
  vid: string;
  currentTranscript: TranscriptResponse;
  transcript: TranscriptResponse[];
  setTranscript: (transcript: TranscriptResponse[]) => void;
  setCurrentTranscript: (currentTranscript: TranscriptResponse) => void;
  setVid: (vid: string) => void;
  clearTranscript: () => void;
  transcriptToPlay: TranscriptResponse;
  setTranscriptToPlay: (transcriptToPlay: TranscriptResponse) => void;
};

export const createTranscriptSlice = (
  set: (
    partial:
      | Partial<TranscriptSlice>
      | ((state: TranscriptSlice) => Partial<TranscriptSlice>),
  ) => void,
): TranscriptSlice => ({
  vid: "",
  currentTranscript: {} as TranscriptResponse,
  transcriptToPlay: {} as TranscriptResponse,
  transcript: [],
  setTranscript: (transcript) => set({ transcript }),
  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),
  setTranscriptToPlay: (transcriptToPlay) => set({ transcriptToPlay }),
  setVid: (vid) => set({ vid }),
  clearTranscript: () =>
    set({
      transcript: [],
      currentTranscript: {} as TranscriptResponse,
      vid: "",
    }),
});
