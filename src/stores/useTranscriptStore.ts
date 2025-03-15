// import { TranscriptResponse } from "@/clients/types/apiTypes";

// export const createTranscriptSlice = (set: any) => ({
//   vid: "",
//   currentTranscript: {} as TranscriptResponse,
//   transcript: [],
//   setTranscript: (transcript: TranscriptResponse[]) => set({ transcript }),
//   setCurrentTranscript: (currentTranscript: TranscriptResponse) =>
//     set({ currentTranscript }),
//   setVid: (vid: string) => set({ vid }),
//   clearTranscript: () =>
//     set({
//       transcript: [],
//       currentTranscript: {} as TranscriptResponse,
//       vid: "",
//     }),
// });

import { TranscriptResponse } from "@/clients/types/apiTypes";

type TranscriptSlice = {
  vid: string;
  currentTranscript: TranscriptResponse;
  transcript: TranscriptResponse[];
  setTranscript: (transcript: TranscriptResponse[]) => void;
  setCurrentTranscript: (currentTranscript: TranscriptResponse) => void;
  setVid: (vid: string) => void;
  clearTranscript: () => void;
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
  transcript: [],
  setTranscript: (transcript) => set({ transcript }),
  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),
  setVid: (vid) => set({ vid }),
  clearTranscript: () =>
    set({
      transcript: [],
      currentTranscript: {} as TranscriptResponse,
      vid: "",
    }),
});
