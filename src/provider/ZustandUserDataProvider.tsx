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
import { useRouter } from "next/navigation";
import api from "@/clients/api/api";
import { ELoginState } from "@/clients/types/apiTypes";

export type ZustandStoreApi = ReturnType<typeof createUserDataZustandStore>;

export const ZustandStoreContext = createContext<ZustandStoreApi | undefined>(
  undefined,
);

export const ZustandUserDataProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef(createUserDataZustandStore());
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.loginState();
      if (response.state === ELoginState.NOT_LOGGED_IN) {
        await fetch("/api/auth/logout", { method: "GET" });
        router.push("/auth/login");
        return;
      }
      storeRef.current.getState().setUserData(response);
    };

    fetchData();
  }, [router]);

  return (
    <ZustandStoreContext.Provider value={storeRef.current}>
      {children}
    </ZustandStoreContext.Provider>
  );
};

export const useUserDataZustandStore = <T,>(
  selector: (store: UserDataStoreState) => T,
): T => {
  const zustandStoreContext = useContext(ZustandStoreContext);

  if (!zustandStoreContext) {
    throw new Error("useZustandStore must be used within ZustandProvider");
  }

  return useStore(zustandStoreContext, selector);
};

export const useUserDataZustandState = () =>
  useUserDataZustandStore((state) => state);
