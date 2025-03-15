"use client";

import { ZustandStoreProvider } from "@/provider/ZustandStoreProvider";

const PronounceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full w-full">
      <ZustandStoreProvider>
        <div className="h-full w-full">{children}</div>
      </ZustandStoreProvider>
    </main>
  );
};

export default PronounceLayout;
