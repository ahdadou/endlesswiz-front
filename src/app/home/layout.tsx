"use client";

import DecitionaryModal from "@/components/DecitionaryModal/DecitionaryModal";
import Navbar from "@/components/Navbar";
import useModalStore, { ModalType } from "@/stores/useModalStore";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, type } = useModalStore();

  return (
    <main className="h-full overflow-auto">
      <Navbar />
      <div className="mx-auto max-w-screen-2xl h-full w-full">{children}</div>
      {isOpen && type == ModalType.DECTIONARY && <DecitionaryModal />}
    </main>
  );
};

export default HomeLayout;
