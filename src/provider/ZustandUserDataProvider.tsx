import { useEffect } from "react";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { useStore } from "zustand";
import {
  createUserDataZustandStore,
  type UserDataStoreState,
} from "../stores/zustandStore";

export type ZustandStoreApi = ReturnType<typeof createUserDataZustandStore>;

export const ZustandStoreContext = createContext<ZustandStoreApi | undefined>(
  undefined,
);

export const ZustandUserDataProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef(createUserDataZustandStore());

  useEffect(() => {
    storeRef.current.getState().fetchUserData(); // Fetch user data on mount
  }, []);

  return (
    <ZustandStoreContext.Provider value={storeRef.current}>
      {children}
    </ZustandStoreContext.Provider>
  );
};

export const useZustandStore = <T,>(
  selector: (store: UserDataStoreState) => T,
): T => {
  const zustandStoreContext = useContext(ZustandStoreContext);

  if (!zustandStoreContext) {
    throw new Error("useZustandStore must be used within ZustandProvider");
  }

  return useStore(zustandStoreContext, selector);
};

export const useZustandState = () => useZustandStore((state) => state);
