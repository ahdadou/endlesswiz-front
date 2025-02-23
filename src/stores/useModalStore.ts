import { create } from "zustand";

export enum ModalType {
  DECTIONARY,
}

export interface ModaltStore {
  type: ModalType | undefined;
  data: {};
  isOpen: boolean;
  setType: (type: ModalType) => void;
  setData: (data: {}) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const useModalStore = create<ModaltStore>((set) => ({
  type: undefined,
  data: {},
  isOpen: false,
  setType: (type) => set({ type }),
  setData: (data) => set({ data }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useModalStore;
