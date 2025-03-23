import api from "@/clients/api/api";
import { ELoginState } from "@/clients/types/apiTypes";
import { create } from "zustand";

export interface UserData {
  crossDeviceTracking?: string;
  customerNumber?: string;
  customerId?: string;
  email?: string;
  emailHash?: string;
  firstName?: string;
  bio?: string;
  level?: string;
  lastName?: string;
  sessionId?: string;
  state: ELoginState;
  profileImageUrl?: string;
  hasVerifiedEmail?: boolean;
}

export interface UserDataStoreState {
  userData: UserData | null;
  fetchUserData: () => Promise<void>;
  setUserData: (userData: UserData) => void;
}

const generateSessionId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const createUserDataSlice = (set: any): UserDataStoreState => ({
  userData: null,
  setUserData: (userData: UserData) => {
    set({ userData });
  },
  fetchUserData: async () => {
    try {
      const response = await api.loginState(); // Call API to get user data
      set({
        userData: {
          ...response,
          sessionId: generateSessionId(), // Generate and set sessionId
        },
      });
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  },
});

export const createUserDataZustandStore = () =>
  create<UserDataStoreState>((set) => ({
    ...createUserDataSlice(set),
  }));
