import { createStore } from 'zustand/vanilla'
import { createVideoSlice } from './useVideosStore'
import { createTranscriptSlice } from './useTranscriptStore'



type TranscriptStore = ReturnType<typeof createTranscriptSlice>
type VideoSlice = ReturnType<typeof createVideoSlice>

export type StoreState = TranscriptStore & VideoSlice

export const createZustandStore = () =>
  createStore<StoreState>()((set) => ({
    ...createTranscriptSlice(set),
    ...createVideoSlice(set),
  }))
