"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";

import { createZustandStore, type StoreState } from "../stores/zustandStore";

export type ZustandStoreApi = ReturnType<typeof createZustandStore>;

export const ZustandStoreContext = createContext<ZustandStoreApi | undefined>(
  undefined,
);
// const zustandStore = createZustandStore();
export const ZustandStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef(createZustandStore()); // ✅ Each instance gets a NEW store

  return (
    <ZustandStoreContext.Provider value={storeRef.current}>
      {children}
    </ZustandStoreContext.Provider>
  );
};

export const useZustandStore = <T,>(selector: (store: StoreState) => T): T => {
  const zustandStoreContext = useContext(ZustandStoreContext);

  if (!zustandStoreContext) {
    throw new Error(`useZustandStore must be used within ZustandProvider`);
  }

  return useStore(zustandStoreContext, selector);
};

export const useZustandState = () => useZustandStore((state) => state);
