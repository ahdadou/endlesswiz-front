"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import {
  createVideoPlayerZustandStore,
  type VideoPlayerStoreState,
} from "../stores/zustandStore";

export type ZustandStoreApi = ReturnType<typeof createVideoPlayerZustandStore>;

export const ZustandStoreContext = createContext<ZustandStoreApi | undefined>(
  undefined,
);
export const ZustandStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef(createVideoPlayerZustandStore()); // ✅ Each instance gets a NEW store

  return (
    <ZustandStoreContext.Provider value={storeRef.current}>
      {children}
    </ZustandStoreContext.Provider>
  );
};

export const useZustandStore = <T,>(
  selector: (store: VideoPlayerStoreState) => T,
): T => {
  const zustandStoreContext = useContext(ZustandStoreContext);

  if (!zustandStoreContext) {
    throw new Error(`useZustandStore must be used within ZustandProvider`);
  }

  return useStore(zustandStoreContext, selector);
};

export const useZustandState = () => useZustandStore((state) => state);
